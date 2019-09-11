#!/usr/bin/php
<?php
$result = 0;
$check = 0;

if($argc == 2)
{
    $argv[1] = trim($argv[1]);
    $argv[1] = str_replace("+", " + ", $argv[1]);
    $argv[1] = str_replace("-", " - ", $argv[1]);
    $argv[1] = str_replace("*", " * ", $argv[1]);
    $argv[1] = str_replace("/", " / ", $argv[1]);
    $argv[1] = str_replace("%", " % ", $argv[1]);
    $array = preg_split("/[\s,]+/", $argv[1]);
    if(is_numeric($array[0]) && is_numeric($array[2]))
    {
        if(strcmp($array[1], "+") == 0)
        $result = $array[0] + $array[2];
        else if(strcmp($array[1], "-") == 0)
        $result = $array[0] - $array[2];
        else if(strcmp($array[1], "*") == 0)
        $result = $array[0] * $array[2];
        else if(strcmp($array[1], "/") == 0)
        $result = $array[0] / $array[2];
        else if(strcmp($array[1], "%") == 0)
        $result = $array[0] % $array[2];
        echo "" . $result . "\n";
    }
    else 
        echo "Syntax Error\n";
}
else
    echo "Incorrect Parameters\n";
?>