TRUNCATE
    comments,
    rates,
    favorites,
    bathrooms,
    users,

INSERT INTO users (id, fname,lname,username,password, date_created) 
VALUES
	 (1, 'user','one','exampleuser','$2a$12$hexm1Td1j6RnyBBZMKI0fOFQ/ueCONJjJrfG2UlLNw2e6Nrv4Dk06','2021-04-03 17:50:30.811'),
	 (4, 'Wesley','Diaz','wdiaz13','$2a$12$McWcBnLwBNO2.sTdV/7o0exear1AY.Wv80iJCKFhKPBnqPQH3qnFy','2021-03-29 15:00:33.310');

INSERT INTO bathrooms (id,br_name,lat,lng,description,user_id,category,ishandicap,isfamily,hasstalls,isprivate,gender_neutral,hasbaby_table) 
VALUES
	 ('wieorn','test add',40.785091,-73.968285,'Bathroom',4,'preloaded',false,false,false,false,false,false),
	 ('KrZ3Xz','TEST BATHROOM',40.714216,-73.931637,'THIS IS A TEST BUT YOU COULD PROBABLY PEE ON THE STREET IF YOU WANT',4,'user_added',false,false,false,false,true,false),
	 ('v2oEMr','test 2',40.745103,-73.915424,'trying this again',4,'user_added',false,true,false,false,false,true),
	 ('2kvK6N','test potty',40.732356,-73.950443,'teating',4,'user_added',false,true,false,false,true,false),
	 ('o2QGvz','test again',40.757067,-73.899975,'weee',4,'user_added',true,true,false,false,true,false);


INSERT INTO comments ("text",date_commented,bathroom_id,user_id) 
VALUES
	 ('This was a great bathroom!','2021-04-04 12:46:26.126','wieorn',1),
	 ('This bathroom is the best!','2021-04-04 13:55:47.839','wieorn',4),
	 ('This was an interesting pee for sure
','2021-04-04 14:25:16.195','KrZ3Xz',4);

INSERT INTO rates (bathroom_id,rating,user_id) 
VALUES
	 ('wieorn',5,1),
	 ('KrZ3Xz',3,1);

