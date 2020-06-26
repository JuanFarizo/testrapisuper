<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addProductToBranch

  // getCategoryProducts
  // getNextProductID
  // getProduct
  // getProductDetails
  // getProductDetailsCategory
  // getProductOfBranch
  // getProductSuppliers

  // modifyProductOfBranch

/* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */
case 'addProductToBranch':
  $q = $defaultQuery;
  $v = getParams(['productID', 'branchID', 'datetimeCreated']);
  $q[0] .= 'INSERT INTO products_u_branches
    (productID, branchID, datetimeCreated, datetimeLastUpdate, isAvaible, isActive)
    VALUES (
       ? -- productID
      ,? -- branchID
      ,? -- datetimeCreated
      ,? -- datetimeLastUpdate
      ,1 -- isAvaible
      ,1 -- isActive
    )
  ';
  $q[1] = 'iiss';
  $q[2] = [
    $v['productID'],
    $v['branchID'],
    $v['datetimeCreated'],
    $v['datetimeCreated'],
  ];
  // FINISH
  // dieError($q);
  executeQuery($q);
  break;





/* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */


  case 'getCategoryProducts':
    $query = $defaultQuery;
    $v = getParams([], ['isActive']);
    $query[0] =
    "SELECT p_categories.*
    FROM products_details_u_products_categories AS p_categories
    ";
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dQ($query, $v['isActive'], ' AND p_categories.isActive = ?', 'i', $v['isActive']);
    // FINISH
    executeQuery($query);
    break; // END getCategoryProducts


    case 'getNextProductID':
      $query = $defaultQuery;
      $query[0] = 'SELECT AUTO_INCREMENT AS newID
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = "rapisuper"
      AND TABLE_NAME = "products"';
      executeQuery($query);
      break;

    case 'getProduct':
      $q = $defaultQuery;
      $v = getParams([], [
        'isNormal'
        ,'productID'
        ,'isActive'
        ,'isArchived'
        ,'limit'
        ,'orderByNewer'
        ,'itemsPerPage'
        ,'page'
      ]);
      $q[0] = "SELECT
         products.*
        ,p_details.brandID
        ,p_details.name
        ,p_details.suggestedPrice
        ,p_details.description
        ,p_details.dateCreated
        ,p_brands.name AS brand
        ,productParent.fullName AS productParentName
        ,CONCAT(creator.name, ' ', creator.surname) AS creatorEmployee
      FROM products
      INNER JOIN products AS productParent ON productParent.id = products.productParentID
      INNER JOIN products_details AS p_details ON p_details.id = products.detailsID
      INNER JOIN products_brands AS p_brands ON p_brands.id = p_details.brandID
      INNER JOIN employees AS creator ON creator.id = products.creatorEmployeeID
      ";
      // WHERE
      $q[0] .= ' WHERE 1';
      $q = dQ($q, $v['productID'], ' AND products.id = ?', 'i', $v['productID']);
      $q = dQ($q, $v['isActive'], ' AND products.isActive = ?', 'i', $v['isActive']);
      $q = dQ($q, $v['isArchived'], ' AND products.isArchived = ?', 'i', $v['isArchived']);
      if ($v['isNormal']) {
        $q[0] .=
        ' AND products.isParent = 0
        AND products.isActive = 1
        AND products.onlySuppliers = 0
        ';
      }
      if ($v['orderByNewer']) {
        $q[0] .= ' ORDER BY products.dateCreated';
      } else {
        $q[0] .= ' ORDER BY products.fullName';
      }

      // LIMIT
      if ($v['limit']) {
        $q = dQ($q, $v['limit'], ' LIMIT ?', 'i', $v['limit']);
      } else {
        $q = dQ($q, $v['itemsPerPage'], ' LIMIT ?', 'i', $v['itemsPerPage']);
        $q = dQ($q, $v['page'], ' OFFSET ?', 'i', ($v['itemsPerPage'] * ($v['page']-1)));
      }
      // FINISH
      // dieError($q);
      executeQuery($q);
      break; // END getProduct

    case 'getProductDetails':
        $query = $defaultQuery;
        $v = getParams([], ['detailsID']);
        $query[0] = "SELECT
             p_details.*
        FROM products_details AS p_details
        ";
        // WHERE
        $query[0] .= ' WHERE 1';
        $query = dQ($query, $v['detailsID'], ' AND p_details.id = ?', 'i', $v['detailsID']);
        // FINISH
        executeQuery($query);
        break; // END getProductDetails


    case 'getProductDetailsCategory':
        $query = $defaultQuery;
        $v = getParams([], ['detailsID', 'isActive', 'isShowed']);
        $query[0] =
            'SELECT
                pc.*
                ,p_categories.name
            FROM products_details_u_products_categories AS pc
            INNER JOIN products_categories AS p_categories ON p_categories.id = pc.categoryID
        ';
        // WHERE
        $query[0] .= ' WHERE 1';
        // detailsID
        $query = dQ($query, $v['detailsID'], ' AND pc.productDetailsID = ?', 'i', $v['detailsID']);
        // isActive
        $query = dQ($query, $v['isActive'], ' AND pc.isActive = ?', 'i', $v['isActive']);
        // FINISH
        // $query[0] .= ' ORDER BY ';
        executeQuery($query);
        break; // END getProductDetailsCategory

  case 'getProductOfBranch':
    $q = $defaultQuery;
    $v = getParams([], [
      'branchID'
      ,'productID'
      ,'productOfBranchID'
      ,'search'
      ,'isActive'
      ,'hasPrice'
      ,'hasStock'
      ,'orderByNewer'
    ]);
    $q[0] = "SELECT
       productsOfBranches.*
      ,products.detailsID
      ,products.fullName
      ,products_details.brandID
      ,products.uxb
      ,FLOOR(productOfBranchParent.stock/products.productParentMultiplier) AS stockInherited
    FROM products_u_branches AS productsOfBranches
    INNER JOIN products ON products.id = productsOfBranches.productID
    INNER JOIN products_details ON products_details.id = products.detailsID
    INNER JOIN products AS productParent ON productParent.id = products.productParentID
    LEFT JOIN products_u_branches AS productOfBranchParent ON (productOfBranchParent.productID = products.productParentID AND productOfBranchParent.isActive = 1)
    ";
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['search'],   ' AND products.fullName LIKE ?', 's', '%'.$v['search'].'%');
    $q = dQ($q, $v['productOfBranchID'], ' AND productsOfBranches.id = ?', 'i', $v['productOfBranchID']);
    $q = dQ($q, $v['branchID'], ' AND productsOfBranches.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['productID'], ' AND productsOfBranches.productID = ?', 'i', $v['productID']);
    $q = dQ($q, $v['isActive'], ' AND productsOfBranches.isActive = ?', 'i', $v['isActive']);
    if ($v['hasStock']) {
      $q[0] .=
      ' AND (productsOfBranches.stock > 0
      OR (productsOfBranches.hasInfiniteStock AND productsOfBranches.pickUpPlaceHasStock)
      OR (products.productParentID AND productOfBranchParent.stock))
    ';
    }
    if ($v['hasPrice']) {
      $q[0] .= ' AND productsOfBranches.price > 0';
    }
    // ORDER BY
    if ($v['orderByNewer']) {
      $q[0] .= ' ORDER BY productsOfBranches.datetimeCreated';
    } else {
      $q[0] .= ' ORDER BY products.fullName';
    }
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;



  case 'getProductSuppliers':
    $query = $defaultQuery;
    $v = getParams([], ['productID', 'isActive']);
    $query[0] = "SELECT
      suppliers.*
      ,sp.price
    FROM suppliers_u_products AS sp
    INNER JOIN suppliers ON suppliers.id = sp.supplierID
    ";
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dQ($query, $v['productID'], ' AND sp.productID = ?', 'i', $v['productID']);
    $query = dQ($query, $v['isActive'], ' AND sp.isActive = ?', 'i', $v['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY sp.dateTime';
    // FINISH
    executeQuery($query);
    break;





  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */

  case 'modifyProductOfBranch':
    $q = $defaultQuery;
    $v = getParams(
      ['productOfBranchID', 'datetimeLastUpdate']
      ,['price', 'offert', 'stock', 'stockAlert', 'isAvaible', 'isActive' ]
    );
  	$q[0] =
		'UPDATE products_u_branches';
    // SET
    $q = dQ($q, $v['productOfBranchID'], ' SET id = ?', 'i', $v['productOfBranchID']);
    $q = dQ($q, $v['datetimeLastUpdate'], ', datetimeLastUpdate = ?', 's', $v['datetimeLastUpdate']);
    $q = dQ($q, $v['price'], ', price = ?', 'd', $v['price']);
    $q = dQ($q, $v['offert'], ', offert = ?', 'd', $v['offert']);
    $q = dQ($q, $v['stock'], ', stock = ?', 'i', $v['stock']);
    $q = dQ($q, $v['stockAlert'], ', stockAlert = ?', 'i', $v['stockAlert']);
    $q = dQ($q, $v['isAvaible'], ', isAvaible = ?', 'i', $v['isAvaible']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['productOfBranchID'], ' AND id = ?', 'i', $v['productOfBranchID']);
    // EXECUTE
    // dieError($q);
    executeQuery($q);
    break;



} // END Giant Case of

desconectarDB($conn);

?>
