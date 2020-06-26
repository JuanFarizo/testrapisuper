<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// addCategory

// getCategory
// getProductsOfCategory

// modifyCategory

/* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */

  case 'addCategory':
    $q = $defaultQuery;
    $v = getParams(['name', 'parentID'], [], ['isShowed' => 1]);
    $q[0] = 'INSERT INTO products_categories
    (name, parentID, isShowed)
    VALUES (?, ?, ?)
    ';
    $q[1] = 'sii';
    $q[2] = [$v['name'], $v['parentID'], $v['isShowed']];
    // FINISH
    executeQuery($q);
    break;



/* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getCategory':
    $q = $defaultQuery;
    $v = getParams([], ['categoryID', 'isActive', 'parentID', 'isShowed', 'search']);
    $q[0] =
    "SELECT
      p_categories.*
      ,parentCategory.name AS parent
    FROM products_categories AS p_categories
    INNER JOIN products_categories AS parentCategory ON parentCategory.id = p_categories.parentID
    ";
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['categoryID'], ' AND p_categories.id = ?', 'i', $v['categoryID']);
    $q = dQ($q, $v['isActive'], ' AND p_categories.isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['parentID'], ' AND p_categories.parentID = ?', 'i', $v['parentID']);
    $q = dQ($q, $v['isShowed'], ' AND p_categories.isShowed = ?', 'i', $v['isShowed']);
    $q = dQ($q, $v['search'], ' AND p_categories.name LIKE ?', 's', '%'.$v['search'].'%');
    // ORDER BY
    $q[0] .= ' ORDER BY p_categories.parentID ASC, p_categories.name';
    // FINISH
    executeQuery($q);
    break;



  case 'getProductsOfCategory':
    $q = $defaultQuery;
    $v = getParams(['categoryID'], ['isActive']);
    $q[0] =
    'SELECT
      pd_pcategories.*
      ,products.fullName
      FROM products_details_u_products_categories AS pd_pcategories
      INNER JOIN products ON products.detailsID = pd_pcategories.productDetailsID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['categoryID'], ' AND pd_pcategories.categoryID = ?', 'i', $v['categoryID']);
    // FINISH
    executeQuery($q);
    break;


  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */

  case 'modifyCategory':
    $q = $defaultQuery;
    $v = getParams(['id'], ['name', 'isShowed', 'isActive']);
    $q[0] = "UPDATE products_categories";
    // SET
    $q = dQ($q, $v['id'], ' SET id = ?', 'i', $v['id']);
    $q = dQ($q, $v['name'], ', name = ?', 's', $v['name']);
    $q = dQ($q, $v['isShowed'], ', isShowed = ?', 'i', $v['isShowed']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['id'], ' AND id = ?', 'i', $v['id']);
    // FINISH
    executeQuery($q);
    break;

} // END Giant Case of

desconectarDB($conn);

?>
