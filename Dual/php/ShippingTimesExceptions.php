<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// addException

// getException

// modifyException

/* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */

  case 'addException':
    $q = $defaultQuery;
    $v = getParams([
       'branchID'
      ,'name'
      ,'date'
      ,'shippingTimeID'
      ,'creatorEmployeeID'
      ,'isActive'
    ]);
    $q[0] =
      "INSERT INTO shipping_times_exceptional_dates SET
       branchID          = ?
      ,name              = ?
      ,date              = ?
      ,shippingTimeID    = ?
      ,creatorEmployeeID = ?
      ,isActive          = ?
    ";
    $q = dQ($q, $v['branchID'], '', 'i', $v['branchID']);
    $q = dQ($q, $v['name'], '', 's', $v['name']);
    $q = dQ($q, $v['date'], '', 's', $v['date']);
    $q = dQ($q, $v['shippingTimeID'], '', 'i', $v['shippingTimeID']);
    $q = dQ($q, $v['creatorEmployeeID'], '', 'i', $v['creatorEmployeeID']);
    $q = dQ($q, $v['isActive'], '', 'i', $v['isActive']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




/* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getException':
    $q = $defaultQuery;
    $v = getParams([], ['exceptionID', 'branchID', 'cityID', 'date', 'minDate', 'isActive', 'search']);
    $q[0] =
    'SELECT
      exceptions.*
      ,shipping_times.name AS shippingTime
      ,CONCAT(employees.name, " ", employees.surname) AS creatorEmployee
      FROM shipping_times_exceptional_dates AS exceptions
      INNER JOIN employees ON employees.id = exceptions.creatorEmployeeID
      INNER JOIN shipping_times ON shipping_times.id = exceptions.shippingTimeID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['exceptionID'], ' AND exceptions.id = ?', 'i', $v['exceptionID']);
    $q = dQ($q, $v['branchID'], ' AND exceptions.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['cityID'], ' AND (exceptions.cityID = ? OR exceptions.cityID = 0)', 'i', $v['cityID']);
    $q = dQ($q, $v['date'], ' AND exceptions.date = ?', 's', $v['date']);
    $q = dQ($q, $v['minDate'], ' AND exceptions.date >= ?', 's', $v['minDate']);
    $q = dQ($q, $v['isActive'], ' AND exceptions.isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['search'], ' AND exceptions.name LIKE ?', 's', '%'.$v['search'].'%');
    // ORDER BY
    $q[0] .= ' ORDER BY exceptions.date DESC';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */

  case 'modifyException':
    $q = $defaultQuery;
    $v = getParams(
      ['exceptionID'],
      [
         'name'
        ,'date'
        ,'shippingTimeID'
        ,'isActive'
      ]
    );
    $q[0] = "UPDATE shipping_times_exceptional_dates";
    // SET
    $q = dQ($q, $v['exceptionID'], ' SET id = ?', 'i', $v['exceptionID']);
    $q = dQ($q, $v['name'], ', name = ?', 's', $v['name']);
    $q = dQ($q, $v['date'], ', date = ?', 's', $v['date']);
    $q = dQ($q, $v['shippingTimeID'], ', shippingTimeID = ?', 'i', $v['shippingTimeID']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['exceptionID'], ' AND id = ?', 'i', $v['exceptionID']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




} // END Giant Case of

desconectarDB($conn);

?>
