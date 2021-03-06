CREATE TABLE bathrooms (
    id VARCHAR NOT NULL UNIQUE,
    br_name TEXT NOT NULL,
    lat DECIMAL(10, 6) NOT NULL,
    lng DECIMAL(10, 6) NOT NULL,
    description TEXT,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    category kind_of_type NOT NULL,
    ishandicap BOOLEAN DEFAULT false,
    isfamily BOOLEAN DEFAULT false,
    hasstalls BOOLEAN DEFAULT false,
    isprivate BOOLEAN DEFAULT false,
    gender_neutral BOOLEAN DEFAULT false,
    hasbaby_table BOOLEAN DEFAULT false
);