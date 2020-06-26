<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// addMistake

// getMistake
// getMistakesType

// modifyMistake

  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */
  case 'addMistake':
    $query = $defaultQuery;
    $var = getParams(['dateTime', 'stateID', 'typeID', 'saleID', 'responsibleEmployeeID', 'description']);
    $query[0] =
    "INSERT INTO sales_mistakes SET
    dateTime = ?
    ,stateID = ?
    ,typeID = ?
    ,saleID = ?
    ,responsibleEmployeeID = ?
    ,description = ?
    ";
    $query[1] = 'siiiis';
    $query[2] = [
      $var['dateTime'],
      $var['stateID'],
      $var['typeID'],
      $var['saleID'],
      $var['responsibleEmployeeID'],
      $var['description']
    ];
    // dieError($query);
    executeQuery($query);
    break;





  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getMistake':
    $q = $defaultQuery;
    $v = getParams([], ['branchID', 'mistakeID', 'search']);
    $q[0] =
    "SELECT
    mistakes.*
    ,states.state
    ,types.type
    ,sales.receptionDate AS saleDate
    ,sales.receptionTime AS saleTime
    ,sales.receptionTimeRange AS saleTimeRange
    ,sales.receiverID
    ,CONCAT(employees.name, ' ', employees.surname) AS responsibleEmployee
    ,CONCAT(buyer.name, ' ', buyer.surname) AS buyerFullName
    FROM sales_mistakes AS mistakes
    INNER JOIN sales_mistakes_states AS states ON states.id = mistakes.stateID
    INNER JOIN sales_mistakes_types AS types ON types.id = mistakes.typeID
    INNER JOIN employees ON employees.id = mistakes.responsibleEmployeeID
    INNER JOIN sales ON sales.id = mistakes.saleID
    INNER JOIN buyers_personal_info AS buyer ON buyer.id = sales.receiverID
    WHERE mistakes.isActive";
    // WHERE
    $q = dynamicQuery($q, $v['branchID'], ' AND sales.branchID = ?', 'i', $v['branchID']);
    $q = dynamicQuery($q, $v['mistakeID'], ' AND mistakes.id = ?', 'i', $v['mistakeID']);
    if ($v['search']) {
      $q[0] .= ' AND (';
      $q = dQ($q, true, ' CONCAT(employees.name, " ", employees.surname) LIKE ?', 's', '%'.$v['search'].'%');
      $q = dQ($q, true, ' OR CONCAT(buyer.name, " ", buyer.surname) LIKE ?', 's', '%'.$v['search'].'%');
      $q = dQ($q, true, ' OR mistakes.description LIKE ?', 's', '%'.$v['search'].'%');
      $q[0] .= ')';
    }
    // ORDER BY
    $q[0] .= ' ORDER BY mistakes.stateID = 2 DESC, mistakes.stateID ASC, mistakes.typeID ASC, sales.receptionDate DESC';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;



    case 'getMistakesType':
      $query = $defaultQuery;
      $query[0] =
      "SELECT types.*
      FROM sales_mistakes_types AS types";
      executeQuery($query);
      break;



  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifyMistake':
    $query = $defaultQuery;
    $var = getParams(['mistakeID'], ['dateTime', 'stateID', 'typeID', 'saleID', 'responsibleEmployeeID', 'description', 'isActive']);
    $query[0] = "UPDATE sales_mistakes";
    // SET
    $query = dynamicQuery($query, $var['mistakeID'], ' SET id = ?', 'i', $var['mistakeID']);
    $query = dynamicQuery($query, $var['stateID'], ', stateID = ?', 'i', $var['stateID']);
    $query = dynamicQuery($query, $var['typeID'], ', typeID = ?', 'i', $var['typeID']);
    $query = dynamicQuery($query, $var['saleID'], ', saleID = ?', 'i', $var['saleID']);
    $query = dynamicQuery($query, $var['responsibleEmployeeID'], ', responsibleEmployeeID = ?', 'i', $var['responsibleEmployeeID']);
    $query = dynamicQuery($query, $var['description'], ', description = ?', 's', $var['description']);
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['mistakeID'], ' AND id = ?', 'i', $var['mistakeID']);
    // FINISH
    executeQuery($query);
    break;




} // END Giant Case of

desconectarDB($conn);

?>
