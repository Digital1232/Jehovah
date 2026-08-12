// ==========================================
// DYNAMIC CENTRALIZED RBAC PERMISSION ENGINE
// ==========================================
function getRolePerms() {
    return ROLE_CONFIG[role].permissions || [];
}

function hasPermission(perm) {
    const perms = getRolePerms();
    if (perms.includes("*")) return true;
    return perms.includes(perm);
}

function canView(moduleName) {
    if (role === "PROJECT" && ["enquiries", "new-enquiry"].includes(moduleName)) return false;
    if (role === "REAL_ESTATE" && moduleName === "packages") return false;
    if (role === "INTERIOR" && moduleName === "packages") return false;
    return hasPermission(`${moduleName}.view`) || hasPermission("*");
}

function canCreate(moduleName) { 
    return hasPermission(`${moduleName}.create`) || hasPermission("*"); 
}

function canEdit(moduleName) { 
    if (role === "ASM" && moduleName === "followups_history") return false; // ASM historical immutable
    return hasPermission(`${moduleName}.edit`) || hasPermission(`${moduleName}.update`) || hasPermission("*"); 
}

function canDelete(moduleName) { 
    return hasPermission(`${moduleName}.delete`) || hasPermission("*"); 
}

function canApprove(moduleName) { 
    return hasPermission(`${moduleName}.approve`) || hasPermission("*"); 
}

function canExport(moduleName) { 
    if (role === "ASM") return false; // ASM strictly prohibited from exports
    return hasPermission(`${moduleName}.export`) || hasPermission("export.data") || hasPermission("*"); 
}

function canModifyPackage() { 
    return hasPermission("package.modify") || hasPermission("*"); 
}

function canApprovePayment() { 
    return hasPermission("payment.approve") || hasPermission("*"); 
}

function canApproveQuotation() { 
    return hasPermission("quotation.approve") || hasPermission("*"); 
}
