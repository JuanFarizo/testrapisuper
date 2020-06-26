<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// addShippingTime
// addShippingTimeItem

// getShippingTime
// getShippingTimeItem

// modifyShippingTime
// modifyShippingTimeItem

  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */

  case 'addShippingTime':
    $q = $defaultQuery;
    $v = getParams([
       'branchID'
      ,'name'
      ,'timeRangeDefault'
      ,'datetimeCreated'
      ,'creatorEmployeeID'
    ]);
    $q[0] =
      "INSERT INTO shipping_times SET
       branchID          = ?
      ,name              = ?
      ,timeRangeDefault  = ?
      ,datetimeCreated   = ?
      ,creatorEmployeeID = ?
    ";
    $q = dQ($q, $v['branchID'], '', 'i', $v['branchID']);
    $q = dQ($q, $v['name'], '', 's', $v['name']);
    $q = dQ($q, $v['timeRangeDefault'], '', 'i', $v['timeRangeDefault']);
    $q = dQ($q, $v['datetimeCreated'], '', 's', $v['datetimeCreated']);
    $q = dQ($q, $v['creatorEmployeeID'], '', 'i', $v['creatorEmployeeID']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;



  case 'addShippingTimeItem':
    $q = $defaultQuery;
    $v = getParams(['shippingTimeID']);
    $q[0] =
      "INSERT INTO shipping_times_items SET shippingTimeID = ?
    ";
    $q = dQ($q, $v['shippingTimeID'], '', 'i', $v['shippingTimeID']);
    // FINISH
    executeQuery($q);
    break;



  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getShippingTime':
    $q = $defaultQuery;
    $v = getParams([], ['branchID', 'shippingTimeID', 'isActive']);
    $q[0] = "SELECT
      shipping_times.*
      ,CONCAT(employees.name, ' ', employees.surname) AS creatorEmployee
    FROM shipping_times
    INNER JOIN employees ON employees.id = shipping_times.creatorEmployeeID
    ";
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['branchID'], ' AND shipping_times.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['shippingTimeID'], ' AND shipping_times.id = ?', 'i', $v['shippingTimeID']);
    $q = dQ($q, $v['isActive'], ' AND shipping_times.isActive = ?', 'i', $v['isActive']);
    // ORDER BY
    $q[0] .= ' ORDER BY datetimeCreated DESC';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;


  case 'getShippingTimeItem':
    $q = $defaultQuery;
    $v = getParams(['shippingTimeID', 'isActive']);
    $q[0] = "SELECT
       shipping_times_items.*
      ,shipping_times.timeRangeDefault
      ,shipping_times.timeToCutBeforeDefault
    FROM shipping_times_items
    INNER JOIN shipping_times ON shipping_times.id = shipping_times_items.shippingTimeID
    ";
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['shippingTimeID'], ' AND shipping_times_items.shippingTimeID = ?', 'i', $v['shippingTimeID']);
    $q = dQ($q, $v['isActive'], ' AND shipping_times_items.isActive = ?', 'i', $v['isActive']);
    // ORDER BY
    $q[0] .= ' ORDER BY time ASC';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifyShippingTime':
    $q = $defaultQuery;
    $v = getParams(['shippingTimeID'], ['name', 'timeRangeDefault', 'isActive']);
    $q[0] = 'UPDATE shipping_times';
    // SET
    $q = dQ($q, $v['shippingTimeID'], ' SET id = ?', 'i', $v['shippingTimeID']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['name'], ', name = ?', 's', $v['name']);
    $q = dQ($q, $v['timeRangeDefault'], ', timeRangeDefault = ?', 'i', $v['timeRangeDefault']);
    // WHERE
    $q = dQ($q, $v['shippingTimeID'], ' WHERE id = ?', 'i', $v['shippingTimeID']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;

  case 'modifyShippingTimeItem':
    $q = $defaultQuery;
    $v = getParams(['shippingTimeItemID'], ['time', 'timeRange', 'isActive']);
    $q[0] = 'UPDATE shipping_times_items';
    // SET
    $q = dQ($q, $v['shippingTimeItemID'], ' SET id = ?', 'i', $v['shippingTimeItemID']);
    $q = dQ($q, $v['time'], ', time = ?', 'i', $v['time']);
    $q = dQ($q, $v['timeRange'], ', timeRange = ?', 'i', $v['timeRange']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    // WHERE
    $q = dQ($q, $v['shippingTimeItemID'], ' WHERE id = ?', 'i', $v['shippingTimeItemID']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;


} // END Giant Case of

desconectarDB($conn);

?>
