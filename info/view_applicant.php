<?php
// Establish database connection (replace with your credentials)
$dbHost = 'localhost';
$dbName = 'aesoarwj_personal';
    $dbUser = 'aesoarwj_personal';
    $dbPass = '#^=6ZQ{1(N^o';

// Get the application ID from the URL parameter
$applicationID = $_GET['id'];

try {
    $conn = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Step 5: Fetch applicant information
    $query = "SELECT * FROM form_data WHERE applicationID = :applicationID";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':applicationID', $applicationID);
    $stmt->execute();
    $applicantInfo = $stmt->fetch(PDO::FETCH_ASSOC);

    // Display applicant information
    if ($applicantInfo) {
        // Format and display the applicant information
        echo "Application ID: " . $applicantInfo['applicationID'] . "<br>";
        echo "First Name: " . $applicantInfo['firstname'] . "<br>";
        echo "Middle Name: " . $applicantInfo['middlename'] . "<br>";
        echo "Last Name: " . $applicantInfo['lastname'] . "<br>";
        echo "Address: " . $applicantInfo['address'] . "<br>";
        echo "City Name: " . $applicantInfo['cityname'] . "<br>";
        echo "State Name: " . $applicantInfo['statename'] . "<br>";
        echo "Postal Code: " . $applicantInfo['PostalCode'] . "<br>";
        echo "SSN: " . $applicantInfo['ssn'] . "<br>";
        echo "Date of Birth: " . $applicantInfo['dob'] . "<br>";
        echo "Gender: " . $applicantInfo['gender'] . "<br>";
        echo "Employment Status: " . $applicantInfo['empstatus'] . "<br>";
        echo "Email Address: " . $applicantInfo['emailAddress'] . "<br>";
        echo "Phone Number: " . $applicantInfo['Phonenum'] . "<br>";
        echo "Position: " . $applicantInfo['position'] . "<br>";
        echo "Available Start Date: " . $applicantInfo['avstartdt'] . "<br>";
        echo "Website: " . $applicantInfo['website'] . "<br>";
        echo "Company Name: " . $applicantInfo['cmpname'] . "<br>";
        echo "Citizenship: " . $applicantInfo['citiznship'] . "<br>";
        echo "Major Skills: " . $applicantInfo['majsklls'] . "<br>";
        echo "Hours weekly: " . $applicantInfo['hourswkly'] . "<br>";
        echo "Work Nights: " . $applicantInfo['wrknights'] . "<br>";
        echo "Employment Desired: " . $applicantInfo['empdisired'] . "<br>";
        echo "Additional Skills: " . $applicantInfo['adskills'] . "<br>";
        echo "Operatable Machine: " . $applicantInfo['machnerelated'] . "<br>";
        echo "Law Conviction: " . $applicantInfo['lawconv'] . "<br>";
        
         echo '<form method="post" action="send_email.php">';
        echo '<input type="hidden" name="email" value="' . $applicantInfo['emailAddress'] . '">';
        echo '<input type="submit" value="Send Email">';
        echo '</form>';
        // ... Display other fields as needed
    } else {
        echo "No applicant found with the provided ID.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>