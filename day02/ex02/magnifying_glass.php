#!/usr/bin/php
<?php
if($argc < 2 || !file_exists($argv[1]))
{
    echo "Wrong input or main file doesn't exist\n";
    return(-1);
}
    $str = file_get_contents($argv[1]);
    $str = preg_replace_callback("/(<a.+title=[\"'])(.+?)([\"']>)([^<>]+?)(<\/a>)/", "callback_strtolower_1", $str);
    function callback_strtolower_1($matches) 
    {
        return $matches[1] . strtoupper($matches[2]) . $matches[3] . strtoupper($matches[4]) . $matches[5];
    }
    $str = preg_replace_callback("/(<a.+title=[\"'])(.+?)([\"']>)([<>]?)(<\/a>)/", "callback_strtolower_2", $str);
    function callback_strtolower_2($matches) 
    {
        return $matches[1] . strtoupper($matches[2]) . $matches[3] . ($matches[4]) . ($matches[5]);
    }
    $str = preg_replace_callback("/(<a )(.*?)(>.*<)(.*)(<\/a>)/", "callback_strtolower_3", $str);
    function callback_strtolower_3($matches) 
    {
        return $matches[1] . $matches[2] . strtoupper($matches[3]) . $matches[4] . $matches[5];
    }
    echo "$str";
?>