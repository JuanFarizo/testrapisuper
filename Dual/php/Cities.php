<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

// getCity

// modifyCity

/* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getCity':
    $q = $defaultQuery;
    $v = getParams([], ['cityID', 'branchID', 'isActive', 'search']);
    $q[0] =
    'SELECT
      cities.*
      ,monday.name AS mondayShippingTime
      ,tuesday.name AS tuesdayShippingTime
      ,wednesday.name AS wednesdayShippingTime
      ,thursday.name AS thursdayShippingTime
      ,friday.name AS fridayShippingTime
      ,saturday.name AS saturdayShippingTime
      ,sunday.name AS sundayShippingTime
      ,branches.name AS branchName
      FROM cities
      INNER JOIN shipping_times AS monday ON monday.id = mondayShippingTimeID
      INNER JOIN shipping_times AS tuesday ON tuesday.id = tuesdayShippingTimeID
      INNER JOIN shipping_times AS wednesday ON wednesday.id = wednesdayShippingTimeID
      INNER JOIN shipping_times AS thursday ON thursday.id = thursdayShippingTimeID
      INNER JOIN shipping_times AS friday ON friday.id = fridayShippingTimeID
      INNER JOIN shipping_times AS saturday ON saturday.id = saturdayShippingTimeID
      INNER JOIN shipping_times AS sunday ON sunday.id = sundayShippingTimeID
      INNER JOIN branches ON branches.id = cities.branchID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['cityID'], ' AND cities.id = ?', 'i', $v['cityID']);
    $q = dQ($q, $v['branchID'], ' AND cities.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['isActive'], ' AND cities.isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['search'], ' AND cities.name LIKE ?', 's', '%'.$v['search'].'%');
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */

  case 'modifyCity':
    $q = $defaultQuery;
    $v = getParams(
      ['cityID'],
      [
         'name'
        ,'mondayShippingTimeID'
        ,'tuesdayShippingTimeID'
        ,'wednesdayShippingTimeID'
        ,'thursdayShippingTimeID'
        ,'fridayShippingTimeID'
        ,'saturdayShippingTimeID'
        ,'sundayShippingTimeID'
        ,'isActive'
      ]
    );
    $q[0] = "UPDATE cities";
    // SET
    $q = dQ($q, $v['cityID'], ' SET id = ?', 'i', $v['cityID']);
    $q = dQ($q, $v['name'], ', name = ?', 's', $v['name']);
    $q = dQ($q, $v['mondayShippingTimeID'], ', mondayShippingTimeID = ?', 'i', $v['mondayShippingTimeID']);
    $q = dQ($q, $v['tuesdayShippingTimeID'], ', tuesdayShippingTimeID = ?', 'i', $v['tuesdayShippingTimeID']);
    $q = dQ($q, $v['wednesdayShippingTimeID'], ', wednesdayShippingTimeID = ?', 'i', $v['wednesdayShippingTimeID']);
    $q = dQ($q, $v['thursdayShippingTimeID'], ', thursdayShippingTimeID = ?', 'i', $v['thursdayShippingTimeID']);
    $q = dQ($q, $v['fridayShippingTimeID'], ', fridayShippingTimeID = ?', 'i', $v['fridayShippingTimeID']);
    $q = dQ($q, $v['saturdayShippingTimeID'], ', saturdayShippingTimeID = ?', 'i', $v['saturdayShippingTimeID']);
    $q = dQ($q, $v['sundayShippingTimeID'], ', sundayShippingTimeID = ?', 'i', $v['sundayShippingTimeID']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['cityID'], ' AND id = ?', 'i', $v['cityID']);
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;




} // END Giant Case of

desconectarDB($conn);

?>
