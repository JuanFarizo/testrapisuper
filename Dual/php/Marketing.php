<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// getMarketingCampain

  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getMarketingCampain':
    $q = $defaultQuery;
    $v = getParams(['branchID'], ['isActive']);
    $q[0] =
    'SELECT
      campains.*
      ,media.mediaName
      ,media.managerName AS mediaManagerName
      ,media_types.name AS medidaType
      FROM marketing_campains AS campains
      INNER JOIN marketing_media AS media ON media.id = campains.mediaID
      INNER JOIN marketing_media_types AS media_types ON media_types.id = media.typeID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['branchID'], ' AND campains.branchID = ?', 'i', $v['branchID']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;


} // END Giant Case of

desconectarDB($conn);

?>
