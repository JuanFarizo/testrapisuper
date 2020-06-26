<?php
require('_config.php');

if($_SERVER['REQUEST_METHOD']==='POST' && empty($_POST)) {
  $_POST = json_decode(file_get_contents('http://php://input'));
}

switch ($_POST['action']){


  // - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - //
  case 'newUpload':
    if($_FILES["file"]["name"] != '') {
      $file = $_FILES["file"];
      $var = getParams(['fileName', 'destinationURL']);
      $nameArray = explode('.', $file['name']);
      $ext = end($nameArray);
      $fileOrigin = $file["tmp_name"];
      $fileDestination = $var['destinationURL'] . $var['fileName'] .'.'. $ext;
      // dieError($_SERVER['HTTP_HOST']);
      if ($_SERVER['HTTP_HOST'] == 'localhost') {
        $fileDestination = '../../Dual/' . $fileDestination;
      } else {
        $fileDestination = $_SERVER['DOCUMENT_ROOT'] .'/'. $fileDestination;
      }

      $response = [];
      $response['fileOrigin'] = $fileOrigin;
      $response['fileDestination'] = $fileDestination;
      $response['ext'] = $ext;

      // dieError($fileOrigin);
      // dieError($fileDestination);
      if (move_uploaded_file($fileOrigin, $fileDestination)) {
        dieSuccess($response);
      } else {
        dieError($response);
      }
    }
    break; // END newUpload



} // END Giant Case of

desconectarDB($conn);

?>
