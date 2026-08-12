// ==========================================
// MODULE VIEW RENDERERS & WHATSAPP DEMO SIMULATOR (HIDDEN IN UI FOR NOW)
// ==========================================

// INTERACTIVE WHATSAPP SIMULATOR MODAL (PRESERVED FOR FUTURE USE)
function openWhatsAppSimulator(clientName = "John Mathews", phone = "+91 98401 12345", messageType = "quotation", payload = {}) {
    let bodyContent = "";
    
    if (messageType === "quotation") {
        bodyContent = `
            <div class="wa-bubble-out">
                <span class="font-bold block text-emerald-900 text-xs">JNA CRM · Automated Quotation</span>
                <p class="mt-1">Dear ${clientName}, thank you for consulting Jehovah Nissi Design Build! Here is your official requested project quotation:</p>
                <div class="wa-card">
                    <div class="flex items-center gap-2 text-red-600 font-bold text-xs">
                        <i data-lucide="file-text" class="w-4 h-4"></i>
                        <span>JNDB_Quotation_Premium_Villa.pdf</span>
                    </div>
                    <p class="text-[11px] text-slate-500 mt-1">Total Amount: <b>${payload.amount || "₹85,00,000"}</b></p>
                </div>
                <div class="mt-2 text-[10px] text-slate-500 text-right">10:45 AM ✓✓</div>
            </div>
            <div class="wa-bubble-in">
                <p>Thank you! Can we negotiate a minor discount on the Italian Marble section?</p>
                <div class="mt-1 text-[10px] text-slate-400 text-right">10:47 AM</div>
            </div>
            <div class="wa-bubble-out">
                <p>Sure ${clientName}! Our Branch Manager is reviewing your request for a revised quotation. We will update you shortly!</p>
                <div class="mt-1 text-[10px] text-slate-500 text-right">10:48 AM ✓✓</div>
            </div>
        `;
    } else if (messageType === "payment") {
        bodyContent = `
            <div class="wa-bubble-out">
                <span class="font-bold block text-emerald-900 text-xs">JNA CRM · Payment Link</span>
                <p class="mt-1">Dear ${clientName}, your 2nd Milestone payment (25%) for project ${payload.project || "Luxury Villa Design"} is ready:</p>
                <div class="wa-card">
                    <span class="label text-[10px]">Milestone 2 (25%)</span>
                    <b class="block text-slate-900 text-sm mt-0.5">${payload.amount || "₹21,25,000"}</b>
                    <button class="btn btn-whatsapp text-xs w-full mt-2 py-1.5" onclick="toast('Simulated Payment Link Opened in Demo', 'wallet');closeOverlay();recordPaymentAction();">
                        💳 Pay Instantly via UPI / Card
                    </button>
                </div>
                <div class="mt-2 text-[10px] text-slate-500 text-right">11:02 AM ✓✓</div>
            </div>
        `;
    } else if (messageType === "sla") {
        bodyContent = `
            <div class="wa-bubble-out" style="background:#fee2e2;border:1px solid #fca5a5;">
                <span class="font-bold block text-red-900 text-xs">🚨 JNA CRM · SLA BREACH ALERT</span>
                <p class="mt-1 text-red-950 font-medium">Attention ASM Senthil Nathan! Lead ENQ-1007 (Ananya Ramesh) has exceeded the 10-minute response SLA timer without activity!</p>
                <div class="wa-card bg-white">
                    <span class="label text-[10px] text-red-700 font-bold">Action Required Immediately</span>
                    <p class="text-xs mt-1">Client: <b>Ananya Ramesh</b> (+91 98410 99887)</p>
                </div>
                <div class="mt-2 text-[10px] text-slate-500 text-right">11:15 AM ✓✓</div>
            </div>
        `;
    } else if (messageType === "construction") {
        bodyContent = `
            <div class="wa-bubble-out">
                <span class="font-bold block text-emerald-900 text-xs">JNA CRM · Construction Progress Update</span>
                <p class="mt-1">Hello ${clientName}! Stage 05 (Structure Work) for your project has been marked <b>Completed (72%)</b>!</p>
                <div class="wa-card">
                    <span class="label text-[10px]">11-Stage Construction Tracker</span>
                    <p class="text-xs font-semibold text-emerald-700 mt-1">✓ Foundation & Structure Completed</p>
                    <span class="text-[10px] text-slate-500">Next: Masonry & Electrical Inspection</span>
                </div>
                <div class="mt-2 text-[10px] text-slate-500 text-right">11:30 AM ✓✓</div>
            </div>
        `;
    }

    openModal(`
        <div class="wa-phone mx-auto">
            <div class="wa-header flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                    <button onclick="closeOverlay()" class="text-white p-1 hover:bg-white/10 rounded"><i data-lucide="arrow-left" class="w-4 h-4"></i></button>
                    <div class="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold grid place-items-center text-xs">JNDB</div>
                    <div>
                        <strong class="text-xs text-white block font-semibold leading-tight">Jehovah Nissi Design Build</strong>
                        <span class="text-[10px] text-emerald-200 block">Verified Business Account ✓</span>
                    </div>
                </div>
            </div>
            
            <div class="wa-chat-body">
                <div class="text-center my-1"><span class="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-medium">TODAY · WHATSAPP BUSINESS DEMO</span></div>
                ${bodyContent}
            </div>

            <div class="wa-footer">
                <input class="input py-1.5 px-3 text-xs bg-white rounded-full border-0 focus:ring-0" placeholder="Type simulated reply..." />
                <button class="btn btn-whatsapp p-2 rounded-full" onclick="toast('WhatsApp Demo Reply Sent!', 'send');closeOverlay();"><i data-lucide="send" class="w-4 h-4"></i></button>
            </div>
        </div>
    `, "max-w-md p-0 border-0 bg-transparent shadow-none");
}

// WHATSAPP HUB VIEW (PRESERVED FOR FUTURE USE)
function whatsappHubView() {
    content.innerHTML = `
        <div class="page">
            ${head("COMMERCIAL AUTOMATION", "WhatsApp Business Integration Hub 💬", `
                <button class="btn btn-whatsapp text-xs" onclick="openWhatsAppSimulator('John Mathews', '+91 98401 12345', 'quotation', {amount:'₹85,00,000'})">
                    <i data-lucide="message-square" class="w-4 h-4"></i> Launch WhatsApp Simulator
                </button>
            `)}
            
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${card("Messages Sent Today", "1,482", "message-square", "#ecfdf5", "#16a34a", "WhatsApp API Active")}
                ${card("Delivery Rate", "99.4%", "check-check", "#eff6ff", "#2563eb", "High reach")}
                ${card("Quotation Reads", "92%", "file-text", "#f0fdf4", "#16a34a", "41% click rate")}
                ${card("Payment Link Clicks", "88%", "credit-card", "#fffbeb", "#b45309", "Instant UPI response")}
            </div>

            <section class="card p-6 mt-6">
                <h3 class="font-bold text-slate-900">Interactive WhatsApp Demo Actions</h3>
                <p class="label mt-0.5">Click any action below to demonstrate live simulated WhatsApp message threads for clients and officers.</p>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                    <div class="p-4 rounded-xl border bg-slate-50 flex flex-col justify-between">
                        <div>
                            <span class="tag bg-emerald-100 text-emerald-800 text-[10px] font-bold">Client Action</span>
                            <strong class="block text-slate-900 text-sm mt-2 font-bold">Send Quotation PDF</strong>
                            <p class="text-xs text-slate-500 mt-1">Send official quotation card to client on WhatsApp with interactive reply options.</p>
                        </div>
                        <button class="btn btn-whatsapp text-xs mt-4 w-full" onclick="openWhatsAppSimulator('John Mathews', '+91 98401 12345', 'quotation', {amount:'₹85,00,000'})">Demo WhatsApp Quote</button>
                    </div>

                    <div class="p-4 rounded-xl border bg-slate-50 flex flex-col justify-between">
                        <div>
                            <span class="tag bg-blue-100 text-blue-800 text-[10px] font-bold">Finance Action</span>
                            <strong class="block text-slate-900 text-sm mt-2 font-bold">Send Payment Link</strong>
                            <p class="text-xs text-slate-500 mt-1">Send 25% / 50% milestone payment link with instant UPI/Card button.</p>
                        </div>
                        <button class="btn btn-whatsapp text-xs mt-4 w-full" onclick="openWhatsAppSimulator('John Mathews', '+91 98401 12345', 'payment', {amount:'₹21,25,000', project:'Luxury Villa Design'})">Demo Payment Link</button>
                    </div>

                    <div class="p-4 rounded-xl border bg-slate-50 flex flex-col justify-between">
                        <div>
                            <span class="tag bg-red-100 text-red-800 text-[10px] font-bold">Internal Alert</span>
                            <strong class="block text-slate-900 text-sm mt-2 font-bold">SLA Breach Warning</strong>
                            <p class="text-xs text-slate-500 mt-1">Send urgent WhatsApp ping to ASM when 10-minute response SLA is breached.</p>
                        </div>
                        <button class="btn btn-whatsapp text-xs mt-4 w-full" onclick="openWhatsAppSimulator('Senthil Nathan (ASM)', '+91 98400 11223', 'sla', {})">Demo SLA Warning</button>
                    </div>

                    <div class="p-4 rounded-xl border bg-slate-50 flex flex-col justify-between">
                        <div>
                            <span class="tag bg-amber-100 text-amber-800 text-[10px] font-bold">Construction Action</span>
                            <strong class="block text-slate-900 text-sm mt-2 font-bold">Construction Stage Ping</strong>
                            <p class="text-xs text-slate-500 mt-1">Notify client on WhatsApp when a construction stage reaches completion.</p>
                        </div>
                        <button class="btn btn-whatsapp text-xs mt-4 w-full" onclick="openWhatsAppSimulator('Greenfield Infra', '+91 94433 22110', 'construction', {})">Demo Stage Ping</button>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// ENQUIRIES LIST VIEW
function enquiriesView() {
    const rows = getScopedEnquiries();
    content.innerHTML = `
        <div class="page">
            ${head("CRM INTAKE", "Enquiries Master Table", canCreate("enquiries") ? `
                <button class="btn btn-primary text-xs" onclick="show('new-enquiry')"><i data-lucide="plus" class="w-4 h-4"></i>New Enquiry</button>
            ` : "")}
            <section class="card p-4 mb-5">
                <div class="grid md:grid-cols-4 gap-3 text-xs">
                    <input class="input" placeholder="Search by client name..." />
                    <select class="select"><option>All Services</option><option>Design & Build</option><option>Real Estate</option><option>Interior</option></select>
                    <select class="select"><option>All Statuses</option><option>New</option><option>Contacted</option><option>Meeting</option><option>Quotation</option></select>
                    <select class="select"><option>Sort by Date (Newest)</option></select>
                </div>
            </section>
            <section class="card overflow-x-auto">
                ${rows.length ? `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Enquiry ID</th>
                                <th>Client Name</th>
                                <th>Service</th>
                                <th>Branch</th>
                                <th>Assigned TL / ASM</th>
                                <th>SLA Status</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.map(x => `
                                <tr>
                                    <td><span class="font-mono font-bold text-xs text-blue-600">${x.id}</span></td>
                                    <td><b>${x.client}</b><br><span class="label text-[11px]">${x.phone}</span></td>
                                    <td><span class="tag bg-slate-100 text-slate-700">${x.service}</span></td>
                                    <td>${x.branch}</td>
                                    <td><span class="text-xs text-slate-700 font-medium">${x.tl}</span><br><span class="label text-[10px]">${x.asm}</span></td>
                                    <td>
                                        <span class="tag ${x.sla === "GREEN" ? "bg-emerald-100 text-emerald-800" : x.sla === "AMBER" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}">
                                            ● ${x.sla}
                                        </span>
                                    </td>
                                    <td><span class="tag bg-blue-50 text-blue-700 font-semibold">${x.status}</span></td>
                                    <td>
                                        <button class="btn btn-outline py-1 px-2.5 text-xs" onclick="show('leads')">View Detail</button>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                ` : emptyState("No Enquiries Visible", "There are no enquiries assigned to your current role or branch scope.")}
            </section>
        </div>
    `;
}

// NEW ENQUIRY FORM VIEW
function enquiryFormView() {
    if (!canCreate("enquiries")) {
        content.innerHTML = accessDenied("Create Enquiry Permission");
        return;
    }
    content.innerHTML = `
        <div class="page max-w-3xl mx-auto">
            ${head("INTAKE FORM", "Create New Client Enquiry", `
                <button class="btn btn-outline text-xs" onclick="show('enquiries')">Cancel</button>
            `)}
            <form id="enquiryIntakeForm" class="card p-8 space-y-5">
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="label block mb-1">Client Full Name *</label>
                        <input id="enqClient" class="input" required value="Suresh Raman" />
                    </div>
                    <div>
                        <label class="label block mb-1">Contact Phone *</label>
                        <input id="enqPhone" class="input" required value="+91 98400 99881" />
                    </div>
                    <div>
                        <label class="label block mb-1">Client Email</label>
                        <input id="enqEmail" class="input" value="suresh@raman.com" />
                    </div>
                    <div>
                        <label class="label block mb-1">Service Category *</label>
                        <select id="enqService" class="select">
                            <option>Design & Build</option>
                            <option>Real Estate</option>
                            <option>Interior</option>
                        </select>
                    </div>
                    <div>
                        <label class="label block mb-1">Target Branch Location *</label>
                        <select id="enqBranch" class="select">
                            <option>Chennai Branch</option>
                            <option>Coimbatore Branch</option>
                            <option>Bengaluru Branch</option>
                            <option>Hyderabad Branch</option>
                        </select>
                    </div>
                    <div>
                        <label class="label block mb-1">Lead Source</label>
                        <select id="enqSource" class="select">
                            <option>Website Direct</option>
                            <option>Referral</option>
                            <option>Social Media</option>
                            <option>Walk-in</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="label block mb-1">Project Description & Requirements</label>
                    <textarea id="enqNotes" class="textarea h-24">Client requires complete interior turnkey execution for a 3500 sq.ft villa in East Coast Road.</textarea>
                </div>
                <div class="pt-4 border-t flex justify-end gap-3">
                    <button type="button" class="btn btn-outline" onclick="show('enquiries')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="check" class="w-4 h-4"></i> Submit & Auto-Assign</button>
                </div>
            </form>
        </div>
    `;

    $("#enquiryIntakeForm").onsubmit = e => {
        e.preventDefault();
        const newId = `ENQ-${1000 + state.enquiries.length + 1}`;
        const newObj = {
            id: newId,
            client: $("#enqClient").value,
            phone: $("#enqPhone").value,
            email: $("#enqEmail").value,
            service: $("#enqService").value,
            project: "New Project Intake",
            branch: $("#enqBranch").value,
            tl: "Rajesh Kumar (TL)",
            asm: "Senthil Nathan (ASM)",
            source: $("#enqSource").value,
            priority: "High",
            status: "New",
            sla: "GREEN",
            created: "Just now",
            value: 6500000
        };
        state.enquiries.unshift(newObj);
        openModal(`
            <div class="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-6 border-b border-emerald-100 text-center relative">
                <div class="w-14 h-14 rounded-2xl mx-auto bg-emerald-600 text-white grid place-items-center mb-3 shadow-lg shadow-emerald-600/25">
                    <i data-lucide="check-circle-2" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Enquiry Created & Auto-Assigned!</h3>
                <p class="text-xs text-slate-600 mt-1 font-medium">The CRM auto-assignment engine has processed this record.</p>
            </div>

            <div class="p-6 space-y-3.5 text-xs">
                <div class="flex justify-between items-center py-2 border-b border-slate-100">
                    <span class="text-slate-500 font-semibold">Enquiry ID</span>
                    <span class="tag bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold text-xs">${newId}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-100">
                    <span class="text-slate-500 font-semibold">Assigned Branch</span>
                    <span class="font-bold text-slate-900">${newObj.branch}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-100">
                    <span class="text-slate-500 font-semibold">Assigned Design TL</span>
                    <span class="font-bold text-slate-900">${newObj.tl}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-100">
                    <span class="text-slate-500 font-semibold">Assigned ASM</span>
                    <span class="font-bold text-slate-900">${newObj.asm}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                    <span class="text-slate-500 font-semibold">10-Min SLA Timer</span>
                    <span class="tag bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold uppercase">ACTIVE (Green)</span>
                </div>

                <div class="pt-3">
                    <button class="btn btn-primary w-full py-2.5 text-xs font-bold shadow-sm" onclick="closeOverlay();show('enquiries')">Return to Enquiries Table</button>
                </div>
            </div>
        `, "max-w-md p-0 overflow-hidden");
    };
}

// LEADS VIEW (MODULE 3 — DESIGN TL MODULE & MODULE 7 VOICE RECORDINGS & MODULE 8 TIMELINE)
let activeLeadFilter = "All";

function leadsView() {
    const rows = getScopedEnquiries();
    const filteredRows = activeLeadFilter === "All" ? rows : rows.filter(x => x.status === activeLeadFilter);

    const statusCounts = {
        All: rows.length,
        New: rows.filter(x => x.status === "New").length,
        Contacted: rows.filter(x => x.status === "Contacted").length,
        "Meeting Scheduled": rows.filter(x => x.status === "Meeting Scheduled" || x.status === "Meeting").length,
        Quotation: rows.filter(x => x.status === "Quotation").length,
        Converted: rows.filter(x => x.status === "Converted").length,
        Hold: rows.filter(x => x.status === "Hold").length,
        Cancelled: rows.filter(x => x.status === "Cancelled").length
    };

    content.innerHTML = `
        <div class="page">
            ${head("DESIGN TL MODULE", "Assigned Lead Workspace", `
                ${canCreate("enquiries") ? `<button class="btn btn-primary text-xs" onclick="show('new-enquiry')"><i data-lucide="plus" class="w-4 h-4"></i>New Lead</button>` : ""}
            `)}

            <!-- STATUS TAB FILTER (MODULE 3) -->
            <div class="flex flex-wrap gap-2 mb-5 pb-3 border-b overflow-x-auto">
                ${Object.keys(statusCounts).map(st => `
                    <button class="btn ${activeLeadFilter === st ? "btn-primary" : "btn-outline"} text-xs py-1.5 px-3" onclick="activeLeadFilter='${st}';leadsView()">
                        ${st} <span class="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${activeLeadFilter === st ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"}">${statusCounts[st]}</span>
                    </button>
                `).join("")}
            </div>

            <!-- LEADS TABLE -->
            <section class="card overflow-x-auto">
                ${filteredRows.length ? `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Enquiry ID</th>
                                <th>Client Name</th>
                                <th>Service & Project</th>
                                <th>Built-up Area & Rate</th>
                                <th>Assigned TL / ASM</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredRows.map(x => `
                                <tr>
                                    <td><span class="font-mono font-bold text-xs text-blue-600">${x.id}</span></td>
                                    <td><b>${x.client}</b><br><span class="label text-[11px]">${x.phone}</span></td>
                                    <td><span class="tag bg-slate-100 text-slate-700">${x.service}</span><br><span class="text-xs text-slate-800 font-semibold">${x.project}</span></td>
                                    <td><b class="text-slate-900">${x.area || "3,500 sq.ft"}</b><br><span class="label text-[10px] text-blue-700 font-semibold">${x.rate || "₹2,400/sq.ft"}</span></td>
                                    <td><span class="text-xs text-slate-700 font-medium">${x.tl}</span><br><span class="label text-[10px]">${x.asm}</span></td>
                                    <td>
                                        <span class="tag ${x.status === "Converted" ? "bg-emerald-100 text-emerald-800" : x.status === "Cancelled" ? "bg-red-100 text-red-800" : x.status === "Hold" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"} font-semibold">
                                            ${x.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline py-1 px-2.5 text-xs" onclick="openLeadDetailModal('${x.id}')">Open Drawer</button>
                                        ${x.status !== "Converted" ? `<button class="btn btn-primary py-1 px-2 text-xs ml-1" onclick="convertAction('${x.id}')">Convert</button>` : `<span class="tag bg-emerald-50 text-emerald-700 ml-1">JC Active</span>`}
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                ` : emptyState("No Leads in Selected Status", "There are no leads matching this filter.")}
            </section>
        </div>
    `;
}

function convertAction(enqId) {
    const jc = convertEnquiryToJobCard(enqId);
    if (jc) {
        toast(`Client Converted! Job Card ${jc.id} generated automatically.`, "check-circle");
        show("jobcards");
    }
}

// LEAD DETAIL DRAWER MODAL (MODULE 3, MODULE 7 VOICE RECORDING, MODULE 8 TIMELINE)
function openLeadDetailModal(enqId) {
    const lead = state.enquiries.find(x => x.id === enqId) || state.enquiries[0];
    const recordings = lead.voiceRecordings || [];
    const timeline = lead.timeline || [];

    openModal(`
        <div class="p-6 space-y-6">
            <div class="flex justify-between items-start pb-4 border-b border-slate-200 pr-8">
                <div>
                    <span class="tag bg-blue-100 text-blue-800 text-xs font-bold">${lead.service} · ${lead.branch}</span>
                    <h2 class="text-2xl font-extrabold text-slate-900 mt-1">${lead.client} — ${lead.project}</h2>
                    <p class="text-xs text-slate-500 mt-0.5">Enquiry ID: <span class="font-mono text-blue-600 font-bold">${lead.id}</span> · Phone: <b class="text-slate-800">${lead.phone}</b></p>
                </div>
            </div>

            <!-- KEY CLIENT SPECS -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-xs border">
                <div><span class="label">Built-up Area:</span><b class="block text-slate-900 font-bold text-sm mt-0.5">${lead.area || "3,500 sq.ft"}</b></div>
                <div><span class="label">Unit Rate:</span><b class="block text-blue-600 font-bold text-sm mt-0.5">${lead.rate || "₹2,428/sq.ft"}</b></div>
                <div><span class="label">Estimated Value:</span><b class="block text-emerald-700 font-bold text-sm mt-0.5">${money(lead.value)}</b></div>
                <div><span class="label">Assigned TL:</span><b class="block text-slate-900 mt-0.5">${lead.tl}</b></div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- LEFT COLUMN: CRM DISCUSSION LOGGER (MODULE 3) & VOICE RECORDINGS (MODULE 7) -->
                <div class="space-y-4">
                    <section class="card p-4 border-blue-200 bg-blue-50/40">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-1.5"><i data-lucide="message-square-plus" class="w-4 h-4 text-blue-600"></i> Log Discussion directly in CRM</h3>
                            <span class="tag bg-blue-100 text-blue-800 text-[10px]">No WhatsApp Needed</span>
                        </div>
                        <form id="discussionLogForm" class="space-y-3 text-xs">
                            <div>
                                <label class="label block mb-1">Meeting & Discussion Notes</label>
                                <textarea id="discNotes" class="textarea h-16" placeholder="Enter notes from consultation..."></textarea>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="label block mb-1">Package Explained?</label>
                                    <select id="discPkg" class="select"><option value="Yes">Yes ✓</option><option value="No">No ✕</option></select>
                                </div>
                                <div>
                                    <label class="label block mb-1">Budget Discussed?</label>
                                    <select id="discBgt" class="select"><option value="Yes">Yes ✓</option><option value="No">No ✕</option></select>
                                </div>
                            </div>
                            <div>
                                <label class="label block mb-1">Next Action Step</label>
                                <input id="discNext" class="input" placeholder="e.g. Prepare 3D render layout" />
                            </div>
                            <div class="flex justify-between items-center pt-2">
                                <button type="button" class="btn btn-outline text-xs py-1" onclick="toast('Voice Recording Uploaded & Attached to Record!', 'mic')">
                                    <i data-lucide="mic" class="w-3.5 h-3.5 text-red-600"></i> Attach Voice Note
                                </button>
                                <button type="submit" class="btn btn-primary text-xs py-1.5 px-3">Save Discussion Log</button>
                            </div>
                        </form>
                    </section>

                    <!-- VOICE RECORDINGS PLAYER (MODULE 7) -->
                    <section class="card p-4">
                        <h3 class="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5"><i data-lucide="volume-2" class="w-4 h-4 text-blue-600"></i> Voice & Call Recordings (${recordings.length})</h3>
                        ${recordings.length ? `
                            <div class="space-y-3 text-xs">
                                ${recordings.map(r => `
                                    <div class="p-3 rounded-xl bg-slate-50 border">
                                        <div class="flex justify-between font-semibold text-slate-800">
                                            <span>${r.title}</span>
                                            <span class="text-slate-500 font-mono text-[11px]">${r.duration}</span>
                                        </div>
                                        <p class="text-[10px] text-slate-400 mt-0.5">Recorded: ${r.date}</p>
                                        <audio controls class="w-full h-8 mt-2">
                                            <source src="${r.src}" type="audio/mpeg">
                                        </audio>
                                    </div>
                                `).join("")}
                            </div>
                        ` : `<p class="text-xs text-slate-500">No recordings uploaded yet. Attach voice notes above.</p>`}
                    </section>
                </div>

                <!-- RIGHT COLUMN: CHRONOLOGICAL AUDIT TIMELINE (MODULE 8) -->
                <div class="space-y-4">
                    <section class="card p-4">
                        <h3 class="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5"><i data-lucide="history" class="w-4 h-4 text-blue-600"></i> Chronological History Trail (Module 8)</h3>
                        <div class="space-y-3.5 text-xs max-h-[360px] overflow-y-auto pr-1">
                            ${timeline.length ? timeline.map((ev, i) => `
                                <div class="flex gap-3">
                                    <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold grid place-items-center flex-shrink-0 text-[10px]">${i + 1}</div>
                                    <div>
                                        <b class="text-slate-800 block">${ev.title}</b>
                                        <p class="text-[11px] text-slate-600">${ev.desc}</p>
                                        <span class="text-[10px] text-slate-400 font-mono">${ev.time}</span>
                                    </div>
                                </div>
                            `).join("") : `<p class="text-xs text-slate-500">No events logged.</p>`}
                        </div>
                    </section>
                </div>
            </div>

            <div class="pt-4 border-t flex justify-between items-center">
                <button class="btn btn-outline text-xs" onclick="closeOverlay()">Close</button>
                ${lead.status !== "Converted" ? `
                    <button class="btn btn-primary text-xs py-2 px-4" onclick="closeOverlay();convertAction('${lead.id}')">Convert to Job Card (JC Number Generator)</button>
                ` : `<span class="tag bg-emerald-100 text-emerald-800 font-bold">Converted to Job Card ✓</span>`}
        </div>
    `, "max-w-4xl");

    $("#discussionLogForm").onsubmit = e => {
        e.preventDefault();
        const notes = $("#discNotes").value || "Discussion logged.";
        if (!lead.discussions) lead.discussions = [];
        lead.discussions.push({ date: "Today", notes, packageExplained: true, budgetDiscussed: true, nextStep: $("#discNext").value });
        if (!lead.timeline) lead.timeline = [];
        lead.timeline.push({ time: "Just now", title: "Discussion Logged", desc: notes });
        toast("Discussion notes & requirement logged in CRM!", "check-circle");
        closeOverlay();
        leadsView();
    };
}

// MEETINGS VIEW
function meetingsView() {
    content.innerHTML = `
        <div class="page">
            ${head("COMMERCIAL MEETINGS", "Scheduled Meetings", `
                <button class="btn btn-primary text-xs" onclick="toast('Meeting outcome logged in timeline.')">Save Meeting Notes</button>
            `)}
            <section class="card p-6 max-w-4xl">
                <span class="tag bg-amber-100 text-amber-900 font-semibold">Today · 11:30 AM</span>
                <h3 class="font-bold text-slate-900 text-lg mt-3">John Mathews · On-Site Consultation</h3>
                <p class="text-xs text-slate-500 mt-1">Location: East Coast Road Site Office · Chennai</p>
                <div class="grid md:grid-cols-2 gap-4 mt-6">
                    <div>
                        <label class="label block mb-1">Requirement Notes</label>
                        <input class="input" value="Client confirmed 4-bedroom villa layout." />
                    </div>
                    <div>
                        <label class="label block mb-1">Budget Discussion</label>
                        <input class="input" value="Budget finalized at ₹85,00,000." />
                    </div>
                </div>
            </section>
        </div>
    `;
}

// FOLLOW-UPS VIEW (MODULE 4 — ASM FOLLOW-UP MODULE)
function followupsView() {
    const isASM = role === "ASM";
    const enqs = getScopedEnquiries();

    // Check for follow-ups due today / tomorrow for automated reminders (Module 4)
    const dueTodayOrTomorrow = enqs.filter(x => x.nextFollowup === "12 Aug 2026" || x.nextFollowup === "13 Aug 2026");

    content.innerHTML = `
        <div class="page">
            ${head("ASM FOLLOW-UP MODULE", "Follow-up Compliance & Reminders", `
                <button class="btn btn-primary text-xs" onclick="openASMUpdateModal()"><i data-lucide="plus" class="w-4 h-4"></i>Update Follow-up Record</button>
            `)}

            <!-- AUTOMATIC REMINDERS BANNER (MODULE 4) -->
            ${dueTodayOrTomorrow.length ? `
                <div class="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <i data-lucide="bell-ring" class="w-5 h-5 text-amber-700 flex-shrink-0 animate-bounce"></i>
                        <div>
                            <b class="block text-slate-900 text-sm">AUTOMATIC FOLLOW-UP REMINDERS DUE TODAY / TOMORROW (${dueTodayOrTomorrow.length})</b>
                            <span>Notifications dispatched automatically to assigned ASM so no enquiry is forgotten.</span>
                        </div>
                    </div>
                    <span class="tag bg-amber-200 text-amber-900 font-bold">${dueTodayOrTomorrow.length} Due Action</span>
                </div>
            ` : ""}

            <!-- STATUS BADGES LEGEND (MODULE 4) -->
            <section class="card p-4 mb-5">
                <p class="label text-[11px] mb-2 uppercase font-bold">Status Badge Standard Codes:</p>
                <div class="flex flex-wrap gap-2 text-xs">
                    <span class="tag bg-slate-100 text-slate-700 font-semibold">New</span>
                    <span class="tag bg-blue-100 text-blue-800 font-semibold">Contacted</span>
                    <span class="tag bg-amber-100 text-amber-900 font-semibold">Follow-up</span>
                    <span class="tag bg-purple-100 text-purple-800 font-semibold">Meeting</span>
                    <span class="tag bg-indigo-100 text-indigo-800 font-semibold">Quotation</span>
                    <span class="tag bg-slate-200 text-slate-800 font-semibold">Waiting</span>
                    <span class="tag bg-emerald-100 text-emerald-800 font-semibold">✓ Converted (Green)</span>
                    <span class="tag bg-red-100 text-red-800 font-semibold">✕ Cancelled (Red)</span>
                    <span class="tag bg-blue-200 text-blue-900 font-semibold">⏸ Hold (Blue)</span>
                </div>
            </section>

            <!-- FOLLOW-UPS TABLE -->
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Enquiry / Client</th>
                            <th>Last Follow-up</th>
                            <th>Next Follow-up</th>
                            <th>Priority</th>
                            <th>Status Badge</th>
                            <th>Discussion Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${enqs.map(x => `
                            <tr>
                                <td>
                                    <b class="text-slate-900">${x.client}</b><br>
                                    <span class="font-mono text-xs text-blue-600">${x.id} · ${x.project}</span>
                                </td>
                                <td>${x.lastFollowup || "11 Aug 2026"}</td>
                                <td><b class="${x.nextFollowup === "13 Aug 2026" ? "text-amber-700 font-bold" : ""}">${x.nextFollowup || "14 Aug 2026"}</b></td>
                                <td>
                                    <span class="tag ${x.priority === "High" ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-700"}">${x.priority}</span>
                                </td>
                                <td>
                                    <span class="tag ${x.status === "Converted" ? "bg-emerald-100 text-emerald-800" : x.status === "Cancelled" ? "bg-red-100 text-red-800" : x.status === "Hold" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"} font-bold">
                                        ${x.status}
                                    </span>
                                </td>
                                <td><p class="text-xs text-slate-700 max-w-xs truncate">${x.discussions && x.discussions.length ? x.discussions[0].notes : "Initial discussion recorded."}</p></td>
                                <td>
                                    <button class="btn btn-outline py-1 px-2.5 text-xs" onclick="openASMUpdateModal('${x.id}')">Update</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

function openASMUpdateModal(enqId) {
    const enq = state.enquiries.find(x => x.id === enqId) || state.enquiries[0];
    openModal(`
        <div class="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 p-6 border-b border-blue-100 pr-12">
            <span class="tag bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-widest">MODULE 4 — ASM FOLLOW-UP CONTROL</span>
            <h3 class="text-xl font-bold text-slate-900 mt-1">ASM Follow-up Status Update</h3>
            <p class="text-xs text-slate-600 mt-1">Updating client record for <b class="text-slate-900">${enq.client} (${enq.id})</b>. Replaces Excel completely.</p>
        </div>

        <form id="asmUpdateForm" class="p-6 space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="label block mb-1">Last Follow-up Date *</label>
                    <input id="fLast" class="input" required value="12 Aug 2026" />
                </div>
                <div>
                    <label class="label block mb-1">Next Follow-up Date *</label>
                    <input id="fNext" class="input" required value="13 Aug 2026" />
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="label block mb-1">Status Badge Code *</label>
                    <select id="fStatus" class="select">
                        <option ${enq.status === "New" ? "selected" : ""}>New</option>
                        <option ${enq.status === "Contacted" ? "selected" : ""}>Contacted</option>
                        <option ${enq.status === "Follow-up" ? "selected" : ""}>Follow-up</option>
                        <option ${enq.status === "Meeting Scheduled" ? "selected" : ""}>Meeting Scheduled</option>
                        <option ${enq.status === "Quotation" ? "selected" : ""}>Quotation</option>
                        <option ${enq.status === "Waiting" ? "selected" : ""}>Waiting</option>
                        <option ${enq.status === "Converted" ? "selected" : ""}>Converted</option>
                        <option ${enq.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                        <option ${enq.status === "Hold" ? "selected" : ""}>Hold</option>
                    </select>
                </div>
                <div>
                    <label class="label block mb-1">Priority Level *</label>
                    <select id="fPriority" class="select">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="label block mb-1">Discussion Notes *</label>
                <textarea id="fNotes" class="textarea h-20" required placeholder="Log client discussion feedback...">Followed up with client. Confirmed budget approval meeting scheduled for tomorrow.</textarea>
            </div>

            <div class="pt-3 border-t flex justify-end gap-2 border-slate-100">
                <button type="button" class="btn btn-outline text-xs px-4" onclick="closeOverlay()">Cancel</button>
                <button type="submit" class="btn btn-primary text-xs px-5 font-bold shadow-md">Save Follow-up Record</button>
            </div>
        </form>
    `, "max-w-xl p-0 overflow-hidden");

    $("#asmUpdateForm").onsubmit = e => {
        e.preventDefault();
        enq.lastFollowup = $("#fLast").value;
        enq.nextFollowup = $("#fNext").value;
        enq.status = $("#fStatus").value;
        enq.priority = $("#fPriority").value;
        if (!enq.discussions) enq.discussions = [];
        enq.discussions.unshift({ date: "Today", notes: $("#fNotes").value });
        closeOverlay();
        toast("ASM Follow-up updated! Automatic reminder set.", "check-circle");
        followupsView();
    };
}

// PIPELINE VIEW
function pipelineView() {
    content.innerHTML = `
        <div class="page">
            ${head("SALES STAGES", "Pipeline Monitoring")}
            <section class="card p-6">
                <div class="grid md:grid-cols-5 gap-3 text-center">
                    ${["New", "Contacted", "Meeting", "Quotation", "Converted"].map((x, i) => `
                        <div class="rounded-xl ${i === 4 ? "bg-blue-600 text-white" : "bg-slate-50 border"} p-4">
                            <span class="label text-[10px] uppercase font-bold block ${i === 4 ? "text-blue-100" : ""}">${x}</span>
                            <strong class="text-2xl font-bold block mt-1">${[24, 17, 12, 9, 6][i]}</strong>
                        </div>
                    `).join("")}
                </div>
            </section>
        </div>
    `;
}

// QUOTATIONS & WORKFLOW VIEW
function quotationsView() {
    const isBM = role === "BM";
    const amountVal = state.revisionApproved ? "₹82,00,000" : "₹85,00,000";
    content.innerHTML = `
        <div class="page">
            ${head("COMMERCIAL WORKFLOW", "Quotation Builder & Approval", `
                <button class="btn btn-outline text-xs" onclick="show('packages')"><i data-lucide="box" class="w-4 h-4"></i>Package Rules</button>
            `)}
            <div class="grid lg:grid-cols-5 gap-6">
                <section class="card p-6 lg:col-span-3 space-y-4">
                    <h3 class="font-bold text-slate-900">Quotation for John Mathews (ENQ-1001)</h3>
                    <div>
                        <label class="label block mb-1">Selected Package</label>
                        <select class="select">
                            <option>Package 2 — Premium Villa Grade</option>
                        </select>
                    </div>
                    <div>
                        <label class="label block mb-1">Negotiated Price Amount</label>
                        <input class="input font-mono font-bold text-slate-900" value="${amountVal}" ${isBM ? "readonly" : ""} />
                    </div>
                    ${isBM ? `
                        <p class="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
                            Direct price changes are restricted for Branch Managers. Submit a revision request for Main Admin authorization.
                        </p>
                    ` : ""}
                </section>

                <aside class="card p-6 lg:col-span-2 flex flex-col justify-between">
                    <div>
                        <span class="label uppercase text-[10px]">Commercial Summary</span>
                        <div class="mt-4 space-y-3 text-xs">
                            <div class="flex justify-between"><span>Base Amount</span><b>₹91,00,000</b></div>
                            <div class="flex justify-between"><span>Discount</span><b class="text-red-600">- ₹6,00,000</b></div>
                            <div class="flex justify-between pt-3 border-t font-bold text-sm">
                                <span>Final Negotiated Price</span>
                                <b class="text-blue-600">${amountVal}</b>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6">
                        ${isBM ? `
                            <button class="btn btn-primary w-full py-2.5 text-xs" onclick="requestQuotationRevision()">
                                ${state.revisionApproved ? "Revision Approved ✓" : "Submit Revision Request (BM → Admin)"}
                            </button>
                        ` : `
                            <button class="btn btn-primary w-full py-2.5 text-xs" onclick="convertAction('ENQ-1001')">Convert to Job Card (Auto JC Number)</button>
                        `}
                    </div>
                </aside>
            </div>
        </div>
    `;
}

function requestQuotationRevision() {
    state.revisionRequested = true;
    toast("Quotation Revision Request Submitted to Main Admin!", "clock");
    show("quotations");
}

// PACKAGES VIEW (A-GRADE vs D-GRADE RESTRICTIONS)
function packagesView() {
    const isDGrade = role === "D_GRADE_MO";
    content.innerHTML = `
        <div class="page">
            ${head("COMMERCIAL PACKAGES", "Package Section Controls", `
                <button class="btn btn-outline text-xs" onclick="show('quotations')">Return to Quotations</button>
            `)}
            <section class="card p-6 max-w-4xl space-y-5">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="font-bold text-slate-900 text-lg">Package 2 — Premium Villa Grade</h3>
                        <p class="label mt-0.5">Package Section Permissions</p>
                    </div>
                    ${isDGrade ? `
                        <span class="tag bg-red-100 text-red-800 text-xs font-semibold">🔒 D-Grade MO Restricted</span>
                    ` : `
                        <span class="tag bg-emerald-100 text-emerald-800 text-xs font-semibold">✓ A-Grade MO Editable</span>
                    `}
                </div>

                <div class="space-y-3 pt-3 border-t">
                    ${[
                        ["Structural Civil Concrete Works", "Mandatory", true],
                        ["Teakwood Main Entrance Door", "Optional", !isDGrade],
                        ["Italian Marble Living Flooring", "Restricted Package Section", !isDGrade]
                    ].map(x => `
                        <div class="p-3.5 rounded-xl border flex justify-between items-center text-xs">
                            <div>
                                <b class="text-slate-800">${x[0]}</b>
                                <span class="block label text-[10px]">${x[1]}</span>
                            </div>
                            <input type="checkbox" ${x[2] ? "checked" : ""} ${isDGrade && x[1].includes("Restricted") ? "disabled title='You do not have permission to modify this package section.'" : ""} class="w-4 h-4 text-blue-600 rounded" />
                        </div>
                    `).join("")}
                </div>
            </section>
        </div>
    `;
}

// JOB CARDS VIEW (MODULE 5 — JOB CARD MODULE & PAYMENT TRACKING)
function jobcardsView() {
    const list = getScopedJobCards();
    content.innerHTML = `
        <div class="page">
            ${head("MODULE 5 — JOB CARD MODULE", "Confirmed Job Cards", "")}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Job Card #</th>
                            <th>Client Name</th>
                            <th>Package</th>
                            <th>Built-up Area & Rate</th>
                            <th>Total Cost</th>
                            <th>Advance Paid</th>
                            <th>Balance</th>
                            <th>Delivery Date</th>
                            <th>Completion %</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${list.map(x => `
                            <tr>
                                <td><span class="font-mono font-bold text-xs text-blue-600">${x.id}</span></td>
                                <td><b>${x.client}</b><br><span class="label text-[11px]">${x.branch}</span></td>
                                <td><span class="tag bg-blue-50 text-blue-700">${x.package || "Package 2 — Premium"}</span></td>
                                <td><b>${x.area || "3,500 sq.ft"}</b><br><span class="label text-[10px] text-blue-700">${x.rate || "₹2,428/sq.ft"}</span></td>
                                <td class="font-bold text-slate-900">${money(x.totalCost || x.value)}</td>
                                <td class="text-emerald-700 font-bold">${money(x.advancePaid || (x.value * 0.25))}</td>
                                <td class="text-amber-800 font-bold">${money(x.balance || (x.value * 0.5))}</td>
                                <td>${x.deliveryDate || x.promisedDate}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="progress w-16"><span style="width:${x.progress}%"></span></div>
                                        <b class="text-xs text-blue-600">${x.progress}%</b>
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-outline py-1 px-2.5 text-xs" onclick="openJobCardPaymentModal('${x.id}')">Payments</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

function openJobCardPaymentModal(jcId) {
    const jc = state.jobCards.find(x => x.id === jcId) || state.jobCards[0];
    openModal(`
        <div class="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 p-6 border-b border-blue-100 pr-12">
            <span class="tag bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-widest">${jc.id} · ${jc.branch}</span>
            <h3 class="text-xl font-bold text-slate-900 mt-1">${jc.client} — ${jc.project}</h3>
            <p class="text-xs text-slate-600 mt-1">Payment Stage & Collection Milestone Control</p>
        </div>

        <div class="p-6 space-y-5 text-xs">
            <!-- PAYMENT MILESTONE TRACKING -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                    <span class="label block uppercase text-[10px]">Total Cost:</span>
                    <b class="block text-slate-900 text-base font-extrabold mt-1">${money(jc.totalCost || jc.value)}</b>
                </div>
                <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm">
                    <span class="label text-emerald-800 block uppercase text-[10px]">Advance Paid (25%):</span>
                    <b class="block text-emerald-800 text-base font-extrabold mt-1">${money(jc.advancePaid || (jc.value * 0.25))}</b>
                </div>
                <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-200 shadow-sm">
                    <span class="label text-blue-800 block uppercase text-[10px]">2nd Payment (25%):</span>
                    <b class="block text-blue-800 text-base font-extrabold mt-1">${money(jc.secondPayment || (jc.value * 0.25))}</b>
                </div>
                <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200 shadow-sm">
                    <span class="label text-amber-800 block uppercase text-[10px]">Pending Amount:</span>
                    <b class="block text-amber-900 text-base font-extrabold mt-1">${money(jc.balance || (jc.value * 0.5))}</b>
                </div>
            </div>

            <div class="pt-4 flex flex-wrap justify-between items-center border-t border-slate-100 gap-3">
                <span class="text-slate-600 font-semibold">Promised Delivery Date: <b class="text-slate-900">${jc.deliveryDate || jc.promisedDate}</b></span>
                <button class="btn btn-primary text-xs py-2 px-4 font-bold shadow-md" onclick="closeOverlay();recordPaymentAction();">Record Stage Payment</button>
            </div>
        </div>
    `, "max-w-2xl p-0 overflow-hidden");
}

// PAYMENTS VIEW
function paymentsView() {
    const isAccounts = role === "ACCOUNTS";
    content.innerHTML = `
        <div class="page">
            ${head("FINANCE WORKFLOW", "Payments & Collections", `
                ${isAccounts ? `<button class="btn btn-primary text-xs" onclick="recordPaymentAction()"><i data-lucide="plus" class="w-4 h-4"></i>Record 2nd Milestone Payment</button>` : ""}
            `)}
            <section class="card p-6 max-w-4xl">
                <span class="tag bg-blue-100 text-blue-800 font-semibold mb-2">JC-2026-002 · John Mathews</span>
                <h3 class="text-2xl font-bold text-slate-900">Total Contract Value: ₹85,00,000</h3>
                <div class="grid md:grid-cols-3 gap-4 mt-6 text-xs">
                    <div class="p-4 rounded-xl bg-slate-50 border">
                        <span class="label">1st Advance (25%)</span>
                        <strong class="block text-slate-900 text-base mt-1">₹21,25,000</strong>
                        <span class="tag bg-emerald-100 text-emerald-800 mt-2">Paid ✓</span>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border">
                        <span class="label">2nd Stage (25%)</span>
                        <strong class="block text-slate-900 text-base mt-1">₹21,25,000</strong>
                        <span class="tag ${state.paymentReceived ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"} mt-2">
                            ${state.paymentReceived ? "Paid ✓" : "Pending Collection"}
                        </span>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border">
                        <span class="label">Final Handover (50%)</span>
                        <strong class="block text-slate-900 text-base mt-1">₹42,50,000</strong>
                        <span class="tag bg-amber-100 text-amber-800 mt-2">Pending</span>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function recordPaymentAction() {
    state.paymentReceived = true;
    toast("2nd Milestone Payment Recorded! Outstanding Balance Updated.", "receipt");
    show("payments");
}

// INVOICES VIEW
function invoicesView() {
    content.innerHTML = `
        <div class="page">
            ${head("TAX INVOICES", "Invoices & Receipts")}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead><tr><th>Invoice #</th><th>Client</th><th>Amount</th><th>GST (18%)</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>
                        <tr><td><span class="font-mono font-bold text-xs text-blue-600">INV-2026-041</span></td><td>Greenfield Infra</td><td>₹15,67,796</td><td>₹2,82,204</td><td class="font-bold">₹18,50,000</td><td><span class="tag bg-emerald-100 text-emerald-800">Paid ✓</span></td></tr>
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

// PROJECTS VIEW
function projectsView() {
    content.innerHTML = `
        <div class="page">
            ${head("PROJECT EXECUTION", "Active Projects Dashboard", `
                <button class="btn btn-primary text-xs" onclick="show('construction')">View Construction Stages</button>
            `)}
            <section class="card p-6">
                <span class="tag bg-emerald-100 text-emerald-800 font-semibold mb-2">JC-2026-001 · Greenfield Infra</span>
                <h3 class="text-xl font-bold text-slate-900">Warehouse Facility Project</h3>
                <div class="mt-4">
                    <div class="flex justify-between text-xs font-semibold mb-1">
                        <span>Overall Completion Percentage</span>
                        <span class="text-blue-600">72%</span>
                    </div>
                    <div class="progress"><span style="width:72%"></span></div>
                </div>
            </section>
        </div>
    `;
}

// CONSTRUCTION STAGES TRACKER VIEW
function constructionView() {
    content.innerHTML = `
        <div class="page">
            ${head("11-STAGE CONSTRUCTION TRACKER", "Construction Stages", `
                <button class="btn btn-primary text-xs" onclick="toast('Stage completion updated.')">Save Stage Progress</button>
            `)}
            <section class="card p-6">
                <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                    ${constructionStages.map((s, i) => `
                        <div class="p-4 rounded-xl border ${i < 5 ? "bg-emerald-50 border-emerald-200" : "bg-white"}">
                            <span class="label text-[10px]">Stage 0${i + 1}</span>
                            <strong class="block text-slate-900 text-sm mt-1 font-bold">${s}</strong>
                            <span class="tag mt-3 text-[10px] ${i < 5 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}">
                                ${i < 5 ? "Completed ✓" : "Pending Stage"}
                            </span>
                        </div>
                    `).join("")}
                </div>
            </section>
        </div>
    `;
}

// APPROVALS VIEW
function approvalsView() {
    content.innerHTML = `
        <div class="page">
            ${head("APPROVAL CENTER", "Pending Approvals Queue")}
            <div class="grid lg:grid-cols-2 gap-6">
                <section class="card p-6 space-y-4 border-amber-200">
                    <span class="tag bg-amber-100 text-amber-800 text-xs font-semibold">Quotation Revision Request</span>
                    <h3 class="text-lg font-bold text-slate-900">John Mathews (Chennai Branch)</h3>
                    <p class="text-xs text-slate-600">Branch Manager requested negotiated price adjustment from ₹85,00,000 to ₹82,00,000.</p>
                    ${state.revisionApproved ? `
                        <span class="tag bg-emerald-100 text-emerald-800 font-bold">Approved by Main Admin ✓</span>
                    ` : `
                        <div class="flex gap-2">
                            <button class="btn btn-outline text-xs" onclick="toast('Revision Rejected.')">Reject</button>
                            <button class="btn btn-primary text-xs" onclick="approveRevisionAction()">Approve Revision</button>
                        </div>
                    `}
                </section>
            </div>
        </div>
    `;
}

function approveRevisionAction() {
    state.revisionApproved = true;
    toast("Quotation Revision Approved! BM view updated.", "check-circle");
    show("approvals");
}

// NOTIFICATIONS VIEW (MODULE 9 — SYSTEM PUSH NOTIFICATIONS)
function notificationsView() {
    const list = state.notifications || [];
    content.innerHTML = `
        <div class="page">
            ${head("MODULE 9 — SYSTEM NOTIFICATIONS", "Push Notifications Queue", `
                <button class="btn btn-outline text-xs" onclick="state.notifications.forEach(n=>n.unread=false);notificationsView();toast('All notifications marked read.', 'check-check')">Mark All Read</button>
            `)}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Time</th>
                            <th>Notification Title</th>
                            <th>Details</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${list.map(n => `
                            <tr class="${n.unread ? "bg-blue-50/40" : ""}">
                                <td>${n.unread ? '<span class="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>' : '<span class="text-slate-300">✓</span>'}</td>
                                <td class="text-slate-500 font-mono text-xs">${n.time}</td>
                                <td><b class="text-slate-900">${n.title}</b></td>
                                <td><p class="text-xs text-slate-700">${n.detail}</p></td>
                                <td><span class="tag bg-blue-100 text-blue-800 uppercase text-[10px] font-bold">${n.type}</span></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

// REPORTS & ANALYTICS VIEW (MODULE 6 & 20 ANALYTICS REPORTS & ADDITIONAL KPIS)
let activeReportTab = "MONTHLY_COUNTING";

function reportsView() {
    content.innerHTML = `
        <div class="page">
            ${head("ANALYTICS & REPORTING ENGINE", "20 Executive Dashboards & Reports", `
                <button class="btn btn-primary text-xs" onclick="toast('Full Executive Reporting Bundle Exported!', 'download')"><i data-lucide="download" class="w-4 h-4"></i>Export Report Bundle</button>
            `)}

            <!-- ADDITIONAL KPIS STRIP -->
            <section class="card p-4 mb-6 bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 text-slate-900 shadow-sm border border-blue-200">
                <span class="tag bg-blue-100 text-blue-900 border border-blue-300 text-[10px] uppercase font-bold tracking-widest mb-3 inline-block">EXECUTIVE PERFORMANCE KPIS</span>
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
                    <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-sm">
                        <span class="text-[10px] text-slate-600 font-extrabold block uppercase">Lead Response Time</span>
                        <strong class="text-base text-emerald-700 font-extrabold mt-0.5 block">8.4 Mins</strong>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-sm">
                        <span class="text-[10px] text-slate-600 font-extrabold block uppercase">Meeting → Conv %</span>
                        <strong class="text-base text-emerald-700 font-extrabold mt-0.5 block">42%</strong>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-sm">
                        <span class="text-[10px] text-slate-600 font-extrabold block uppercase">Site Visit → Conv %</span>
                        <strong class="text-base text-emerald-700 font-extrabold mt-0.5 block">68%</strong>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-sm">
                        <span class="text-[10px] text-slate-600 font-extrabold block uppercase">Reactivation Rate</span>
                        <strong class="text-base text-amber-700 font-extrabold mt-0.5 block">14%</strong>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-sm">
                        <span class="text-[10px] text-slate-600 font-extrabold block uppercase">Repeat Client Rate</span>
                        <strong class="text-base text-blue-700 font-extrabold mt-0.5 block">22%</strong>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-sm">
                        <span class="text-[10px] text-slate-600 font-extrabold block uppercase">Top Rev / Source</span>
                        <strong class="text-base text-emerald-700 font-extrabold mt-0.5 block">Referral</strong>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-sm">
                        <span class="text-[10px] text-slate-600 font-extrabold block uppercase">Top Rev / Branch</span>
                        <strong class="text-base text-emerald-700 font-extrabold mt-0.5 block">Chennai</strong>
                    </div>
                </div>
            </section>

            <!-- REPORT SELECTION TAB BAR -->
            <div class="flex flex-wrap gap-2 mb-6 pb-3 border-b overflow-x-auto">
                ${[
                    ["MONTHLY_COUNTING", "Module 6: Monthly Counting"],
                    ["ENQUIRY_ANALYTICS", "1. Enquiry Analytics"],
                    ["CONVERSION_ANALYTICS", "2. Conversion Analytics"],
                    ["BRANCH_PERFORMANCE", "3. Branch Performance"],
                    ["TEAM_PERFORMANCE", "4. Team Performance"],
                    ["LEAD_SOURCE", "5. Lead Source Analytics"],
                    ["SERVICE_ANALYTICS", "6. Service Analytics"],
                    ["RES_VS_COMM", "7. Residential vs Commercial"],
                    ["LOCATION_ANALYTICS", "8. Location Analytics"],
                    ["PROJECT_SIZE", "9. Project Size Analytics"],
                    ["PACKAGE_ANALYTICS", "10. Package Analytics"],
                    ["FOLLOWUP_AGEING", "11. Follow-up Ageing & Analytics"],
                    ["LOST_ENQUIRY", "13. Lost Enquiry Report"],
                    ["FORECAST", "16. Forecast Dashboard"],
                    ["EXECUTIVE_DASH", "20. Executive Dashboard"]
                ].map(tab => `
                    <button class="btn ${activeReportTab === tab[0] ? "btn-primary" : "btn-outline"} text-xs py-1.5 px-3" onclick="activeReportTab='${tab[0]}';reportsView()">
                        ${tab[1]}
                    </button>
                `).join("")}
            </div>

            <!-- TAB CONTENT RENDERER -->
            ${renderReportTabContent()}
        </div>
    `;
}

function renderReportTabContent() {
    if (activeReportTab === "MONTHLY_COUNTING") {
        return `
            <section class="card p-6 space-y-6">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900">MODULE 6 — MONTHLY COUNTING DASHBOARD</h3>
                        <p class="label mt-0.5">Auto-calculated monthly performance metrics per branch</p>
                    </div>
                    <select class="select w-48 text-xs"><option>Chennai Branch</option><option>Coimbatore Branch</option></select>
                </div>
                <div class="grid grid-cols-2 lg:grid-cols-6 gap-3 text-center text-xs">
                    <div class="p-3.5 rounded-xl bg-slate-50 border"><span class="label block">Total Enquiries</span><strong class="text-xl font-bold text-slate-900 block mt-1">128</strong></div>
                    <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200"><span class="label block text-emerald-800">Converted</span><strong class="text-xl font-bold text-emerald-800 block mt-1">31</strong></div>
                    <div class="p-3.5 rounded-xl bg-red-50 border border-red-200"><span class="label block text-red-800">Cancelled</span><strong class="text-xl font-bold text-red-800 block mt-1">12</strong></div>
                    <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-200"><span class="label block text-blue-800">On Hold</span><strong class="text-xl font-bold text-blue-800 block mt-1">14</strong></div>
                    <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200"><span class="label block text-amber-900">Running Follow-ups</span><strong class="text-xl font-bold text-amber-900 block mt-1">71</strong></div>
                    <div class="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300"><span class="label block text-emerald-950">Conversion Rate</span><strong class="text-xl font-bold text-emerald-950 block mt-1">24.2%</strong></div>
                </div>

                <!-- LEAD SOURCE BREAKDOWN CHARTS (MODULE 6) -->
                <div>
                    <h4 class="font-bold text-slate-900 text-sm mb-3">Lead Source Breakdown</h4>
                    <div class="space-y-3 text-xs">
                        ${[
                            ["Google Search / Ads", "38 Enquiries", "30%", "#2563eb"],
                            ["Referral / Repeat Clients", "32 Enquiries", "25%", "#16a34a"],
                            ["Website Direct", "24 Enquiries", "19%", "#7c3aed"],
                            ["WhatsApp Business", "18 Enquiries", "14%", "#059669"],
                            ["Walk-in & Exhibition", "16 Enquiries", "12%", "#d97706"]
                        ].map(s => `
                            <div>
                                <div class="flex justify-between font-semibold mb-1">
                                    <span class="text-slate-800">${s[0]}</span>
                                    <span class="text-slate-600">${s[1]} (${s[2]})</span>
                                </div>
                                <div class="progress"><span style="width:${s[2]};background:${s[3]}"></span></div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </section>
        `;
    }

    if (activeReportTab === "ENQUIRY_ANALYTICS") {
        return `
            <section class="card p-6 space-y-6">
                <h3 class="text-lg font-bold text-slate-900">1. Enquiry Analytics Dashboard</h3>
                <p class="label">Daily, weekly, monthly, and yearly enquiry trends by branch & hour-wise distribution</p>
                <div class="grid md:grid-cols-4 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-slate-50 border"><span class="label">Daily Intake</span><b class="block text-lg font-bold mt-1 text-blue-600">16 / day</b></div>
                    <div class="p-4 rounded-xl bg-slate-50 border"><span class="label">Weekly Intake</span><b class="block text-lg font-bold mt-1 text-blue-600">112 / week</b></div>
                    <div class="p-4 rounded-xl bg-slate-50 border"><span class="label">Monthly Intake</span><b class="block text-lg font-bold mt-1 text-blue-600">480 / month</b></div>
                    <div class="p-4 rounded-xl bg-slate-50 border"><span class="label">Peak Hour</span><b class="block text-lg font-bold mt-1 text-blue-600">10:00 AM – 12:00 PM</b></div>
                </div>
            </section>
        `;
    }

    if (activeReportTab === "FOLLOWUP_AGEING") {
        return `
            <section class="card p-6 space-y-6">
                <h3 class="text-lg font-bold text-slate-900">12. Follow-up Ageing Buckets</h3>
                <p class="label">Distribution of active enquiries by follow-up age</p>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs">
                    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200"><span class="label text-emerald-800">0 – 7 Days</span><strong class="block text-xl font-bold text-emerald-800 mt-1">42 Leads</strong></div>
                    <div class="p-4 rounded-xl bg-blue-50 border border-blue-200"><span class="label text-blue-800">8 – 15 Days</span><strong class="block text-xl font-bold text-blue-800 mt-1">18 Leads</strong></div>
                    <div class="p-4 rounded-xl bg-amber-50 border border-amber-200"><span class="label text-amber-900">16 – 30 Days</span><strong class="block text-xl font-bold text-amber-900 mt-1">9 Leads</strong></div>
                    <div class="p-4 rounded-xl bg-orange-50 border border-orange-200"><span class="label text-orange-900">31 – 60 Days</span><strong class="block text-xl font-bold text-orange-900 mt-1">4 Leads</strong></div>
                    <div class="p-4 rounded-xl bg-red-50 border border-red-200"><span class="label text-red-800">60+ Days</span><strong class="block text-xl font-bold text-red-800 mt-1">2 Leads</strong></div>
                </div>
            </section>
        `;
    }

    return `
        <section class="card p-6 text-center py-12">
            <i data-lucide="file-bar-chart-2" class="w-10 h-10 mx-auto text-blue-600 mb-3"></i>
            <h3 class="text-lg font-bold text-slate-900">Report Engine Generated: ${activeReportTab.replace(/_/g, ' ')}</h3>
            <p class="text-xs text-slate-500 max-w-md mx-auto mt-1">Fully configured live CRM reporting analytics active for enterprise export.</p>
            <button class="btn btn-primary text-xs mt-4" onclick="toast('Report data exported to CSV/Excel.', 'file-spreadsheet')">Export Excel Report</button>
        </section>
    `;
}

// AUDIT TRAIL VIEW
function auditView() {
    content.innerHTML = `
        <div class="page">
            ${head("SYSTEM AUDIT LOG", "Immutable Activity Log")}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead><tr><th>Timestamp</th><th>User / Role</th><th>Action</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr>
                            <td class="text-slate-500 font-mono text-xs">12 Aug 2026 10:42 AM</td>
                            <td><b>Senthil Nathan (ASM)</b></td>
                            <td>Follow-up Added</td>
                            <td>Appended follow-up outcome for ENQ-1001</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

// USERS MANAGEMENT VIEW
function usersView() {
    content.innerHTML = `
        <div class="page">
            ${head("USER MANAGEMENT", "Organizational Users")}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead><tr><th>Role Name</th><th>Department</th><th>Branch Scope</th><th>Status</th></tr></thead>
                    <tbody>
                        ${Object.values(ROLE_CONFIG).map(x => `
                            <tr>
                                <td><b>${x.label}</b></td>
                                <td>${x.department}</td>
                                <td><span class="tag bg-slate-100 text-slate-700">${x.branchScope}</span></td>
                                <td><span class="tag bg-emerald-100 text-emerald-800">Active</span></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

// BRANCHES VIEW
function branchesView() {
    content.innerHTML = `
        <div class="page">
            ${head("BRANCH MANAGEMENT", "Operating Branches")}
            <div class="grid md:grid-cols-4 gap-4">
                ${BRANCHES.slice(1).map(b => `
                    <div class="card p-5">
                        <h3 class="font-bold text-slate-900">${b}</h3>
                        <span class="tag bg-emerald-100 text-emerald-800 mt-2">Active Branch</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

// ROLES & PERMISSIONS MATRIX VIEW
function rolesMatrixView() {
    const primaryRoleKeys = ["MD", "HEAD_OFFICE_ADMIN", "ENQUIRY", "TL", "ASM", "BM", "ACCOUNTS", "PROJECT"];
    const allRoles = Object.values(ROLE_CONFIG);

    content.innerHTML = `
        <div class="page">
            ${head("ROLE ACCESS CONTROL", "Enterprise Role Access Level Matrix", `
                <span class="tag bg-blue-100 text-blue-800 text-xs font-semibold">8 Core Role Models Active</span>
            `)}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Role & Title</th>
                            <th class="min-w-[280px]">Role Access Level & Description</th>
                            <th>Branch Scope</th>
                            <th class="text-center">View</th>
                            <th class="text-center">Create</th>
                            <th class="text-center">Edit</th>
                            <th class="text-center">Approve</th>
                            <th class="text-center">Export</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allRoles.map(x => {
                            const isPrimary = primaryRoleKeys.includes(x.id);
                            return `
                                <tr class="${isPrimary ? "bg-blue-50/30" : ""}">
                                    <td>
                                        <b class="text-slate-900 font-semibold block text-xs">${x.label}</b>
                                        <span class="text-[10px] text-slate-500 font-medium">${x.department}</span>
                                        ${isPrimary ? '<span class="tag bg-blue-100 text-blue-800 text-[9px] uppercase mt-1">Core Role</span>' : ''}
                                    </td>
                                    <td>
                                        <p class="text-xs text-slate-700 leading-snug font-medium">${x.description || "Custom role configuration"}</p>
                                    </td>
                                    <td>
                                        <span class="tag ${x.branchScope === "GLOBAL" ? "bg-purple-100 text-purple-800" : x.branchScope === "BRANCH" ? "bg-amber-100 text-amber-900" : x.branchScope === "FINANCIAL" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}">
                                            ${x.branchScope}
                                        </span>
                                    </td>
                                    <td class="text-center text-emerald-600 font-bold">✓</td>
                                    <td class="text-center">${x.permissions.some(p => p.includes("create") || p === "*") ? '<span class="text-emerald-600 font-bold">✓</span>' : '<span class="text-slate-300">✕</span>'}</td>
                                    <td class="text-center">${x.id === "ASM" ? '<span class="tag bg-amber-50 text-amber-700 text-[10px]">Restricted</span>' : x.permissions.some(p => p.includes("update") || p.includes("edit") || p === "*") ? '<span class="text-emerald-600 font-bold">✓</span>' : '<span class="text-slate-300">✕</span>'}</td>
                                    <td class="text-center">${x.permissions.some(p => p.includes("approve") || p === "*") ? '<span class="text-emerald-600 font-bold">✓</span>' : '<span class="text-slate-300">✕</span>'}</td>
                                    <td class="text-center">${x.id === "ASM" ? '<span class="tag bg-red-50 text-red-700 text-[10px]">🔒 Prohibited</span>' : '<span class="text-emerald-600 font-bold">✓</span>'}</td>
                                </tr>
                            `;
                        }).join("")}
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

// SECURITY & DEVICES VIEW
function securityView() {
    content.innerHTML = `
        <div class="page">
            ${head("SECURITY CONTROL", "Device Authorizations")}
            <div class="grid md:grid-cols-2 gap-6">
                <section class="card p-6">
                    <span class="tag bg-emerald-100 text-emerald-800 mb-2">Authorized Workstation</span>
                    <h3 class="font-bold text-slate-900 text-lg">Main Office Desktop</h3>
                    <p class="text-xs text-slate-500 mt-1">Chrome · Windows 11 · IP 182.74.91.12</p>
                </section>
                <section class="card p-6">
                    <span class="tag ${state.deviceApproved ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"} mb-2">
                        ${state.deviceApproved ? "Approved Device" : "Unauthorized Attempt"}
                    </span>
                    <h3 class="font-bold text-slate-900 text-lg">Samsung Galaxy S24</h3>
                    <p class="text-xs text-slate-500 mt-1">Mobile Login Attempt · Chennai Location</p>
                    ${state.deviceApproved ? `
                        <p class="text-xs text-emerald-700 font-bold mt-4">Device Approved by Admin ✓</p>
                    ` : `
                        <button class="btn btn-primary text-xs mt-4" onclick="approveDeviceAction()">Approve Device</button>
                    `}
                </section>
            </div>
        </div>
    `;
}

function approveDeviceAction() {
    state.deviceApproved = true;
    toast("Device Approved & Added to Security Log.", "shield-check");
    show("security");
}

// SETTINGS VIEW
function settingsView() {
    content.innerHTML = `
        <div class="page max-w-2xl">
            ${head("SYSTEM SETTINGS", "Global CRM Configuration")}
            <section class="card p-6 space-y-4">
                <div>
                    <label class="label block mb-1">Session Security Timeout</label>
                    <select class="select"><option>10 Minutes Inactivity</option><option>30 Minutes Inactivity</option></select>
                </div>
            </section>
        </div>
    `;
}

// DEMO CENTER VIEW
function demoCenterView() {
    return content.innerHTML = `
        <div class="page">
            ${head("ROLE-BASED CLIENT DEMO", "Guided Role Tour Center", `
                <button class="btn btn-primary text-xs" onclick="startRoleDemo()"><i data-lucide="play-circle" class="w-4 h-4"></i>Start Guided Demo Tour</button>
            `)}
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${Object.values(ROLE_CONFIG).map(r => `
                    <div class="card p-5 flex flex-col justify-between hover:border-blue-300 transition-colors">
                        <div>
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-slate-900 text-sm">${r.label}</h3>
                                <span class="tag ${r.branchScope === "GLOBAL" ? "bg-purple-100 text-purple-800" : r.branchScope === "BRANCH" ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700"} text-[10px]">
                                    ${r.branchScope}
                                </span>
                            </div>
                            <p class="text-xs text-slate-500 font-medium mt-0.5">${r.department}</p>
                            <div class="mt-3 p-2.5 rounded-lg bg-slate-50 border text-xs text-slate-700 leading-snug">
                                <b>Access Level:</b> ${r.description}
                            </div>
                        </div>
                        <button class="btn btn-secondary text-xs mt-4 w-full" onclick="switchRole('${r.id}')">Switch to ${r.shortLabel} View</button>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}
