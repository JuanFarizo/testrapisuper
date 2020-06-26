<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){


// getSale
// getSaleCount
//
// getSaleProducts
// getSaleProductDeletedReasons

// modifySale
// modifySaleUProduct


  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getSale':
    $q = $defaultQuery;
    $one = 1;
    $v = getParams([], [
      'branchID'
      ,'hasBuyerEmployeeID'
      ,'buyerEmployeeID'
      ,'saleID'
      ,'buyerID'
      ,'stateID'
      ,'minStateID'
      ,'noStateID'
      ,'stateIDminorThat'
      ,'stateIDMayorOrQualThat'
      ,'paymentStateID'
      ,'paymentTypeID'
      ,'itemsPerPage'
      ,'page'
      ,'receptionDate'
      ,'minDate'
      ,'maxDate'
      ,'month'
      ,'isPayed'
      ,'search'
      ,'searchEmployee'
    ]);
    $q[0] = 'SELECT
         sales.*
        ,b_receiver.name AS buyerName
        ,b_receiver.surname AS buyerSurname
        ,CONCAT(b_receiver.name, " ", b_receiver.surname) AS buyerFullName
        ,b_receiver.phone AS buyerPhone
        ,buyers_addresses.streetName AS buyerStreetName
        ,buyers_addresses.streetNumber AS buyerStreetNumber
        ,buyers_addresses.floorAndDepartment AS buyerfloorAndDepartment
        ,buyers_addresses.extraReferences AS buyerExtraReferences
        ,cities.id AS buyerCityID
        ,cities.name AS buyerCity
        ,s_states.state
        ,s_payment_types.name AS paymentType
        ,s_payment_states.paymentState
        ,concat(making_employees.name, " ", making_employees.surname) AS makingEmployeeFullName
        ,concat(control_employees.name, " ", control_employees.surname) AS controlEmployeeFullName
        ,concat(shipping_employees.name, " ", shipping_employees.surname) AS shippingEmployeeFullName
        ,concat(buyer_employees.name, " ", buyer_employees.surname) AS buyerEmployeeFullName
        ,s_discounts.discountAmount
        ,s_discounts.discountPercentaje
        ,s_discounts.discountPercentajeMax
        FROM sales
    -- Buyer
    INNER JOIN buyers_personal_info AS b_receiver ON b_receiver.id = sales.receiverID
    INNER JOIN buyers_addresses ON buyers_addresses.id = sales.addressID
    INNER JOIN cities ON cities.id = buyers_addresses.cityID
    -- State
    INNER JOIN sales_states AS s_states ON s_states.id = sales.stateID
    -- -- Payment
    INNER JOIN sales_payment_types AS s_payment_types ON s_payment_types.id = sales.paymentTypeID
    INNER JOIN sales_payment_states AS s_payment_states ON s_payment_states.id = sales.paymentStateID
    -- Employees
    INNER JOIN employees AS making_employees   ON making_employees.id   = sales.makingEmployeeID
    INNER JOIN employees AS control_employees  ON control_employees.id  = sales.controlEmployeeID
    INNER JOIN employees AS shipping_employees ON shipping_employees.id = sales.shippingEmployeeID
    INNER JOIN employees AS buyer_employees    ON buyer_employees.id    = sales.buyerEmployeeID
    -- Discounts
    LEFT JOIN sales_discounts_codes AS s_discounts_codes ON s_discounts_codes.id = sales.discountCodeID
    LEFT JOIN sales_discounts AS s_discounts ON s_discounts.id = s_discounts_codes.discountID
    ';
    // WHERE
    $q[0] .= ' WHERE';
    $q = dQ($q, true, ' ?', 'i', $one);
    $q = dQ($q, $v['branchID'], ' AND sales.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['saleID'], ' AND sales.id = ?', 'i', $v['saleID']);
    $q = dQ($q, $v['buyerID'], ' AND sales.buyerID = ?', 'i', $v['buyerID']);
    $q = dQ($q, $v['stateID'], ' AND sales.stateID = ?', 'i', $v['stateID']);
    $q = dQ($q, $v['noStateID'], ' AND sales.stateID != ?', 'i', $v['noStateID']);
    $q = dQ($q, $v['stateIDminorThat'], ' AND sales.stateID < ?', 'i', $v['stateIDminorThat']);
    $q = dQ($q, $v['stateIDMayorOrQualThat'], ' AND sales.stateID >= ?', 'i', $v['stateIDMayorOrQualThat']);
    $q = dQ($q, $v['paymentStateID'], ' AND sales.paymentStateID = ?', 'i', $v['paymentStateID']);
    $q = dQ($q, $v['paymentTypeID'], ' AND sales.paymentTypeID = ?', 'i', $v['paymentTypeID']);
    $q = dQ($q, $v['receptionDate'], ' AND sales.receptionDate = ?', 's', $v['receptionDate']);
    $q = dQ($q, $v['minDate'], ' AND sales.receptionDate >= ?', 's', $v['minDate']);
    $q = dQ($q, $v['maxDate'], ' AND sales.receptionDate <= ?', 's', $v['maxDate']);
    $q = dQ($q, $v['month'], ' AND MONTH(sales.receptionDate) = ?', 'i', $v['month']);
    $q = dQ($q, $v['buyerEmployeeID'], ' AND sales.buyerEmployeeID = ?', 'i', $v['buyerEmployeeID']);
    if ($v['hasBuyerEmployeeID'] == 1) {
      $q[0] .= ' AND sales.buyerEmployeeID != 0';
    } elseif ($v['hasBuyerEmployeeID'] === false || $v['hasBuyerEmployeeID'] === 0) {
      $q[0] .= ' AND sales.buyerEmployeeID = 0';
    }
    if ($v['search']) {
      $v['search'] = '%' . $v['search'] . '%';
      $q[0] .= ' AND (';
      $q = dQ($q, true, ' CONCAT(b_receiver.name, " ", b_receiver.surname) LIKE ?', 's', $v['search']);
      $q = dQ($q, true, ' OR b_receiver.phone LIKE ?', 's', $v['search']);
      $q = dQ($q, true, ' OR CONCAT(buyers_addresses.streetName, " ", buyers_addresses.streetNumber) LIKE ?', 's', $v['search']);
      $q = dQ($q, true, ' OR sales.controlNotes LIKE ?', 's', $v['search']);
      $q[0] .= ')';
    }
    if ($v['searchEmployee']) {
      $v['searchEmployee'] = '%' . $v['searchEmployee'] . '%';
      $q[0] .= ' AND (';
        $q = dQ($q, true, ' CONCAT(buyer_employees.name, " ", buyer_employees.surname) LIKE ?', 's', $v['searchEmployee']);
        $q = dQ($q, true, ' OR sales.controlNotes LIKE ?', 's', $v['searchEmployee']);
      $q[0] .= ')';
    }
    // ORDER BY
    $q[0] .= ' ORDER BY stateID ASC, isPrinted ASC, receptionDate DESC, receptionTime DESC';
    // PAGINATION
    $q = dQ($q, $v['itemsPerPage'], ' LIMIT ?', 'i', $v['itemsPerPage']);
    $q = dQ($q, $v['page'], ' OFFSET ?', 'i', ($v['itemsPerPage'] * ($v['page']-1)));
    // FINISH
    // dieError($q);
    executeQuery($q);
    break; // END getSale




  case 'getSaleCount':
    $q = $defaultQuery;
    $one = 1;
    $v = getParams([], [
      'branchID'
      ,'hasBuyerEmployeeID'
      ,'saleID'
      ,'buyerID'
      ,'stateID'
      ,'minStateID'
      ,'noStateID'
      ,'stateIDminorThat'
      ,'stateIDMayorOrQualThat'
      ,'paymentStateID'
      ,'paymentTypeID'
      ,'itemsPerPage'
      ,'page'
    ]);
    $q[0] = 'SELECT
      count(sales.id) AS totalCount
    FROM sales
    -- Buyer
    INNER JOIN buyers_personal_info AS b_receiver ON b_receiver.id = sales.receiverID
    INNER JOIN buyers_addresses ON buyers_addresses.id = sales.addressID
    INNER JOIN cities ON cities.id = buyers_addresses.cityID
    -- State
    INNER JOIN sales_states AS s_states ON s_states.id = sales.stateID
    -- -- Payment
    INNER JOIN sales_payment_types AS s_payment_types ON s_payment_types.id = sales.paymentTypeID
    INNER JOIN sales_payment_states AS s_payment_states ON s_payment_states.id = sales.paymentStateID
    -- Employees
    INNER JOIN employees AS making_employees   ON making_employees.id   = sales.makingEmployeeID
    INNER JOIN employees AS control_employees  ON control_employees.id  = sales.controlEmployeeID
    INNER JOIN employees AS shipping_employees ON shipping_employees.id = sales.shippingEmployeeID
    INNER JOIN employees AS buyer_employees    ON buyer_employees.id    = sales.buyerEmployeeID
    -- -- Discounts
    -- INNER JOIN sales_discounts AS s_discounts ON s_discounts.id = sales.discountID
    ';
    // WHERE
    $q[0] .= ' WHERE';
    $q = dQ($q, true, ' ?', 'i', $one);
    $q = dQ($q, $v['branchID'], ' AND sales.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['saleID'], ' AND sales.id = ?', 'i', $v['saleID']);
    $q = dQ($q, $v['buyerID'], ' AND sales.buyerID = ?', 'i', $v['buyerID']);
    $q = dQ($q, $v['stateID'], ' AND sales.stateID = ?', 'i', $v['stateID']);
    $q = dQ($q, $v['noStateID'], ' AND sales.stateID != ?', 'i', $v['noStateID']);
    $q = dQ($q, $v['stateIDminorThat'], ' AND sales.stateID < ?', 'i', $v['stateIDminorThat']);
    $q = dQ($q, $v['stateIDMayorOrQualThat'], ' AND sales.stateID >= ?', 'i', $v['stateIDMayorOrQualThat']);
    $q = dQ($q, $v['paymentStateID'], ' AND sales.paymentStateID = ?', 'i', $v['paymentStateID']);
    $q = dQ($q, $v['paymentTypeID'], ' AND sales.paymentTypeID = ?', 'i', $v['paymentTypeID']);
    if ($v['hasBuyerEmployeeID'] == 1) {
      $q[0] .= ' AND sales.buyerEmployeeID != 0';
    } elseif ($v['hasBuyerEmployeeID'] === false || $v['hasBuyerEmployeeID'] === 0) {
      $q[0] .= ' AND sales.buyerEmployeeID = 0';
    }
    // dieError($q);
    executeQuery($q);
    break;



  case 'getSalePaymentTypes':
    $q = $defaultQuery;
    $v = getParams([], ['isActive']);
    $q[0] = "SELECT
    types.*
    FROM sales_payment_types AS types
    ";
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['isActive'], ' AND types.isActive = ?', 'i', $v['isActive']);
    // FINISH
    executeQuery($q);
    break;


  case 'getSaleTotal':
    $q = $defaultQuery;
    $one = 1;
    $v = getParams([], ['receptionDateMax']);
    $q[0] = 'SELECT
      SUM(sales.totalTotal) AS total
    FROM sales
    ';
    // WHERE
    $q[0] .= ' WHERE';
    $q = dQ($q, true, ' ?', 'i', $one);
    $q = dQ($q, $v['receptionDateMax'], ' AND sales.receptionDate > ?', 's', $v['receptionDateMax']);
    // dieError($query);
    executeQuery($q);
    break; // END getSale




  case 'getSaleProducts':
  $query = $defaultQuery;
    $var = getParams([], ['saleProdID', 'saleID', 'isActive']);
    $query[0] = 'SELECT
       s_p.*
      ,products.fullName
      ,products.pickUpPlaceID
      ,p_details.brandID
      ,p_brands.name AS brand
      ,pick_up_places.store AS pickUpPlace
      ,sales_u_products_control_states.controlState
      ,isAddedByProduct.fullName AS isAddedByProductName
      ,deleted_reasons.reason AS deletedReasonTitle
      ,deleted_reasons.text AS deletedReasonText
    FROM sales_u_products AS s_p
    INNER JOIN sales ON sales.id = s_p.saleID
    INNER JOIN products ON products.id = s_p.productID
    INNER JOIN products AS isAddedByProduct ON isAddedByProduct.id = s_p.productID
    INNER JOIN products_details AS p_details ON p_details.id = products.detailsID
    INNER JOIN products_brands AS p_brands ON p_brands.id = p_details.brandID
    INNER JOIN products_pick_up_places AS pick_up_places ON pick_up_places.id = products.pickUpPlaceID
    INNER JOIN sales_u_products_control_states ON s_p.controlStateID = sales_u_products_control_states.ID
    INNER JOIN sales_u_products_deleted_reasons AS deleted_reasons ON deleted_reasons.id = s_p.deletedReasonID
    ';
    // WHERE -
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['saleProdID'], ' AND s_p.id = ?', 'i', $var['saleProdID']);
    $query = dynamicQuery($query, $var['saleID'], ' AND s_p.saleID = ?', 'i', $var['saleID']);
    $query = dynamicQuery($query, $var['isActive'], ' AND s_p.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY s_p.relevance ASC';
    // FINISH -
    executeQuery($query);
    break;





  case 'getSaleProductDeletedReasons':
    $q = $defaultQuery;
    $v = getParams([], ['isActive']);
    $q[0] = 'SELECT * FROM sales_u_products_deleted_reasons';
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['isActive'], ' AND isActive = ?', 'i', $v['isActive']);
    // ORDER BY
    $q[0] .= ' ORDER BY id ASC';
    // FINISH
    executeQuery($q);
    break;





  /* - - - - - - - - - - - - - - - MODIFY - - - - - - - - - - - - - - - */

  case 'modifySale':
    $query = $defaultQuery;
    $var = getParams(['saleID'],
      ['stateID', 'shippingNeeded', 'totalTotal', 'receptionTime',
      'receptionDate', 'paymentPrediction', 'paymentTypeID', 'paymentDatetime',
      'makingEmployeeID', 'controlEmployeeID', 'shippingEmployeeID', 'isPrinted',
      'productsAmount', 'totalTotal', 'totalProducts', 'notes',
      'boxes', 'bags', 'refrigerator', 'freezer',
      'eggs6', 'eggs30', 'coal3', 'coal5',
      'containerBeer', 'containerSodaPop', 'controlNotes',
      'isStockControled', 'buyerEmployeeID',
    ]
    );
    $query[0] = 'UPDATE sales';
    // SET
    $query = dynamicQuery($query, $var['saleID'], ' SET id = ?', 'i', $var['saleID']);
    $query = dynamicQuery($query, $var['stateID'], ', stateID = ?', 'i', $var['stateID']);
    $query = dynamicQuery($query, $var['shippingNeeded'], ', shippingNeeded = ?', 'i', $var['shippingNeeded']);
    $query = dynamicQuery($query, $var['totalTotal'], ', totalTotal = ?', 'd', $var['totalTotal']);
    $query = dynamicQuery($query, $var['receptionTime'], ', receptionTime = ?', 'i', $var['receptionTime']);
    $query = dynamicQuery($query, $var['receptionDate'], ', receptionDate = ?', 's', $var['receptionDate']);
    $query = dynamicQuery($query, $var['paymentPrediction'], ', paymentPrediction = ?', 's', $var['paymentPrediction']);
    $query = dynamicQuery($query, $var['paymentTypeID'], ', paymentTypeID = ?', 'i', $var['paymentTypeID']);
    $query = dynamicQuery($query, $var['paymentDatetime'], ', paymentDatetime = ?', 's', $var['paymentDatetime']);
    $query = dynamicQuery($query, $var['makingEmployeeID'], ', makingEmployeeID = ?', 'i', $var['makingEmployeeID']);
    $query = dynamicQuery($query, $var['controlEmployeeID'], ', controlEmployeeID = ?', 'i', $var['controlEmployeeID']);
    $query = dynamicQuery($query, $var['shippingEmployeeID'], ', shippingEmployeeID = ?', 'i', $var['shippingEmployeeID']);
    $query = dynamicQuery($query, $var['isPrinted'], ', isPrinted = ?', 'i', $var['isPrinted']);
    $query = dynamicQuery($query, $var['productsAmount'], ', productsAmount = ?', 'd', $var['productsAmount']);
    $query = dynamicQuery($query, $var['totalTotal'], ', totalTotal = ?', 'd', $var['totalTotal']);
    $query = dynamicQuery($query, $var['totalProducts'], ', totalProducts = ?', 'd', $var['totalProducts']);
    $query = dynamicQuery($query, $var['notes'], ', notes = ?', 's', $var['notes']);
    $query = dynamicQuery($query, $var['boxes'], ', boxes = ?', 'i', $var['boxes']);
    $query = dynamicQuery($query, $var['bags'], ', bags = ?', 'i', $var['bags']);
    $query = dynamicQuery($query, $var['refrigerator'], ', refrigerator = ?', 'i', $var['refrigerator']);
    $query = dynamicQuery($query, $var['freezer'], ', freezer = ?', 'i', $var['freezer']);
    $query = dynamicQuery($query, $var['eggs6'], ', eggs6 = ?', 'i', $var['eggs6']);
    $query = dynamicQuery($query, $var['eggs30'], ', eggs30 = ?', 'i', $var['eggs30']);
    $query = dynamicQuery($query, $var['coal3'], ', coal3 = ?', 'i', $var['coal3']);
    $query = dynamicQuery($query, $var['coal5'], ', coal5 = ?', 'i', $var['coal5']);
    $query = dynamicQuery($query, $var['containerBeer'], ', containerBeer = ?', 'i', $var['containerBeer']);
    $query = dynamicQuery($query, $var['containerSodaPop'], ', containerSodaPop = ?', 'i', $var['containerSodaPop']);
    $query = dynamicQuery($query, $var['controlNotes'], ', controlNotes = ?', 's', $var['controlNotes']);
    $query = dynamicQuery($query, $var['isStockControled'], ', isStockControled = ?', 'i', $var['isStockControled']);
    $query = dynamicQuery($query, $var['buyerEmployeeID'], ', buyerEmployeeID = ?', 'i', $var['buyerEmployeeID']);
    // WHERE
    $query = dynamicQuery($query, $var['saleID'], ' WHERE id = ?', 'i', $var['saleID']);
    // FINISH -
    // dieError($query);
    executeQuery($query);
    break;



  case 'modifySaleUProduct':
    $q = $defaultQuery;
    $v = getParams(
      ['saleProdID'],
      ['amount', 'noStock', 'controlStateID', 'pickUpStateID', 'isActive',  'isDeleted', 'deletedReasonID']
    );
    $q[0] = 'UPDATE sales_u_products';
    // SET
    $q = dQ($q, true, ' SET id = ?', 'i', $v['saleProdID']);
    $q = dQ($q, $v['controlStateID'], ', controlStateID = ?', 'i', $v['controlStateID']);
    $q = dQ($q, $v['pickUpStateID'], ', pickUpStateID = ?', 'i', $v['pickUpStateID']);
    $q = dQ($q, $v['amount'], ', amount = ?', 'i', $v['amount']);
    $q = dQ($q, $v['noStock'], ', noStock = ?', 'i', $v['noStock']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['isDeleted'], ', isDeleted = ?', 'i', $v['isDeleted']);
    $q = dQ($q, $v['deletedReasonID'], ', deletedReasonID = ?', 'i', $v['deletedReasonID']);

    // WHERE
    $q = dQ($q, true, ' WHERE id = ?', 'i', $v['saleProdID']);
    // FINISH
    executeQuery($q);
    break; // modifySaleUProduct


} // END Giant Case of

desconectarDB($conn);

?>
