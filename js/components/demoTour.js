// ==========================================
// GUIDED DEMO TOUR SYSTEM (WITH NEXT, PREVIOUS, PAUSE/RESUME & AUTO PLAY)
// ==========================================
const demoSteps = [
    // USER 1: MANAGING DIRECTOR (MD)
    ["MD", "dashboard", ".content", "Managing Director (MD): Full access to all branches, reports, and system settings across the enterprise."],
    ["MD", "reports", ".content", "Managing Director (MD): Complete executive reports suite (Revenue, P&L, SLA, Branch Comparison)."],
    ["MD", "settings", ".content", "Managing Director (MD): Full administrative control over global system settings."],

    // USER 2: HEAD OFFICE ADMIN
    ["HEAD_OFFICE_ADMIN", "dashboard", ".content", "Head Office Admin: Full operational control across all branches."],
    ["HEAD_OFFICE_ADMIN", "enquiries", ".content", "Head Office Admin: Cross-branch operational management of enquiries, leads, and approvals."],

    // USER 3: ENQUIRY OFFICER
    ["ENQUIRY", "dashboard", ".content", "Enquiry Officer: Intake workspace for logging incoming client requests."],
    ["ENQUIRY", "new-enquiry", "#enquiryIntakeForm", "Enquiry Officer: Creates new enquiries; system auto-assigns branch/TL/ASM."],

    // USER 4: DESIGN TEAM LEADER (TL)
    ["TL", "dashboard", ".content", "Design Team Leader (TL): Views and manages assigned leads for their own branch only."],
    ["TL", "leads", ".content", "Design Team Leader (TL): Own-branch lead pipeline, design requirements, and consultation schedule."],

    // USER 5: ASSISTANT BRANCH MANAGER (ASM)
    ["ASM", "dashboard", ".content", "Assistant Branch Manager (ASM): Manages follow-ups, meetings, and lead status for their own branch."],
    ["ASM", "followups", ".content", "Assistant Branch Manager (ASM): Branch follow-up compliance, meeting logs, and lead status updates."],

    // USER 6: BRANCH MANAGER (BM)
    ["BM", "dashboard", ".content", "Branch Manager: Full visibility of their own branch's performance."],
    ["BM", "quotations", ".content", "Branch Manager: Own-branch sales conversion, team metrics, and quotation oversight."],

    // USER 7: ACCOUNTS TEAM
    ["ACCOUNTS", "dashboard", ".content", "Accounts Team: Access to job cards, payments, invoices, and balances (cross-branch)."],
    ["ACCOUNTS", "payments", ".content", "Accounts Team: Cross-branch payment collection, milestone schedule, invoices, and receivables aging."],

    // USER 8: PROJECT TEAM
    ["PROJECT", "dashboard", ".content", "Project Team (future phase): Access granted only after project/job card confirmation."],
    ["PROJECT", "construction", ".content", "Project Team: Unlocked strictly for confirmed job cards & projects (11-stage construction progress)."],

    // USER 9: MAIN ADMIN
    ["MAIN_ADMIN", "dashboard", ".content", "Main Admin: Master System Administration, user controls, and security logs."],
    ["MAIN_ADMIN", "roles", ".content", "Main Admin: Dynamic Role Access Level & Permissions Matrix."],

    // USER 10: SECOND ADMIN
    ["SECOND_ADMIN", "dashboard", ".content", "Second Admin: Delegated operational control and quotation approval queue."],

    // USER 11: MARKETING OFFICER (MO)
    ["MO", "dashboard", ".content", "Marketing Officer: Lead source campaign metrics and conversion analytics."],

    // USER 12: REAL ESTATE OFFICER
    ["REAL_ESTATE", "dashboard", ".content", "Real Estate Officer: Service-scoped real estate properties and land deals."],

    // USER 13: INTERIOR OFFICER
    ["INTERIOR", "dashboard", ".content", "Interior Officer: Service-scoped interior fitout and design consultations."],

    // USER 14: A-GRADE MO
    ["A_GRADE_MO", "packages", ".content", "A-Grade MO: Package configuration engine with full editing privileges."],

    // USER 15: D-GRADE MO
    ["D_GRADE_MO", "packages", ".content", "D-Grade MO: Restricted package viewer with locked section controls."]
];

let demoIndex = 0;
let demoActive = false;
let demoPaused = false;
let autoPlayEnabled = true;
let stepDuration = 60; // 1 minute (60 seconds) per step
let countdownTimer = null;
let currentCountdown = stepDuration;

function startRoleDemo() {
    demoActive = true;
    demoIndex = 0;
    demoPaused = false;
    runDemoStep();
}

function runDemoStep() {
    clearAutoPlayTimer();
    const s = demoSteps[demoIndex];
    switchRole(s[0]);
    show(s[1]);
    setTimeout(() => {
        spotlight(s);
        startAutoPlayTimer();
    }, 300);
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
            
            <h3 class="font-bold text-slate-900 text-base mt-2">${ROLE_CONFIG[s[0]].label}</h3>
            <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">${s[3]}</p>
            
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
                    <span class="text-slate-900 font-semibold"><b>USER DEMO TOUR:</b> ${ROLE_CONFIG[s[0]].label} (${demoIndex + 1}/${demoSteps.length})</span>
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
                <p class="text-xs text-slate-500 mt-1">All 15 role views were demonstrated user-by-user.</p>
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
