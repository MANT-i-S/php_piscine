<?php
class NightsWatch implements IFighter
{
	public $person = array();
	public function recruit($fighter){
		$this->person[] = $fighter;
	}
	public function fight(){
		foreach ($this->person as $f){
		if (method_exists($f, 'fight'))
		  print($f->fight());
		}
	}
}
?>