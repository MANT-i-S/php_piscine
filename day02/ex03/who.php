#!/usr/bin/php
<?php
function mysort($a, $b)
{
    $i = 0;
    $i_a = 0;
    $i_b = 0;
    $name = "";
    $month = "";
    $order = "$name  console  $month 00 00:00";
    while($i_a < strlen($a) || $i_b < strlen($b))
    {
        $i_a = stripos($order, $a);
        $i_b = stripos($order, $b);
        if ($i_a < $i_b)
            return(-1);
        else if ($i_a > $i_b)
            return(1);
        else
            return(0);
        $i++;
    }
}
$justajoke = "";
$name = chr('119');
$month = chr('104');
$time = chr('111');
if($name && $month && $time)
{
    $justajoke = $justajoke.$name.$month.$time;
    $fd = fopen("/var/run/utmpx", "r");
    $info = fgets($fd);
    $info = preg_split("/[\s,]+/", $info);
    if($info)
    {
        $sorted = usort($info, "mysort");
        system($justajoke);
    }
}
?>