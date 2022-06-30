<?php

 $link = mysqli_connect("127.0.0.1", "camsorweb_violencia", "@Call2012", "camsorweb_violencia");

if ($link === false) {
    die("ERROR: Could not connect." . mysqli_connect_error());
}


date_default_timezone_set("America/Montevideo");
$fecha = date("Y-m-d H:i:s");
$preg1 = filter_var($_POST['preg1']);
$preg2 = filter_var($_POST['preg2']);
$preg3 = filter_var($_POST['preg3']);
$preg4 = filter_var($_POST['preg4']);
$preg5 = filter_var($_POST['preg5']);

echo $preg1 . $preg2 . $preg3 . $preg4 . $preg5;

$sql = "INSERT INTO violencia (fecha_hora, Preg1, Preg2, Preg3, Preg4, Preg5) VALUES ('$fecha', '$preg1', '$preg2','$preg3','$preg4','$preg5')";
if (mysqli_query($link, $sql)) {
    echo "Datos agregados correctamente";
} else {
    echo "ERROR: No se pudo ejecutar la consulta $sql. " . mysqli_error($link);
}

mysqli_close($link);


?>