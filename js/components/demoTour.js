// ==========================================
// GUIDED DEMO TOUR SYSTEM (WITH NEXT, PREVIOUS, PAUSE/RESUME & AUTO PLAY)
// ==========================================
const demoSteps = [
    // USER 1: MANAGING DIRECTOR (MD)
    ["MD", "dashboard", ".content", "User 1/15 (Managing Director): Executive Dashboard with cross-branch KPIs, revenue trends, conversion funnel, and SLA compliance."],
    ["MD", "reports", ".content", "User 1/15 (Managing Director): Executive Reports Engine for cross-branch strategic & financial analysis."],
    ["MD", "audit", ".content", "User 1/15 (Managing Director): Master System Audit Trail for executive oversight."],

    // USER 2: HEAD OFFICE ADMIN
    ["HEAD_OFFICE_ADMIN", "dashboard", ".content", "User 2/15 (Head Office Admin): High-level Operational Control Center across all branches."],
    ["HEAD_OFFICE_ADMIN", "enquiries", ".content", "User 2/15 (Head Office Admin): Master Enquiries Table with global branch search and filtering."],

    // USER 3: MAIN ADMIN
    ["MAIN_ADMIN", "dashboard", ".content", "User 3/15 (Main Admin): Primary Operational Dashboard with SLA breaches, pending approvals, and security alerts."],
    ["MAIN_ADMIN", "approvals", ".content", "User 3/15 (Main Admin): Approval Queue for quotation revisions and payment exception requests."],
    ["MAIN_ADMIN", "users", ".content", "User 3/15 (Main Admin): User Management for creating, editing, disabling users, and device authorizations."],
    ["MAIN_ADMIN", "roles", ".content", "User 3/15 (Main Admin): Visual Permission Matrix for dynamic RBAC control across all modules."],
    ["MAIN_ADMIN", "security", ".content", "User 3/15 (Main Admin): Security & Device Approval Center."],

    // USER 4: SECOND ADMIN
    ["SECOND_ADMIN", "dashboard", ".content", "User 4/15 (Second Admin): Delegated Operational Control showing explicitly configured privileges."],

    // USER 5: ENQUIRY OFFICER
    ["ENQUIRY", "dashboard", ".content", "User 5/15 (Enquiry Officer): Intake Dashboard with today's metrics and auto-routing rules."],
    ["ENQUIRY", "new-enquiry", "#enquiryIntakeForm", "User 5/15 (Enquiry Officer): Create New Enquiry form with auto-assignment to Branch, TL, ASM and 10-min SLA timer."],

    // USER 6: DESIGN TEAM LEADER (TL)
    ["TL", "dashboard", ".content", "User 6/15 (Design TL): Own-branch lead delivery, site visits, and consultation schedule."],
    ["TL", "leads", ".content", "User 6/15 (Design TL): Assigned Leads workspace with requirement capture and client timeline."],

    // USER 7: ASSISTANT BRANCH MANAGER (ASM)
    ["ASM", "dashboard", ".content", "User 7/15 (ASM): Live 10-Minute SLA countdown widget (Green / Amber / Red response monitoring)."],
    ["ASM", "followups", ".content", "User 7/15 (ASM): Immutable Follow-up History Log — historical entries cannot be altered or deleted."],

    // USER 8: BRANCH MANAGER (BM)
    ["BM", "dashboard", ".content", "User 8/15 (Branch Manager): Permanently locked to own branch scope (no cross-branch access)."],
    ["BM", "quotations", ".content", "User 8/15 (Branch Manager): Submit Quotation Revision Request to Main Admin for price adjustments."],

    // USER 9: MARKETING OFFICER (MO)
    ["MO", "dashboard", ".content", "User 9/15 (Marketing Officer): Campaign lead intake, channel conversion performance, and enquiry surge alerts."],

    // USER 10: ACCOUNTS TEAM
    ["ACCOUNTS", "dashboard", ".content", "User 10/15 (Accounts Team): Cross-branch financial dashboard with collection metrics."],
    ["ACCOUNTS", "payments", ".content", "User 10/15 (Accounts Team): Standard 25% / 25% / 50% milestone collection logger and balance tracking."],
    ["ACCOUNTS", "invoices", ".content", "User 10/15 (Accounts Team): Tax and GST invoice management."],

    // USER 11: PROJECT TEAM
    ["PROJECT", "dashboard", ".content", "User 11/15 (Project Team): Unlocked strictly after Job Card confirmation (sales enquiries hidden)."],
    ["PROJECT", "construction", ".content", "User 11/15 (Project Team): 11-Stage Construction Progress Tracker with target completion dates."],

    // USER 12: REAL ESTATE OFFICER
    ["REAL_ESTATE", "dashboard", ".content", "User 12/15 (Real Estate Officer): Service-isolated dashboard (only Real Estate leads visible)."],
    ["REAL_ESTATE", "enquiries", ".content", "User 12/15 (Real Estate Officer): Service-restricted enquiries table."],

    // USER 13: INTERIOR OFFICER
    ["INTERIOR", "dashboard", ".content", "User 13/15 (Interior Officer): Service-isolated dashboard (only Interior fitout leads visible)."],
    ["INTERIOR", "enquiries", ".content", "User 13/15 (Interior Officer): Service-restricted enquiries table."],

    // USER 14: A-GRADE MO
    ["A_GRADE_MO", "dashboard", ".content", "User 14/15 (A-Grade MO): Package management workspace with full section modification rights."],
    ["A_GRADE_MO", "packages", ".content", "User 14/15 (A-Grade MO): Editable package sections and MO approval capabilities."],

    // USER 15: D-GRADE MO
    ["D_GRADE_MO", "dashboard", ".content", "User 15/15 (D-Grade MO): Basic marketing dashboard with restricted package controls."],
    ["D_GRADE_MO", "packages", ".content", "User 15/15 (D-Grade MO): Restricted package sections locked with 🔒 tooltip."]
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
            ? "btn py-1 px-2 text-[11px] bg-emerald-700 text-white" 
            : "btn py-1 px-2 text-[11px] bg-slate-700 text-slate-300";
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
        <section class="demo-bar flex flex-col gap-2">
            <div class="flex justify-between items-center text-xs">
                <div class="flex items-center gap-3">
                    <span><b>USER DEMO TOUR:</b> ${ROLE_CONFIG[s[0]].label} (${demoIndex + 1}/${demoSteps.length})</span>
                    <button id="demoAutoPlayBtn" onclick="toggleAutoPlay()" class="btn py-1 px-2 text-[11px] ${autoPlayEnabled ? "bg-emerald-700 text-white" : "bg-slate-700 text-slate-300"}">
                        ${autoPlayEnabled ? "Auto Play: ON (1 min)" : "Auto Play: OFF"}
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    <button class="text-slate-300 hover:text-white px-2 py-0.5 rounded bg-white/10 text-[11px]" onclick="prevDemoStep()" ${isFirstStep ? "disabled" : ""}>◄ Prev</button>
                    <button class="text-slate-300 hover:text-white px-2 py-0.5 rounded bg-white/10 text-[11px]" onclick="nextDemoStep()">Next ►</button>
                    <button class="text-blue-300 hover:text-white font-semibold ml-2 text-xs" onclick="exitDemo()">Exit Tour</button>
                </div>
            </div>
            <!-- ANIMATED COUNTDOWN PROGRESS BAR -->
            <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                <div id="demoCountdownBar" class="bg-amber-400 h-full transition-all duration-1000 ease-linear" style="width:100%"></div>
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
