<?php
// V 3.3


// Vars
$results = ['error' => false, 'data' => '', 'query' => ['', '', []], 'exception' => (object)[] ];
$defaultQuery = ['', '', []];

// CONFIGURATION
// Habilitación para solicitud HTTP de origen cruzado (CORS)
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}
// Error reporting
error_reporting(0);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Timezone

date_default_timezone_set('America/Argentina/Buenos_Aires');

function dynamicQuery($query, $check, $query2, $bpTypes, $bpVars){
    if (!isset($check)) { return $query; }
    $response = [];
    $response[0] = $query[0] . $query2;
    $response[1] = $query[1] . $bpTypes;
    $response[2] = $query[2];
    array_push($response[2], $bpVars);
    return $response;
} // END dynamicQuery()

function dQ($query, $check, $query2, $bpTypes, $bpVars){
    if (!isset($check)) { return $query; }
    $response = [];
    $response[0] = $query[0] . $query2;
    $response[1] = $query[1] . $bpTypes;
    $response[2] = $query[2];
    array_push($response[2], $bpVars);
    return $response;
} // END dynamicQuery()

function completeQuery($stmt, $fullQuery){
    $query   = $fullQuery[0];
    $bpTypes = $fullQuery[1]; // Bind params types
    $bpVars  = $fullQuery[2]; // Bind params vars
    // Add bpTypes at first of bpVars -
    array_unshift($bpVars, $bpTypes);
    // We need to add references -
    $references = array();
    foreach($bpVars as $key => $value) $references[$key] = &$bpVars[$key];
    // Call the $stmt->bind_param() method with $bpVars as arguments
    set_error_handler('exceptionErrorHandler');
    try {
        call_user_func_array([$stmt, 'bind_param'], $references);
    }catch(Exception $e) {
        dieError('ERROR EN LA QUERY', $e , $fullQuery);
    }
    return $stmt;
} // END completeQuery() -


function executeQuery($fullQuery){
    $query   = $fullQuery[0];
    $bpTypes = $fullQuery[1] ? $fullQuery[1] : []; // Bind params types
    $bpVars  = $fullQuery[2] ? $fullQuery[2] : []; // Bind params vars
    // Prepare -
    $conn = conectarDB();
    $stmt = $conn->prepare($query);
    // Complete -
    if ($bpTypes != '' && $bpVars != []) {
      $stmt = completeQuery($stmt, $fullQuery);
    }
    // Execute and Return
    if (!$stmt->execute()) { die(error($stmt->error, $fullQuery)); } // Return error
    $result = $stmt->get_result();
    if ($result == false) { die(success(mysqli_insert_id($conn))); } // Return only ID -
    // Return all rows -
    $response = []; $i = 0;
    while ($row = $result->fetch_assoc()){
        foreach($row as $key => $key_value) {
           $response[$i][$key] = $row[$key];
        } $i++;
    }
    die(success($response));
} // END executeQuery()

function getParams($required, $optionals = [], $filled = []){
    $result = [];

    $data = json_decode(file_get_contents("php://input"), true);
    $data = isset($data) ? $data : $_POST;
    // Requireds
    for ($i=0; $i < count($required); $i++) {
        isset($data[$required[$i]]) ? $result[$required[$i]] = $data[$required[$i]] : die(error($required[$i] . ' is required'));
    }
    // Optionals
    for ($i=0; $i < count($optionals); $i++) {
         $result[$optionals[$i]] = isset($data[$optionals[$i]]) ? $data[$optionals[$i]] : null;
    }
    // Filled
    foreach($filled as $key => $value) {
        $result[$key] = isset($data[$key]) ? $data[$key] : $value;
    }
    return $result;
} // END getParams() -

function getParamsNew($data, $required, $optionals = [], $filled = []){
    $result = [];
    // Requireds
    for ($i=0; $i < count($required); $i++) {
        isset($data[$required[$i]]) ? $result[$required[$i]] = $data[$required[$i]] : die(error($required[$i] . ' is required'));
    }
    // Optionals
    for ($i=0; $i < count($optionals); $i++) {
         $result[$optionals[$i]] = isset($data[$optionals[$i]]) ? $data[$optionals[$i]] : null;
    }
    // Filled
    foreach($filled as $key) {
        $result[$key] = isset($data[$key]) ? $data[$key] : '';
    }
    return $result;
} // END getParams() -


function error($msj, $exception = null, $query = null){
	$results['error'] = true;
    $results['data'] = $msj;
    $results['exception'] = $exception;
	$results['query'] = $query;
	return json_encode($results);
} // END error()
function success($msj){
    $results['error'] = false;
    $results['data'] = $msj;
    return json_encode($results);
} // END success()
function dieError($msj, $exception = null, $query = null){ die(error($msj, $exception, $query)); }
function dieSuccess($msj = ''){ die(success($msj)); }


// function getInfoDB($subdomain) {
//   switch ($subdomain) {
//     case 'localhost':
//       $server   = "localhost";
//       $user  = "root";
//       $pass  = "";
//       $database = "rapisuper";
//       break;
//
//     case 'test':
//       $server   = "localhost";
//       $user  = "rapisuper";
//       $pass  = "sjde@sd25f8AKs_e";
//       $database = "rapisuper_test";
//       break;
//
//     case 'demo':
//       $server   = "localhost";
//       $user  = "rapisuper";
//       $pass  = "sjde@sd25f8AKs_e";
//       $database = "rapisuper_demo";
//       break;
//
//     default:
//       $server   = "localhost";
//       $user  = "rapisuper";
//       $pass  = "sjde@sd25f8AKs_e";
//       $database = "rapisuper";
//       break;
//   } // switch
//   $result = [
//     'server' => $server,
//     'user' => $user,
//     'pass' => $pass,
//     'database' => $database,
//   ];
//   return $result;
// }




function conectarDB(){
  require_once '_infoDB.php';
  $subdomain = getParams(['_subdomain'])['_subdomain'];
  // dieError($subdomain);
  $infoDB = getInfoDB($subdomain);
  $conexion = mysqli_connect(
     $infoDB['server']
    ,$infoDB['user']
    ,$infoDB['pass']
  ) or die("BD Connect error");
  mysqli_select_db($conexion, $infoDB['database']);

  mysqli_set_charset($conexion,"utf8"); // Test acentos
  if ($conexion->connect_error) die("Connection failed: " . $conexion->connect_error);
  else { return $conexion; }
} // conectarDB()

function desconectarDB($conexion){
  return mysqli_close($conexion);
} // desconectarDB()

function checkSecurity(){
    session_start();
    if(!(isset($_SESSION['authalgo']) &&  $_SESSION['authalgo'] == '10' && isset($_SESSION['userAgent']) && $_SESSION['userAgent'] == $_SERVER['HTTP_USER_AGENT'] && isset($_SESSION['IPaddress']) && $_SESSION['IPaddress'] == $_SERVER['REMOTE_ADDR'])){
        die(error('500'));
    }
    if (empty($_SESSION['SKey'])) {
        $_SESSION['SKey'] = bin2hex(random_bytes(32));
    }
    header('Content-Type: application/json');
    $headers = apache_request_headers();
    if (isset($headers['csrftoken'])) {
        if ($headers['csrftoken'] !== $_SESSION['SKey']) {
            exit(json_encode(['error' => 'Wrong CSRF token.']));
        }
    } else {
        exit(json_encode(['error' => 'No CSRF token.']));
    }
} // END checkSecurity()

function checkUser(){
    session_start();
    if(!isset($_SESSION['authalgo']) || $_SESSION['authalgo'] !='10'){
        header('Location: login.php');
        exit;
    }
} // checkUser()

function exceptionErrorHandler($errno, $errstr, $errfile, $errline) {
    throw new ErrorException($errstr, 0, 0, $errfile, $errline);
}
set_error_handler('exceptionErrorHandler');














// Start page -

$conn = conectarDB();

?>
