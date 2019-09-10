#!/usr/bin/php
<?php
$i = 1;
$words = 0;
$str = "";

$array = str_word_count($argv[1], 1);
$words = str_word_count($argv[1], 0);
while($i < $words)
{
    $str = $str . " " . $array[$i];
    $i++;
}
$str = $str . " " . $array[0];
$str = trim($str);
echo "" . $str . "\n";
?>