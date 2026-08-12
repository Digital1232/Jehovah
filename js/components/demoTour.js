// ==========================================
// GUIDED DEMO TOUR SYSTEM (ROLE BY ROLE & MENU BY MENU)
// ==========================================

function buildDemoStepsForRoles() {
    const steps = [];
    const roleKeys = Object.keys(ROLE_CONFIG);

    roleKeys.forEach(rKey => {
        const cfg = ROLE_CONFIG[rKey];
        const tempRole = role;
        role = rKey;

        // Filter allowed navigation items for this role
        const allowedNavs = NAVIGATION.filter(nav => {
            if (nav.id === "demo-center") return false;
            if (!nav.roles) return true;
            return nav.roles.includes(rKey) && canView(nav.id);
        });

        allowedNavs.forEach((nav, idx) => {
            const desc = `${cfg.label} [${cfg.department}]: Exploring '${nav.label}' Menu (${idx + 1}/${allowedNavs.length}). ${cfg.description}.`;
            steps.push([
                rKey,
                nav.id,
                ".content",
                desc,
                nav.label,
                idx + 1,
                allowedNavs.length
            ]);
        });

        role = tempRole;
    });

    return steps;
}

let demoSteps = [];
let demoIndex = 0;
let demoActive = false;
let demoPaused = false;
let autoPlayEnabled = true;
let stepDuration = 60; // 1 minute (60 seconds) per step
let countdownTimer = null;
let currentCountdown = stepDuration;

let activeTargetEl = null;

function updateRingPosition() {
    const ring = $("#demoRing");
    if (!ring || !demoActive) return;

    const target = activeTargetEl || document.querySelector(".page") || document.querySelector(".content");
    if (!target) return;

    const r = target.getBoundingClientRect();

    const left = Math.max(8, r.left - 6);
    const top = Math.max(8, r.top - 6);
    const width = Math.min(window.innerWidth - left - 12, r.width + 12);
    const height = Math.min(window.innerHeight - top - 12, r.height + 12);

    ring.style.left = left + "px";
    ring.style.top = top + "px";
    ring.style.width = width + "px";
    ring.style.height = height + "px";
}

window.addEventListener("scroll", updateRingPosition, true);
window.addEventListener("resize", updateRingPosition);

function startRoleDemo() {
    demoSteps = buildDemoStepsForRoles();
    demoActive = true;
    demoIndex = 0;
    demoPaused = false;
    runDemoStep();
}

function runDemoStep() {
    clearAutoPlayTimer();
    if (!demoSteps || !demoSteps.length) {
        demoSteps = buildDemoStepsForRoles();
    }
    const s = demoSteps[demoIndex];
    if (!s) return;

    // Reset scroll positions so ring doesn't jump offscreen
    window.scrollTo(0, 0);
    const ws = document.querySelector(".workspace");
    if (ws) ws.scrollTop = 0;

    // Switch Role and Navigate to Menu
    switchRole(s[0]);
    show(s[1]);

    setTimeout(() => {
        spotlight(s);
        startAutoPlayTimer();
    }, 350);
}

function startAutoPlayTimer() {
    clearAutoPlayTimer();
    if (!autoPlayEnabled || demoPaused) return;

    currentCountdown = stepDuration;
    updateCountdownUI();

    countdownTimer = setInterval(() => {
        if (!autoPlayEnabled || demoPaused) {
            clearAutoPlayTimer();
            return;
        }
        currentCountdown--;
        updateCountdownUI();

        if (currentCountdown <= 0) {
            clearAutoPlayTimer();
            nextDemoStep();
        }
    }, 1000);
}

function clearAutoPlayTimer() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

function toggleDemoPause() {
    demoPaused = !demoPaused;
    if (demoPaused) {
        clearAutoPlayTimer();
        toast("Demo Tour Paused ⏸", "pause");
    } else {
        toast("Demo Tour Resumed ▶", "play");
        startAutoPlayTimer();
    }
    refreshControlUI();
}

function toggleAutoPlay() {
    autoPlayEnabled = !autoPlayEnabled;
    if (!autoPlayEnabled) {
        clearAutoPlayTimer();
        demoPaused = false;
        toast("Auto Play Disabled — Manual Mode", "hand");
    } else {
        demoPaused = false;
        toast("Auto Play Enabled (1 min per step)", "sparkles");
        startAutoPlayTimer();
    }
    refreshControlUI();
}

function updateCountdownUI() {
    const badge = $("#demoTimerBadge");
    const bar = $("#demoCountdownBar");
    if (badge) {
        if (autoPlayEnabled && !demoPaused) {
            badge.textContent = `Auto-Next in ${currentCountdown}s`;
            badge.className = "tag bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold";
        } else if (demoPaused) {
            badge.textContent = "Paused ⏸";
            badge.className = "tag bg-slate-700 text-slate-300 border border-slate-600 text-[10px] font-bold";
        } else {
            badge.className = "hidden";
        }
    }
    if (bar) {
        const pct = autoPlayEnabled && !demoPaused ? (currentCountdown / stepDuration) * 100 : 0;
        bar.style.width = pct + "%";
    }
}

function refreshControlUI() {
    const pauseBtn = $("#demoPauseBtn");
    const autoPlayBtn = $("#demoAutoPlayBtn");
    
    if (pauseBtn) {
        pauseBtn.innerHTML = demoPaused 
            ? `<i data-lucide="play" class="w-3.5 h-3.5"></i> Resume ▶` 
            : `<i data-lucide="pause" class="w-3.5 h-3.5"></i> Pause ⏸`;
    }
    if (autoPlayBtn) {
        autoPlayBtn.className = autoPlayEnabled 
            ? "px-2.5 py-1 rounded-lg text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold" 
            : "px-2.5 py-1 rounded-lg text-[11px] bg-white/10 text-slate-300 border border-white/15 font-medium";
        autoPlayBtn.textContent = autoPlayEnabled ? "Auto Play: ON (1 min)" : "Auto Play: OFF";
    }
    updateCountdownUI();
    icons();
}

function makeDemoBarDraggable() {
    const bar = document.querySelector(".demo-bar");
    if (!bar) return;

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    bar.addEventListener("mousedown", (e) => {
        if (e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) return;

        isDragging = true;
        bar.classList.add("is-dragging");
        startX = e.clientX;
        startY = e.clientY;

        const rect = bar.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        bar.style.transform = "none";
        bar.style.bottom = "auto";
        bar.style.left = initialLeft + "px";
        bar.style.top = initialTop + "px";

        e.preventDefault();
    });

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        newLeft = Math.max(10, Math.min(window.innerWidth - bar.offsetWidth - 10, newLeft));
        newTop = Math.max(10, Math.min(window.innerHeight - bar.offsetHeight - 10, newTop));

        bar.style.left = newLeft + "px";
        bar.style.top = newTop + "px";
    };

    const onMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            bar.classList.remove("is-dragging");
        }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

function spotlight(s) {
    const target = document.querySelector(".page") || document.querySelector(s[2]) || content;
    activeTargetEl = target;
    const isFirstStep = demoIndex === 0;
    const isLastStep = demoIndex === demoSteps.length - 1;

    $("#overlayRoot").innerHTML = `
        <div id="demoRing" class="demo-ring"></div>

        <!-- FLOATING DARK GLASSMORPHISM CONTROL BAR & PROGRESS BAR -->
        <section class="demo-bar flex flex-col gap-2.5">
            <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div class="flex flex-wrap items-center gap-2">
                    <i data-lucide="grip-vertical" class="w-4 h-4 text-slate-400 cursor-grab flex-shrink-0 mr-0.5" title="Drag to move control bar"></i>
                    <span class="tag bg-blue-500/25 text-blue-300 border border-blue-400/30 text-[10px] uppercase font-bold tracking-widest">${ROLE_CONFIG[s[0]].label}</span>
                    <span class="text-white font-bold">Menu ${s[5]} of ${s[6]}: <span class="text-blue-300 font-extrabold">${s[4]}</span></span>
                    <span id="demoTimerBadge" class="tag bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold"></span>
                </div>
                
                <div class="flex items-center gap-2">
                    <button id="demoPauseBtn" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[11px] font-semibold flex items-center gap-1.5 transition-all" onclick="toggleDemoPause()">
                        <i data-lucide="${demoPaused ? "play" : "pause"}" class="w-3.5 h-3.5"></i> ${demoPaused ? "Resume ▶" : "Pause ⏸"}
                    </button>
                    <button id="demoAutoPlayBtn" onclick="toggleAutoPlay()" class="px-2.5 py-1 rounded-lg text-[11px] transition-all">
                        ${autoPlayEnabled ? "Auto Play: ON (1 min)" : "Auto Play: OFF"}
                    </button>
                    <button class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 text-[11px] font-semibold" onclick="prevDemoStep()" ${isFirstStep ? "disabled" : ""}>◄ Prev</button>
                    <button class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-sm" onclick="nextDemoStep()">${isLastStep ? "Finish ✓" : "Next ►"}</button>
                    <button class="text-red-400 hover:text-red-300 font-bold ml-2 text-xs" onclick="exitDemo()">Exit Tour</button>
                </div>
            </div>

            <!-- ANIMATED COUNTDOWN PROGRESS BAR -->
            <div class="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden flex border border-slate-700/50">
                <div id="demoCountdownBar" class="bg-gradient-to-r from-blue-500 to-indigo-400 h-full transition-all duration-1000 ease-linear shadow-sm" style="width:100%"></div>
            </div>
        </section>
    `;

    icons();
    target.classList.add("demo-focus");
    refreshControlUI();
    updateRingPosition();
    makeDemoBarDraggable();
}

function prevDemoStep() {
    clearAutoPlayTimer();
    document.querySelectorAll(".demo-focus").forEach(x => x.classList.remove("demo-focus"));
    if (demoIndex > 0) {
        demoIndex--;
        runDemoStep();
    }
}

function nextDemoStep() {
    clearAutoPlayTimer();
    document.querySelectorAll(".demo-focus").forEach(x => x.classList.remove("demo-focus"));
    if (demoIndex >= demoSteps.length - 1) {
        demoActive = false;
        openModal(`
            <div class="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-6 border-b border-emerald-100 text-center relative">
                <div class="w-14 h-14 rounded-2xl mx-auto bg-emerald-600 text-white grid place-items-center mb-3 shadow-lg shadow-emerald-600/25">
                    <i data-lucide="trophy" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-extrabold text-slate-900">Guided Demo Tour Completed!</h3>
                <p class="text-xs text-slate-600 mt-1 font-medium">Successfully demonstrated all user roles and their complete navigation menu workflows.</p>
            </div>
            <div class="p-6 text-center">
                <button class="btn btn-primary w-full py-2.5 text-xs font-bold shadow-md" onclick="closeOverlay();switchRole('MAIN_ADMIN')">Return to Main Admin Workspace</button>
            </div>
        `, "max-w-md p-0 overflow-hidden");
        return;
    }
    demoIndex++;
    runDemoStep();
}

function exitDemo() {
    clearAutoPlayTimer();
    demoActive = false;
    demoPaused = false;
    document.querySelectorAll(".demo-focus").forEach(x => x.classList.remove("demo-focus"));
    closeOverlay();
    show("dashboard");
}

// Global Keyboard Navigation Listener for Tour Controls
document.addEventListener("keydown", e => {
    if (!demoActive) return;
    if (e.key === "ArrowRight") { e.preventDefault(); nextDemoStep(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prevDemoStep(); }
    if (e.key === " ") { e.preventDefault(); toggleDemoPause(); }
    if (e.key === "Escape") { e.preventDefault(); exitDemo(); }
});
