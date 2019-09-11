#!/usr/bin/php
<?php
$i = 2;

if ($argc > 2)
{
    $key = $argv[1];
    while($i < $argc)
    {
        if(strstr($argv[$i], $key))
        {
            $str = strstr($argv[$i], $key);
            $str = trim($str);
            $str = str_replace($key, "", $str);
            $str = str_replace(":", "", $str);
            echo "" . $str . "\n";
        }
        $i++;
    }
}
?>