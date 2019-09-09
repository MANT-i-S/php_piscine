#!/usr/bin/php
<?php
$i = 1;

if ($argc <= 1)
	echo "\n";
if ($argc > 1)
{
	while($i < $argc)
	{
		$str = trim($argv[$i]);
		$str = preg_replace("/\s+/", ' ', $str);
		$array = preg_split("/[\s,]+/", $str);
		$array[$i] = $str;
		$i++;
	}
	sort($array);
	echo "" . $array[1] . "\n";
}
?>