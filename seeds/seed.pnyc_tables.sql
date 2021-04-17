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

INSERT INTO bathrooms (id,br_name,lat,lng,description,user_id,category) 
VALUES
('pYQErV', 'Arcilla Playground', 40.8299578, -73.9121092, 'Public Bathroom', 0, 'preloaded'),
('Nk9PBv', 'Crotona Park (Pool House)', 40.8406852, -73.8982801, 'Public Bathroom', 0, 'preloaded'),
('5y96ZZ', 'Behagen Playground', 40.8243848, -73.90117599999999, 'Public Bathroom', 0, 'preloaded'),
('Nk9QEv', 'Magenta Playground', 40.8732408, -73.86820689999999, 'Public Bathroom', 0, 'preloaded'),
('9rQlYJ', 'Clark Playground', 40.8174205, -73.9287226, 'Public Bathroom', 0, 'preloaded'),
('VOP1wB', 'Mathew Muliner Playground', 40.8472985, -73.86114839999999, 'Public Bathroom', 0, 'preloaded'),
('pYQEW2', 'Franz Sigel Park', 40.8219582, -73.928103, 'Public Bathroom', 0, 'preloaded'),
('BBLxXY', 'Capt. Rivera Playground', 40.8181622, -73.9062307, 'Public Bathroom', 0, 'preloaded'),
('QW0YlM', 'Millbrook Playground', 40.8037164, -73.91584619999999, 'Public Bathroom', 0, 'preloaded'),
('n5rDMP', 'Belmont Playground', 40.8489391, -73.8881588, 'Public Bathroom', 0, 'preloaded'),
('G65yYJ', 'Riverbend Playground', 40.8731945, -73.90569719999999, 'Public Bathroom', 0, 'preloaded'),
('jRqGEW', 'Pelham Bay Park (Hunter Island Picnic Area)', 40.8670144, -73.81006339999999, 'Public Bathroom', 0, 'preloaded'),
('OYyrQB', 'Fort Greene Playground', 40.6936988, -73.9623828, 'Public Bathroom', 0, 'preloaded'),
('ER9DD4', 'Pelham Bay Park (Playground for All Children)', 40.8486291, -73.8279754, 'Public Bathroom', 0, 'preloaded'),
('G65pN7', 'Coney Island Beach', 40.7446311, -73.9989763, 'Public Bathroom', 0, 'preloaded'),
('1wr8Rj', 'Albert J. Parham Playground', 40.6903424, -73.9708206, 'Public Bathroom', 0, 'preloaded'),
('J6qmo2', 'Carroll Park', 40.6896429, -73.9887952, 'Public Bathroom', 0, 'preloaded'),
('2kvmPK', 'Coney Island Beach', 40.5907914, -73.98412739999999, 'Public Bathroom', 0, 'preloaded'),
('0RVlqN', 'Richman (Echo) Park Playground', 40.8498739, -73.901799, 'Public Bathroom', 0, 'preloaded'),
('yPrRg7', 'Vidalia Park', 40.8431307, -73.8828001, 'Public Bathroom', 0, 'preloaded'),
('Nk9Qkm', 'Parkside Playground', 40.8696847, -73.8682359, 'Public Bathroom', 0, 'preloaded'),
('VOPL2z', 'Coney Island Beach', 40.7407337, -74.0007184, 'Public Bathroom', 0, 'preloaded'),
('jRqGEWW', 'Orchard Beach Pavilion', 40.8670144, -73.81006339999999, 'Public Bathroom', 0, 'preloaded'),
('1wr2W3', 'St. Marys Playground East Playground', 40.812781, -73.9092517, 'Public Bathroom', 0, 'preloaded'),
('kRZJZ6', 'Quarry Ballfields', 40.8510258, -73.890971, 'Public Bathroom', 0, 'preloaded'),
('BB87rN', 'Prospect Park (Middle Long Meadow)', 45.517604, -122.6813022, 'Public Bathroom', 0, 'preloaded'),
('9rQK38', 'Prospect Park (The Bandshell)', 40.6604292, -73.9797224, 'Public Bathroom', 0, 'preloaded'),
('mZQ5ZA', 'Glenwood Playground', 40.6374886, -73.91916549999999, 'Public Bathroom', 0, 'preloaded'),
('xkvDXr', 'Jesse Owens Playground', 40.6905638, -73.94536049999999, 'Public Bathroom', 0, 'preloaded'),
('qxY00r', 'PS 286 Playground', 40.591086, -73.93840220000001, 'Public Bathroom', 0, 'preloaded'),
('xkvD4q', 'Tiger Playground', 40.688129, -73.91169099999999, 'Public Bathroom', 0, 'preloaded'),
('KrZPGR', 'Central Park (Dana Discovery Center)', 40.7992147, -73.954758, 'Public Bathroom', 0, 'preloaded'),
('JGl92', 'Underwood Park', 36.872202, -76.274751, 'Public Bathroom', 0, 'preloaded'),
('ER9Y9W', 'Carl Schurz Park', 40.7736224, -73.9457372, 'Public Bathroom', 0, 'preloaded'),
('4xRl32', 'Central Park Delacorte Comfort Station', 40.8018143, -74.0017666, 'Public Bathroom', 0, 'preloaded'),
('BBLJqx', 'Yak Playground', 40.5926042, -73.9365773, 'Public Bathroom', 0, 'preloaded'),
('yPrYWR', 'Sternberg Park', 40.7061304, -73.9472658, 'Public Bathroom', 0, 'preloaded'),
('VOP42W', 'Central Park (Lasker)', 40.79873329999999, -73.95955459999999, 'Public Bathroom', 0, 'preloaded'),
('wpmJKz', 'Columbus Park', 40.7169972, -73.9996544, 'Public Bathroom', 0, 'preloaded'),
('v2oWXm', 'Morningside Park', 40.8101043, -73.9550259, 'Public Bathroom', 0, 'preloaded'),
('v2oXEm', 'Fort Tryon Park (Anne Loftus Playground)', 40.8655401, -73.92727289999999, 'Public Bathroom', 0, 'preloaded'),
('KrZg2p', 'Central Park (North Meadow Recreation Center)', 40.7812199, -73.9665138, 'Public Bathroom', 0, 'preloaded'),
('jRqx9R', 'Jackie Robinson Park (Recreation Center)', 40.8214562, -73.9446103, 'Public Bathroom', 0, 'preloaded'),
('QW0VDq', 'J. Hood Wright Park', 40.8462739, -73.9426222, 'Public Bathroom', 0, 'preloaded'),
('jRqyAW', 'Fort Washington Park (Lily Brown Playground)', 40.8348928, -73.93775819999999, 'Public Bathroom', 0, 'preloaded'),
('KrZg2l', 'Central Park (Wollman Rink)', 40.7812199, -73.9665138, 'Public Bathroom', 0, 'preloaded'),
('Nk93j6', 'Hamilton Fish Park (Recreation Center)', 40.7222435, -73.9874957, 'Public Bathroom', 0, 'preloaded'),
('BBLDzN', 'Riverside Park (Café)', 40.8096051, -73.967289, 'Public Bathroom', 0, 'preloaded'),
('5y9OwY', 'Flushing Meadows Corona Park (Playground for All Children) ', 40.7408241, -73.8500652, 'Public Bathroom', 0,
 'preloaded'),
('jRqp9W', 'Vesuvio Playground', 40.7248988, -74.0026214, 'Public Bathroom', 0, 'preloaded'),
('5y9OGx', 'Flushing Meadows Corona Park (Passerelle)', 40.7463889, -73.8450676, 'Public Bathroom', 0, 'preloaded'),
('ER9zN4', 'Bayside Fields', 40.771629, -73.78656699999999, 'Public Bathroom', 0, 'preloaded'),
('W67N6x', 'Michaelis-Bayswater Park', 40.5987494, -73.7660029, 'Public Bathroom', 0, 'preloaded'),
('1wrKMm', 'Flushing Meadows Corona Park (Zoo, Ballfields)', 40.7413416, -73.8489647, 'Public Bathroom', 0, 'preloaded'),
('KrZV5l', 'Joline Pool Playground (Modular Equipment)', 40.5062126, -74.2349127, 'Public Bathroom', 0, 'preloaded'),
('xkvgGn', 'Lyons Pool', 40.6375608, -74.074486, 'Public Bathroom', 0, 'preloaded'),
('0RVjWX', 'Double Nickel Playground', 40.5368765, -74.16339289999999, 'Public Bathroom', 0, 'preloaded'),
('VOPGMz', 'Grandview Playground', 40.6302938, -74.16532, 'Public Bathroom', 0, 'preloaded'),
('rkR1Zw', 'Corporal Thompson Park/West Brighton Pool', 40.6369738, -74.1175598, 'Public Bathroom', 0, 'preloaded'),
('4xRoQ6', 'High Rock Park (McArthur Park)', 40.5803768, -74.1149813, 'Public Bathroom', 0, 'preloaded'),
('J6qpKo', 'Stapleton Playground', 40.6246433, -74.07962719999999, 'Public Bathroom', 0, 'preloaded'),
('Z6Vx7g', 'Midland Field', 40.5747762, -74.097614, 'Public Bathroom', 0, 'preloaded'),
('rkRrvE', 'Midland Beach & Boardwalk South Beach (Saturn Playground)', 40.5680911, -74.09284989999999, 'Public Bathroom', 0, 'preloaded'),
('E3RzW', 'Markham Playground', 29.8501841, -95.2018774, 'Public Bathroom', 0, 'preloaded'),
('pYQ5oX', 'Marine Park Nature Center', 40.6050708, -73.9298714, 'Public Bathroom', 0, 'preloaded'),
('', 'Terrace Playground', -25.3150052, 152.5614773, 'Public Bathroom', 0, 'preloaded'),
('73LKBQ', 'Todt Hill Playground', 40.60884, -74.1211568, 'Public Bathroom', 0, 'preloaded'),
('R6oEyR', 'Coney Island', 40.745281, -73.990929, 'Public Bathroom', 0, 'preloaded'),
('kRZky6', 'Coney Island', 40.5769054, -73.96512779999999, 'Public Bathroom', 0, 'preloaded'),
('v2oEX5', 'Coney Island', 40.7521095, -73.9953486, 'Public Bathroom', 0, 'preloaded'),
('qxYy2R', 'Bendheim Playground', 40.7369664, -73.99317549999999, 'Public Bathroom', 0, 'preloaded'),
('jRqwJR', 'Conference House Park', 40.5464584, -74.1414633, 'Public Bathroom', 0, 'preloaded'),
('mZQJ0p', 'Liberty Pool', 40.70204529999999, -73.7831305, 'Public Bathroom', 0, 'preloaded'),
('o2QrYj', 'Rockaway Beach 117th L/G', 40.5795009, -73.83810679999999, 'Public Bathroom', 0, 'preloaded'),
('v2QMMg', 'South Beach Wetlands', 42.254983, -71.029104, 'Public Bathroom', 0, 'preloaded'),
('o2QrXk', 'Rockaway Beach 97 Comfort Station', 40.584947, -73.81880570000001, 'Public Bathroom', 0, 'preloaded'),
('wpmDwM', 'Rockaway Beach 86 Comfort Station', 40.5891178, -73.81147279999999, 'Public Bathroom', 0, 'preloaded'),
('73LqKy', 'Bloomingdale Park', 40.5334003, -74.2105955, 'Public Bathroom', 0, 'preloaded'),
('lY5ovJ', 'Rockaway Beach 106 Comfort Station', 40.582913, -73.82785539999999, 'Public Bathroom', 0, 'preloaded');
