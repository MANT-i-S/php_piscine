<?php
foreach ($_GET as $key => $value)
{
    $str = $key . ": " . $value;
    echo "$str\n";
}
?>