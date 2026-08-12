// ==========================================
// 15 ENTERPRISE ROLES CONFIGURATION
// ==========================================
const ROLE_CONFIG = {
    MD: {
        id: "MD",
        label: "Managing Director (MD)",
        shortLabel: "MD",
        branchScope: "GLOBAL",
        department: "Executive Board",
        dashboard: "executive",
        permissions: ["*"],
        reports: ["Executive Overview", "Branch Comparison", "Revenue & P&L", "Conversion Funnel", "Project Status", "SLA Compliance"],
        notifications: ["Executive Branch Summary", "Monthly Revenue Variance", "SLA Escalation Alert", "Construction Delay Notification"]
    },
    HEAD_OFFICE_ADMIN: {
        id: "HEAD_OFFICE_ADMIN",
        label: "Head Office Admin",
        shortLabel: "HO Admin",
        branchScope: "GLOBAL",
        department: "Head Office",
        dashboard: "head_office_admin",
        permissions: ["dashboard.view", "enquiry.view", "enquiry.create", "lead.view", "quotation.view", "payment.view", "jobcard.view", "project.view", "report.view", "audit.view", "users.view", "branches.view", "security.view"],
        reports: ["HO Operational Audit", "SLA Breach Master", "Cross-Branch Activity", "Security Alert Summary"],
        notifications: ["SLA Breach Escalation", "Quotation Approval Pending", "Payment Exception Request", "Security Alert Triggered"]
    },
    MAIN_ADMIN: {
        id: "MAIN_ADMIN",
        label: "Main Admin",
        shortLabel: "Main Admin",
        branchScope: "GLOBAL",
        department: "Administration",
        dashboard: "admin",
        permissions: ["*"],
        reports: ["All System Reports", "SLA & Performance", "User Audit Log", "Quotation & Margin Audit", "Financial Exceptions", "Unauthorized Device Log"],
        notifications: ["Quotation Revision Request", "Payment Exception Request", "Unauthorized Device Attempt", "User Permission Changed", "SLA Red Breach Alert"]
    },
    SECOND_ADMIN: {
        id: "SECOND_ADMIN",
        label: "Second Admin",
        shortLabel: "Second Admin",
        branchScope: "GLOBAL",
        department: "Operations",
        dashboard: "second_admin",
        permissions: ["dashboard.view", "enquiry.view", "lead.view", "quotation.view", "quotation.approve", "payment.view", "payment.approve", "jobcard.view", "project.view", "approvals.view", "reports.view", "audit.view"],
        reports: ["Configured Admin Audit", "Pending Approvals Log", "Branch Activity Report"],
        notifications: ["Assigned Approval Request", "Quotation Revision Request", "Payment Exception Pending"]
    },
    ENQUIRY: {
        id: "ENQUIRY",
        label: "Enquiry Officer",
        shortLabel: "Enquiry Off.",
        branchScope: "ASSIGNED",
        department: "Intake & Assignment",
        dashboard: "enquiry",
        permissions: ["dashboard.view", "enquiry.view", "enquiry.create", "assignment.view", "notification.view"],
        reports: ["Today's Intake Summary", "Auto-Assignment Log"],
        notifications: ["New Web Enquiry", "Assignment Exception Alert", "10-Minute SLA Warning"]
    },
    TL: {
        id: "TL",
        label: "Design Team Leader (TL)",
        shortLabel: "Design TL",
        branchScope: "BRANCH",
        department: "Design & Sales",
        dashboard: "tl",
        permissions: ["dashboard.view", "lead.view", "meeting.create", "meeting.update", "followup.create", "requirements.create", "quotation.view"],
        reports: ["Design Pipeline", "Site Visits & Meetings", "TL Team Follow-up Matrix"],
        notifications: ["New Lead Assigned", "Site Visit Scheduled", "Design Requirement Pending", "10-Min SLA Warning"]
    },
    ASM: {
        id: "ASM",
        label: "Assistant Branch Manager (ASM)",
        shortLabel: "ASM",
        branchScope: "BRANCH",
        department: "Sales & Response",
        dashboard: "asm",
        permissions: ["dashboard.view", "lead.view", "followup.create", "lead.status.update", "meeting.create", "quotation.view", "payment.exception.request"],
        reports: ["Personal Sales Performance", "Follow-up Compliance", "SLA Response Log"],
        notifications: ["New Enquiry Assigned", "10-Min SLA Warning", "10-Min SLA BREACH", "Meeting Reminder", "Client Quotation Response"]
    },
    BM: {
        id: "BM",
        label: "Branch Manager (BM)",
        shortLabel: "Branch Manager",
        branchScope: "BRANCH",
        department: "Branch Management",
        dashboard: "branch",
        permissions: ["dashboard.view", "enquiry.view", "lead.view", "quotation.view", "quotation.revision.request", "payment.view", "jobcard.view", "project.view", "branch.report.view"],
        reports: ["Branch Performance Master", "Branch Conversion Rate", "TL/ASM Performance", "Branch SLA Compliance"],
        notifications: ["SLA Escalation Alert", "Pending Branch Quotation", "Quotation Revision Submitted", "Payment Outstanding Alert"]
    },
    MO: {
        id: "MO",
        label: "Marketing Officer (MO)",
        shortLabel: "MO",
        branchScope: "ASSIGNED",
        department: "Marketing",
        dashboard: "mo",
        permissions: ["dashboard.view", "enquiry.view", "lead.view", "meeting.view", "notification.view"],
        reports: ["Campaign Lead Conversion", "Source Channel Performance"],
        notifications: ["Campaign Enquiry Surge", "Meeting Reminder", "Lead Status Updated"]
    },
    ACCOUNTS: {
        id: "ACCOUNTS",
        label: "Accounts Team",
        shortLabel: "Accounts",
        branchScope: "FINANCIAL",
        department: "Finance & Accounts",
        dashboard: "accounts",
        permissions: ["dashboard.view", "jobcard.view", "payment.view", "payment.create", "payment.update", "invoice.view", "receivable.view", "financial.report.view"],
        reports: ["Collection Summary", "Receivables Aging", "Milestone Payment Schedule", "Tax & GST Invoice Log"],
        notifications: ["Payment Received Notification", "Overdue Payment Alert", "Payment Exception Approved", "Invoice Requested"]
    },
    PROJECT: {
        id: "PROJECT",
        label: "Project Team",
        shortLabel: "Project Team",
        branchScope: "PROJECT",
        department: "Projects & Construction",
        dashboard: "project",
        permissions: ["dashboard.view", "jobcard.view", "project.view", "project.progress.update", "document.view", "approval.view"],
        reports: ["Project Progress Schedule", "11-Stage Construction Log", "Design SLA & Delays", "Handover Milestone Report"],
        notifications: ["Job Card Confirmed", "New Project Handed Over", "Stage Approval Needed", "Construction Delay Alert"]
    },
    REAL_ESTATE: {
        id: "REAL_ESTATE",
        label: "Real Estate Officer",
        shortLabel: "RE Officer",
        branchScope: "SERVICE",
        department: "Real Estate",
        dashboard: "realestate",
        permissions: ["dashboard.view", "enquiry.view", "lead.view", "meeting.create", "followup.create", "pipeline.view"],
        reports: ["Real Estate Pipeline Report", "Plot & Land Deals Tracker"],
        notifications: ["New Real Estate Enquiry", "Property Site Visit Reminder", "Follow-up Due"]
    },
    INTERIOR: {
        id: "INTERIOR",
        label: "Interior Officer",
        shortLabel: "Interior Officer",
        branchScope: "SERVICE",
        department: "Interior Design",
        dashboard: "interior",
        permissions: ["dashboard.view", "enquiry.view", "lead.view", "meeting.create", "followup.create", "pipeline.view"],
        reports: ["Interior Design Pipeline", "Fitout Fitment Report"],
        notifications: ["New Interior Enquiry", "Design Consultation Reminder", "Follow-up Due"]
    },
    A_GRADE_MO: {
        id: "A_GRADE_MO",
        label: "A-Grade MO",
        shortLabel: "A-Grade MO",
        branchScope: "ASSIGNED",
        department: "Marketing & Package Ops",
        dashboard: "a_grade_mo",
        permissions: ["dashboard.view", "enquiry.view", "lead.view", "quotation.view", "package.modify", "package.approve_mo"],
        reports: ["Package Margin Analysis", "Configured Package Report"],
        notifications: ["MO Package Change Request", "Package Section Unchecked Alert"]
    },
    D_GRADE_MO: {
        id: "D_GRADE_MO",
        label: "D-Grade MO",
        shortLabel: "D-Grade MO",
        branchScope: "ASSIGNED",
        department: "Marketing",
        dashboard: "d_grade_mo",
        permissions: ["dashboard.view", "enquiry.view", "lead.view", "quotation.view"],
        reports: ["Basic Marketing Report"],
        notifications: ["Assigned Lead Update", "Quotation Prepared Alert"]
    }
};

// Navigation Master Registry
const NAVIGATION = [
    { id: "dashboard", label: "Dashboard", icon: "layout-dashboard", group: "WORKSPACE" },
    { id: "enquiries", label: "Enquiries", icon: "inbox", group: "WORKSPACE", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "ENQUIRY", "BM", "MO", "REAL_ESTATE", "INTERIOR", "A_GRADE_MO", "D_GRADE_MO"] },
    { id: "new-enquiry", label: "New Enquiry", icon: "plus-circle", group: "WORKSPACE", roles: ["HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "ENQUIRY"] },
    { id: "leads", label: "Leads", icon: "contact-round", group: "WORKSPACE", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "TL", "ASM", "BM", "MO", "REAL_ESTATE", "INTERIOR", "A_GRADE_MO", "D_GRADE_MO"] },
    { id: "meetings", label: "Meetings", icon: "users-round", group: "WORKSPACE", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "TL", "ASM", "BM", "MO", "REAL_ESTATE", "INTERIOR"] },
    { id: "followups", label: "Follow-ups", icon: "calendar-check-2", group: "WORKSPACE", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "TL", "ASM", "BM", "REAL_ESTATE", "INTERIOR"] },
    { id: "pipeline", label: "Sales Pipeline", icon: "columns-3", group: "WORKSPACE", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "ASM", "BM", "REAL_ESTATE", "INTERIOR"] },
    { id: "whatsapp", label: "WhatsApp Hub 💬", icon: "message-square", group: "COMMERCIAL", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "ENQUIRY", "TL", "ASM", "BM", "ACCOUNTS", "REAL_ESTATE", "INTERIOR", "A_GRADE_MO", "D_GRADE_MO"] },
    { id: "quotations", label: "Quotations", icon: "file-text", group: "COMMERCIAL", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "TL", "ASM", "BM", "A_GRADE_MO", "D_GRADE_MO"] },
    { id: "packages", label: "Package Config", icon: "box", group: "COMMERCIAL", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "A_GRADE_MO", "D_GRADE_MO"] },
    { id: "jobcards", label: "Job Cards", icon: "clipboard-list", group: "OPERATIONS", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "BM", "ACCOUNTS", "PROJECT"] },
    { id: "payments", label: "Payments", icon: "credit-card", group: "FINANCE", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "BM", "ACCOUNTS"] },
    { id: "invoices", label: "Invoices", icon: "receipt", group: "FINANCE", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "ACCOUNTS"] },
    { id: "projects", label: "Projects & Design", icon: "construction", group: "OPERATIONS", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "BM", "PROJECT"] },
    { id: "construction", label: "Construction Stages", icon: "hammer", group: "OPERATIONS", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "BM", "PROJECT"] },
    { id: "approvals", label: "Approval Queue", icon: "badge-check", group: "CONTROL", roles: ["HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN", "PROJECT"] },
    { id: "notifications", label: "Notifications", icon: "bell", group: "CONTROL" },
    { id: "reports", label: "Reports & Analytics", icon: "file-bar-chart", group: "CONTROL" },
    { id: "audit", label: "Audit Trail", icon: "history", group: "CONTROL", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN"] },
    { id: "users", label: "User Management", icon: "users", group: "ADMINISTRATION", roles: ["HEAD_OFFICE_ADMIN", "MAIN_ADMIN"] },
    { id: "branches", label: "Branch Management", icon: "building", group: "ADMINISTRATION", roles: ["HEAD_OFFICE_ADMIN", "MAIN_ADMIN"] },
    { id: "roles", label: "Roles & Permissions", icon: "shield-check", group: "ADMINISTRATION", roles: ["HEAD_OFFICE_ADMIN", "MAIN_ADMIN"] },
    { id: "security", label: "Security & Devices", icon: "scan-face", group: "ADMINISTRATION", roles: ["HEAD_OFFICE_ADMIN", "MAIN_ADMIN", "SECOND_ADMIN"] },
    { id: "settings", label: "System Settings", icon: "settings", group: "ADMINISTRATION", roles: ["MD", "HEAD_OFFICE_ADMIN", "MAIN_ADMIN"] },
    { id: "demo-center", label: "Role Demo Center", icon: "play-circle", group: "CONTROL" }
];

const BRANCHES = ["All Branches", "Chennai Branch", "Coimbatore Branch", "Bengaluru Branch", "Hyderabad Branch"];
const SERVICES = ["Design & Build", "Real Estate", "Interior"];

const constructionStages = [
    "Design Approval", "Material Finalization", "Site Preparation", "Foundation",
    "Structure", "Masonry", "Electrical", "Plumbing", "Interiors", "Final Inspection", "Handover"
];
