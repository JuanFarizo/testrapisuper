<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// addDiscount
// addDiscountCode

// getDiscount
// getDiscountCode

// modifyDiscount
// modifyDiscountCode


/* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */

  case 'addDiscount':
    $q = $defaultQuery;
    $v = getParams([
      'branchID',
      'name',
      'discountAmount',
      'discountPercentaje',
      'discountPercentajeMax',
      'description',
      'discountOverID',
      'isActive',
      'datetimeStart',
      'datetimeEnd',
      'datetimeCreated',
    ]);
    $q[0] = 'INSERT INTO sales_discounts
    (
      branchID,
      name,
      discountAmount,
      discountPercentaje,
      discountPercentajeMax,
      description,
      discountOverID,
      isActive,
      datetimeStart,
      datetimeEnd,
      datetimeCreated
    ) VALUES (
      ?, -- branchID,
      ?, -- name,
      ?, -- discountAmount,
      ?, -- discountPercentaje,
      ?, -- discountPercentajeMax,
      ?, -- description,
      ?, -- discountOverID,
      ?, -- isActive,
      ?, -- datetimeStart,
      ?, -- datetimeEnd,
      ? -- datetimeCreated,
    )
    ';
    $q[1] = 'isdddsiisss';
    $q[2] = [
      $v['branchID'],
      $v['name'],
      $v['discountAmount'],
      $v['discountPercentaje'],
      $v['discountPercentajeMax'],
      $v['description'],
      $v['discountOverID'],
      $v['isActive'],
      $v['datetimeStart'],
      $v['datetimeEnd'],
      $v['datetimeCreated'],
    ];
    // FINISH
    // dieError($q);
    executeQuery($q);
    break; // END addSuppliersProducts




  case 'addDiscountCode':
    $q = $defaultQuery;
    $v = getParams([
      'discountID'
      ,'code'
      ,'avaibleUses'
      ,'buyerID'
    ]);
    $q[0] = 'INSERT INTO sales_discounts_codes
    (
      discountID
      ,code
      ,avaibleUses
      ,buyerID
    ) VALUES (
       ? -- discountID,
      ,? -- code,
      ,? -- avaibleUses,
      ,? -- buyerID,
    )
    ';
    $q[1] = 'isii';
    $q[2] = [
      $v['discountID'],
      $v['code'],
      $v['avaibleUses'],
      $v['buyerID'],
    ];
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getDiscount':
    $q = $defaultQuery;
    $v = getParams([], ['discountID', 'branchID', 'isActive', 'search']);
    $q[0] =
    'SELECT
      discounts.*
      ,discounts_overs.name AS overName
      ,discounts_overs.title AS overTitle
      FROM sales_discounts AS discounts
      INNER JOIN sales_discounts_overs AS discounts_overs ON discounts_overs.id = discounts.discountOverID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['discountID'], ' AND discounts.id = ?', 'i', $v['discountID']);
    $q = dQ($q, $v['branchID'], ' AND discounts.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['isActive'], ' AND discounts.isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['search'], ' AND discounts.name LIKE ?', 's', '%'.$v['search'].'%');
    // ORDER BY
    $q[0] .= ' ORDER BY datetimeCreated DESC';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;


  case 'getDiscountCode':
    $q = $defaultQuery;
    $v = getParams([], ['codeID', 'code', 'discountID', 'branchID', 'isActive']);
    $q[0] =
    'SELECT
      codes.*
      ,buyers_personal_info.name AS buyerName
      ,buyers_personal_info.surname AS buyerSurname
      ,discounts.discountAmount
      ,discounts.discountPercentaje
      ,discounts.discountPercentajeMax
      ,discounts.datetimeStart
      ,discounts.datetimeEnd
      FROM sales_discounts_codes AS codes
      INNER JOIN sales_discounts AS discounts ON discounts.id = codes.discountID
      INNER JOIN buyers ON buyers.id = codes.buyerID
      INNER JOIN buyers_personal_info ON buyers_personal_info.id = buyers.personalInfoID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['codeID'], ' AND codes.id = ?', 'i', $v['codeID']);
    $q = dQ($q, $v['code'], ' AND codes.code = ?', 's', $v['code']);
    $q = dQ($q, $v['discountID'], ' AND codes.discountID = ?', 'i', $v['discountID']);
    $q = dQ($q, $v['branchID'], ' AND discounts.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['isActive'], ' AND codes.isActive = ?', 'i', $v['isActive']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;



  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifyDiscount':
    $q = $defaultQuery;
    $v = getParams(
      ['discountID'],
      [
        'name',
        'avaibleUses',
        'discountAmount',
        'discountPercentaje',
        'discountPercentajeMax',
        'code',
        'buyerID',
        'description',
        'discountOverID',
        'isActive',
        'datetimeStart',
        'datetimeEnd'
      ]
    );
    $q[0] = "UPDATE sales_discounts";
    // SET
    $q = dQ($q, $v['discountID'], ' SET id = ?', 'i', $v['discountID']);
    $q = dQ($q, $v['name'], ', name = ?', 's', $v['name']);
    $q = dQ($q, $v['avaibleUses'], ', avaibleUses = ?', 'i', $v['avaibleUses']);
    $q = dQ($q, $v['discountAmount'], ', discountAmount = ?', 'i', $v['discountAmount']);
    $q = dQ($q, $v['discountPercentaje'], ', discountPercentaje = ?', 'd', $v['discountPercentaje']);
    $q = dQ($q, $v['discountPercentajeMax'], ', discountPercentajeMax = ?', 'd', $v['discountPercentajeMax']);
    $q = dQ($q, $v['code'], ', code = ?', 's', $v['code']);
    $q = dQ($q, $v['buyerID'], ', buyerID = ?', 'i', $v['buyerID']);
    $q = dQ($q, $v['description'], ', description = ?', 's', $v['description']);
    $q = dQ($q, $v['discountOverID'], ', discountOverID = ?', 'i', $v['discountOverID']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['datetimeStart'], ', datetimeStart = ?', 's', $v['datetimeStart']);
    $q = dQ($q, $v['datetimeEnd'], ', datetimeEnd = ?', 's', $v['datetimeEnd']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['discountID'], ' AND id = ?', 'i', $v['discountID']);
    // dieError($q);
    // FINISH
    executeQuery($q);
    break; // END modifyDiscount




  case 'modifyDiscountCode':
    $q = $defaultQuery;
    $v = getParams(
      ['codeID'],
      [
        'subtractOneUse',
        'isActive',
      ]
    );
    $q[0] = "UPDATE sales_discounts_codes";
    // SET
    $q = dQ($q, $v['codeID'], ' SET id = ?', 'i', $v['codeID']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    if ($v['subtractOneUse']) {
      $q[0] .= ', avaibleUses = avaibleUses-1';
    }

    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['codeID'], ' AND id = ?', 'i', $v['codeID']);
    // dieError($q);
    // FINISH
    executeQuery($q);
    break; // END modifyDiscount





} // END Giant Case of

desconectarDB($conn);

?>
