// ==========================================
// UI HELPER FUNCTIONS & DASHBOARDS
// ==========================================
const money = n => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
let toastTimer;

function toast(msg, icon = "check-circle-2") {
    const t = $("#toast");
    t.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 text-emerald-400"></i><span>${msg}</span>`;
    t.classList.remove("hidden");
    clearTimeout(toastTimer);
    icons();
    toastTimer = setTimeout(() => t.classList.add("hidden"), 3200);
}

function icons() { 
    if (window.lucide) lucide.createIcons(); 
}

function closeOverlay() { 
    $("#overlayRoot").innerHTML = ""; 
}

function openModal(bodyHtml) {
    $("#overlayRoot").innerHTML = `<div class="modal-wrap">${bodyHtml}</div>`;
    icons();
}

function head(kicker, title, actionsHtml = "") {
    return `
        <div class="flex flex-wrap gap-4 justify-between items-end mb-6 pb-4 border-b border-slate-200">
            <div>
                <p class="section-title">${kicker}</p>
                <h2 class="text-2xl font-bold tracking-tight text-slate-900 mt-1">${title}</h2>
            </div>
            <div class="flex flex-wrap gap-2.5 items-center">${actionsHtml}</div>
        </div>
    `;
}

function card(label, value, icon, tone = "#eff6ff", color = "#1d4ed8", sub = "Live CRM System Data") {
    return `
        <section class="card p-5 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start gap-2">
                <span class="label uppercase text-[11px] tracking-wider font-semibold">${label}</span>
                <span class="w-9 h-9 rounded-xl grid place-items-center flex-shrink-0" style="background:${tone};color:${color}">
                    <i data-lucide="${icon}" class="w-4 h-4"></i>
                </span>
            </div>
            <strong class="metric mt-3 block">${value}</strong>
            <span class="text-[11px] text-slate-500 font-medium block mt-1">${sub}</span>
        </section>
    `;
}

function emptyState(title, detail) {
    return `
        <div class="p-12 text-center card my-4">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 grid place-items-center">
                <i data-lucide="inbox" class="w-7 h-7"></i>
            </div>
            <h3 class="font-bold text-slate-800 text-base mt-4">${title}</h3>
            <p class="text-sm text-slate-500 mt-1 max-w-sm mx-auto">${detail}</p>
        </div>
    `;
}

function accessDenied(requiredPermission = "Administrative Control") {
    return `
        <div class="page my-8 max-w-xl mx-auto text-center card p-10 border-red-200 shadow-xl">
            <div class="w-16 h-16 rounded-2xl mx-auto bg-red-50 text-red-600 grid place-items-center mb-4">
                <i data-lucide="lock" class="w-8 h-8"></i>
            </div>
            <p class="section-title text-red-600">SECURITY RESTRICTION</p>
            <h2 class="text-2xl font-bold text-slate-900 mt-2">ACCESS RESTRICTED</h2>
            <p class="text-sm text-slate-600 mt-3 leading-relaxed">
                You do not have the authorization required to access this CRM module or action.
            </p>
            <div class="mt-6 rounded-xl bg-slate-50 p-4 border text-left text-xs space-y-2">
                <div class="flex justify-between">
                    <span class="text-slate-500 font-semibold">Current Role:</span>
                    <strong class="text-slate-800">${ROLE_CONFIG[role].label}</strong>
                </div>
                <div class="flex justify-between">
                    <span class="text-slate-500 font-semibold">Department:</span>
                    <strong class="text-slate-800">${ROLE_CONFIG[role].department}</strong>
                </div>
                <div class="flex justify-between">
                    <span class="text-slate-500 font-semibold">Required Permission:</span>
                    <span class="tag bg-red-100 text-red-800 font-mono">${requiredPermission}</span>
                </div>
            </div>
            <button class="btn btn-primary mt-6 w-full py-2.5" onclick="show('dashboard')">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Return to Authorized Dashboard
            </button>
        </div>
    `;
}

function roleHeaderBanner(cfg) {
    if (!cfg) return "";
    return `
        <div class="mb-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 p-5 text-slate-900 shadow-sm border border-blue-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div class="flex items-center gap-2">
                    <span class="tag bg-blue-100 text-blue-900 border border-blue-300 text-[10px] uppercase font-bold tracking-widest">${cfg.branchScope} SCOPE</span>
                    <span class="tag bg-white text-slate-700 border border-slate-200 text-[10px] font-semibold">${cfg.department}</span>
                </div>
                <h2 class="text-xl font-extrabold tracking-tight mt-1.5 text-slate-900">${cfg.label} Dashboard</h2>
                <p class="text-xs text-slate-700 mt-1 font-medium max-w-2xl leading-relaxed">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5 inline text-emerald-600 mr-1"></i>
                    <b class="text-slate-900">Role Access Level:</b> ${cfg.description}
                </p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
                <button class="btn btn-outline border-blue-300 bg-white text-blue-900 hover:bg-blue-50 text-xs py-2 px-3 shadow-sm" onclick="show('roles')">
                    <i data-lucide="shield" class="w-3.5 h-3.5 text-blue-600"></i> Roles Matrix
                </button>
            </div>
        </div>
    `;
}

// 1. MD DASHBOARD
function dashboardMD() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("EXECUTIVE BOARD OVERVIEW", "Managing Director Dashboard", `
                <button class="btn btn-outline text-xs" onclick="show('reports')"><i data-lucide="file-bar-chart" class="w-4 h-4"></i>Executive Reports</button>
                <button class="btn btn-primary text-xs" onclick="show('settings')"><i data-lucide="settings" class="w-4 h-4"></i>System Settings</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Total Enquiries", "128", "inbox", "#eff6ff", "#2563eb", "+12.4% vs last month")}
                ${card("Conversion Rate", "24.2%", "target", "#f0fdf4", "#16a34a", "High efficiency")}
                ${card("Total Revenue", "₹4.82 Cr", "indian-rupee", "#eff6ff", "#1d4ed8", "YTD Collected")}
                ${card("Active Projects", "42", "construction", "#f5f3ff", "#7c3aed", "Across 4 branches")}
                ${card("Pending Payments", "₹42.5 L", "circle-dollar-sign", "#fffbeb", "#d97706", "3 overdue receivables")}
                ${card("SLA Compliance", "94%", "timer", "#f0fdf4", "#16a34a", "10-min response rate")}
                ${card("Best Branch", "Chennai Branch", "building", "#eff6ff", "#2563eb", "₹1.82 Cr revenue")}
                ${card("Top Lead Source", "Referral", "mouse-pointer-2", "#f8fafc", "#334155", "38% conversion")}
            </div>
            <div class="grid lg:grid-cols-3 gap-5 mt-6">
                <section class="card p-6 lg:col-span-2">
                    <h3 class="font-bold text-slate-900 text-base">Branch Performance Comparison</h3>
                    <p class="label mt-0.5">Revenue, conversion percentage, and SLA compliance across operating branches.</p>
                    <div class="mt-6 space-y-5">
                        ${[["Chennai Branch", "₹1.82 Cr Revenue", "86% SLA", "86%"], ["Coimbatore Branch", "₹1.40 Cr Revenue", "78% SLA", "78%"], ["Bengaluru Branch", "₹1.60 Cr Revenue", "82% SLA", "82%"], ["Hyderabad Branch", "₹68 L Revenue", "74% SLA", "74%"]].map(x => `
                            <div>
                                <div class="flex justify-between text-xs font-semibold">
                                    <span class="text-slate-800">${x[0]}</span>
                                    <span class="text-slate-600">${x[1]} · <b class="text-blue-600">${x[2]}</b></span>
                                </div>
                                <div class="progress mt-2"><span style="width:${x[3]}"></span></div>
                            </div>
                        `).join("")}
                    </div>
                </section>
                <section class="card p-6">
                    <h3 class="font-bold text-slate-900 text-base">Executive Alerts</h3>
                    <div class="mt-5 space-y-3.5 text-xs">
                        <div class="p-3 rounded-xl bg-red-50 text-red-700 font-medium flex items-center gap-2">
                            <i data-lucide="triangle-alert" class="w-4 h-4 text-red-600 flex-shrink-0"></i>
                            <span>2 Design SLA breaches reported in Chennai</span>
                        </div>
                        <div class="p-3 rounded-xl bg-amber-50 text-amber-800 font-medium flex items-center gap-2">
                            <i data-lucide="clock" class="w-4 h-4 text-amber-600 flex-shrink-0"></i>
                            <span>Quotation revision awaiting approval (₹85L → ₹82L)</span>
                        </div>
                        <div class="p-3 rounded-xl bg-blue-50 text-blue-700 font-medium">
                            <b>Best Performing TL:</b> Rajesh Kumar (Chennai · 31% conversion)
                        </div>
                        <div class="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-medium">
                            <b>Best Performing ASM:</b> Senthil Nathan (94% SLA compliance)
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;
}

// 2. HEAD OFFICE ADMIN DASHBOARD
function dashboardHOAdmin() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("HEAD OFFICE OPERATIONAL CONTROL", "Head Office Admin Dashboard", `
                <button class="btn btn-secondary text-xs" onclick="show('approvals')"><i data-lucide="badge-check" class="w-4 h-4"></i>Approvals Queue</button>
                <button class="btn btn-primary text-xs" onclick="show('users')"><i data-lucide="users" class="w-4 h-4"></i>Manage Users</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
                ${card("Enquiry Volume", "128", "inbox")}
                ${card("SLA Breaches", "3 Breaches", "triangle-alert", "#fef2f2", "#b91c1c")}
                ${card("Pending Approvals", state.revisionRequested && !state.revisionApproved ? "2 Pending" : "1 Pending", "badge-check", "#fffbeb", "#b45309")}
                ${card("Payment Exceptions", "1 Request", "circle-dollar-sign", "#fffbeb", "#b45309")}
                ${card("Security Alerts", state.deviceApproved ? "0" : "1 Alert", "shield-alert", "#fef2f2", "#b91c1c")}
            </div>
            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">Head Office Control Priorities</h3>
                <p class="label mt-0.5">Cross-branch operational exceptions requiring administrative intervention.</p>
                <div class="grid md:grid-cols-3 gap-4 mt-4">
                    <div class="p-4 rounded-xl bg-red-50 border border-red-200 cursor-pointer" onclick="show('approvals')">
                        <span class="tag bg-red-100 text-red-800 text-[10px]">Quotation Exception</span>
                        <strong class="block text-slate-900 mt-2 text-sm">Branch Manager Revision Request</strong>
                        <p class="text-xs text-slate-600 mt-1">Chennai Branch negotiated value reduced to ₹82,00,000</p>
                    </div>
                    <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer" onclick="show('security')">
                        <span class="tag bg-amber-100 text-amber-800 text-[10px]">Security Control</span>
                        <strong class="block text-slate-900 mt-2 text-sm">Unauthorized Device Login</strong>
                        <p class="text-xs text-slate-600 mt-1">Samsung Galaxy S24 attempt from Chennai IP</p>
                    </div>
                    <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 cursor-pointer" onclick="show('construction')">
                        <span class="tag bg-blue-100 text-blue-800 text-[10px]">Construction SLA</span>
                        <strong class="block text-slate-900 mt-2 text-sm">Structure Delay Warning</strong>
                        <p class="text-xs text-slate-600 mt-1">Project JC-2026-001 is 4 days behind schedule</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// 3. MAIN ADMIN DASHBOARD
function dashboardMainAdmin() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("PRIMARY OPERATIONAL CONTROL CENTER", "Main Admin Dashboard", `
                <button class="btn btn-secondary text-xs" onclick="show('approvals')"><i data-lucide="badge-check" class="w-4 h-4"></i>Approval Center</button>
                <button class="btn btn-primary text-xs" onclick="show('roles')"><i data-lucide="shield-check" class="w-4 h-4"></i>Roles & Permissions</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
                ${card("Total Enquiries", "128", "inbox")}
                ${card("SLA Breaches", "3", "triangle-alert", "#fef2f2", "#b91c1c")}
                ${card("Pending Approvals", state.revisionRequested && !state.revisionApproved ? "2" : "1", "badge-check", "#fffbeb", "#b45309")}
                ${card("Payment Exceptions", "1", "circle-dollar-sign", "#fffbeb", "#b45309")}
                ${card("Security Alerts", state.deviceApproved ? "0" : "1", "shield-alert", "#fef2f2", "#b91c1c")}
                ${card("Active Projects", "42", "construction")}
                ${card("Design Delays", "2", "palette", "#fef2f2", "#b91c1c")}
                ${card("Unauthorized Logins", state.deviceApproved ? "0" : "1", "scan-face", "#fef2f2", "#b91c1c")}
                ${card("Pending Quotations", "18", "file-text")}
                ${card("Construction Delays", "2", "clock-3", "#fffbeb", "#b45309")}
            </div>
            <div class="grid lg:grid-cols-2 gap-5 mt-6">
                <section class="card p-6">
                    <h3 class="font-bold text-slate-900">Main Admin Permissions Active</h3>
                    <div class="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                        <span class="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4"></i> Manage All Users</span>
                        <span class="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4"></i> Reset & Disable Users</span>
                        <span class="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4"></i> Configure RBAC Permissions</span>
                        <span class="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4"></i> Approve Payment Exceptions</span>
                        <span class="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4"></i> Approve Quotation Revisions</span>
                        <span class="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4"></i> Export All Data</span>
                    </div>
                </section>
                <section class="card p-6">
                    <h3 class="font-bold text-slate-900">System Activity Stream</h3>
                    <div class="mt-4 space-y-3 text-xs">
                        <div class="p-3 rounded-xl bg-slate-50 border flex justify-between items-center">
                            <div>
                                <b class="text-slate-800">Quotation Revision Request</b>
                                <p class="text-slate-500">BM requested price adjustment for John Mathews</p>
                            </div>
                            <button class="btn btn-secondary py-1 text-xs" onclick="show('approvals')">Review</button>
                        </div>
                        <div class="p-3 rounded-xl bg-slate-50 border flex justify-between items-center">
                            <div>
                                <b class="text-slate-800">Unauthorized Device Request</b>
                                <p class="text-slate-500">Samsung Galaxy S24 pending approval</p>
                            </div>
                            <button class="btn btn-outline py-1 text-xs" onclick="show('security')">Inspect</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;
}

// 4. SECOND ADMIN DASHBOARD
function dashboardSecondAdmin() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("DELEGATED OPERATIONAL CONTROL", "Second Admin Dashboard", `
                <button class="btn btn-primary text-xs" onclick="show('approvals')">Review Approvals</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Assigned Enquiries", "42", "inbox")}
                ${card("Pending Approvals", "2", "badge-check", "#fffbeb", "#b45309")}
                ${card("Active Job Cards", "18", "clipboard-list")}
                ${card("Audit Reports", "Enabled", "history", "#f0fdf4", "#16a34a")}
            </div>
            <section class="card p-6 mt-6">
                <span class="tag bg-amber-100 text-amber-900 mb-2 font-semibold">Configured Access Only</span>
                <h3 class="font-bold text-slate-900">Second Admin Governance</h3>
                <p class="text-xs text-slate-600 mt-1">
                    Permissions are dynamically assigned by the Main Admin. User modification and security device configuration are restricted.
                </p>
            </section>
        </div>
    `;
}

// 5. ENQUIRY OFFICER DASHBOARD
function dashboardEnquiry() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("ENQUIRY INTAKE & AUTO-ASSIGNMENT", "Enquiry Officer Dashboard", `
                <button class="btn btn-primary text-xs" onclick="show('new-enquiry')"><i data-lucide="plus-circle" class="w-4 h-4"></i>Create New Enquiry</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Today's Enquiries", "16", "inbox")}
                ${card("New Intake", "8", "sparkles")}
                ${card("Auto-Assigned", "11", "user-check", "#f0fdf4", "#16a34a")}
                ${card("SLA Alerts", "1 Alert", "timer", "#fef2f2", "#b91c1c")}
            </div>
            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">Automatic Routing Engine Status</h3>
                <p class="label mt-0.5">Enquiries automatically assign Branch, Design TL, and ASM upon creation.</p>
                <div class="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-2 text-blue-900">
                    <p><b>Auto-Assignment Rules:</b> Location → Branch Mapping → Design TL Routing → ASM Escalation.</p>
                    <p><b>10-Minute SLA Timer:</b> Starts immediately upon enquiry record creation.</p>
                </div>
            </section>
        </div>
    `;
}

// 6. DESIGN TL DASHBOARD
function dashboardTL() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("CHENNAI BRANCH · DESIGN LEADERSHIP", "Design Team Leader Dashboard", `
                <button class="btn btn-primary text-xs" onclick="show('meetings')"><i data-lucide="calendar-plus" class="w-4 h-4"></i>Schedule Meeting</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Assigned Leads", "14", "contact-round", "#f0fdf4", "#16a34a")}
                ${card("Today's Meetings", "3", "users-round", "#f5f3ff", "#7c3aed")}
                ${card("Site Visits", "2", "map-pin", "#fffbeb", "#b45309")}
                ${card("Design SLA", "96%", "palette", "#f0fdf4", "#16a34a")}
            </div>
            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">TL Lead Delivery Workspace</h3>
                <p class="label mt-0.5">Manage requirements, site visits, client consultation notes, and voice recordings.</p>
                <button class="btn btn-secondary mt-4 text-xs" onclick="show('leads')">Open Assigned Leads</button>
            </section>
        </div>
    `;
}

// 7. ASM DASHBOARD
function dashboardASM() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("CHENNAI BRANCH · SLA RESPONSE CONTROL", "Assistant Branch Manager (ASM) Dashboard", `
                <button class="btn btn-primary text-xs" onclick="show('followups')"><i data-lucide="plus" class="w-4 h-4"></i>Add Follow-up</button>
            `)}
            
            <!-- 10-MINUTE SLA WIDGET -->
            <section class="card p-6 border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 text-slate-900 shadow-sm">
                <div class="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <span class="tag bg-blue-100 text-blue-900 border border-blue-300 text-[10px] uppercase font-bold tracking-widest">10-MINUTE SLA MONITOR</span>
                        <h3 class="text-3xl font-bold text-slate-900 mt-2">SLA Compliance: 94%</h3>
                        <p class="text-xs text-slate-700 mt-1 max-w-lg leading-relaxed">
                            Every new enquiry requires initial client response and CRM activity logging within 10 minutes.
                        </p>
                    </div>
                    <div class="grid grid-cols-3 gap-3 text-center">
                        <div class="rounded-xl bg-white p-3 border border-blue-200 shadow-sm">
                            <strong class="block text-xl text-emerald-600 font-bold">47</strong>
                            <span class="text-[10px] text-slate-600 font-bold uppercase">Within SLA</span>
                        </div>
                        <div class="rounded-xl bg-white p-3 border border-blue-200 shadow-sm">
                            <strong class="block text-xl text-amber-600 font-bold">2</strong>
                            <span class="text-[10px] text-slate-600 font-bold uppercase">Approaching</span>
                        </div>
                        <div class="rounded-xl bg-white p-3 border border-blue-200 shadow-sm">
                            <strong class="block text-xl text-red-600 font-bold">1</strong>
                            <span class="text-[10px] text-slate-600 font-bold uppercase">Breached</span>
                        </div>
                    </div>
                </div>
            </section>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                ${card("Due Today", "5", "calendar-check")}
                ${card("Overdue Follow-ups", "2", "triangle-alert", "#fef2f2", "#b91c1c")}
                ${card("Upcoming Follow-ups", "12", "calendar-clock")}
                ${card("Export Permission", "🔒 Restricted", "lock", "#fef2f2", "#b91c1c")}
            </div>
        </div>
    `;
}

// 8. BRANCH MANAGER DASHBOARD (MODULE 2 — BRANCH DASHBOARD)
function dashboardBM() {
    const enqs = getScopedEnquiries();
    const todaysCount = enqs.filter(x => x.created.includes("min") || x.created.includes("hr") || x.created.includes("Just now")).length;
    const newLeads = enqs.filter(x => x.status === "New").length;
    const pendingFollowups = enqs.filter(x => x.status === "Follow-up" || x.status === "Contacted").length;
    const convertedProjects = enqs.filter(x => x.status === "Converted").length;
    const cancelledCount = enqs.filter(x => x.status === "Cancelled").length;
    const holdCount = enqs.filter(x => x.status === "Hold").length;
    const upcomingMeetings = enqs.filter(x => x.status === "Meeting Scheduled" || x.status === "Meeting").length;

    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head(`${branch.toUpperCase()} · PERFORMANCE`, `${branch} Dashboard`, `
                <button class="btn btn-secondary text-xs" onclick="show('leads')"><i data-lucide="contact-round" class="w-4 h-4"></i>Branch Leads</button>
                <button class="btn btn-primary text-xs" onclick="show('quotations')"><i data-lucide="file-text" class="w-4 h-4"></i>Quotation Workflow</button>
            `)}
            <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold mb-6 flex items-center gap-2">
                <i data-lucide="lock" class="w-4 h-4 text-amber-700 flex-shrink-0"></i>
                <span>BRANCH SCOPE ENFORCED: Viewing strictly ${branch} data. Head Office can switch across all branches.</span>
            </div>

            <!-- MODULE 2 KPI GRID -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Today's Enquiries", todaysCount.toString(), "inbox", "#eff6ff", "#2563eb", "Branch Intake")}
                ${card("New Leads", newLeads.toString(), "sparkles", "#f0fdf4", "#16a34a", "Fresh Assignments")}
                ${card("Pending Follow-ups", pendingFollowups.toString(), "calendar-clock", "#fffbeb", "#d97706", "Active Pipeline")}
                ${card("Converted Projects", convertedProjects.toString(), "check-circle-2", "#f0fdf4", "#16a34a", "Job Cards Active")}
                ${card("Cancelled Leads", cancelledCount.toString(), "x-circle", "#fef2f2", "#b91c1c", "Lost Deals")}
                ${card("On Hold", holdCount.toString(), "pause-circle", "#eff6ff", "#3b82f6", "Paused Leads")}
                ${card("Upcoming Meetings", upcomingMeetings.toString(), "users-round", "#f5f3ff", "#7c3aed", "Scheduled Sessions")}
                ${card("Branch Revenue", "₹1.82 Cr", "indian-rupee", "#f0fdf4", "#16a34a", "YTD Collected")}
            </div>

            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">Branch Quotation Revision Controls</h3>
                <p class="text-xs text-slate-600 mt-1">
                    Branch Managers cannot directly change restricted negotiated prices. Submit revision requests for Main Admin approval.
                </p>
                <button class="btn btn-primary mt-4 text-xs" onclick="show('quotations')">Request Quotation Revision</button>
            </section>
        </div>
    `;
}

// 9. MARKETING OFFICER DASHBOARD
function dashboardMO() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("MARKETING CAMPAIGNS & INTAKE", "Marketing Officer Dashboard", "")}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Active Campaigns", "4", "megaphone")}
                ${card("Total Leads", "52", "contact-round")}
                ${card("Top Channel", "Website Direct", "mouse-pointer-2")}
                ${card("Conversion Rate", "18.4%", "trending-up")}
            </div>
        </div>
    `;
}

// 10. ACCOUNTS DASHBOARD
function dashboardAccounts() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("CROSS-BRANCH FINANCIAL CONTROL", "Accounts Dashboard", `
                <button class="btn btn-primary text-xs" onclick="show('payments')"><i data-lucide="credit-card" class="w-4 h-4"></i>Record Payment</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Today's Collections", state.paymentReceived ? "₹21.25 L" : "₹8.65 L", "wallet", "#f0fdf4", "#16a34a")}
                ${card("Total Receivables", "₹1.28 Cr", "badge-indian-rupee")}
                ${card("Pending Balance", state.paymentReceived ? "₹42.50 L" : "₹63.75 L", "circle-dollar-sign", "#fffbeb", "#b45309")}
                ${card("Overdue Balance", "₹12.70 L", "triangle-alert", "#fef2f2", "#b91c1c")}
            </div>
            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">Standard 25% / 25% / 50% Milestone Schedule</h3>
                <div class="grid md:grid-cols-3 gap-4 mt-4 text-xs">
                    <div class="p-4 rounded-xl bg-slate-50 border">
                        <span class="label">1st Milestone (25%)</span>
                        <strong class="block text-slate-900 text-sm mt-1">₹21,25,000</strong>
                        <span class="tag bg-emerald-100 text-emerald-800 mt-2">Received ✓</span>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border">
                        <span class="label">2nd Milestone (25%)</span>
                        <strong class="block text-slate-900 text-sm mt-1">₹21,25,000</strong>
                        <span class="tag ${state.paymentReceived ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"} mt-2">
                            ${state.paymentReceived ? "Received ✓" : "Pending Action"}
                        </span>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border">
                        <span class="label">Final Milestone (50%)</span>
                        <strong class="block text-slate-900 text-sm mt-1">₹42,50,000</strong>
                        <span class="tag bg-amber-100 text-amber-800 mt-2">Pending Handover</span>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// 11. PROJECT TEAM DASHBOARD
function dashboardProject() {
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("PROJECT EXECUTION WORKSPACE", "Project Team Dashboard", `
                <button class="btn btn-primary text-xs" onclick="show('construction')"><i data-lucide="hammer" class="w-4 h-4"></i>Update Stages</button>
            `)}
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold mb-6 flex items-center gap-2">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-700 flex-shrink-0"></i>
                <span>CONFIRMED ACCESS: Project Team workspace unlocked after Job Card confirmation. Sales enquiries are hidden.</span>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Active Projects", "6", "construction")}
                ${card("Assigned Projects", "4", "folder-kanban", "#f0fdf4", "#16a34a")}
                ${card("Stage Approvals", "2", "badge-check", "#fffbeb", "#b45309")}
                ${card("Construction Progress", "72%", "chart-no-axes-combined", "#f0fdf4", "#16a34a")}
            </div>
            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">11-Stage Construction Progress Tracking</h3>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${constructionStages.map((s, i) => `
                        <span class="tag ${i < 5 ? "bg-emerald-100 text-emerald-800 font-semibold" : "bg-slate-100 text-slate-600"} text-xs py-1.5 px-3">
                            ${i < 5 ? "✓ " : ""}${s}
                        </span>
                    `).join("")}
                </div>
            </section>
        </div>
    `;
}

// 12 & 13. SERVICE SCOPED DASHBOARD (REAL ESTATE & INTERIOR)
function dashboardService() {
    const isRE = role === "REAL_ESTATE";
    const serviceName = isRE ? "Real Estate" : "Interior";
    const rows = getScopedEnquiries();

    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head(`${serviceName.toUpperCase()} · SERVICE WORKSPACE`, `${serviceName} Officer Dashboard`, `
                <button class="btn btn-primary text-xs" onclick="show('leads')">Open ${serviceName} Leads</button>
            `)}
            <div class="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-semibold mb-6 flex items-center gap-2">
                <i data-lucide="shield-alert" class="w-4 h-4 text-blue-700 flex-shrink-0"></i>
                <span>SERVICE ISOLATION ENFORCED: Viewing strictly ${serviceName} service leads. Unrelated service lines are hidden.</span>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card(`${serviceName} Enquiries`, rows.length.toString(), "inbox")}
                ${card("Active Leads", rows.length.toString(), "contact-round", "#f0fdf4", "#16a34a")}
                ${card("Scheduled Meetings", "3", "users-round", "#f5f3ff", "#7c3aed")}
                ${card("Service Pipeline", "₹2.1 Cr", "columns-3")}
            </div>
        </div>
    `;
}

// 14 & 15. A-GRADE & D-GRADE MO DASHBOARD
function dashboardPackageMO() {
    const isAGrade = role === "A_GRADE_MO";
    content.innerHTML = `
        <div class="page">
            ${roleHeaderBanner(ROLE_CONFIG[role])}
            ${head("COMMERCIAL PACKAGE MANAGEMENT", `${isAGrade ? "A-Grade MO" : "D-Grade MO"} Dashboard`, `
                <button class="btn btn-primary text-xs" onclick="show('packages')">Open Package Config</button>
            `)}
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                ${card("Quotation Packages", "3 Packages", "box")}
                ${card("Package Permissions", isAGrade ? "Full Editable" : "🔒 Restricted", isAGrade ? "unlock" : "lock", isAGrade ? "#f0fdf4" : "#fef2f2", isAGrade ? "#16a34a" : "#b91c1c")}
                ${card("Approval Status", isAGrade ? "Can Approve MOs" : "Approval Required", "shield-check")}
            </div>
            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">Package Modification Permissions</h3>
                <p class="text-xs text-slate-600 mt-1">
                    ${isAGrade 
                        ? "A-Grade MOs have full rights to modify package sections and approve changes by other MOs." 
                        : "D-Grade MOs cannot remove or uncheck restricted package sections. Controls will show locked icons."}
                </p>
            </section>
        </div>
    `;
}
