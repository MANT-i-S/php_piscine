<?php
function ft_split($str)
{
	$array = preg_split("/[\s,]+/", $str);
	sort($array);
	return($array);
}
?>