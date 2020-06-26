<?php
function getInfoDB($subdomain) {
  switch ($subdomain) {
    case 'localhost':
      $server   = "localhost";
      $user  = "root";
      $pass  = "";
      $database = "rapisuper";
      break;

    case 'test':
      $server   = "localhost";
      $user  = "rapisuper";
      $pass  = "sjde@sd25f8AKs_e";
      $database = "rapisuper_test";
      break;

    case 'demo':
      $server   = "localhost";
      $user  = "rapisuper";
      $pass  = "sjde@sd25f8AKs_e";
      $database = "rapisuper_demo";
      break;

    default:
      $server   = "localhost";
      $user  = "rapisuper";
      $pass  = "sjde@sd25f8AKs_e";
      $database = "rapisuper";
      break;
  } // switch
  
  $result = [
    'server' => $server,
    'user' => $user,
    'pass' => $pass,
    'database' => $database,
  ];
  return $result;
}







?>
