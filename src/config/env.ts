const { MONGODB_USERNAME, MONGODB_PASSWORD, PORT, JWT_SECRET } = process.env;

export default {
  mongodb: {
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD
  },
  jwt_secret: JWT_SECRET,
  port: PORT ?? 3002
};
