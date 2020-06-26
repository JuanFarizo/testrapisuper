<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addEmployee

  // getEmployee
  // getEmployeeRoles

  // modifyEmployee


  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */
  case 'addEmployee':
    $q = $defaultQuery;
    $v = getParams([
       'branchID'
      ,'name'
      ,'surname'
      ,'nick'
      ,'phone'
      ,'email'
      ,'address'
      ,'cuit'
      ,'dob'
      ,'dniTramitNumber'
      ,'isWorking'
      ,'dateJoined'
      ,'extraInfo'
      ,'roleID'
      ,'cityID'
      ,'user'
      ,'password'
      ,'isRoot'
    ]);
    $q[0] = 'INSERT INTO employees
    (
       branchID
      ,name
      ,surname
      ,nick
      ,phone
      ,email
      ,address
      ,cuit
      ,dob
      ,dniTramitNumber
      ,isWorking
      ,dateJoined
      ,extraInfo
      ,roleID
      ,cityID
      ,user
      ,password
      ,isRoot
    ) VALUES (
       ? -- branchID,
      ,? -- name,
      ,? -- surname,
      ,? -- nick,
      ,? -- phone,
      ,? -- email,
      ,? -- address,
      ,? -- cuit,
      ,? -- dob,
      ,? -- dniTramitNumber,
      ,? -- isWorking,
      ,? -- dateJoined,
      ,? -- extraInfo,
      ,? -- roleID,
      ,? -- cityID
      ,? -- user
      ,? -- password
      ,? -- isRoot
    )
    ';
    $q[1] = 'isssssssssissiiss';
    $q[2] = [
      $v['branchID'],
      $v['name'],
      $v['surname'],
      $v['nick'],
      $v['phone'],
      $v['email'],
      $v['address'],
      $v['cuit'],
      $v['dob'],
      $v['dniTramitNumber'],
      $v['isWorking'],
      $v['isRoot'],
      $v['dateJoined'],
      $v['extraInfo'],
      $v['roleID'],
      $v['cityID'],
      $v['user'],
      $v['password'],
    ]
    ;
    // dieError($q);
    // FINISH
    executeQuery($q);
    break;





  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getEmployee':
    $q = $defaultQuery;
    $v = getParams([], ['employeeID', 'branchID', 'isActive', 'search']);
    $q[0] = 'SELECT
       employees.*
      ,CONCAT(employees.name, " ", employees.surname) AS fullName
      ,roles.role
      ,cities.name AS city
    FROM employees
    INNER JOIN employees_roles AS roles ON roles.id = employees.roleID
    INNER JOIN cities ON cities.id = employees.cityID

    ';
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['branchID'], ' AND employees.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['isActive'], ' AND employees.isActive = ?', 'i', $v['isActive']);
    $q = dQ($q, $v['employeeID'], ' AND employees.id = ?', 'i', $v['employeeID']);
    $q = dQ($q, true, ' AND CONCAT(employees.name, " ", employees.surname) LIKE ?', 's', '%'.$v['search'].'%');

    // if ($v['search']) {
    //   $q[0] .= ' AND (';
    //   $q = dQ($q, true, ' employees.name LIKE ?', 's', '%'.$v['search'].'%');
    //   $q = dQ($q, true, ' OR employees.surname LIKE ?', 's', '%'.$v['search'].'%');
    //   $q[0] .= ')';
    // }
    // ORDER BY
    $q[0] .= ' ORDER BY employees.isWorking DESC, employees.roleID, employees.name, employees.surname';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break; // END getEmployee



  case 'getEmployeeRoles':
    $q = $defaultQuery;
    $v = getParams([], ['hideOnlyMainHouse', 'isActive']);
    $q[0] = 'SELECT
       roles.*
    FROM employees_roles AS roles
    ';
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['isActive'], ' AND roles.isActive = ?', 'i', $v['isActive']);
    if ($v['hideOnlyMainHouse']) {
      $q[0] .= ' AND roles.onlyMainHouse = 0';
    }
    // FINISH
    executeQuery($q);
    break;



  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifyEmployee':
    $q = $defaultQuery;
    $v = getParams(
      ['employeeID'],
      [
         'branchID'
        ,'name'
        ,'surname'
        ,'nick'
        ,'phone'
        ,'email'
        ,'address'
        ,'cuit'
        ,'dob'
        ,'dniTramitNumber'
        ,'isWorking'
        ,'dateJoined'
        ,'extraInfo'
        ,'roleID'
        ,'cityID'
        ,'user'
        ,'password'
        ,'isRoot'
    ]);
    $q[0] = "UPDATE employees";
    // SET
    $q = dQ($q, $v['employeeID'], ' SET id = ?', 'i', $v['employeeID']);
    $q = dQ($q, $v['branchID'], ', branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['name'], ', name = ?', 's', $v['name']);
    $q = dQ($q, $v['surname'], ', surname = ?', 's', $v['surname']);
    $q = dQ($q, $v['nick'], ', nick = ?', 's', $v['nick']);
    $q = dQ($q, $v['phone'], ', phone = ?', 's', $v['phone']);
    $q = dQ($q, $v['email'], ', email = ?', 's', $v['email']);
    $q = dQ($q, $v['address'], ', address = ?', 's', $v['address']);
    $q = dQ($q, $v['cuit'], ', cuit = ?', 's', $v['cuit']);
    $q = dQ($q, $v['dob'], ', dob = ?', 's', $v['dob']);
    $q = dQ($q, $v['dniTramitNumber'], ', dniTramitNumber = ?', 's', $v['dniTramitNumber']);
    $q = dQ($q, $v['isWorking'], ', isWorking = ?', 'i', $v['isWorking']);
    $q = dQ($q, $v['dateJoined'], ', dateJoined = ?', 's', $v['dateJoined']);
    $q = dQ($q, $v['extraInfo'], ', extraInfo = ?', 's', $v['extraInfo']);
    $q = dQ($q, $v['roleID'], ', roleID = ?', 'i', $v['roleID']);
    $q = dQ($q, $v['cityID'], ', cityID = ?', 'i', $v['cityID']);
    $q = dQ($q, $v['user'], ', user = ?', 's', $v['user']);
    $q = dQ($q, $v['password'], ', password = ?', 's', $v['password']);
    $q = dQ($q, $v['isRoot'], ', isRoot = ?', 'i', $v['isRoot']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['employeeID'], ' AND id = ?', 'i', $v['employeeID']);
    // dieError($q);
    // FINISH
    executeQuery($q);
    break; // END modifyEmployee









} // END Giant Case of

desconectarDB($conn);

?>
