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
            badge.classList.remove("hidden");
        } else if (demoPaused) {
            badge.textContent = "Paused ⏸";
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
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
            ? "btn py-1 px-2 text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold" 
            : "btn py-1 px-2 text-[11px] bg-slate-100 text-slate-700 border border-slate-300 font-medium";
        autoPlayBtn.textContent = autoPlayEnabled ? "Auto Play: ON (1 min)" : "Auto Play: OFF";
    }
    updateCountdownUI();
    icons();
}

function spotlight(s) {
    const target = document.querySelector(s[2]) || content;
    const isFirstStep = demoIndex === 0;
    const isLastStep = demoIndex === demoSteps.length - 1;

    $("#overlayRoot").innerHTML = `
        <div class="demo-dim"></div>
        <div id="demoRing" class="demo-ring"></div>
        <aside id="demoTooltip" class="demo-tooltip shadow-2xl border border-slate-200">
            <div class="flex justify-between items-center pb-2 border-b border-slate-100">
                <span class="text-[10px] font-bold tracking-widest text-blue-600 uppercase">Step ${demoIndex + 1} of ${demoSteps.length}</span>
                <span id="demoTimerBadge" class="tag bg-amber-100 text-amber-900 text-[10px] font-bold"></span>
            </div>
            
            <div class="mt-2">
                <span class="tag bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">${ROLE_CONFIG[s[0]].label}</span>
                <h3 class="font-bold text-slate-900 text-base mt-1">Menu ${s[5]} of ${s[6]}: ${s[4]}</h3>
                <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">${s[3]}</p>
            </div>
            
            <!-- STEP NAVIGATION CONTROLS -->
            <div class="mt-4 pt-3 border-t flex items-center justify-between gap-1.5">
                <button class="btn btn-outline text-xs py-1.5 px-2.5" onclick="prevDemoStep()" ${isFirstStep ? "disabled" : ""}>
                    <i data-lucide="chevron-left" class="w-4 h-4"></i> Prev
                </button>
                
                <button id="demoPauseBtn" class="btn btn-secondary text-xs py-1.5 px-3" onclick="toggleDemoPause()">
                    <i data-lucide="${demoPaused ? "play" : "pause"}" class="w-3.5 h-3.5"></i> ${demoPaused ? "Resume ▶" : "Pause ⏸"}
                </button>
                
                <button class="btn btn-primary text-xs py-1.5 px-3" onclick="nextDemoStep()">
                    ${isLastStep ? "Finish ✓" : "Next ▶"}
                </button>
            </div>
        </aside>

        <!-- BOTTOM CONTROL & PROGRESS BAR -->
        <section class="demo-bar flex flex-col gap-2 bg-white text-slate-900 border border-slate-200 shadow-2xl">
            <div class="flex justify-between items-center text-xs">
                <div class="flex items-center gap-3">
                    <span class="text-slate-900 font-semibold"><b>DEMO TOUR:</b> ${ROLE_CONFIG[s[0]].label} → ${s[4]} Menu (${s[5]}/${s[6]})</span>
                    <button id="demoAutoPlayBtn" onclick="toggleAutoPlay()" class="btn py-1 px-2 text-[11px] ${autoPlayEnabled ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold" : "bg-slate-100 text-slate-700 border border-slate-300 font-medium"}">
                        ${autoPlayEnabled ? "Auto Play: ON (1 min)" : "Auto Play: OFF"}
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    <button class="text-slate-700 hover:text-slate-900 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-semibold" onclick="prevDemoStep()" ${isFirstStep ? "disabled" : ""}>◄ Prev</button>
                    <button class="text-slate-700 hover:text-slate-900 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-semibold" onclick="nextDemoStep()">Next ►</button>
                    <button class="text-red-600 hover:text-red-800 font-bold ml-2 text-xs" onclick="exitDemo()">Exit Tour</button>
                </div>
            </div>
            <!-- ANIMATED COUNTDOWN PROGRESS BAR -->
            <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex">
                <div id="demoCountdownBar" class="bg-blue-600 h-full transition-all duration-1000 ease-linear" style="width:100%"></div>
            </div>
        </section>
    `;

    icons();
    target.classList.add("demo-focus");
    refreshControlUI();

    const ring = $("#demoRing");
    const tip = $("#demoTooltip");
    const r = target.getBoundingClientRect();

    ring.style.left = Math.max(6, r.left - 6) + "px";
    ring.style.top = Math.max(6, r.top - 6) + "px";
    ring.style.width = Math.min(innerWidth - 12, r.width + 12) + "px";
    ring.style.height = Math.min(innerHeight - 12, r.height + 12) + "px";

    if (innerWidth > 900) {
        tip.style.left = Math.min(innerWidth - 400, Math.max(16, r.right + 20)) + "px";
        tip.style.top = Math.max(20, Math.min(innerHeight - 260, r.top)) + "px";
    }
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
            <div class="text-center p-4">
                <div class="w-14 h-14 rounded-2xl mx-auto bg-emerald-50 text-emerald-600 grid place-items-center mb-3">
                    <i data-lucide="check-circle-2" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Guided Demo Tour Completed!</h3>
                <p class="text-xs text-slate-500 mt-1">Successfully demonstrated all user roles and their complete navigation menu workflows!</p>
                <button class="btn btn-primary w-full mt-6" onclick="closeOverlay();switchRole('MAIN_ADMIN')">Return to Main Admin</button>
            </div>
        `);
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
