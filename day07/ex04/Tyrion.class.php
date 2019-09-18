<?php
	class Tyrion extends Lannister {
		public function sleepWith($person) {
			if (get_class($person) == 'Jaime'){
				print("Not even if I'm drunk !" . "\n");
            }
            else if (get_class($person) == 'Sansa'){
				print("Let's do this." . "\n");
            }
            else if (get_class($person) == 'Cersei'){
				print("Not even if I'm drunk !" . "\n");
			}
		}
	}
?>