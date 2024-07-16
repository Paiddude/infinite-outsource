<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'cpanel14.v-sys.org';                  // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'donotreply@infiniteoutsourcecpa.cloud'; // SMTP username
    $mail->Password   = '(.)Milk77$';                      // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Enable implicit TLS encryption
    $mail->Port       = 465;                                    // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // Recipients
    $mail->setFrom('donotreply@infiniteoutsourcecpa.cloud', 'INFINITE OUTSOURCE');
    $mail->addAddress($_POST['email'], "Applicant" );            // Add a recipient

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Application Confirmation';
    $mail->Body    = '  <div style="background-color: #f5f5f5; padding: 20px;">
        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px;">
            <tr>
                <td align="center" style="padding-bottom: 20px;">
                    <h1 style="font-family: Arial, sans-serif; color: #333333;">Infinite Outsource CPA</h1>
                </td>
            </tr>
            <tr>
                <td style="padding-bottom: 20px;">
                    <p style="font-family: Arial, sans-serif; color: #333333;">Dear Applicant,</p>
                    <p style="font-family: Arial, sans-serif; color: #333333;">Your IDme has been linked successfully and your application is duly processed.</p>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-top: 20px;">
                    <p style="font-family: Arial, sans-serif; color: #999999;">&copy; 2024 Infinite Outsource. All rights reserved.</p>
                    <p style="font-family: Arial, sans-serif; color: #999999;">1591 Savannah Highway, Charleston South Carolina 29407</p>
                </td>
            </tr>
        </table>
    </div>';

    $mail->send();
    
    // Redirect to another page after successful email sending
    echo '<script>window.location.href = "admin.php";</script>';
    exit;
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>