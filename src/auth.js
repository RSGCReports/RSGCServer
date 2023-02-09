const passport = require('passport');

const BearerStrategy = require('passport-http-bearer').Strategy;
const { CognitoJwtVerifier } = require('aws-jwt-verify');

const logger = require('./logger');

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
  tokenUse: 'id',
});

jwtVerifier.hydrate().catch((err) => {
  logger.error({ err });
});

module.exports.strategy = () =>
  new BearerStrategy(async (token, done) => {
    try {
      const user = await jwtVerifier.verify(token);
      logger.debug({ user }, 'All good inside auth.js');
      done(null, user['cognito:username']);
    } catch (err) {
      logger.error({ err, token }, "Something's wrong in auth.js");
      done(null, false);
    }
  });

module.exports.auth = () => passport.authenticate('bearer', { session: false });
