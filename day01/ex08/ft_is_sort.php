<?php
function ft_is_sort($array)
{
    $dest = $array;
    sort($array);
    if ($dest == $array)
        return(1);
    else 
        return(0);
}
?>