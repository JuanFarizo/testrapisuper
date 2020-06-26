<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// getBranch

// modifyBranch

  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getBranch':
    $q = $defaultQuery;
    $v = getParams([], ['branchID', 'isActive']);
    $q[0] =
    'SELECT
      branches.*
      ,cities.name AS city
    FROM branches
    INNER JOIN cities ON cities.id = branches.cityID
    ';
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['branchID'], ' AND branches.id = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['isActive'], ' AND branches.isActive = ?', 'i', $v['isActive']);
    // FINISH
    // dieError($q);
    executeQuery($q);



/* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */

  case 'modifyBranch':
    $q = $defaultQuery;
    $v = getParams(
      ['branchID'],
      [
         'name'
        ,'cityID'
        ,'usesStock'
        ,'managerEmployeeID'
        ,'branchType'
        ,'isStoreOpen'
        ,'isStockWorking'
        ,'headerMsg'
        ,'address'
        ,'minimumPurchase'
        ,'isActive'
      ]
    );
    $q[0] =
      "UPDATE branches
      SET
    ";
    $q = dQ($q, $v['branchID'], ' id = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['name'], ', name = ?', 'i', $v['name']);
    $q = dQ($q, $v['cityID'], ', cityID = ?', 'i', $v['cityID']);
    $q = dQ($q, $v['usesStock'], ', usesStock = ?', 'i', $v['usesStock']);
    $q = dQ($q, $v['managerEmployeeID'], ', managerEmployeeID = ?', 'i', $v['managerEmployeeID']);
    $q = dQ($q, $v['branchType'], ', branchType = ?', 'i', $v['branchType']);
    $q = dQ($q, $v['isStoreOpen'], ', isStoreOpen = ?', 'i', $v['isStoreOpen']);
    $q = dQ($q, $v['isStockWorking'], ', isStockWorking = ?', 'i', $v['isStockWorking']);
    $q = dQ($q, $v['headerMsg'], ', headerMsg = ?', 's', $v['headerMsg']);
    $q = dQ($q, $v['address'], ', address = ?', 's', $v['address']);
    $q = dQ($q, $v['minimumPurchase'], ', minimumPurchase = ?', 'd', $v['minimumPurchase']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['branchID'], ' AND id   = ?', 'i', $v['branchID']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




} // END Giant Case of

desconectarDB($conn);

?>
