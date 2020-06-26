<?php

require("_config.php");
$data = json_decode(file_get_contents("php://input"), true);
switch ($data['action']){

  // addMsg
  // getMsg
  // modifyMsg

  /* - - - - - - - - - - - - - - - ADDs - - - - - - - - - - - - - - - */


  case 'addMsg':
    $query = $defaultQuery;
    $var = getParams(['buyerID', 'email', 'name', 'subject', 'message', 'date']);
    $query[0] =
      "INSERT INTO buyers_messages
        (buyerID, email, name, subject, message, date)
      VALUES
        (?, ?, ?, ?, ?)
    ";
    $query = dynamicQuery($query, $var['buyerID'], '', 'i', $var['buyerID']);
    $query = dynamicQuery($query, $var['email'], '', 's', $var['email']);
    $query = dynamicQuery($query, $var['name'], '', 's', $var['name']);
    $query = dynamicQuery($query, $var['subject'], '', 's', $var['subject']);
    $query = dynamicQuery($query, $var['message'], '', 's', $var['message']);
    $query = dynamicQuery($query, $var['date'], '', 's', $var['date']);
    // FINISH
    executeQuery($query);
    break; // END addMsg



  /* - - - - - - - - - - - - - - - GETs - - - - - - - - - - - - - - - */
  case 'getMsg':
    $query = $defaultQuery;
    $var = getParams(['isActive']);
    $query[0] = "SELECT * FROM buyers_messages AS messages";
    // WHERE
    $query[0] .= ' WHERE 1';
    $query = dynamicQuery($query, $var['isActive'], ' AND isActive = ?', 'i', $var['isActive']);
    // ORDER BY
    $query[0] .= ' ORDER BY date DESC';
    // FINISH
    executeQuery($query);
    break; // END getMsg





  /* - - - - - - - - - - - - - - - MODIFYs - - - - - - - - - - - - - - - */
  case 'modifyMsg':
    $query = $defaultQuery;
    $var = getParams(['id', 'isAnswered']);
    $query[0] = "UPDATE buyers_messages SET isAnswered = ? WHERE id = ?";
    // WHERE
    $query = dynamicQuery($query, $var['isAnswered'], '', 'i', $var['isAnswered']);
    $query = dynamicQuery($query, $var['id'], '', 'i', $var['id']);
    // FINISH
    // dieError($query);
    executeQuery($query);
    break; // END modifyMsg



} // END Giant Case of

desconectarDB($conn);

?>
