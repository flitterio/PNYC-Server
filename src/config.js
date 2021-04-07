module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:  process.env.DATABASE_URL || 'postgres://mlzeeuyuqposwc:1b1bbe7fb129d4acad6ed3c07f7e633a143d53aa2e96056367b5213b682fc38a@ec2-54-205-183-19.compute-1.amazonaws.com:5432/d5nfuq0bok3pul',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000/', 
    JWT_SECRET: process.env.JWT_SECRET || 'pizza',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  }