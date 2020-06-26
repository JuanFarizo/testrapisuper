<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addSuppliersProducts
  // addSuppliersProductsHistory

  // getSupplier
  // getSuppliersProducts

  // modifySupplier
  // modifySuppliersProducts


  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */
  case 'addSuppliersProducts':
    $query = $defaultQuery;
    $var = getParams(['productID', 'supplierID'], ['isActive']);
    $query[0] = 'INSERT INTO suppliers_u_products';
    $query[0] .= ' (';
    // productID
    $query = dynamicQuery($query, $var['productID'], ' productID', 'i', $var['productID']);
    // supplierID
    $query = dynamicQuery($query, $var['supplierID'], ', supplierID', 'i', $var['supplierID']);
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
    break; // END addSuppliersProducts

    case 'addSuppliersProductsHistory':
      $query = $defaultQuery;
      $var = getParams(['productID', 'supplierID'], ['minAmount', 'price', 'isActive']);
      $query[0] = 'INSERT INTO suppliers_u_products_history';
      $query[0] .= ' (';
      // productID
      $query = dynamicQuery($query, $var['productID'], ' productID', 'i', $var['productID']);
      // supplierID
      $query = dynamicQuery($query, $var['supplierID'], ', supplierID', 'i', $var['supplierID']);
      // minAmount
      $query = dynamicQuery($query, $var['minAmount'], ', minAmount', 'i', $var['minAmount']);
      // price
      $query = dynamicQuery($query, $var['price'], ', price', 'i', $var['price']);
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
      break; // END addSuppliersProductsHistory



  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getSuppliersProducts':
    $query = $defaultQuery;
    $var = getParams([], ['id', 'supplierID', 'productID', 'isActive']);
    $query[0] = 'SELECT
         s_products.*
        ,suppliers.name AS supplier
        ,suppliers.percentageCharge
        ,suppliers.fixedCharge
        ,products.fullName AS product
        ,products.stock
        ,products.stockAlert
        ,products.iva
        ,products.detailsID AS productDetailsID
        ,products_details.price AS salePrice
    FROM suppliers_u_products AS s_products
    INNER JOIN suppliers ON suppliers.id = s_products.supplierID
    INNER JOIN products ON products.id = s_products.productID
    INNER JOIN products_details ON products_details.id = products.detailsID
    ';
    // WHERE
    $query[0] .= ' WHERE 1';
    // id
    $query = dynamicQuery($query, $var['id'], ' AND s_products.id = ?', 'i', $var['id']);
    // supplierID
    $query = dynamicQuery($query, $var['supplierID'], ' AND s_products.supplierID = ?', 'i', $var['supplierID']);
    // productID
    $query = dynamicQuery($query, $var['productID'], ' AND s_products.productID = ?', 'i', $var['productID']);
    // isActive
    $query = dynamicQuery($query, $var['isActive'], ' AND s_products.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY products.fullName';
    // FINISH
    executeQuery($query);
    break; // END getSuppliersProducts

  case 'getSupplier':
    $query = $defaultQuery;
    $var = getParams([], ['isActive']);
    $query[0] = "SELECT
        suppliers.*
    FROM suppliers
    ";
    // WHERE
    $query[0] .= ' WHERE 1';
    // isActive
    $query = dynamicQuery($query, $var['isActive'], ' AND suppliers.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY suppliers.name';
    // FINISH
    executeQuery($query);
    break; // END getSupplier


  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifySupplier':
    $query = $defaultQuery;
    $var = getParams(['id'], ['name', 'city', 'email', 'phone', 'address', 'extraInfo', 'isActive', 'percentageCharge', 'fixedCharge']);
    $query[0] = "UPDATE suppliers";
    // SET
    $query = dynamicQuery($query, $var['id'], ' SET id = ?', 'i', $var['id']);
    $query = dynamicQuery($query, $var['name'], ', name = ?', 's', $var['name']);
    $query = dynamicQuery($query, $var['city'], ', city = ?', 's', $var['city']);
    $query = dynamicQuery($query, $var['phone'], ', phone = ?', 's', $var['phone']);
    $query = dynamicQuery($query, $var['address'], ', address = ?', 's', $var['address']);
    $query = dynamicQuery($query, $var['extraInfo'], ', extraInfo = ?', 's', $var['extraInfo']);
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    $query = dynamicQuery($query, $var['percentageCharge'], ', percentageCharge = ?', 'd', $var['percentageCharge']);
    $query = dynamicQuery($query, $var['fixedCharge'], ', fixedCharge = ?', 'd', $var['fixedCharge']);
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['id'], ' AND id = ?', 'i', $var['id']);
    // FINISH
    executeQuery($query);
    break; // END modifySupplier

  case 'modifySuppliersProducts':
    $query = $defaultQuery;
    $var = getParams(['id'], ['minAmount', 'price', 'dateTime', 'isActive']);
    $query[0] = "UPDATE suppliers_u_products";
    // SET
    $query = dynamicQuery($query, $var['id'], ' SET id = ?', 'i', $var['id']);
    // minAmount
    $query = dynamicQuery($query, $var['minAmount'], ', minAmount = ?', 'i', $var['minAmount']);
    // price
    $query = dynamicQuery($query, $var['price'], ', price = ?', 'd', $var['price']);
    // dateTime
    $query = dynamicQuery($query, $var['dateTime'], ', dateTime = ?', 's', $var['dateTime']);
    // isActive
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    // WHERE
    $query[0] .= ' WHERE 1';
    // id
    $query = dynamicQuery($query, $var['id'], ' AND id = ?', 'i', $var['id']);
    // FINISH
    executeQuery($query);
    break; // END modifySuppliersProducts



} // END Giant Case of

desconectarDB($conn);

?>
