<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// addProductPriceHistory

// getPriceHistory

/* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

case 'addProductPriceHistory':
  $q = $defaultQuery;
  $v = getParams(['branchID', 'detailsID', 'price', 'offert']);
  $q[0] = 'INSERT INTO z_history_products_prices
    (detailsID, price, offert)
    VALUES (?, ?, ?, ?)
  ';
  $q[1] = 'iidd';
  $q[2] = [$v['branchID'], $v['detailsID'], $v['price'], $v['offert']];
  executeQuery($q);
  break;



/* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getPriceHistory':
    $q = $defaultQuery;
    $v = getParams([], ['branchID', 'productID', 'search']);
    $q[0] =
    'SELECT
      p_history.*
      ,products.fullName AS product
      ,products.id AS realProductID
      FROM z_history_products_prices AS p_history
      INNER JOIN products ON products.detailsID = p_history.detailsID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['branchID'], ' AND p_history.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['productID'], ' AND products.id = ?', 'i', $v['productID']);
    $q = dQ($q, $v['search'], ' AND products.fullName LIKE ?', 's', '%'.$v['search'].'%');
    // ORDER BY
    $q[0] .= ' ORDER BY date DESC';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;


} // END Giant Case of

desconectarDB($conn);

?>
