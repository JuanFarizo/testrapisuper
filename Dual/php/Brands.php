<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addBrand

  // getBrand

  // modifyBrand

/* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */

  case 'addBrand':
    $q = $defaultQuery;
    $v = getParams(['name']);
    $q[0] = 'INSERT INTO products_brands
    (name)
    VALUES (?)
    ';
    $q[1] = 's';
    $q[2] = [$v['name']];
    // FINISH
    executeQuery($q);
    break;



/* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getBrand':
    $q = $defaultQuery;
    $v = getParams([], ['brandID', 'isActive', 'search']);
    $q[0] = "SELECT
    p_brands.*
    FROM products_brands AS p_brands
    ";
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['isActive'], ' AND p_brands.isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['brandID'], ' AND p_brands.id = ?', 'i', $v['brandID']);
    $q = dQ($q, $v['search'], ' AND p_brands.name LIKE ?', 's', '%'.$v['search'].'%');
    // ORDER BY
    $q[0] .= ' ORDER BY p_brands.name';
    // FINISH
    executeQuery($q);
    break;



/* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */

  case 'modifyBrand':
    $q = $defaultQuery;
    $v = getParams(['id'], ['name', 'isActive']);
    $q[0] = "UPDATE products_brands";
    // SET
    $q = dQ($q, $v['id'], ' SET id = ?', 'i', $v['id']);
    $q = dQ($q, $v['name'], ', name = ?', 's', $v['name']);
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
