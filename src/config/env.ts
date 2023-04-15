const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  PORT,
  JWT_SECRET,
  PAGARME_API_HOST,
  PAGARME_API_KEY
} = process.env;

export default {
  mongodb: {
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD
  },
  pagarme: {
    host: PAGARME_API_HOST,
    api_key: PAGARME_API_KEY
  },
  jwt_secret: JWT_SECRET,
  port: PORT ?? 3002
};
