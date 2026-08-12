// ==========================================
// MOCK DATASET ENGINE (ENRICHED ENTERPRISE DATASET)
// ==========================================
const initialEnquiries = [
    { 
        id: "ENQ-1001", client: "John Mathews", phone: "+91 98401 12345", email: "john@mathews.com", service: "Interior", project: "Luxury Villa Design", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Website Direct", priority: "High", status: "Converted", sla: "GREEN", created: "10 mins ago", value: 8500000,
        area: "3,500 sq.ft", rate: "₹2,428 / sq.ft", category: "Residential", location: "ECR Chennai",
        lastFollowup: "12 Aug 2026", nextFollowup: "13 Aug 2026", followupPriority: "High",
        voiceRecordings: [
            { id: "REC-01", title: "Initial Client Requirement Call", duration: "03:45", date: "10 Aug 2026", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
            { id: "REC-02", title: "Design Discussion & Italian Marble Review", duration: "05:12", date: "11 Aug 2026", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
        ],
        discussions: [
            { date: "11 Aug 2026", notes: "Reviewed 3D layout options. Client preferred Italian Marble flooring in living room.", packageExplained: true, budgetDiscussed: true, nextStep: "Prepare final quotation for Job Card conversion." }
        ],
        timeline: [
            { time: "10 Aug 10:00 AM", title: "Enquiry Received", desc: "Logged via Website Direct form" },
            { time: "10 Aug 10:05 AM", title: "Assigned to Branch", desc: "Auto-routed to Chennai Branch" },
            { time: "10 Aug 10:15 AM", title: "TL Contacted", desc: "Rajesh Kumar (TL) conducted intro call" },
            { time: "11 Aug 02:00 PM", title: "Meeting Scheduled", desc: "Design Consultation at Chennai Office" },
            { time: "11 Aug 04:30 PM", title: "Meeting Completed", desc: "Logged discussion notes & voice note" },
            { time: "12 Aug 11:00 AM", title: "Quotation Shared", desc: "Package 2 — Premium Villa Grade shared" },
            { time: "12 Aug 02:00 PM", title: "Converted to Job Card", desc: "Converted to JC-2026-002" }
        ]
    },
    { 
        id: "ENQ-1002", client: "Nandhini Estates", phone: "+91 94440 88776", email: "contact@nandhini.com", service: "Real Estate", project: "Commercial Plot Dev", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Referral", priority: "High", status: "Contacted", sla: "GREEN", created: "25 mins ago", value: 14500000,
        area: "12,000 sq.ft", rate: "₹1,208 / sq.ft", category: "Commercial", location: "OMR Chennai",
        lastFollowup: "11 Aug 2026", nextFollowup: "13 Aug 2026", followupPriority: "High",
        voiceRecordings: [
            { id: "REC-03", title: "Site Visit Discussion Note", duration: "02:15", date: "11 Aug 2026", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
        ],
        discussions: [
            { date: "11 Aug 2026", notes: "Discussed land zoning and approval status.", packageExplained: false, budgetDiscussed: true, nextStep: "Schedule site inspection meeting." }
        ],
        timeline: [
            { time: "11 Aug 09:30 AM", title: "Enquiry Received", desc: "Referral intake logged" },
            { time: "11 Aug 09:35 AM", title: "Assigned to Branch", desc: "Assigned to Chennai Branch" },
            { time: "11 Aug 11:00 AM", title: "TL Contacted", desc: "Follow-up logged by Senthil Nathan" }
        ]
    },
    { 
        id: "ENQ-1003", client: "V. Prakash", phone: "+91 98940 55112", email: "prakash@vcorp.in", service: "Design & Build", project: "3-Storey Residential", branch: "Coimbatore Branch", tl: "Karthik Raja (TL)", asm: "Manoj Kumar (ASM)", source: "Google Ads", priority: "Medium", status: "Quotation", sla: "AMBER", created: "1 hr ago", value: 9200000,
        area: "4,200 sq.ft", rate: "₹2,190 / sq.ft", category: "Residential", location: "RS Puram Coimbatore",
        lastFollowup: "10 Aug 2026", nextFollowup: "13 Aug 2026", followupPriority: "Medium",
        voiceRecordings: [],
        discussions: [
            { date: "10 Aug 2026", notes: "Quotation shared. Client reviewing budget options.", packageExplained: true, budgetDiscussed: true, nextStep: "Followup on quotation approval." }
        ],
        timeline: [
            { time: "09 Aug 03:00 PM", title: "Enquiry Received", desc: "Google Ads campaign lead" },
            { time: "10 Aug 10:00 AM", title: "Quotation Shared", desc: "Estimated budget ₹92 L shared" }
        ]
    },
    { 
        id: "ENQ-1004", client: "Apex Developers", phone: "+91 98800 33441", email: "sales@apexdev.com", service: "Real Estate", project: "Gated Community Land", branch: "Bengaluru Branch", tl: "Siddharth V (TL)", asm: "Rahul Roy (ASM)", source: "Exhibition", priority: "High", status: "Meeting Scheduled", sla: "GREEN", created: "2 hrs ago", value: 24000000,
        area: "25,000 sq.ft", rate: "₹960 / sq.ft", category: "Commercial", location: "Whitefield Bengaluru",
        lastFollowup: "12 Aug 2026", nextFollowup: "13 Aug 2026", followupPriority: "High",
        voiceRecordings: [],
        discussions: [],
        timeline: [
            { time: "11 Aug 04:00 PM", title: "Enquiry Received", desc: "Exhibition stall intake" },
            { time: "12 Aug 10:00 AM", title: "Meeting Scheduled", desc: "Online Zoom conference set" }
        ]
    },
    { 
        id: "ENQ-1005", client: "Dr. K. Swaminathan", phone: "+91 97900 11223", email: "dr.swami@apollo.org", service: "Interior", project: "Penthouse Fitout", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Website", priority: "High", status: "Converted", sla: "GREEN", created: "3 hrs ago", value: 6500000,
        area: "2,800 sq.ft", rate: "₹2,321 / sq.ft", category: "Residential", location: "Nungambakkam Chennai",
        lastFollowup: "11 Aug 2026", nextFollowup: "13 Aug 2026", followupPriority: "High",
        voiceRecordings: [
            { id: "REC-04", title: "Penthouse Design Requirement Voice Note", duration: "04:00", date: "10 Aug 2026", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
        ],
        discussions: [
            { date: "11 Aug 2026", notes: "Final fitout scope confirmed. Advance payment received.", packageExplained: true, budgetDiscussed: true, nextStep: "Handover to Project Execution Team." }
        ],
        timeline: [
            { time: "08 Aug 11:00 AM", title: "Enquiry Received", desc: "Website inquiry" },
            { time: "10 Aug 03:00 PM", title: "Converted", desc: "Job Card JC-2026-003 generated" }
        ]
    },
    { 
        id: "ENQ-1006", client: "Greenfield Infra", phone: "+91 94433 22110", email: "info@greenfield.in", service: "Design & Build", project: "Warehouse Facility", branch: "Coimbatore Branch", tl: "Karthik Raja (TL)", asm: "Manoj Kumar (ASM)", source: "Direct Call", priority: "Medium", status: "Converted", sla: "GREEN", created: "4 hrs ago", value: 18500000,
        area: "15,000 sq.ft", rate: "₹1,233 / sq.ft", category: "Commercial", location: "Peelamedu Coimbatore",
        lastFollowup: "09 Aug 2026", nextFollowup: "15 Aug 2026", followupPriority: "Medium",
        voiceRecordings: [],
        discussions: [],
        timeline: [
            { time: "05 Aug 10:00 AM", title: "Enquiry Received", desc: "Direct Call intake" },
            { time: "15 Jan 2026", title: "Job Card Created", desc: "JC-2026-001 active" }
        ]
    },
    { 
        id: "ENQ-1007", client: "Ananya Ramesh", phone: "+91 98410 99887", email: "ananya.r@gmail.com", service: "Interior", project: "Duplex Interior", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Instagram", priority: "High", status: "New", sla: "RED", created: "12 mins ago", value: 4800000,
        area: "2,200 sq.ft", rate: "₹2,181 / sq.ft", category: "Residential", location: "Velachery Chennai",
        lastFollowup: "12 Aug 2026", nextFollowup: "13 Aug 2026", followupPriority: "High",
        voiceRecordings: [],
        discussions: [],
        timeline: [
            { time: "12 Aug 10:30 AM", title: "Enquiry Received", desc: "Instagram lead campaign intake" }
        ]
    },
    { 
        id: "ENQ-1008", client: "Sri Balaji Traders", phone: "+91 98422 77665", email: "balaji@traders.co", service: "Real Estate", project: "Industrial Land", branch: "Hyderabad Branch", tl: "Venkatesh P (TL)", asm: "Suresh Babu (ASM)", source: "Referral", priority: "Medium", status: "Follow-up", sla: "GREEN", created: "5 hrs ago", value: 16000000,
        area: "18,000 sq.ft", rate: "₹888 / sq.ft", category: "Commercial", location: "Gachibowli Hyderabad",
        lastFollowup: "10 Aug 2026", nextFollowup: "14 Aug 2026", followupPriority: "Medium",
        voiceRecordings: [],
        discussions: [],
        timeline: [
            { time: "10 Aug 02:00 PM", title: "Enquiry Received", desc: "Referral contact" }
        ]
    },
    { 
        id: "ENQ-1009", client: "Kavitha Rajan", phone: "+91 98840 11992", email: "kavitha@gmail.com", service: "Interior", project: "3BHK Modular Kitchen & Fitout", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "WhatsApp Direct", priority: "High", status: "Hold", sla: "GREEN", created: "1 day ago", value: 3200000,
        area: "1,600 sq.ft", rate: "₹2,000 / sq.ft", category: "Residential", location: "Anna Nagar Chennai",
        lastFollowup: "11 Aug 2026", nextFollowup: "20 Aug 2026", followupPriority: "Low",
        cancellationReason: "Client requested delayed execution start due to travel.",
        voiceRecordings: [],
        discussions: [],
        timeline: [
            { time: "11 Aug 11:00 AM", title: "Enquiry Received", desc: "WhatsApp Direct chat" },
            { time: "11 Aug 04:00 PM", title: "Status Changed to Hold", desc: "Client requested pause till Aug 20" }
        ]
    },
    { 
        id: "ENQ-1010", client: "Modern Tech Park", phone: "+91 94450 77112", email: "facilities@moderntech.com", service: "Design & Build", project: "IT Park Office Fitout", branch: "Chennai Branch", tl: "Rajesh Kumar (TL)", asm: "Senthil Nathan (ASM)", source: "Google", priority: "High", status: "Cancelled", sla: "GREEN", created: "2 days ago", value: 12500000,
        area: "8,000 sq.ft", rate: "₹1,562 / sq.ft", category: "Commercial", location: "TIDEL Park Chennai",
        lastFollowup: "10 Aug 2026", nextFollowup: "-", followupPriority: "Low",
        cancellationReason: "Competitor price mismatch (Selected local vendor).",
        voiceRecordings: [],
        discussions: [],
        timeline: [
            { time: "10 Aug 09:00 AM", title: "Enquiry Received", desc: "Google Search lead" },
            { time: "10 Aug 05:00 PM", title: "Status Changed to Cancelled", desc: "Reason: Competitor pricing" }
        ]
    }
];

const initialJobCards = [
    { 
        id: "JC-2026-001", enquiryId: "ENQ-1006", client: "Greenfield Infra", project: "Warehouse Facility", branch: "Coimbatore Branch", value: 18500000, status: "Active", progress: 72, stage: "Structure", startDate: "15 Jan 2026", promisedDate: "30 Oct 2026",
        package: "Package 3 — Commercial Structure Grade", area: "15,000 sq.ft", rate: "₹1,233 / sq.ft", totalCost: 18500000, advancePaid: 4625000, secondPayment: 4625000, thirdPayment: 0, finalPayment: 0, balance: 9250000, deliveryDate: "30 Oct 2026", remarks: "Structure stage 72% complete."
    },
    { 
        id: "JC-2026-002", enquiryId: "ENQ-1001", client: "John Mathews", project: "Luxury Villa Design", branch: "Chennai Branch", value: 8500000, status: "Confirmed", progress: 45, stage: "Foundation", startDate: "01 Feb 2026", promisedDate: "15 Dec 2026",
        package: "Package 2 — Premium Villa Grade", area: "3,500 sq.ft", rate: "₹2,428 / sq.ft", totalCost: 8500000, advancePaid: 2125000, secondPayment: 2125000, thirdPayment: 0, finalPayment: 0, balance: 4250000, deliveryDate: "15 Dec 2026", remarks: "Foundation concrete curing in progress."
    },
    { 
        id: "JC-2026-003", enquiryId: "ENQ-1005", client: "Dr. K. Swaminathan", project: "Penthouse Fitout", branch: "Chennai Branch", value: 6500000, status: "Design Stage", progress: 20, stage: "Design Approval", startDate: "10 Feb 2026", promisedDate: "15 Jul 2026",
        package: "Package 1 — Luxury Interior Grade", area: "2,800 sq.ft", rate: "₹2,321 / sq.ft", totalCost: 6500000, advancePaid: 1625000, secondPayment: 0, thirdPayment: 0, finalPayment: 0, balance: 4875000, deliveryDate: "15 Jul 2026", remarks: "Final 3D interior renders under review."
    }
];

// System Notifications Log (Module 9)
const initialNotifications = [
    { id: "NT-101", title: "New Enquiry Assigned", detail: "Lead ENQ-1007 (Ananya Ramesh) auto-assigned to Chennai Branch.", time: "10 mins ago", type: "enquiry", unread: true },
    { id: "NT-102", title: "Follow-up Reminder", detail: "Follow-up with Nandhini Estates (ENQ-1002) is due today/tomorrow.", time: "1 hr ago", type: "followup", unread: true },
    { id: "NT-103", title: "Job Card Created", detail: "Client John Mathews converted to Job Card JC-2026-002.", time: "2 hrs ago", type: "jobcard", unread: true },
    { id: "NT-104", title: "Payment Milestone Due", detail: "Second Milestone payment (25%) pending for JC-2026-002.", time: "3 hrs ago", type: "payment", unread: false },
    { id: "NT-105", title: "Meeting Reminder", detail: "Site Visit scheduled with Dr. K. Swaminathan tomorrow at 11:00 AM.", time: "4 hrs ago", type: "meeting", unread: false }
];

// Global State Machine
let state = {
    enquiries: [...initialEnquiries],
    jobCards: [...initialJobCards],
    notifications: [...initialNotifications],
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

    // Project Team restriction (Granted strictly after Job Card confirmation)
    if (role === "PROJECT") {
        return [];
    }

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

    // Assignment Scoping for TL & ASM
    if (role === "TL" || role === "ASM") {
        list = list.filter(x => x.branch === "Chennai Branch");
    }

    return list;
}

function getScopedJobCards() {
    let list = [...state.jobCards];
    const cfg = ROLE_CONFIG[role];
    if (cfg.branchScope === "BRANCH" || (branch !== "All Branches" && role !== "ACCOUNTS" && role !== "MD" && role !== "HEAD_OFFICE_ADMIN" && role !== "MAIN_ADMIN")) {
        const targetBranch = (cfg.branchScope === "BRANCH") ? "Chennai Branch" : branch;
        list = list.filter(x => x.branch === targetBranch);
    }
    return list;
}

// Convert Enquiry to Job Card (Module 5)
function convertEnquiryToJobCard(enqId) {
    const enq = state.enquiries.find(x => x.id === enqId);
    if (!enq) return null;

    const jcNum = `JC-2026-${String(state.jobCards.length + 1).padStart(3, '0')}`;
    const totalCost = enq.value || 8500000;
    const advancePaid = totalCost * 0.25;
    const secondPayment = totalCost * 0.25;
    const balance = totalCost - advancePaid;

    const newJobCard = {
        id: jcNum,
        enquiryId: enq.id,
        client: enq.client,
        project: enq.project,
        branch: enq.branch,
        value: totalCost,
        status: "Confirmed",
        progress: 10,
        stage: "Design Approval",
        startDate: "Today",
        promisedDate: "15 Dec 2026",
        package: "Package 2 — Premium Villa Grade",
        area: enq.area || "3,500 sq.ft",
        rate: enq.rate || "₹2,428 / sq.ft",
        totalCost: totalCost,
        advancePaid: advancePaid,
        secondPayment: 0,
        thirdPayment: 0,
        finalPayment: 0,
        balance: balance,
        deliveryDate: "15 Dec 2026",
        remarks: "Auto-generated upon client conversion."
    };

    enq.status = "Converted";
    if (!enq.timeline) enq.timeline = [];
    enq.timeline.push({ time: "Just now", title: "Converted to Job Card", desc: `Generated ${jcNum}` });

    state.jobCards.unshift(newJobCard);

    // Push notification (Module 9)
    state.notifications.unshift({
        id: `NT-${Date.now()}`,
        title: "Client Converted & Job Card Created",
        detail: `Client ${enq.client} converted to Job Card ${jcNum}.`,
        time: "Just now",
        type: "jobcard",
        unread: true
    });

    return newJobCard;
}

