<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){


// getSale
// getSaleProducts

// modifySale
// modifySaleUProduct


  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getTotalStockPrice':
    $query = $defaultQuery;
    $query[0] = "SELECT SUM(productsOfBranch.price * stock) AS absoluteTotal
    FROM products_u_branches AS productsOfBranch
    -- INNER JOIN products_details AS pd ON pd.id = products.detailsID
    WHERE productsOfBranch.stock > 0
    ";
    // dieError($query)
    executeQuery($query);
    break;



} // END Giant Case of

desconectarDB($conn);

?>
