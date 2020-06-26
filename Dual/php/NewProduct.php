<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // createProduct
  // createProductActivityHistory
  // createProductDetails
  // createProductDetailsUCategories
  // createProductDetailsUCategoriesHistory
  // createProductPriceHistory
  // createSupplier
  // createSupplierUProduct

  // deleteProductDetailsUCategories

  // getStockChangesReasons

  // modifyProduct
  // modifyProductDetails
  // modifySupplierUProduct






  /* - - - - - - - - - - - - - - - CREATEs - - - - - - - - - - - - - - - */

      case 'createProduct':
      $query = $defaultQuery;
      $var = getParams([
        'detailsID'
        ,'variantName'
        ,'fullName'
        ,'stock'
        ,'stockAlert'
        ,'variantPrice'
        ,'variantOffert'
        ,'productParentID'
        ,'productParentMultiplier'
        ,'extraDescription'
        ,'imagesAmount'
        ,'barsCode'
        ,'isActive'
        ,'onlySuppliers'
        ,'hasInfiniteStock'
        ,'pickUpPlaceHasStock'
        ,'creatorEmployeeID'
      ]);
      $query[0] =
      'INSERT INTO products (
        detailsID
        ,variantName
        ,fullName
        ,stock
        ,stockAlert
        ,variantPrice
        ,variantOffert
        ,productParentID
        ,productParentMultiplier
        ,extraDescription
        ,imagesAmount
        ,barsCode
        ,isActive
        ,onlySuppliers
        ,hasInfiniteStock
        ,pickUpPlaceHasStock
        ,creatorEmployeeID
      )
      VALUES (
        ? -- detailsID
        ,? -- variantName
        ,? -- fullName
        ,? -- stock
        ,? -- stockAlert
        ,? -- variantPrice
        ,? -- variantOffert
        ,? -- productParentID
        ,? -- productParentMultiplier
        ,? -- extraDescription
        ,? -- imagesAmount
        ,? -- barsCode
        ,? -- isActive
        ,? -- onlySuppliers
        ,? -- hasInfiniteStock
        ,? -- pickUpPlaceHasStock
        ,? -- creatorEmployeeID
      )
      ';
      $query[1] = 'issiiddidsisiiiii';
      $query[2] = [
      $var['detailsID']
      ,$var['variantName']
      ,$var['fullName']
      ,$var['stock']
      ,$var['stockAlert']
      ,$var['variantPrice']
      ,$var['variantOffert']
      ,$var['productParentID']
      ,$var['productParentMultiplier']
      ,$var['extraDescription']
      ,$var['imagesAmount']
      ,$var['barsCode']
      ,$var['isActive']
      ,$var['onlySuppliers']
      ,$var['hasInfiniteStock']
      ,$var['pickUpPlaceHasStock']
      ,$var['creatorEmployeeID']
      ];
      executeQuery($query);
      break; // END createProduct


  case 'createProductActivityHistory':
    $query = $defaultQuery;
    $var = getParams(['productID', 'isActive']);
		$query[0] =
    'INSERT INTO z_history_products_activiy
    (productID, isActive)
    VALUES (?, ?)
		';
    $query[1] = 'ii';
    $query[2] = [$var['productID'], $var['isActive']];
    executeQuery($query);
    break; // END createProductActivityHistory

  case 'createProductDetails':
    $query = $defaultQuery;
    $var = getParams(['brandID', 'name', 'price', 'offert', 'description']);
		$query[0] =
    'INSERT INTO products_details (brandID, name, price, offert, description)
    VALUES (?, ?, ?, ?, ?)
		';
    $query[1] = 'isdds';
    $query[2] = [$var['brandID'], $var['name'], $var['price'], $var['offert'], $var['description']];
    executeQuery($query);
    break; // END createProductDetails

    case 'createProductDetailsUCategories':
      $query = $defaultQuery;
      $var = getParams(['detailsID', 'categoryID']);
      $query[0] = 'INSERT INTO products_details_u_products_categories
        (productDetailsID, categoryID)
        VALUES (?, ?)
      ';
      $query[1] = 'ii';
      $query[2] = [$var['detailsID'], $var['categoryID']];
      executeQuery($query);
      break;

  case 'createProductDetailsUCategoriesHistory':
    $query = $defaultQuery;
    $var = getParams(['detailsID', 'categoryID'], [], ['isActive' => 1]);
    $query[0] = 'INSERT INTO z_history_products_details_u_products_categories
      (productDetailsID, categoryID, isActive)
      VALUES (?, ?, ?)
    ';
    $query[1] = 'iii';
    $query[2] = [$var['detailsID'], $var['categoryID'], $var['isActive']];
    executeQuery($query);
    break; // END createProductDetailsUCategoriesHistory


    case 'createSection':
        // checkSecurity()
        $var = getParams(
            ['articleID', 'relevance', 'typeID']
        );
		$query =
			'INSERT INTO articles_sections (
                articleID
                ,relevance
                ,typeID
            )
            VALUES (?, ?, ?)
		';
        $bpTypes = 'iii';
        $bpVars = [$var['articleID'], $var['relevance'], $var['typeID']];
        executeQuery($query, $bpTypes, $bpVars);
        break; // END Create Section -




    case 'createSupplier':
        $query = $defaultQuery;
        $var = getParams(['name', 'email', 'phone', 'address', 'extraInfo']);
        $query[0] = 'INSERT INTO suppliers
        (name, email, phone, address, extraInfo)
        VALUES (?, ?, ?, ?, ?)
        ';
        $query[1] = 'sssss';
        $query[2] = [$var['name'], $var['email'], $var['phone'], $var['address'], $var['extraInfo']];
        // FINISH
        executeQuery($query);
        break;

    case 'createSupplierUProduct':
        $query = $defaultQuery;
        $var = getParams(['supplierID', 'productID', 'price']);
        $query[0] = 'INSERT INTO suppliers_u_products
        (supplierID, productID, price)
        VALUES (?, ?, ?)
        ';
        $query[1] = 'iid';
        $query[2] = [$var['supplierID'], $var['productID'], $var['price']];
        // FINISH
        executeQuery($query);
        break; // END createSupplierUProduct


    case 'createSupplierUProductHistory':
        $query = $defaultQuery;
        $var = getParams(['supplierID', 'productID', 'price']);
        $query[0] = 'INSERT INTO suppliers_u_products_history
        (supplierID, productID, price)
        VALUES (?, ?, ?)
        ';
        $query[1] = 'iid';
        $query[2] = [$var['supplierID'], $var['productID'], $var['price']];
        // FINISH
        executeQuery($query);
        break; // END createSupplierUProductHistory


// - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - //
  case 'getStockChangesReasons':
    $query = $defaultQuery;
    $query[0] = 'SELECT * FROM `products_stock_changes_reasons`';
    executeQuery($query);
    break; // getStockChangesReasons







// - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - //
  case 'deleteProductDetailsUCategories':
    $query = $defaultQuery;
    $var = getParams(['detailsID', 'categoryID', 'isActive']);
  	$query[0] =
  		'UPDATE products_details_u_products_categories
        SET
           isActive = ?
        WHERE productDetailsID = ? AND categoryID = ?
  	';
    $query[1] = 'iii';
    $query[2] = [
         $var['isActive']
        ,$var['detailsID']
        ,$var['categoryID']
    ];
    executeQuery($query);
    break; // deleteProductDetailsUCategories




  case 'modifyProduct':
    $query = $defaultQuery;
    $var = getParams(['productID'],
    [
      'detailsID'
      ,'fullName'
      ,'variantName'
      ,'stock'
      ,'stockAlert'
      ,'pickUpStateID'
      ,'variantPrice'
      ,'variantOffert'
      ,'productParentID'
      ,'productParentMultiplier'
      ,'extraDescription'
      ,'imagesAmount'
      ,'barsCode'
      ,'isActive'
      ,'isArchived'
      ,'onlySuppliers'
      ,'hasInfiniteStock'
      ,'pickUpPlaceHasStock'
      ,'isOkUploaded'
    ]);
    $query[0] = 'UPDATE products';
    // SET
    $query = dynamicQuery($query, $var['productID'], ' SET id = ?', 'i', $var['productID']);
    $query = dynamicQuery($query, $var['detailsID'], ', detailsID = ?', 'i', $var['detailsID']);
    $query = dynamicQuery($query, $var['variantName'], ', variantName = ?', 's', $var['variantName']);
    $query = dynamicQuery($query, $var['fullName'], ', fullName = ?', 's', $var['fullName']);
    $query = dynamicQuery($query, $var['stock'], ', stock = ?', 'i', $var['stock']);
    $query = dynamicQuery($query, $var['stockAlert'], ', stockAlert = ?', 'i', $var['stockAlert']);
    $query = dynamicQuery($query, $var['pickUpStateID'], ', pickUpStateID = ?', 'i', $var['pickUpStateID']);
    $query = dynamicQuery($query, $var['variantPrice'], ', variantPrice = ?', 'd', $var['variantPrice']);
    $query = dynamicQuery($query, $var['variantOffert'], ', variantOffert = ?', 'd', $var['variantOffert']);
    $query = dynamicQuery($query, $var['productParentID'], ', productParentID = ?', 'i', $var['productParentID']);
    $query = dynamicQuery($query, $var['productParentMultiplier'], ', productParentMultiplier = ?', 'i', $var['productParentMultiplier']);
    $query = dynamicQuery($query, $var['extraDescription'], ', extraDescription = ?', 's', $var['extraDescription']);
    $query = dynamicQuery($query, $var['imagesAmount'], ', imagesAmount = ?', 'i', $var['imagesAmount']);
    $query = dynamicQuery($query, $var['barsCode'], ', barsCode = ?', 's', $var['barsCode']);
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    $query = dynamicQuery($query, $var['isArchived'], ', isArchived = ?', 'i', $var['isArchived']);
    $query = dynamicQuery($query, $var['onlySuppliers'], ', onlySuppliers = ?', 'i', $var['onlySuppliers']);
    $query = dynamicQuery($query, $var['hasInfiniteStock'], ', hasInfiniteStock = ?', 'i', $var['hasInfiniteStock']);
    $query = dynamicQuery($query, $var['pickUpPlaceHasStock'], ', pickUpPlaceHasStock = ?', 'i', $var['pickUpPlaceHasStock']);
    $query = dynamicQuery($query, $var['isOkUploaded'], ', isOkUploaded = ?', 'i', $var['isOkUploaded']);
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['productID'], ' AND id = ?', 'i', $var['productID']);
    // dieError($query);
    // FINISH
    executeQuery($query);
    break;

  case 'modifyProductDetails':
    $query = $defaultQuery;
    $var = getParams(['detailsID'], ['brandID', 'name', 'price', 'offert', 'description']);
		$query[0] =
    'UPDATE products_details';
    // SET
    $query = dynamicQuery($query, $var['detailsID'], ' SET id = ?', 'i', $var['detailsID']);
    $query = dynamicQuery($query, $var['brandID'], ', brandID = ?', 'i', $var['brandID']);
    $query = dynamicQuery($query, $var['name'], ', name = ?', 's', $var['name']);
    $query = dynamicQuery($query, $var['price'], ', price = ?', 'd', $var['price']);
    $query = dynamicQuery($query, $var['offert'], ', offert = ?', 'd', $var['offert']);
    $query = dynamicQuery($query, $var['description'], ', description = ?', 's', $var['description']);
    // WHERE
    $query[0] .= ' WHERE 1';
    // detailsID
    $query = dynamicQuery($query, $var['detailsID'], ' AND id = ?', 'i', $var['detailsID']);
    // FINISH
    executeQuery($query);
    break; // END modifyProductDetails

  case 'modifySupplierUProduct':
    $query = $defaultQuery;
    $var = getParams(['supplierID'], ['detailsID', 'price', 'isActive']);
  	$query[0] =
		'UPDATE products_details_u_products_categories';
    // SET
    $query = dynamicQuery($query, $var['supplierID'], ' SET supplierID = ?', 'i', $var['supplierID']);
    // price
    $query = dynamicQuery($query, $var['price'], ', price = ?', 'd', $var['price']);
    // isActive
    $query = dynamicQuery($query, $var['isActive'], ', isActive = ?', 'i', $var['isActive']);
    // WHERE
    $query[0] = ' WHERE 1';
    // detailsID
    $query = dynamicQuery($query, $var['detailsID'], ' AND productDetailsID = ?', 'i', $var['detailsID']);
    // categoryID
    $query = dynamicQuery($query, $var['categoryID'], ' AND categoryID = ?', 'i', $var['categoryID']);
    // EXECUTE
    executeQuery($query);
    break; // modifySupplierUProduct









} // END Giant Case of
desconectarDB($conn);
?>
