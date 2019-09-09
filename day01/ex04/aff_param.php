#!/usr/bin/php
<?php
$i = 1;

if ($argc <= 1)
	echo "\n";
if ($argc > 1)
{
	while($i < $argc)
	{
	echo "" . $argv[$i] . "\n";
	$i++;
	}
}
?>