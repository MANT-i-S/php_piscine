#!/usr/bin/php
<?php
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
	sort($dest);
	$str = implode("\n", $dest);
	echo "" . $str . "\n";
}
?>