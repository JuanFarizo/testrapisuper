<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addStockChange

  // getStockChanges

  // updateProductStock
  // updateProductStockByValue

  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */
  case 'addStockChange':
    $q = $defaultQuery;
    $v = getParams(['branchID', 'productID', 'amount', 'employeeID', 'websiteZoneID', 'reasonID', 'notes', 'date']);
    // 'UPDATE products
    // SET stock = stock + ?
    // WHERE id = ?;
    $q[0] =
    'INSERT INTO `products_stock_changes`
    (actualStock, branchID, productID, amount, employeeID, websiteZoneID, reasonID, notes, date)
    VALUES (
      (SELECT stock FROM `products` WHERE id = ?) -- actualStock
      ,? -- branchID
      ,? -- productID,
      ,? -- amount
      ,? -- employeeID
      ,? -- websiteZoneID
      ,? -- reasonID
      ,? -- notes
      ,? -- date
    )
    ';
    // $v['amount'],
    // $v['productID'],
    $q[1] = 'iiiiiiiss';
    $q[2] = [
      $v['productID'],
      $v['branchID'],
      $v['productID'],
      $v['amount'],
      $v['employeeID'],
      $v['websiteZoneID'],
      $v['reasonID'],
      $v['notes'],
      $v['date']
    ];
    // FINISH
    // dieError($q);
    executeQuery($q);
    break; // END addStockChange


  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getStockChanges':
    $q = $defaultQuery;
    $v = getParams([], ['branchID', 'employeeID', 'search']);
    $q[0] =
    "SELECT
    psc.*
    ,products.fullName AS product
    ,psc_reasons.reason
    ,psc_website_zones.websiteZone
    ,psc_website_zones.name AS websiteZoneName
    FROM `products_stock_changes` AS psc
    INNER JOIN `products` ON products.id = psc.productID
    INNER JOIN `products_stock_changes_reasons` AS psc_reasons ON psc_reasons.id = psc.reasonID
    INNER JOIN `products_stock_changes_website_zones` AS psc_website_zones ON psc_website_zones.id = psc.websiteZoneID
    INNER JOIN `employees` ON employees.id = psc.employeeID
    ";
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['employeeID'], ' AND psc.employeeID = ?', 'i', $v['employeeID']);
    $q = dQ($q, $v['branchID'], ' AND psc.branchID = ?', 'i', $v['branchID']);
    if ($v['search']) {
      $q[0] .= ' AND (';
      $q = dQ($q, true, ' psc.amount LIKE ?', 's', '%'.$v['search'].'%');
      $q = dQ($q, true, ' OR psc.notes LIKE ?', 's', '%'.$v['search'].'%');
      $q = dQ($q, true, ' OR products.fullName LIKE ?', 's', '%'.$v['search'].'%');
      $q = dQ($q, true, ' OR psc_website_zones.websiteZone LIKE ?', 's', '%'.$v['search'].'%');
      $q = dQ($q, true, ' OR psc_reasons.reason LIKE ?', 's', '%'.$v['search'].'%');
      $q = dQ($q, true, ' OR CONCAT(employees.name, " ", employees.surname) LIKE ?', 's', '%'.$v['search'].'%');
      $q[0] .= ')';
    }
    // ORDER BY
    $q[0] .= ' ORDER BY date DESC';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;


  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'updateProductStock':
    $q = $defaultQuery;
    $v = getParams(['branchID', 'productID', 'amount']);
    $q[0] = "UPDATE products_u_branches
    SET stock = stock + ?
    WHERE productID = ? AND branchID = ? AND isActive = 1
    ";
    $q = dQ($q, $v['amount'], '', 'i', $v['amount']);
    $q = dQ($q, $v['productID'], '', 'i', $v['productID']);
    $q = dQ($q, $v['branchID'], '', 'i', $v['branchID']);
    // FINISH
    // dieError($q);
    executeQuery($q);


  case 'updateProductStockByValue':
    $q = $defaultQuery;
    $v = getParams(['productID', 'newAmount']);
    $q[0] = "UPDATE products
    SET stock = ?
    WHERE id = ?
    ";
    $q = dQ($q, $v['newAmount'], '', 'i', $v['newAmount']);
    $q = dQ($q, $v['productID'], '', 'i', $v['productID']);
    executeQuery($q);



} // END Giant Case of

desconectarDB($conn);

?>
