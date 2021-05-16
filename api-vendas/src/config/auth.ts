export default {
  jwt: { // o token do nosso servidor o hash
    secret: process.env.APP_SECRET,
    expiresIn: '1d' //configurações global do jwt
  },
};
