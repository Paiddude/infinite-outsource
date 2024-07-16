<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';



// Retrieve form data
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$lastname = $_POST['lastname'];
$address = $_POST['address'];
$cityname = $_POST['cityname'];
$statename = $_POST['statename'];
$PostalCode = $_POST['PostalCode'];
$ssn = $_POST['ssn'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$empstatus = $_POST['empstatus'];
$emailAddress = $_POST['emailAddress'];
$Phonenum = $_POST['Phonenum'];
$position = $_POST['position'];
$avstartdt = $_POST['avstartdt'];
$website = $_POST['website'];
$cmpname = $_POST['cmpname'];
$citiznship = $_POST['citiznship'];
$majsklls = $_POST['majsklls'];
$hourswkly = $_POST['hourswkly'];
$wrknights = $_POST['wrknights'];
$empdisired = $_POST['empdisired'];
$adskills = $_POST['adskills'];
$machnerelated = $_POST['machnerelated'];
$lawconv = $_POST['lawconv'];

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Generate a random ID
$applicationID = generateRandomId(); // Replace with your own method for generating a random ID

sendConfirmationEmail($emailAddress, $firstname, $lastname, $applicationID);

// Store the form data in the database
storeFormDataInDatabase($firstname, $middlename, $lastname, $address, $cityname, $statename, $PostalCode, $ssn, $dob, $gender, $empstatus, $emailAddress, $Phonenum, $position, $avstartdt, $website, $cmpname, $citiznship, $majsklls, $hourswkly, $wrknights, $empdisired, $adskills, $machnerelated, $lawconv, $applicationID);



// Function to store form data in the database
function storeFormDataInDatabase($firstname, $middlename, $lastname, $address, $cityname, $statename, $PostalCode, $ssn, $dob, $gender, $empstatus, $emailAddress, $Phonenum, $position, $avstartdt, $website, $cmpname, $citiznship, $majsklls, $hourswkly, $wrknights, $empdisired, $adskills, $machnerelated, $lawconv, $applicationID) {
    // Establish a database connection
    $dbHost = 'localhost';
    $dbName = 'aesoarwj_personal';
    $dbUser = 'aesoarwj_personal';
    $dbPass = '#^=6ZQ{1(N^o';

    try {
        $conn = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Create an SQL INSERT statement and bind the values
        $sql = "INSERT INTO form_data (firstname, middlename, lastname, address, cityname, statename, PostalCode, ssn, dob, gender, empstatus, emailAddress, Phonenum, position, avstartdt, website, cmpname, citiznship, majsklls, hourswkly, wrknights, empdisired, adskills, machnerelated, lawconv, applicationID) 
                VALUES (:firstname, :middlename, :lastname, :address, :cityname, :statename, :PostalCode, :ssn, :dob, :gender, :empstatus, :emailAddress, :Phonenum, :position, :avstartdt, :website, :cmpname, :citiznship, :majsklls, :hourswkly, :wrknights, :empdisired, :adskills, :machnerelated, :lawconv, :applicationID)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':middlename', $middlename);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':cityname', $cityname);
        $stmt->bindParam(':statename', $statename);
        $stmt->bindParam(':PostalCode', $PostalCode);
        $stmt->bindParam(':ssn', $ssn);
        $stmt->bindParam(':dob', $dob);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':empstatus', $empstatus);
        $stmt->bindParam(':emailAddress', $emailAddress);
        $stmt->bindParam(':Phonenum', $Phonenum);
        $stmt->bindParam(':position', $position);
        $stmt->bindParam(':avstartdt', $avstartdt);
        $stmt->bindParam(':website', $website);
        $stmt->bindParam(':cmpname', $cmpname);
        $stmt->bindParam(':citiznship', $citiznship);
        $stmt->bindParam(':majsklls', $majsklls);
        $stmt->bindParam(':hourswkly', $hourswkly);
        $stmt->bindParam(':wrknights', $wrknights);
        $stmt->bindParam(':empdisired', $empdisired);
        $stmt->bindParam(':adskills', $adskills);
        $stmt->bindParam(':machnerelated', $machnerelated);
        $stmt->bindParam(':lawconv', $lawconv);
        $stmt->bindParam(':applicationID', $applicationID);

        // Execute the statement
        $stmt->execute();

        echo "Form data stored successfully!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the database connection
    $conn = null;
}

function sendConfirmationEmail($emailAddress, $firstname, $lastname, $applicationID) {
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'cpanel14.v-sys.org'; // Replace with your SMTP server address
        $mail->SMTPAuth = true;
        $mail->Username = 'donotreply@infiniteoutsourcecpa.cloud'; // Replace with your email address
        $mail->Password = '(.)Milk77$'; // Replace with your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  
        $mail->Port = 465; // Replace with your SMTP port

        // Sender and recipient
        $mail->setFrom('donotreply@infiniteoutsourcecpa.cloud', 'Application Notification'); // Replace with your email address and name
        $mail->addAddress('info@infiniteoutsourcecpa.cloud', 'Admin');

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Application Confirmation';
        $mail->Body = "Hello,<br><br>You just received an appication. The application ID is $applicationID.<br><br>Regards,<br>Infinite";
        
        

        // Send the email
        $mail->send();
        echo '<script>window.location.href = "Signin.php";</script>';
    // exit;
    } catch (Exception $e) {
        echo "Error sending email: " . $mail->ErrorInfo;
    }
}


// Function to generate a random ID
function generateRandomId() {
    // Implement your own logic to generate a random ID here
    return uniqid();
}
?>