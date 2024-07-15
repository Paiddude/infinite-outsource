const webinarLink = document.querySelectorAll(".webinar-link");
const TopBarLink =  document.querySelectorAll(".topbar-link");
    // regions
    // this is for all the region links
const regions = document.querySelectorAll(".regions");

// down from header section
const logoHome = document.querySelectorAll(".logo-home");
const bookkeeping = document.querySelectorAll(".bookkeeping-account-link");
const taxPreperation = document.querySelectorAll(".tax-prepare-outsource");
const auditInsurance = document.querySelectorAll(".audit-insurance");
const payrollCompliance = document.querySelectorAll(".payroll-compliance");
const maSupport = document.querySelectorAll(".ma-support");
const caseStudies = document.querySelectorAll(".case-studies");
const infographics = document.querySelectorAll(".infographics");
const ebooks = document.querySelectorAll(".ebooks");
const whitePaper = document.querySelectorAll(".white-paper");
const events = document.querySelectorAll(".events");
const companyOverview = document.querySelectorAll(".company-overview");
const pricing = document.querySelectorAll(".pricing");

//console.log(bookkeeping)

webinarLink.forEach(link => {
    link.href = "#";
});

TopBarLink.forEach(link => {
    link.href = "#";
});

/* regions.forEach(link => {
    link.href = "#";
}); */


logoHome.forEach(link => {
    link.href = "/";
});

bookkeeping.forEach(bookkeeping => {
   bookkeeping.href = "bookkeeping-account.html";
}); 

taxPreperation.forEach(link => {
    link.href = "tax-prepare-out.html";
});

auditInsurance.forEach(link => {
    link.href = "audit-asurrance.html";
});

payrollCompliance.forEach(link => {
    link.href = "payroll-compliance.html";
});

maSupport.forEach(link => {
    link.href = "ma-support.html";
});

caseStudies.forEach(link => {
    link.href = "case-studies.html";
});

infographics.forEach(link => {
    link.href = "infographics.html";
});

pricing.forEach(link => {
    link.href = "pricing.html";
});
