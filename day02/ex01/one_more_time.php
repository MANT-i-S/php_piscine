#!/usr/bin/php
<?php
$res = 0;
$check = 0;
$str = "";
$monthlist = array('0', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre');
$weeklist = array('0', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche');
if($argc == 2)
{
    $argv[1] = strtolower($argv[1]);
    $array = preg_split("/[\s,]+/", $argv[1]);
    if(count($array) == 5)
    {
        if(array_search($array[0], $weeklist))
        {
            if(strlen($array[3]) == 4 && is_numeric($array[3]))
            {
                $str = $str.$array[3];
                if(!is_numeric($array[2]) && array_search($array[2], $monthlist))
                {
                    $month = array_search($array[2], $monthlist);
                    $month = sprintf("%02d", $month);
                    $str = $str."-".$month;
                    if(strlen($array[1]) < 3 && is_numeric($array[1]))
                    {
                        $day = sprintf("%02d", $array[1]);
                        if($day < 32)
                        {
                            $str = $str."-".$day;
                            if(strlen($array[4]) == 8)
                            {
                                $time_ar = explode(":", $array[4]);
                                if(count($time_ar) == 3 && is_numeric($time_ar[0]) && is_numeric($time_ar[1]) && is_numeric($time_ar[2]))
                                {
                                    if($time_ar[0] < 25 && $time_ar[1] < 61 && $time_ar[2] < 61)
                                    {
                                        $str = $str." ".$time_ar[0];
                                        $str = $str.":".$time_ar[1];
                                        $str = $str.":".$time_ar[2];
                                        $res = strtotime($str. '' .'GMT+01:00');
                                        echo "$res\n";
                                        return(0);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    echo "Wrong Format\n";
}
?>