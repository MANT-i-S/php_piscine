<?php
$mycookie =  ($_GET["value"]);
if($mycookie)
$mycookie = $mycookie."\n";
setcookie("firstcookie", $mycookie, time()+3600);
echo($_COOKIE["firstcookie"]);
?>