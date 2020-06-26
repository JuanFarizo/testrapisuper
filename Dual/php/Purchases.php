<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addPurchase
  // addPurchaseProduct

  // getPurchase
  // getPurchaseProducts

  // modifyPurchase
  // modifyPurchaseProduct


  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */


  case 'addPurchase':
    $query = $defaultQuery;
    $var = getParams(['supplierID']);
    $query[0] = 'INSERT INTO purchases (supplierID) VALUES (?)';
    // supplierID
    $query = dynamicQuery($query, $var['supplierID'], '', 'i', $var['supplierID']);
    // FINISH
    executeQuery($query);
    break; // END addPurchase



  case 'addPurchaseProduct':
    $query = $defaultQuery;
    $var = getParams(['purchaseID'], ['productID', 'amount', 'price', 'isActive']);
    $query[0] = 'INSERT INTO purchases_u_products';
    $query[0] .= ' (';
    // purchaseID
    $query = dynamicQuery($query, $var['purchaseID'], ' purchaseID', 'i', $var['purchaseID']);
    // productID
    $query = dynamicQuery($query, $var['productID'], ', productID', 'i', $var['productID']);
    // amount
    $query = dynamicQuery($query, $var['amount'], ', amount', 'i', $var['amount']);
    // price
    $query = dynamicQuery($query, $var['price'], ', price', 'd', $var['price']);
    // isActive
    $query = dynamicQuery($query, $var['isActive'], ', isActive', 'i', $var['isActive']);
    // VALUES
    $query[0] .= ')';
    $query[0] .= ' VALUES (';
    for ($i=0; $i < strlen($query[1]); $i++) {
      if ($i != 0) { $query[0] .= ', '; }
      $query[0] .= '?';
    }
    $query[0] .= ')';
    // FINISH
    executeQuery($query);
    break; // END addPurchaseProduct








  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getPurchase':
    $query = $defaultQuery;
    $var = getParams([], ['purchaseID', 'supplierID', 'isOrdered', 'isActive']);
    $query[0] = 'SELECT
        purchases.*
        ,p_states.state
        ,suppliers.name AS supplier
        ,suppliers.percentageCharge
        ,suppliers.fixedCharge
    FROM purchases
    INNER JOIN purchases_states AS p_states ON p_states.id = purchases.stateID
    INNER JOIN suppliers ON suppliers.id = purchases.supplierID
    ';
    // WHERE
    $query[0] .= ' WHERE 1';
    // purchaseID
    $query = dynamicQuery($query, $var['purchaseID'], ' AND purchases.id = ?', 'i', $var['purchaseID']);
    // supplierID
    $query = dynamicQuery($query, $var['supplierID'], ' AND purchases.supplierID = ?', 'i', $var['supplierID']);
    // isOrdered
    $query = dynamicQuery($query, $var['isOrdered'], ' AND purchases.isOrdered = ?', 'i', $var['isOrdered']);
    // isActive
    $query = dynamicQuery($query, $var['isActive'], ' AND purchases.isActive = ?', 'i', $var['isActive']);
    // FINISH
    executeQuery($query);
    break; // END getPurchase



  case 'getPurchaseProducts':
    $query = $defaultQuery;
    $var = getParams([], ['purchaseID', 'isActive']);
    $query[0] = 'SELECT
       p_products.id AS purProdID
      ,p_products.*
      ,products.fullName AS product
      ,products.iva
      ,p_details.brandID
      ,p_details.price AS salePrice
      ,p_brands.name AS brand
      ,suppliers.percentageCharge
    FROM purchases_u_products AS p_products
    INNER JOIN products ON products.id = p_products.productID
    INNER JOIN products_details AS p_details ON p_details.id = products.detailsID
    INNER JOIN products_brands AS p_brands ON p_brands.id = p_details.brandID
    INNER JOIN purchases ON purchases.id = p_products.purchaseID
    INNER JOIN suppliers ON suppliers.id = purchases.supplierID
    ';
    // WHERE -
    $query[0] .= ' WHERE 1';
    // purchaseID -
    $query = dynamicQuery($query, $var['purchaseID'], ' AND p_products.purchaseID = ?', 'i', $var['purchaseID']);
    // isActive -
    $query = dynamicQuery($query, $var['isActive'], ' AND p_products.isActive = ?', 'i', $var['isActive']);
    // FINISH -
    executeQuery($query);
    break; // END getPurchaseProducts -








  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifyPurchase':
    $query = $defaultQuery;
    $var = getParams(['purchaseID'], ['stateID', 'isActive', 'isOrdered', 'totalProducts', 'totalCharged', 'totalTotal']);
    $query[0] = 'UPDATE purchases';
    // SET
    $query = dynamicQuery($query, true, ' SET id = ?', 'i', $var['purchaseID']);
    $query = dynamicQuery($query, $var['stateID'], ', stateID = ?', 'i', $var['stateID']);
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    $query = dynamicQuery($query, $var['isOrdered'], ', isOrdered = ?', 'i', $var['isOrdered']);
    $query = dynamicQuery($query, $var['totalProducts'], ', totalProducts = ?', 'd', $var['totalProducts']);
    $query = dynamicQuery($query, $var['totalCharged'], ', totalCharged = ?', 'd', $var['totalCharged']);
    $query = dynamicQuery($query, $var['totalTotal'], ', totalTotal = ?', 'd', $var['totalTotal']);
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, true, ' AND id = ?', 'i', $var['purchaseID']);
    // FINISH
    executeQuery($query);
    break; // END modifyPurchase



  case 'modifyPurchaseProduct':
    $query = $defaultQuery;
    $var = getParams(['dateTime'], ['purProdID', 'purchaseID', 'productID', 'amount', 'price', 'isActive']);
    $query[0] = 'UPDATE purchases_u_products';
    // SET
    $query = dynamicQuery($query, $var['dateTime'], ' SET dateTime = ?', 's', $var['dateTime']);
    $query = dynamicQuery($query, $var['productID'], ', productID = ?', 'i', $var['productID']);
    $query = dynamicQuery($query, $var['amount'], ', amount = ?', 'i', $var['amount']);
    $query = dynamicQuery($query, $var['price'], ', price = ?', 'd', $var['price']);
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query,  $var['purProdID'], ' AND id = ?', 'i', $var['purProdID']);
    $query = dynamicQuery($query, $var['purchaseID'], ' AND purchaseID = ? ', 'i', $var['purchaseID']);
    // FINISH
    executeQuery($query);
    break; // END modifyPurchaseProduct




} // END Giant Case of

desconectarDB($conn);

?>
