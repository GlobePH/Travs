<?php
    header("Content-Type: application/json; charset=UTF-8");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $email = $request->email;
    $password = $request->password;
    $username = $request->username;

    $con = mysql_connect("192.168.169.248","root",'') or die ("Failed to connect to MySQL: " . mysql_error());;
    mysql_select_db('myDb', $con);

    $qry_em = 'select * from routes';
    $result = $con->query($qry_em);

    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"Start":"'  . $rs["destination_from"] . '",';
        $outp .= '"End":"'   . $rs["destination_to"] . '"}'; 
       
        }
        $outp ='{ "records":[ '.$outp.' ]}';
        $conn]->close();
    echo($outp);

?>