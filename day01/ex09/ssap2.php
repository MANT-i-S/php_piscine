#!/usr/bin/php
<?php
function mysort($a, $b)
{
    $i = 0;
    $i_a = 0;
    $i_b = 0;
    $order = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!\"#$%&'()*+,-./[\]^_`{|}~";
    while($i_a < strlen($a) || $i_b < strlen($b))
    {
        $i_a = stripos($order, $a[$i]);
        $i_b = stripos($order, $b[$i]);
        if ($i_a < $i_b)
            return(-1);
        else if ($i_a > $i_b)
            return(1);
        else
            return(0);
        $i++;
    }
}

$i = 1;
$dest = "";

if ($argc > 1)
{
	while($i < $argc)
	{
		$array = preg_split("/[\s,]+/", $argv[$i]);
		$str = implode(" ", $array);
        $dest = $dest. " " .$str;
		$i++;
    }
    $dest = trim($dest);
    $dest = preg_split("/[\s,]+/", $dest);
    usort($dest, "mysort");
    $str = implode("\n", $dest);
	echo "" . $str . "\n";
}
?>