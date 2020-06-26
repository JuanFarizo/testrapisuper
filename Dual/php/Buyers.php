<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addAddress
  // addBuyer
  // addEmail
  // addPass
  // addReceiver
  // addTemporalBuyer
  // addTemporalBuyer

  // getAddress
  // getBuyers
  // getReceiver

  // modifyBuyer




  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */


  case 'addAddress':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'streetName', 'streetNumber', 'cityID', 'floorAndDepartment', 'extraReferences']);
    $query[0] =
      'INSERT INTO buyers_addresses
        (buyerID, streetName, streetNumber, cityID, floorAndDepartment, extraReferences)
      VALUES
        (?, ?, ?, ?, ?, ?)
    ';
    // VALUES
    $query = dynamicQuery($query, $var['buyerID'], '', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['streetName'], '', 's', $var['streetName']);
    $query = dynamicQuery($query, $var['streetNumber'], '', 's', $var['streetNumber']);
    $query = dynamicQuery($query, $var['cityID'], '', 'i', $var['cityID']);
    $query = dynamicQuery($query, $var['floorAndDepartment'], '', 's', $var['floorAndDepartment']);
    $query = dynamicQuery($query, $var['extraReferences'], '', 's', $var['extraReferences']);
    // FINISH
    executeQuery($query);
    break; // END addAddress


  case 'addBuyer':
    $query = $defaultQuery;
    $var = getParams(['token']);
    $query[0] =
      'INSERT INTO buyers
        (emailID, personalInfoID, passwordID, token)
      VALUES
        (0, 0, 0, ?)
    ';
    $query = dynamicQuery($query, $var['token'], '', 's', $var['token']);
    // FINISH
    executeQuery($query);
    break; // END addBuyer


    case 'addEmail':
      $query = $defaultQuery;
      $var = getParams(['email', 'isSuscriptionActive', 'createdReasonID']);
      $query[0] =
      'INSERT INTO buyers_emails
        (email, isSuscriptionActive, createdReasonID)
      VALUES
        (?, ?, ?)
      ';
      // VALUES
      $query = dynamicQuery($query, $var['email'], '', 's', $var['email']);
      $query = dynamicQuery($query, $var['isSuscriptionActive'], '', 'i', $var['isSuscriptionActive']);
      $query = dynamicQuery($query, $var['createdReasonID'], '', 'i', $var['createdReasonID']);
      // FINISH
      executeQuery($query);
      break; // END addEmail

  case 'addPass':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'pass']);
    $query[0] =
    'INSERT INTO buyers_passwords
      (buyerID, password)
    VALUES
      (?, ?)
    ';
    // VALUES
    $query = dynamicQuery($query, $var['buyerID'], '', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['pass'], '', 's', $var['pass']);
    // FINISH
    executeQuery($query);
    break; // END addPass


    // case 'addTemporalBuyer':
    //   $query = $defaultQuery;
    //   $var = getParams(['email', 'pass']);
    //   $query[0] =
    //   'INSERT INTO buyers_temporal
    //     (email, password)
    //   VALUES
    //     (?, ?)
    //   ';
    //   // VALUES
    //   $query = dynamicQuery($query, $var['email'], '', 's', $var['email']);
    //   $query = dynamicQuery($query, $var['pass'], '', 's', $var['pass']);
    //   // FINISH
    //   executeQuery($query);
    //   break; // END addTemporalBuyer




  case 'addReceiver':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'name', 'surname', 'phone']);
    $query[0] =
    'INSERT INTO buyers_personal_info
      (buyerID, name, surname, phone)
    VALUES
      (?, ?, ?, ?)
    ';
    // VALUES
    $query = dynamicQuery($query, $var['buyerID'], '', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['name'], '', 's', $var['name']);
    $query = dynamicQuery($query, $var['surname'], '', 's', $var['surname']);
    $query = dynamicQuery($query, $var['phone'], '', 's', $var['phone']);
    // FINISH
    executeQuery($query);
    break; // END addReceiver



  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */

  case 'getAddress':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'isActive']);
    $query[0] =
    'SELECT
      addresses.*,
      cities.name AS city
    FROM buyers_addresses AS addresses
    INNER JOIN cities ON cities.id = addresses.cityID
    ';
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['buyerID'], ' AND addresses.buyerID = ?', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['isActive'], ' AND addresses.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY addresses.lastTimeUsed DESC, addresses.dateCreated ASC';
    // FINISH
    executeQuery($query);
    break; // END getAddress

    case 'getBuyer':
      $query = $defaultQuery;
      $var = getParams(['isActive']);
      $query[0] =
      'SELECT
      buyers.*
      ,receiver.name
      ,receiver.surname
      ,receiver.phone
      FROM buyers
      INNER JOIN buyers_personal_info AS receiver ON receiver.id = buyers.personalInfoID
      ';
      // WHERE
      $query[0] .= ' WHERE 1';
      $query = dynamicQuery($query, $var['isActive'], ' AND buyers.isActive = ?', 'i', $var['isActive']);
      // ORDER BY
      $query[0] .= ' ORDER BY buyers.dateCreated';
      // FINISH
      executeQuery($query);
      break; // END getBuyer


  case 'getReceiver':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'isActive']);
    $query[0] =
    'SELECT receiver.*
    FROM buyers_personal_info AS receiver
    ';
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['buyerID'], ' AND receiver.buyerID = ?', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['isActive'], ' AND receiver.isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY receiver.lastTimeUsed DESC, receiver.dateCreated ASC';
    // FINISH
    executeQuery($query);
    break; // END getReceiver


  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifyBuyer':
    $query = $defaultQuery;
    $var = getParams(['buyerID'], ['receiverID', 'emailID', 'passID']);
    $query[0] =
    'UPDATE buyers SET';
    // SET
    $query = dynamicQuery($query, $var['buyerID'], ' id = ?', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['receiverID'], ', personalInfoID = ?', 'i', $var['receiverID']);
    $query = dynamicQuery($query, $var['emailID'], ', emailID = ?', 'i', $var['emailID']);
    $query = dynamicQuery($query, $var['passID'], ', passwordID = ?', 'i', $var['passID']);
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['buyerID'], ' AND id = ?', 'i', $var['buyerID']);
    // FINISH
    executeQuery($query);
    break; // END modifyBuyer









} // END Giant Case of

desconectarDB($conn);

?>
