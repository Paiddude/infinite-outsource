var status_company = 1;
var status_hq = 1;
var status_office = 0;
var status_contact_number = 1;
var status_meeting_link = 0;
var status_contact_meeting = 1;
var status_email = 1;
var status_linkedin = 1;
var status_certificates = 1;
var element_companyName = document.getElementById('company-name');
var element_hqs = document.getElementById('hqs');
var element_localOffice = document.getElementById('local-office');
var element_contactNumber = document.getElementById('contact-number');
var element_meetingLink = document.getElementById('meeting-link');
var element_emailLink = document.getElementById('email-link');
var element_linkedIn = document.getElementById('linkedin');
var element_certificates = document.getElementById('certificates');
var contact_meeting_devider = document.getElementById('contact-meeting-devider');
var website_linkedin_devider = document.getElementById('website-linkedin-devider');
var tr_hq = document.getElementById('hq');
var tr_contactMeeting = document.getElementById('contact-meeting');
var tr_email = document.getElementById('email');
var tr_certificates = document.getElementById('certificates');
var tr_company = document.getElementById('company');
var tr_office = document.getElementById('office');
var tr_certificates = document.getElementById('certificates');
var logotext = '<td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:1px;padding-left:2px;font-size:0px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family: Segoe UI;line-height:15.0pt;color:#b92025;font-size:14.0pt;font-weight: normal;" id="company-name"><strong>Datamatics Business Solutions</strong></p></td>';
var logoimage = '<td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:5px;padding-left:2px;font-size:0px" id="company-logo"><img class="adapt-img" src="https://www.datamaticsbpm.com/wp-content/uploads/2023/10/Datamatics_logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="180" height="39"></td>';

function toggleThis(obj, se) {
    if (obj.checked && se == "designation") {
        document.getElementById('designation').setAttribute('style', 'border-collapse:collapse;')
    } else if (obj.checked == !1 && se == "designation") {
        document.getElementById('designation').setAttribute('style', 'border-collapse:collapse; display:none !important;')
    }
    if (obj.checked && se == '1' || obj.checked == !1 && se == '1') {
        tr_company.innerHTML = logotext;
        status_company = 1;
        document.getElementById('logoCheckbox2').checked = !1;
        document.getElementById('logoCheckbox1').checked = !0
    } else if (obj.checked && se == '2' || obj.checked == !1 && se == '2') {
        tr_company.innerHTML = logoimage;
        status_company = 2;
        document.getElementById('logoCheckbox2').checked = !0;
        document.getElementById('logoCheckbox1').checked = !1
    };
    if (obj.checked == !1 && se == "hq") {
        tr_hq.setAttribute('style', 'border-collapse:collapse; display:none !important;');
        status_hq = 0
    } else if (obj.checked && se == "hq") {
        tr_hq.setAttribute('style', 'border-collapse:collapse;');
        status_hq = 1
    };
    if (obj.checked == !1 && se == "office") {
        tr_office.setAttribute('style', 'border-collapse:collapse; display:none !important;');
        status_office = 0
    } else if (obj.checked && se == "office") {
        tr_office.setAttribute('style', 'border-collapse:collapse;');
        status_office = 1
    };
    if (obj.checked == !1 && se == "contact-number") {
        element_contactNumber.setAttribute('style', 'border-collapse:collapse; display:none !important;');
        status_contact_number = 0
    } else if (obj.checked && se == "contact-number") {
        element_contactNumber.setAttribute('style', 'border-collapse:collapse;');
        status_contact_number = 1
    };
    if (obj.checked == !1 && se == "meeting-link") {
        element_meetingLink.setAttribute('style', 'display:none !important;');
        status_meeting_link = 0
    } else if (obj.checked && se == "meeting-link") {
        element_meetingLink.setAttribute('style', '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#b90e18;font-size:9.0pt');
        status_meeting_link = 1
    };
    if (obj.checked == !1 && se == "email-link") {
        tr_email.setAttribute('style', 'display:none !important;');
        status_email = 0
    } else if (obj.checked && se == "email-link") {
        tr_email.setAttribute('style', '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:9.0pt');
        status_email = 1
    };
    if (obj.checked == !1 && se == "linkedin") {
        element_linkedIn.setAttribute('style', 'display:none !important;');
        status_linkedin = 0;
        website_linkedin_devider.setAttribute('style', 'display:none !important;')
    } else if (obj.checked && se == "linkedin") {
        element_linkedIn.setAttribute('style', '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:9.0pt');
        status_linkedin = 1;
        website_linkedin_devider.removeAttribute('style')
    };
    if (obj.checked == !1 && se == "certificates") {
        tr_certificates.setAttribute('style', 'border-collapse:collapse; display:none !important;');
        status_certificates = 0
    } else if (obj.checked && se == "certificates") {
        tr_certificates.setAttribute('style', 'border-collapse:collapse;');
        status_certificates = 1
    };
    if (status_contact_number == 1 && status_meeting_link == 1) {
        contact_meeting_devider.removeAttribute('style');
        tr_contactMeeting.setAttribute('style', 'border-collapse:collapse;')
    } else if (status_contact_number == 1 && status_meeting_link == 0) {
        contact_meeting_devider.setAttribute('style', 'display:none !important;');
        tr_contactMeeting.setAttribute('style', 'border-collapse:collapse;')
    } else if (status_contact_number == 0 && status_meeting_link == 1) {
        contact_meeting_devider.setAttribute('style', 'display:none !important;');
        tr_contactMeeting.setAttribute('style', 'border-collapse:collapse;')
    } else if (status_contact_number == 0 && status_meeting_link == 0) {
        tr_contactMeeting.setAttribute('style', 'display:none;')
    }
}
var options = ['Datamatics Business Solutions', 'Datamatics Business Solutions Ltd.', 'Datamatics Business Solutions Inc.', 'Datamatics Business Solutions UK Ltd.'];

function companyName(obj_self, obj_target) {
    if (document.getElementById('logoCheckbox1').checked == !0) {
        logotext = '<td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:1px;padding-left:2px;font-size:0px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family: Segoe UI;line-height:15.0pt;color:#b92025;font-size:14.0pt;font-weight: normal;" id="company-name">' + options[obj_self.value] + '</p></td>';
        company.innerHTML = logotext
    };
    if (obj_self.value == 0 && status_office == 1) {
        element_localOffice.innerHTML = '';
        document.getElementById('devider1').setAttribute('width', '330px');
        document.getElementById('devider2').setAttribute('style', 'padding:0;Margin:0;border-bottom:2px solid #b92025;background:unset;height:1px;width:330px;margin:0px;')
    };
    if (obj_self.value == 1 && status_office == 1) {
        element_localOffice.innerHTML = 'Local Office: Plot No B-5, Part B Cross Lane, MIDC, Andheri (East), Mumbai 400 093, India';
        document.getElementById('devider1').setAttribute('width', '410px');
        document.getElementById('devider2').setAttribute('style', 'padding:0;Margin:0;border-bottom:2px solid #b92025;background:unset;height:1px;width:410px;margin:0px;')
    };
    if (obj_self.value == 2 && status_office == 1) {
        element_localOffice.innerHTML = 'Local Office: 146 West, 29th Street, Ste 10W, New York, NY 10001';
        document.getElementById('devider1').setAttribute('width', '440px');
        document.getElementById('devider2').setAttribute('style', 'padding:0;Margin:0;border-bottom:2px solid #b92025;background:unset;height:1px;width:440px;margin:0px;')
    };
    if (obj_self.value == 3 && status_office == 1) {
        element_localOffice.innerHTML = 'Local Office: 153 Milton Keynes Business Centre, Foxhunter Drive, Linford Wood, Milton Keynes, Buckinghamshire, MK14 6GD, UK';
        document.getElementById('devider1').setAttribute('width', '100%');
        document.getElementById('devider2').setAttribute('style', 'padding:0;Margin:0;border-bottom:2px solid #b92025;background:unset;height:1px;width:100%;margin:0px;')
    }
}

function changeLink(obj, id) {
    document.getElementById(id).setAttribute('href', obj.value)
}

function changeValue(obj, id) {
    document.getElementById(id).innerHTML = obj.value;
    if (id == "address") {
        document.getElementById(id).innerHTML = obj.value + "<br>"
    };
    if (id == "local-office") {
        document.getElementById(id).innerHTML = 'Local Office: ' + obj.value + "<br>"
    };
    if (id == "email-link") {
        document.getElementById('email-link').setAttribute('href', 'mailto:' + obj.value)
    };
    if (id == "contact-number") {
        document.getElementById(id).innerHTML = 'Contact Number: ' + obj.value
    }
}
var head = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>Email Signature</title><!--[if (mso 16)]><style type="text/css">a {text-decoration: none;}</style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG></o:AllowPNG><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--><style type="text/css">#outlook a {padding:0;} .ExternalClass {width:100%;} .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height:100%;} .es-button {mso-style-priority:100!important; text-decoration:none!important;} a[x-apple-data-detectors] {color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important;} .es-desk-hidden {display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all;} @media only screen and (max-width:600px) {p, ul li, ol li, a {line-height:150%!important} h1, h2, h3, h1 a, h2 a, h3 a {line-height:120%!important} h1 {font-size:30px!important; text-align:center} h2 {font-size:26px!important; text-align:center} h3 {font-size:20px!important; text-align:center} .es-m-p5l { padding-left:5px!important }  .es-m-p5l { padding-left:5px!important }  .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {font-size:30px!important} .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {font-size:26px!important} .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {font-size:20px!important} .es-menu td a {font-size:13px!important} .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {font-size:16px!important} .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a {font-size:16px!important} .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {font-size:16px!important} .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {font-size:12.0pt!important} *[class="gmail-fix"] {display:none!important} .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {text-align:center!important} .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {text-align:right!important} .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {text-align:left!important} .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {display:inline!important} .es-button-border {display:block!important} a.es-button, button.es-button {font-size:16px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important} .es-btn-fw {border-width:10px 0px!important; text-align:center!important} .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right {width:100%!important} .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {width:100%!important; max-width:600px!important} .es-adapt-td {display:block!important; width:100%!important} .adapt-img {width:100%!important; height:auto!important} .es-m-p0 {padding:0!important} .es-m-p0r {padding-right:0!important} .es-m-p0l {padding-left:0!important} .es-m-p0t {padding-top:0!important} .es-m-p0b {padding-bottom:0!important} .es-m-p20b {padding-bottom:20px!important} .es-mobile-hidden, .es-hidden {display:none!important} tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important} tr.es-desk-hidden {display:table-row!important} table.es-desk-hidden {display:table!important} td.es-desk-menu-hidden {display:table-cell!important} .es-menu td {width:1%!important} table.es-table-not-adapt, .esd-block-html table {width:auto!important} table.es-social {display:inline-block!important} table.es-social td {display:inline-block!important} .es-desk-hidden {display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important} .es-m-p5 {padding:5px!important} .es-m-p5t {padding-top:5px!important} .es-m-p5b {padding-bottom:5px!important} .es-m-p5r {padding-right:5px!important} .es-m-p5l {padding-left:5px!important} .es-m-p10 {padding:10px!important} .es-m-p10t {padding-top:10px!important} .es-m-p10b {padding-bottom:10px!important} .es-m-p10r {padding-right:10px!important} .es-m-p10l {padding-left:10px!important} .es-m-p15 {padding:15px!important} .es-m-p15t {padding-top:15px!important} .es-m-p15b {padding-bottom:15px!important} .es-m-p15r {padding-right:15px!important} .es-m-p15l {padding-left:15px!important} .es-m-p20 {padding:20px!important} .es-m-p20t {padding-top:20px!important} .es-m-p20r {padding-right:20px!important} .es-m-p20l {padding-left:20px!important} .es-m-p25 {padding:25px!important} .es-m-p25t {padding-top:25px!important} .es-m-p25b {padding-bottom:25px!important} .es-m-p25r {padding-right:25px!important} .es-m-p25l {padding-left:25px!important} .es-m-p30 {padding:30px!important} .es-m-p30t {padding-top:30px!important} .es-m-p30b {padding-bottom:30px!important} .es-m-p30r {padding-right:30px!important} .es-m-p30l {padding-left:30px!important} .es-m-p35 {padding:35px!important} .es-m-p35t {padding-top:35px!important} .es-m-p35b {padding-bottom:35px!important} .es-m-p35r {padding-right:35px!important} .es-m-p35l {padding-left:35px!important} .es-m-p40 {padding:40px!important} .es-m-p40t {padding-top:40px!important} .es-m-p40b {padding-bottom:40px!important} .es-m-p40r {padding-right:40px!important} .es-m-p40l {padding-left:40px!important} }</style></head><body style="font-family:arial, \'helvetica neue\', helvetica, sans-serif;width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;margin:0;">';

function downloadInnerHtml(filename, elId, mimeType) {
    const mainContainer = document.getElementById(elId);
    const mainContent = mainContainer.cloneNode(!0);
    const hiddenElements = mainContent.querySelectorAll('[style*="display:none"], [style*="display:none !important"]');
    hiddenElements.forEach((element) => {
        element.remove()
    });
    document.getElementById('main2').innerHTML = head + mainContent.innerHTML + '</body></html>';
    console.log(head + mainContent.innerHTML + '</body></html>');
    var link = document.createElement('a');
    mimeType = mimeType || 'text/html';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(head + mainContent.innerHTML + '</body></html>'));
    link.click()
}

function download() {
    if (status_office != 1) {
        document.getElementById('main2').innerHTML = "";
        document.getElementById('devider1').setAttribute('width', '330px');
        document.getElementById('devider2').setAttribute('style', 'padding:0;Margin:0;border-bottom:2px solid #b92025;background:unset;height:1px;width:330px;margin:0px;')
    }
    downloadInnerHtml('signature.htm', 'main-content', 'text/html');
    var inputName = $('#inputName').val();
    var inputEmail = $('#inputEmail').val();
    if (inputName != "" && inputEmail != "") {
        $.ajax({
            type: 'POST',
            url: custom_ajax_obj.ajax_url,
            data: {
                action: 'custom_ajax_action',
                name: inputName,
                email: inputEmail
            },
            success: function(response) {
                console.log(response)
            }
        })
    }
}

function linkedinLink(obj, id) {
    document.getElementById(id).setAttribute('href', obj.value);
    alert('LinkedIn link updated.')
}

function websiteLink(obj, id) {
    document.getElementById(id).setAttribute('href', obj.value);
    document.getElementById(id).innerHTML = obj.value;
    alert('Website link updated.')
}