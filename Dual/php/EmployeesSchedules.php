<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){


  // addScheduleMovement

  // getScheduleMovement
  // getScheduleMovementSummary

  // modifyScheduleMovement

/* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */
case 'addScheduleMovement':
  $q = $defaultQuery;
  $v = getParams([
     'branchID'
    ,'employeeID'
    ,'entryTime'
    ,'entryDate'
    ,'departureTime'
    ,'departureDate'
    ,'createdByEployeeID'
    ,'dateCreated'
  ]);
  $q[0] =
    'INSERT INTO employees_schedules_movements
      (
         branchID
        ,employeeID
        ,entryTime
        ,entryDate
        ,departureTime
        ,departureDate
        ,createdByEployeeID
        ,dateCreated
      )
    VALUES
      (
         ? -- branchID
        ,? -- employeeID
        ,? -- entryTime
        ,? -- entryDate
        ,? -- departureTime
        ,? -- departureDate
        ,? -- createdByEployeeID
        ,? -- dateCreated
      )
  ';
  // VALUES
  $q = dQ($q, $v['branchID'], '', 'i', $v['branchID']);
  $q = dQ($q, $v['employeeID'], '', 'i', $v['employeeID']);
  $q = dQ($q, $v['entryTime'], '', 'i', $v['entryTime']);
  $q = dQ($q, $v['entryDate'], '', 's', $v['entryDate']);
  $q = dQ($q, $v['departureTime'], '', 'i', $v['departureTime']);
  $q = dQ($q, $v['departureDate'], '', 's', $v['departureDate']);
  $q = dQ($q, $v['createdByEployeeID'], '', 'i', $v['createdByEployeeID']);
  $q = dQ($q, $v['dateCreated'], '', 's', $v['dateCreated']);
  // FINISH
  executeQuery($q);
  break; // END addAddress

  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getScheduleMovement':
    $q = $defaultQuery;
    $v = getParams([], ['movementID', 'branchID', 'isActive', 'search']);
    $q[0] =
    'SELECT
      movements.*
      ,CONCAT(employees.name, " ", employees.surname) AS employeeFullname
      ,CONCAT(employeeCreator.name, " ", employeeCreator.surname) AS createdByEployeeFullname
      FROM employees_schedules_movements AS movements
      INNER JOIN employees ON employees.id = movements.employeeID
      INNER JOIN employees AS employeeCreator ON employeeCreator.id = movements.createdByEployeeID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['movementID'], ' AND movements.id = ?', 'i', $v['movementID']);
    $q = dQ($q, $v['branchID'], ' AND movements.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['isActive'], ' AND movements.isActive = ?', 'i', $v['isActive']);
    if ($v['search']) {
      $q[0] .= ' AND (';
      $q = dQ($q, true, ' CONCAT(employees.name, " ", employees.surname) LIKE ?', 's', '%'.$v['search'].'%');
      $q[0] .= ')';
    }
    $q[0] .= ' ORDER BY entryDate DESC, entryTime DESC';
    // FINISH
    executeQuery($q);
    break;




  case 'getScheduleMovementSummary':
    $q = $defaultQuery;
    $v = getParams([], ['employeeID', 'branchID', 'month', 'isActive']);
    $q[0] =
    'SELECT
       movements.employeeID
      ,CONCAT(employees.name, " ", employees.surname) AS employee
      ,SUM(movements.departureTime) - SUM(movements.entryTime) AS timeWorked
      FROM employees_schedules_movements AS movements
      INNER JOIN employees ON employees.id = movements.employeeID
      WHERE 1
    ';
    // WHERE
    $q = dQ($q, $v['month'], ' AND MONTH(movements.entryDate) = ?', 'i', $v['month']);
    $q = dQ($q, $v['employeeID'], ' AND movements.employeeID = ?', 'i', $v['employeeID']);
    $q = dQ($q, $v['branchID'], ' AND movements.branchID = ?', 'i', $v['branchID']);
    $q = dQ($q, $v['isActive'], ' AND movements.isActive = ?', 'i', $v['isActive']);
    // GROUP BY
    $q[0] .= ' GROUP BY movements.employeeID';
    // FINISH
    // dieError($q);
    executeQuery($q);
    break;






    /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */

  case 'modifyScheduleMovement':
    $q = $defaultQuery;
    $v = getParams(
      ['movementID'],
      [
        'isActive',
    ]);
    $q[0] = "UPDATE employees_schedules_movements";
    // SET
    $q = dQ($q, $v['movementID'], ' SET id = ?', 'i', $v['movementID']);
    $q = dQ($q, $v['isActive'], ', isActive = ?', 'i', $v['isActive']);
    // WHERE
    $q[0] .= ' WHERE 1';
    $q = dQ($q, $v['movementID'], ' AND id = ?', 'i', $v['movementID']);
    // dieError($q);
    // FINISH
    executeQuery($q);
    break; // END modifyEmployee





} // END Giant Case of

desconectarDB($conn);

?>
