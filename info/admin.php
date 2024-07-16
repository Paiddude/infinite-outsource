<!DOCTYPE html>
<html>
<head>
  <style>
    /* Center align the content */
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      
    }

    /* Style the header */
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* Style the application links */
    a {
      display: block;
      margin-bottom: 10px;
      font-size: 25px !important;
    }
  </style>
</head>
<body>
  <h1>Application Submissions</h1>

  <?php
  // Establish database connection (replace with your credentials)
  $dbHost = 'localhost';
  $dbName = 'aesoarwj_personal';
  $dbUser = 'aesoarwj_personal';
  $dbPass = '#^=6ZQ{1(N^o';

  try {
      $conn = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      // Step 2: Retrieve application IDs
      $query = "SELECT DISTINCT applicationID FROM form_data";
      $stmt = $conn->prepare($query);
      $stmt->execute();
      $applicationIDs = $stmt->fetchAll(PDO::FETCH_COLUMN);

      // Display the application IDs
      foreach ($applicationIDs as $applicationID) {
          echo '<a href="view_applicant.php?id=' . urlencode($applicationID) . '">' . $applicationID . '</a><br>';
      }
  } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
  }

  // Close the database connection
  $conn = null;
  ?>
</body>
</html>