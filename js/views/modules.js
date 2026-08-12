// ==========================================
// MODULE VIEW RENDERERS
// ==========================================

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
            <div class="text-center p-4">
                <div class="w-14 h-14 rounded-2xl mx-auto bg-emerald-50 text-emerald-600 grid place-items-center mb-3">
                    <i data-lucide="check-circle-2" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Enquiry Created & Auto-Assigned!</h3>
                <p class="text-xs text-slate-500 mt-1">The CRM auto-assignment engine has processed this record.</p>
                <div class="mt-5 text-left text-xs bg-slate-50 p-4 rounded-xl space-y-2 border">
                    <div class="flex justify-between"><span>Enquiry ID:</span><b class="text-blue-600 font-mono">${newId}</b></div>
                    <div class="flex justify-between"><span>Assigned Branch:</span><b>${newObj.branch}</b></div>
                    <div class="flex justify-between"><span>Assigned Design TL:</span><b>${newObj.tl}</b></div>
                    <div class="flex justify-between"><span>Assigned ASM:</span><b>${newObj.asm}</b></div>
                    <div class="flex justify-between text-emerald-700 font-bold"><span>10-Min SLA Timer:</span><span>ACTIVE (Green)</span></div>
                </div>
                <button class="btn btn-primary w-full mt-6" onclick="closeOverlay();show('enquiries')">Return to Enquiries Table</button>
            </div>
        `);
    };
}

// LEADS TIMELINE VIEW
function leadsView() {
    const rows = getScopedEnquiries();
    const lead = rows[0] || state.enquiries[0];

    content.innerHTML = `
        <div class="page">
            ${head("CLIENT TIMELINE & LEADS", lead.client, `
                <button class="btn btn-outline text-xs" onclick="show('followups')"><i data-lucide="history" class="w-4 h-4"></i>Follow-up History</button>
                ${canCreate("meetings") ? `<button class="btn btn-primary text-xs" onclick="show('meetings')">Schedule Meeting</button>` : ""}
            `)}
            <div class="grid lg:grid-cols-3 gap-6">
                <section class="card p-6 lg:col-span-2">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="tag bg-blue-100 text-blue-800 text-xs font-semibold">${lead.service}</span>
                            <h3 class="text-xl font-bold text-slate-900 mt-2">${lead.project}</h3>
                            <p class="text-xs text-slate-500 mt-0.5">Enquiry ID: <span class="font-mono text-blue-600 font-bold">${lead.id}</span></p>
                        </div>
                        <span class="tag bg-emerald-100 text-emerald-800 text-xs">${lead.status}</span>
                    </div>

                    <div class="grid md:grid-cols-3 gap-4 mt-6 pt-5 border-t text-xs">
                        <div><p class="label">Branch</p><b>${lead.branch}</b></div>
                        <div><p class="label">Assigned TL</p><b>${lead.tl}</b></div>
                        <div><p class="label">Assigned ASM</p><b>${lead.asm}</b></div>
                        <div><p class="label">Estimated Value</p><b class="text-blue-600 text-sm">${money(lead.value)}</b></div>
                        <div><p class="label">SLA Status</p><span class="tag bg-emerald-100 text-emerald-800">GREEN</span></div>
                        <div><p class="label">Source</p><b>${lead.source}</b></div>
                    </div>

                    <div class="mt-8">
                        <h3 class="font-bold text-slate-900 text-sm">Audit Activity Timeline</h3>
                        <div class="mt-4 space-y-4 text-xs">
                            ${[
                                ["Enquiry Created & Auto-Assigned", "Auto Engine", "10 mins ago"],
                                ["Assigned to Chennai Branch / Rajesh Kumar (TL)", "System Routing", "10 mins ago"],
                                ["10-Minute Response SLA Timer Fired", "SLA Engine", "9 mins ago"],
                                ["Client Call Initiated & Requirements Captured", "Senthil Nathan (ASM)", "5 mins ago"]
                            ].map((x, i) => `
                                <div class="flex gap-3">
                                    <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 grid place-items-center font-bold text-[10px]">${i + 1}</span>
                                    <div>
                                        <strong class="text-slate-800 block text-xs">${x[0]}</strong>
                                        <span class="text-[11px] text-slate-500">${x[1]} · ${x[2]}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </section>

                <aside class="card p-6">
                    <h3 class="font-bold text-slate-900 text-sm">Access Scope Info</h3>
                    <div class="mt-4 p-4 rounded-xl bg-slate-50 border text-xs space-y-2">
                        <div class="flex justify-between"><span class="text-slate-500">Current Role:</span><b>${ROLE_CONFIG[role].shortLabel}</b></div>
                        <div class="flex justify-between"><span class="text-slate-500">Scoped Enquiries:</span><b class="text-blue-600">${rows.length} visible</b></div>
                    </div>
                </aside>
            </div>
        </div>
    `;
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

// FOLLOW-UPS VIEW
function followupsView() {
    const isASM = role === "ASM";
    content.innerHTML = `
        <div class="page">
            ${head("SALES FOLLOW-UPS", "Follow-up Management", `
                <button class="btn btn-primary text-xs" onclick="addFollowupModal()"><i data-lucide="plus" class="w-4 h-4"></i>Add New Follow-up</button>
            `)}
            <div class="grid lg:grid-cols-3 gap-5">
                <section class="card p-5">
                    <div class="flex justify-between items-center"><h3 class="font-bold text-xs uppercase text-red-600">OVERDUE</h3><span class="tag bg-red-100 text-red-800">02</span></div>
                    <p class="mt-4 text-xs font-semibold text-slate-800">Nandhini Estates — Quotation Call</p>
                </section>
                <section class="card p-5">
                    <div class="flex justify-between items-center"><h3 class="font-bold text-xs uppercase text-amber-600">DUE TODAY</h3><span class="tag bg-amber-100 text-amber-800">05</span></div>
                    <p class="mt-4 text-xs font-semibold text-slate-800">John Mathews — Requirement Review</p>
                </section>
                <section class="card p-5">
                    <div class="flex justify-between items-center"><h3 class="font-bold text-xs uppercase text-blue-600">UPCOMING</h3><span class="tag bg-blue-100 text-blue-800">12</span></div>
                    <p class="mt-4 text-xs font-semibold text-slate-800">Dr. Swaminathan — Site Inspection</p>
                </section>
            </div>

            <section class="card p-6 mt-6 max-w-4xl">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="font-bold text-slate-900">IMMUTABLE FOLLOW-UP HISTORY LOG</h3>
                        <p class="label mt-0.5">Previous follow-up entries cannot be modified or deleted.</p>
                    </div>
                    ${isASM ? `<button class="btn btn-danger text-xs" onclick="restrictedHistoryAlert()">Attempt Edit Historical Entry</button>` : ""}
                </div>
                <div class="mt-6 space-y-4 text-xs">
                    ${[
                        ["12 Aug 2026 · 10:42 AM", "Senthil Nathan (ASM)", "Client requested quotation revision. Needs approval."],
                        ["10 Aug 2026 · 03:15 PM", "Senthil Nathan (ASM)", "Initial phone discussion completed. Requirements noted."]
                    ].map(x => `
                        <div class="p-3 rounded-xl bg-slate-50 border">
                            <div class="flex justify-between text-slate-500 font-mono text-[11px]">
                                <span>${x[0]}</span>
                                <b>${x[1]}</b>
                            </div>
                            <p class="text-slate-800 font-medium mt-1">${x[2]}</p>
                        </div>
                    `).join("")}
                </div>
            </section>
        </div>
    `;
}

function restrictedHistoryAlert() {
    openModal(`
        <div class="text-center p-4">
            <div class="w-14 h-14 rounded-2xl mx-auto bg-red-50 text-red-600 grid place-items-center mb-3">
                <i data-lucide="lock" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Permission Restricted</h3>
            <p class="text-xs text-slate-600 mt-2">
                Historical CRM follow-up records are immutable for Assistant Branch Managers (ASM). You can only append NEW follow-up entries.
            </p>
            <button class="btn btn-primary w-full mt-6" onclick="closeOverlay();addFollowupModal()">Add New Follow-up Entry</button>
        </div>
    `);
}

function addFollowupModal() {
    openModal(`
        <form id="followupForm" class="p-2 space-y-4">
            <h3 class="text-lg font-bold text-slate-900">Add New Follow-up Entry</h3>
            <div>
                <label class="label block mb-1">Follow-up Outcome & Action</label>
                <input id="fOutcome" class="input" required value="Client requested revised quotation with premium fixtures." />
            </div>
            <div class="pt-4 flex justify-end gap-2">
                <button type="button" class="btn btn-outline text-xs" onclick="closeOverlay()">Cancel</button>
                <button type="submit" class="btn btn-primary text-xs">Save Follow-up</button>
            </div>
        </form>
    `);
    $("#followupForm").onsubmit = e => {
        e.preventDefault();
        closeOverlay();
        toast("New follow-up entry appended to historical log.", "history");
        show("followups");
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
                        <input class="input font-mono font-bold text-slate-900" value="${state.revisionApproved ? "₹82,00,000" : "₹85,00,000"}" ${isBM ? "readonly" : ""} />
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
                                <b class="text-blue-600">${state.revisionApproved ? "₹82,00,000" : "₹85,00,000"}</b>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6">
                        ${isBM ? `
                            <button class="btn btn-primary w-full py-2.5 text-xs" onclick="requestQuotationRevision()">
                                ${state.revisionApproved ? "Revision Approved ✓" : "Submit Revision Request (BM → Admin)"}
                            </button>
                        ` : `
                            <button class="btn btn-primary w-full py-2.5 text-xs" onclick="show('jobcards')">Convert to Job Card</button>
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

// JOB CARDS VIEW
function jobcardsView() {
    const list = getScopedJobCards();
    content.innerHTML = `
        <div class="page">
            ${head("OPERATIONAL JOB CARDS", "Active Job Cards", "")}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Job Card #</th>
                            <th>Client Name</th>
                            <th>Project</th>
                            <th>Branch</th>
                            <th>Project Value</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${list.map(x => `
                            <tr>
                                <td><span class="font-mono font-bold text-xs text-blue-600">${x.id}</span></td>
                                <td><b>${x.client}</b></td>
                                <td>${x.project}</td>
                                <td>${x.branch}</td>
                                <td class="font-bold">${money(x.value)}</td>
                                <td><span class="tag bg-emerald-100 text-emerald-800">${x.status}</span></td>
                                <td>
                                    <button class="btn btn-outline py-1 px-2.5 text-xs" onclick="show('projects')">Open Project</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

// PAYMENTS VIEW
function paymentsView() {
    const isAccounts = role === "ACCOUNTS";
    content.innerHTML = `
        <div class="page">
            ${head("FINANCE WORKFLOW", "Payments & Collections", isAccounts ? `
                <button class="btn btn-primary text-xs" onclick="recordPaymentAction()"><i data-lucide="plus" class="w-4 h-4"></i>Record 2nd Milestone Payment</button>
            ` : "")}
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

// NOTIFICATIONS VIEW
function notificationsView() {
    const list = ROLE_CONFIG[role].notifications || [];
    content.innerHTML = `
        <div class="page">
            ${head("NOTIFICATIONS", "Role Notifications Queue")}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead><tr><th>Time</th><th>Notification Event</th><th>Category</th></tr></thead>
                    <tbody>
                        ${list.map((n, i) => `
                            <tr>
                                <td class="text-slate-500 text-xs">${10 - i}:00 AM</td>
                                <td><b>${n}</b></td>
                                <td><span class="tag bg-blue-50 text-blue-700">Role Workflow</span></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </section>
        </div>
    `;
}

// REPORTS & ANALYTICS VIEW
function reportsView() {
    const reportsList = ROLE_CONFIG[role].reports || [];
    content.innerHTML = `
        <div class="page">
            ${head("AUTHORIZED REPORTS", "Reports & Analytics")}
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${reportsList.map(r => `
                    <section class="card p-5">
                        <i data-lucide="file-bar-chart" class="w-6 h-6 text-blue-600 mb-2"></i>
                        <h3 class="font-bold text-slate-900 text-sm">${r}</h3>
                        <p class="text-xs text-slate-500 mt-1">Export role-scoped reporting data.</p>
                        <button class="btn btn-secondary text-xs mt-4 w-full" onclick="toast('${r} Report Generated.', 'file-text')">Generate Report</button>
                    </section>
                `).join("")}
            </div>
        </div>
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
    content.innerHTML = `
        <div class="page">
            ${head("ROLE ACCESS CONTROL", "Visual Permission Matrix")}
            <section class="card overflow-x-auto">
                <table class="table">
                    <thead><tr><th>Role</th><th>Branch Scope</th><th>View</th><th>Create</th><th>Edit</th><th>Approve</th><th>Export</th></tr></thead>
                    <tbody>
                        ${Object.values(ROLE_CONFIG).map(x => `
                            <tr>
                                <td><b>${x.shortLabel}</b></td>
                                <td>${x.branchScope}</td>
                                <td>✓</td>
                                <td>${x.permissions.some(p => p.includes("create") || p === "*") ? "✓" : "✕"}</td>
                                <td>${x.id === "ASM" ? "Restricted" : "✓"}</td>
                                <td>${x.permissions.some(p => p.includes("approve") || p === "*") ? "✓" : "✕"}</td>
                                <td>${x.id === "ASM" ? "🔒 Prohibited" : "✓"}</td>
                            </tr>
                        `).join("")}
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
    content.innerHTML = `
        <div class="page">
            ${head("ROLE-BASED CLIENT DEMO", "Guided Role Tour Center", `
                <button class="btn btn-primary text-xs" onclick="startRoleDemo()"><i data-lucide="play-circle" class="w-4 h-4"></i>Start Guided Demo Tour</button>
            `)}
            <div class="grid md:grid-cols-3 gap-4">
                ${Object.values(ROLE_CONFIG).map(r => `
                    <div class="card p-5 flex flex-col justify-between">
                        <div>
                            <h3 class="font-bold text-slate-900 text-sm">${r.label}</h3>
                            <p class="text-xs text-slate-500 mt-1">${r.department} · ${r.branchScope} Scope</p>
                        </div>
                        <button class="btn btn-secondary text-xs mt-4 w-full" onclick="switchRole('${r.id}')">View Role Dashboard</button>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}
