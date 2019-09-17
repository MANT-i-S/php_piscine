select name from distrib where
	(id_distrib = 42) or
	((id_distrib >= 62) and (id_distrib <= 69)) or
	(id_distrib = 71) or
	((id_distrib >= 88) and (id_distrib <= 90)) or
	(lower(name) like '%y%y%')
	limit 5 offset 2;