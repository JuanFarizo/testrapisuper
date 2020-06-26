<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){


// addAccount
// addMovement

// getAccount
// getMovement
// getMovementCategory

// modifyAccount

  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */

  case 'addAccount':
    $query = $defaultQuery;
    $var = getParams(['name', 'value', 'color', 'relevance', 'currencyID', 'typeID']);
    $query[0] =
    'INSERT INTO accounting_accounts
    (name, value, color, relevance, currencyID, typeID)
    VALUES (?, ?, ?, ?, ?, ?)
    ';
    $query = dynamicQuery($query, $var['name'], '', 's', $var['name']);
    $query = dynamicQuery($query, $var['value'], '', 'd', $var['value']);
    $query = dynamicQuery($query, $var['color'], '', 's', $var['color']);
    $query = dynamicQuery($query, $var['relevance'], '', 'i', $var['relevance']);
    $query = dynamicQuery($query, $var['currencyID'], '', 'i', $var['currencyID']);
    $query = dynamicQuery($query, $var['typeID'], '', 'i', $var['typeID']);

    // FINISH
    executeQuery($query);




  case 'addMovement':
    $query = $defaultQuery;
    $var = getParams(
      ["price",
    "categoryID",
    "accountID",
    'supplierID',
    "employeeID",
    "isPayed",
    "datePayment",
    "description",
    "paymentTypeID",
    "currencyID",
    "currencyID",
    ],
    ["datePaymentReal", "receivingAccountID"]);

    $query[0] =
    'INSERT INTO accounting_movements
    (price,	categoryID,	accountID,	supplierID,	employeeID,	isPayed,	datePayment, datePaymentReal,	description,	paymentTypeID,	currencyID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    $query = dynamicQuery($query, $var['price'], '', 'd', $var['price']);
    $query = dynamicQuery($query, $var['categoryID'], '', 'i', $var['categoryID']);
    $query = dynamicQuery($query, $var['accountID'], '', 'i', $var['accountID']);
    $query = dynamicQuery($query, $var['supplierID'], '', 'i', $var['supplierID']);
    $query = dynamicQuery($query, $var['employeeID'], '', 'i', $var['employeeID']);
    $query = dynamicQuery($query, $var['isPayed'], '', 'i', $var['isPayed']);
    $query = dynamicQuery($query, $var['datePayment'], '', 's', $var['datePayment']);
    $query = dynamicQuery($query, true, '', 's', $var['datePaymentReal']);
    $query = dynamicQuery($query, $var['description'], '', 's', $var['description']);
    $query = dynamicQuery($query, $var['paymentTypeID'], '', 'i', $var['paymentTypeID']);
    $query = dynamicQuery($query, $var['currencyID'], '', 'i', $var['currencyID']);

    // FINISH
    //dieError($query);
    executeQuery($query);
    break;



  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getAccount':
    $query = $defaultQuery;
    $var = getParams([], ['id', 'isActive']);
    $query[0] =
    'SELECT
      accounts.*
      ,currencies.name AS currency
      ,types.name AS type
      -- ,branches.name AS branch
    FROM accounting_accounts AS accounts
    INNER JOIN accounting_currencies AS currencies ON currencies.id = accounts.currencyID
    INNER JOIN accounting_accounts_types AS types ON types.id = accounts.typeID
    -- INNER JOIN branches ON branches.id = accounts.branchID
    ';
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['id'], ' AND accounts.id = ?', 'i', $var['id']);
    $query = dynamicQuery($query, $var['isActive'], ' AND accounts.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY accounts.relevance ASC';
    // FINISH

    // dieError($query);
    executeQuery($query);




  case 'getMovement':
    $query = $defaultQuery;
    $var = getParams([], ['id', 'isActive']);
    $query[0] =
    'SELECT
      movements.*
      ,categories.name AS category
      ,accounts.name AS account
      ,suppliers.name AS supplier
      ,payment_types.name AS paymentType
      ,currencies.name AS currency
      ,accounts.color AS accountColor
    FROM accounting_movements AS movements
    INNER JOIN accounting_movements_categories AS categories ON categories.id = movements.categoryID
    INNER JOIN accounting_accounts AS accounts ON accounts.id = movements.accountID
    INNER JOIN suppliers ON suppliers.id = movements.supplierID
    INNER JOIN sales_payment_types AS payment_types ON payment_types.id = movements.paymentTypeID
    INNER JOIN accounting_currencies AS currencies ON currencies.id = movements.currencyID
    ';
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['id'], ' AND movements.id = ?', 'i', $var['id']);
    $query = dynamicQuery($query, $var['isActive'], ' AND movements.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY movements.dateCreated DESC';
    // FINISH
    // dieError($query);
    executeQuery($query);
    break;



  case 'getMovementCategory':
    $query = $defaultQuery;
    $var = getParams([], ['isActive']);
    $query[0] =
    'SELECT categories.*
    FROM accounting_movements_categories AS categories
    ';
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['isActive'], ' AND categories.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY categories.id DESC';
    // FINISH

    //dieError($query);
    executeQuery($query);
    break;

    /*--------------------- MODIFY ------------------------*/

    case 'modifyAccount':
      $query = $defaultQuery;
      $var = getParams(['id',], ['lastUpdate', 'name', 'value', 'relevance', 'isActive', 'color']);
      $query[0] =
      "UPDATE  accounting_accounts";
      // SET
      //$query = dynamicQuery($query, true, ' SET lastUpdate = ?', 's', $var['lastUpdate']);
      $query = dynamicQuery($query, true, ' SET lastUpdate = ?', 's', $var['lastUpdate']);
      $query = dynamicQuery($query, $var['name'], ', name = ?', 's', $var['name']);
      $query = dynamicQuery($query, $var['value'], ', value = ?', 'i', $var['value']);
      $query = dynamicQuery($query, $var['relevance'], ', relevance = ?', 'i', $var['relevance']);
      $query = dynamicQuery($query, $var['color'], ', color = ?', 's', $var['color']);
      $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
      // WHERE
      $query[0] .= ' WHERE 1';
      $query = dynamicQuery($query, $var['id'], ' AND id = ?', 'i', $var['id']);
      // FINISH
      //dieError($query);
      executeQuery($query);
      break;



} // END Giant Case of

desconectarDB($conn);

?>
