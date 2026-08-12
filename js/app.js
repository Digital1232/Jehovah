// ==========================================
// APPLICATION INITIALIZATION & CORE CONTROLLER
// ==========================================
const $ = s => document.querySelector(s);
const content = $("#content");

let role = "MAIN_ADMIN";
let branch = "All Branches";
let page = "dashboard";

// Mapping of routes to view renderers
const pages = {
    dashboard: function() {
        const dashType = ROLE_CONFIG[role].dashboard;
        const viewMap = {
            executive: dashboardMD,
            head_office_admin: dashboardHOAdmin,
            admin: dashboardMainAdmin,
            second_admin: dashboardSecondAdmin,
            enquiry: dashboardEnquiry,
            tl: dashboardTL,
            asm: dashboardASM,
            branch: dashboardBM,
            mo: dashboardMO,
            accounts: dashboardAccounts,
            project: dashboardProject,
            realestate: dashboardService,
            interior: dashboardService,
            a_grade_mo: dashboardPackageMO,
            d_grade_mo: dashboardPackageMO
        };
        (viewMap[dashType] || dashboardMainAdmin)();
    },
    enquiries: enquiriesView,
    "new-enquiry": enquiryFormView,
    leads: leadsView,
    meetings: meetingsView,
    followups: followupsView,
    pipeline: pipelineView,
    quotations: quotationsView,
    packages: packagesView,
    jobcards: jobcardsView,
    payments: paymentsView,
    invoices: invoicesView,
    projects: projectsView,
    construction: constructionView,
    approvals: approvalsView,
    notifications: notificationsView,
    reports: reportsView,
    audit: auditView,
    users: usersView,
    branches: branchesView,
    roles: rolesMatrixView,
    security: securityView,
    settings: settingsView,
    "demo-center": demoCenterView
};

function getVisibleNavigation() {
    return NAVIGATION.filter(n => {
        if (n.roles && !n.roles.includes(role)) return false;
        if (!canView(n.id)) return false;
        return true;
    });
}

function renderNav() {
    const visible = getVisibleNavigation();
    const groups = { WORKSPACE: [], COMMERCIAL: [], OPERATIONS: [], FINANCE: [], CONTROL: [], ADMINISTRATION: [] };
    
    visible.forEach(item => {
        const g = item.group || "WORKSPACE";
        if (groups[g]) groups[g].push(item);
    });

    $("#mainNav").innerHTML = Object.entries(groups).map(([g, items]) => {
        if (!items.length) return "";
        return `
            <p class="nav-section">${g}</p>
            ${items.map(i => `
                <button class="${page === i.id ? "active" : ""}" data-route="${i.id}">
                    <i data-lucide="${i.icon}" class="w-4 h-4 flex-shrink-0"></i>
                    <span>${i.label}</span>
                </button>
            `).join("")}
        `;
    }).join("");

    $("#mainNav").querySelectorAll("button").forEach(btn => {
        btn.onclick = () => show(btn.dataset.route);
    });

    const cfg = ROLE_CONFIG[role];
    $("#roleSidebar").textContent = cfg.shortLabel;
    $("#sidebarScope").textContent = (cfg.branchScope === "BRANCH") ? "Chennai Branch Scope" : `${cfg.department} Scope`;

    renderMobileNav();
    icons();
}

function renderMobileNav() {
    const priority = getVisibleNavigation().slice(0, 4);
    $("#mobileNav").innerHTML = priority.map(n => `
        <button class="${page === n.id ? "active" : ""}" data-route="${n.id}">
            <i data-lucide="${n.icon}" class="w-4 h-4"></i>
            <span>${n.label}</span>
        </button>
    `).join("");
    $("#mobileNav").querySelectorAll("button").forEach(btn => {
        btn.onclick = () => show(btn.dataset.route);
    });
}

function renderControls() {
    $("#roleSelect").innerHTML = Object.entries(ROLE_CONFIG).map(([id, c]) => `
        <option value="${id}" ${role === id ? "selected" : ""}>${c.shortLabel}</option>
    `).join("");

    const cfg = ROLE_CONFIG[role];
    const isGlobalBranch = cfg.branchScope === "GLOBAL" || cfg.branchScope === "FINANCIAL";
    $("#branchSelect").classList.toggle("hidden", !isGlobalBranch);
    
    if (isGlobalBranch) {
        $("#branchSelect").innerHTML = BRANCHES.map(x => `
            <option ${branch === x ? "selected" : ""}>${x}</option>
        `).join("");
    }
}

function show(route) {
    const visibleRoutes = getVisibleNavigation().map(x => x.id);
    if (!visibleRoutes.includes(route) && route !== "dashboard") {
        toast(`Restricted View — ${route} is locked for ${ROLE_CONFIG[role].shortLabel}`, "lock");
        page = "dashboard";
    } else {
        page = route;
    }

    $("#sidebar").classList.remove("open");
    renderNav();

    const navObj = NAVIGATION.find(n => n.id === page);
    if (navObj) {
        $("#workspaceCategory").textContent = navObj.group || "WORKSPACE";
        $("#workspaceTitle").textContent = navObj.label;
    }

    if (!visibleRoutes.includes(page) && page !== "dashboard") {
        content.innerHTML = accessDenied(`Access View: ${page}`);
    } else {
        (pages[page] || pages.dashboard)();
    }
    icons();
}

function switchRole(nextRole) {
    role = nextRole;
    const cfg = ROLE_CONFIG[role];
    if (cfg.branchScope === "BRANCH") branch = "Chennai Branch";
    else branch = "All Branches";

    renderControls();
    show("dashboard");
    toast(`Switched View As: ${cfg.label}`, "shield-check");
}

// Global Search Handler
$("#globalSearchInput").oninput = e => {
    const query = e.target.value.trim().toLowerCase();
    const popup = $("#searchResultsPopup");

    if (!query) {
        popup.classList.add("hidden");
        return;
    }

    const scopedEnqs = getScopedEnquiries().filter(x => 
        x.client.toLowerCase().includes(query) || 
        x.id.toLowerCase().includes(query) ||
        x.project.toLowerCase().includes(query)
    );

    if (scopedEnqs.length) {
        popup.innerHTML = scopedEnqs.map(x => `
            <div class="p-3 border-b hover:bg-slate-50 cursor-pointer flex justify-between items-center text-xs" onclick="$('#globalSearchInput').value='';$('#searchResultsPopup').classList.add('hidden');show('leads');">
                <div>
                    <b class="text-slate-800 block">${x.client}</b>
                    <span class="text-slate-500 text-[11px]">${x.id} · ${x.project} (${x.service})</span>
                </div>
                <span class="tag bg-blue-50 text-blue-700">${x.status}</span>
            </div>
        `).join("");
    } else {
        popup.innerHTML = `<div class="p-4 text-xs text-slate-500 text-center">No authorized records match "${query}"</div>`;
    }
    popup.classList.remove("hidden");
};

document.addEventListener("click", e => {
    if (!e.target.closest("#globalSearchInput") && !e.target.closest("#searchResultsPopup")) {
        $("#searchResultsPopup").classList.add("hidden");
    }
});

// Event Binding
$("#roleSelect").onchange = e => switchRole(e.target.value);
$("#branchSelect").onchange = e => {
    branch = e.target.value;
    toast(`Branch Scope set to ${branch}`, "building");
    show("dashboard");
};
$("#notificationBtn").onclick = () => show("notifications");
$("#demoBtn").onclick = () => startRoleDemo();
$("#menuBtn").onclick = () => $("#sidebar").classList.toggle("open");

document.addEventListener("keydown", e => {
    if (demoActive && e.key === "Escape") exitDemo();
    if (demoActive && e.key === "ArrowRight") nextDemoStep();
});

// Initialize Application
renderControls();
renderNav();
show("dashboard");
icons();
