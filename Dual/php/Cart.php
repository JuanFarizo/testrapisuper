<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
$data = isset($data) ? $data : $_POST;
// $data = $_POST["action"] :
// if (empty($data)) {
//   $data = json_decode(file_get_contents("php://input"), true);
// }

// dieError($data);

switch ($data['action']){

  // addCartItem
  // addSale
  // getCart
  // modifyCart

  // emptyCart

  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */


  case 'addCartItem':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'productID', 'price', 'offert', 'amount', 'stock', 'token']);
    $query[0] =
      "INSERT INTO buyers_cart_products
        (buyerID, productID, price, offert, amount, stock, token)
      VALUES
        (?, ?, ?, ?, ?, ?, ?)
    ";
    $query = dynamicQuery($query, $var['buyerID'], '', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['productID'], '', 'i', $var['productID']);
    $query = dynamicQuery($query, $var['price'], '', 'd', $var['price']);
    $query = dynamicQuery($query, $var['offert'], '', 'd', $var['offert']);
    $query = dynamicQuery($query, $var['amount'], '', 'i', $var['amount']);
    $query = dynamicQuery($query, $var['stock'], '', 'i', $var['stock']);
    $query = dynamicQuery($query, $var['token'], '', 's', $var['token']);
    // FINISH
    executeQuery($query);
    break; // END addCartItem

  case 'addSale':
    $query = $defaultQuery;
    $var = getParams([
      'branchID', 'buyerID', 'addressID', 'totalProducts', 'totalShipping', 'totalTotal',
      'paymentPrediction', 'paymentTypeID', 'receiverID', 'paymentStateID',
      'shippingNeeded', 'receptionDate', 'receptionTime', 'receptionTimeRange',
      'stateID', 'date', 'sellerID', 'saleTypeID', 'buyerEmployeeID', 'productsAmount',
      'isStockControled', 'appliedDiscount', 'discountCodeID'
    ]);
    $query[0] =
      "INSERT INTO sales (
        branchID, buyerID, addressID, totalProducts, totalShipping, totalTotal,
        paymentPrediction, paymentTypeID, receiverID, paymentStateID,
        shippingNeeded, receptionDate, receptionTime, receptionTimeRange,
        stateID, date, sellerID, saleTypeID, buyerEmployeeID, productsAmount, isStockControled,
        appliedDiscount, discountCodeID
      )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";
    $query = dynamicQuery($query, $var['branchID'], '', 'i', $var['branchID']);
    $query = dynamicQuery($query, $var['buyerID'], '', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['addressID'], '', 'i', $var['addressID']);
    $query = dynamicQuery($query, $var['totalProducts'], '', 'd', $var['totalProducts']);
    $query = dynamicQuery($query, $var['totalShipping'], '', 'd', $var['totalShipping']);
    $query = dynamicQuery($query, $var['totalTotal'], '', 'd', $var['totalTotal']);
    $query = dynamicQuery($query, $var['paymentPrediction'], '', 's', $var['paymentPrediction']);
    $query = dynamicQuery($query, $var['paymentTypeID'], '', 'i', $var['paymentTypeID']);
    $query = dynamicQuery($query, $var['receiverID'], '', 'i', $var['receiverID']);
    $query = dynamicQuery($query, $var['paymentStateID'], '', 'i', $var['paymentStateID']);
    $query = dynamicQuery($query, $var['shippingNeeded'], '', 'i', $var['shippingNeeded']);
    $query = dynamicQuery($query, $var['receptionDate'], '', 's', $var['receptionDate']);
    $query = dynamicQuery($query, $var['receptionTime'], '', 's', $var['receptionTime']);
    $query = dynamicQuery($query, $var['receptionTimeRange'], '', 'i', $var['receptionTimeRange']);
    $query = dynamicQuery($query, $var['stateID'], '', 'i', $var['stateID']);
    $query = dynamicQuery($query, $var['date'], '', 's', $var['date']);
    $query = dynamicQuery($query, $var['sellerID'], '', 'i', $var['sellerID']);
    $query = dynamicQuery($query, $var['saleTypeID'], '', 'i', $var['saleTypeID']);
    $query = dynamicQuery($query, $var['buyerEmployeeID'], '', 'i', $var['buyerEmployeeID']);
    $query = dynamicQuery($query, $var['productsAmount'], '', 'i', $var['productsAmount']);
    $query = dynamicQuery($query, $var['isStockControled'], '', 'i', $var['isStockControled']);
    $query = dynamicQuery($query, $var['appliedDiscount'], '', 'd', $var['appliedDiscount']);
    $query = dynamicQuery($query, $var['discountCodeID'], '', 'i', $var['discountCodeID']);
    // FINISH
    executeQuery($query);
    break; // END addSale


  case 'addSaleItem':
    $query = $defaultQuery;
    $var = getParams(['saleID', 'productID', 'price', 'amount', 'relevance'], [], ['isAdded' => 0, 'isAddedByProductID' => 0]);
    $query[0] =
      "INSERT INTO sales_u_products
        (saleID, productID, price, amount, amountOrdered, relevance, isAdded, isAddedByProductID)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
    ";
    $query = dynamicQuery($query, $var['saleID'], '', 'i', $var['saleID']);
    $query = dynamicQuery($query, $var['productID'], '', 'i', $var['productID']);
    $query = dynamicQuery($query, $var['price'], '', 'd', $var['price']);
    $query = dynamicQuery($query, $var['amount'], '', 'i', $var['amount']);
    $query = dynamicQuery($query, $var['amount'], '', 'i', $var['amount']);
    $query = dynamicQuery($query, $var['relevance'], '', 'i', $var['relevance']);
    $query = dynamicQuery($query, $var['isAdded'], '', 'i', $var['isAdded']);
    $query = dynamicQuery($query, $var['isAddedByProductID'], '', 'i', $var['isAddedByProductID']);
    // FINISH
    executeQuery($query);
    break; // END addCartItem






  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getCart':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'token', 'isActive']);
    $query[0] =
      "SELECT
        cart.*,
        products.fullName
        FROM buyers_cart_products AS cart
        INNER JOIN products ON products.id = cart.productID
    ";
    // WHERE
    $query[0] .= ' WHERE 1';
    if ($var['buyerID'] != 0) {
      $query[0] .= ' AND cart.buyerID = ?';
      $query[1] .= 'i';
      $query[2] = [$var['buyerID']];
    } else {
      $query[0] .= ' AND cart.token = ?';
      $query[1] .= 's';
      $query[2] = [$var['token']];
    }
    $query = dynamicQuery($query  , $var['isActive'], ' AND cart.isActive = ?', 'i', $var['isActive']);
    // FINISH
    executeQuery($query);
    break; // END getCart



  case 'modifyCart':
    $query = $defaultQuery;
    $var = getParams(['cartItemID', 'lastUpdate'], ['amount', 'isActive']);
    $query[0] =
    "UPDATE  buyers_cart_products";
    // SET
    $query = dynamicQuery($query, true, ' SET lastUpdate = ?', 's', $var['lastUpdate']);
    $query = dynamicQuery($query, $var['amount'], ', amount = ?', 'i', $var['amount']);
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['cartItemID'], ' AND id = ?', 'i', $var['cartItemID']);
    // FINISH
    executeQuery($query);
    break;



  case 'emptyCart':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'token']);
    $query[0] =
    'UPDATE buyers_cart_products
    SET isActive = 0
    WHERE buyerID = ? OR token = ?
    ';
    $query = dynamicQuery($query, true, '', 'i', $var['buyerID']);
    $query = dynamicQuery($query, true, '', 'i', $var['token']);
    // FINISH
    executeQuery($query);
    break;


} // END Giant Case of

desconectarDB($conn);

?>
