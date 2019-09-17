select upper(user_card.last_name) as 'NAME', user_card.first_name, subscription.price from user_card
	inner join member on member.id_member = user_card.id_user
	inner join subscription on member.id_sub = subscription.id_sub
	where subscription.price > 42 
	order by user_card.last_name asc, user_card.first_name asc;