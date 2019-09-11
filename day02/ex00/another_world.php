#!/usr/bin/php
<?php
if($argc > 1)
{
    $argv[1] = trim($argv[1]);
    $array = preg_split("/[\s,]+/", $argv[1]);
    $str = implode(" ", $array);
    echo "" . $str . "\n";
}
?>