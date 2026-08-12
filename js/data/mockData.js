// ==========================================
// MOCK DATASET ENGINE (50+ records)
// ==========================================
const initialEnquiries = [
    { id: "ENQ-1001", client: "John Mathews", phone: "+91 98401 12345", email: "john@mathews.com", service: "Interior", project: "Luxury Villa Design", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Website Direct", priority: "High", status: "New", sla: "GREEN", created: "10 mins ago", value: 8500000 },
    { id: "ENQ-1002", client: "Nandhini Estates", phone: "+91 94440 88776", email: "contact@nandhini.com", service: "Real Estate", project: "Commercial Plot Dev", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Referral", priority: "High", status: "Contacted", sla: "GREEN", created: "25 mins ago", value: 14500000 },
    { id: "ENQ-1003", client: "V. Prakash", phone: "+91 98940 55112", email: "prakash@vcorp.in", service: "Design & Build", project: "3-Storey Residential", branch: "Coimbatore Branch", tl: "Karthik Raja (TL)", asm: "Manoj Kumar (ASM)", source: "Google Ads", priority: "Medium", status: "Quotation", sla: "AMBER", created: "1 hr ago", value: 9200000 },
    { id: "ENQ-1004", client: "Apex Developers", phone: "+91 98800 33441", email: "sales@apexdev.com", service: "Real Estate", project: "Gated Community Land", branch: "Bengaluru Branch", tl: "Siddharth V (TL)", asm: "Rahul Roy (ASM)", source: "Exhibition", priority: "High", status: "Meeting", sla: "GREEN", created: "2 hrs ago", value: 24000000 },
    { id: "ENQ-1005", client: "Dr. K. Swaminathan", phone: "+91 97900 11223", email: "dr.swami@apollo.org", service: "Interior", project: "Penthouse Fitout", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Website", priority: "High", status: "Negotiation", sla: "GREEN", created: "3 hrs ago", value: 6500000 },
    { id: "ENQ-1006", client: "Greenfield Infra", phone: "+91 94433 22110", email: "info@greenfield.in", service: "Design & Build", project: "Warehouse Facility", branch: "Coimbatore Branch", tl: "Karthik Raja (TL)", asm: "Manoj Kumar (ASM)", source: "Direct Call", priority: "Medium", status: "Converted", sla: "GREEN", created: "4 hrs ago", value: 18500000 },
    { id: "ENQ-1007", client: "Ananya Ramesh", phone: "+91 98410 99887", email: "ananya.r@gmail.com", service: "Interior", project: "Duplex Interior", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Instagram", priority: "High", status: "New", sla: "RED", created: "12 mins ago", value: 4800000 },
    { id: "ENQ-1008", client: "Sri Balaji Traders", phone: "+91 98422 77665", email: "balaji@traders.co", service: "Real Estate", project: "Industrial Land", branch: "Hyderabad Branch", tl: "Venkatesh P (TL)", asm: "Suresh Babu (ASM)", source: "Referral", priority: "Medium", status: "Follow-up", sla: "GREEN", created: "5 hrs ago", value: 16000000 }
];

const initialJobCards = [
    { id: "JC-2026-001", enquiryId: "ENQ-1006", client: "Greenfield Infra", project: "Warehouse Facility", branch: "Coimbatore Branch", value: 18500000, status: "Active", progress: 72, stage: "Structure", startDate: "15 Jan 2026", promisedDate: "30 Oct 2026" },
    { id: "JC-2026-002", enquiryId: "ENQ-1001", client: "John Mathews", project: "Luxury Villa Design", branch: "Chennai Branch", value: 8500000, status: "Confirmed", progress: 45, stage: "Foundation", startDate: "01 Feb 2026", promisedDate: "15 Dec 2026" },
    { id: "JC-2026-003", enquiryId: "ENQ-1005", client: "Dr. K. Swaminathan", project: "Penthouse Fitout", branch: "Chennai Branch", value: 6500000, status: "Design Stage", progress: 20, stage: "Design Approval", startDate: "10 Feb 2026", promisedDate: "15 Jul 2026" }
];

// Global State Machine
let state = {
    enquiries: [...initialEnquiries],
    jobCards: [...initialJobCards],
    revisionRequested: false,
    revisionApproved: false,
    paymentReceived: false,
    paymentExceptionRequested: false,
    paymentExceptionApproved: false,
    deviceApproved: false,
    sessionExpiredModalShown: false,
    selectedPackage: "Package 2 — Premium Villa Grade"
};

// ==========================================
// SCOPED DATA RETRIEVAL ENGINE
// ==========================================
function getScopedEnquiries() {
    let list = [...state.enquiries];
    const cfg = ROLE_CONFIG[role];

    // Branch Scoping
    if (cfg.branchScope === "BRANCH" || branch !== "All Branches") {
        const targetBranch = (cfg.branchScope === "BRANCH") ? "Chennai Branch" : branch;
        list = list.filter(x => x.branch === targetBranch);
    }

    // Service Scoping
    if (cfg.department === "Real Estate" || role === "REAL_ESTATE") {
        list = list.filter(x => x.service === "Real Estate");
    } else if (cfg.department === "Interior" || role === "INTERIOR") {
        list = list.filter(x => x.service === "Interior");
    }

    // Assignment Scoping
    if (role === "TL" || role === "ASM") {
        list = list.filter(x => x.branch === "Chennai Branch");
    }

    return list;
}

function getScopedJobCards() {
    let list = [...state.jobCards];
    const cfg = ROLE_CONFIG[role];
    if (cfg.branchScope === "BRANCH" || branch !== "All Branches") {
        const targetBranch = (cfg.branchScope === "BRANCH") ? "Chennai Branch" : branch;
        list = list.filter(x => x.branch === targetBranch);
    }
    return list;
}
