#!/usr/bin/php
<?php
$result = 0;
$check = 0;

$argv[1] = trim($argv[1]);
$argv[2] = trim($argv[2]);
$argv[3] = trim($argv[3]);
if ($argc == 4)
{
    if(strcmp($argv[2], "+") == 0)
    $result = $argv[1] + $argv[3];
    else if(strcmp($argv[2], "-") == 0)
    $result = $argv[1] - $argv[3];
    else if(strcmp($argv[2], "*") == 0)
    $result = $argv[1] * $argv[3];
    else if(strcmp($argv[2], "/") == 0)
    $result = $argv[1] / $argv[3];
    else if(strcmp($argv[2], "%") == 0)
    $result = $argv[1] % $argv[3];
    echo "" . $result . "\n";
}
else
    echo "Incorrect Parameters\n";
?>