#!/usr/bin/php
<?php
$i = 2;

if ($argc > 2)
{
    $key = $argv[1];
    $key = $key.":";
    while($i < $argc)
    {
        if(strstr($argv[$i], $key))
        {
            $str = strstr($argv[$i], $key);
            $str = trim($str);
            $str = str_replace($key, "", $str);
            $array = preg_split("/[\s,]+/", $str);
            echo "" . $array[0] . "\n";
        }
        $i++;
    }
}
?>