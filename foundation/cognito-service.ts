import RedisStore from 'connect-redis';
import { Express, Request, Response } from 'express';
import session from 'express-session';
import { jwtDecode } from 'jwt-decode';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { Injection } from './types';

export default function CognitoService(app: Express, injection: Injection) {
  const { redisService, configuration } = injection;

  app.use(
    session({
      store: new RedisStore({
        client: redisService?.getRedisClient(),
      }),
      secret: configuration.session.secret,
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session({ secret: 'your-session-secret' }));

  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: `${configuration.cognito.issuer}/oauth2/authorize`,
        tokenURL: `${configuration.cognito.issuer}/oauth2/token`,
        clientID: configuration.cognito.clientId,
        clientSecret: configuration.cognito.clientSecret,
        callbackURL: configuration.cognito.callbackUrl,
        scope: ['openid', 'email', 'profile'],
      },
      (idToken, _, obj, profile, done) => {
        console.log(`debug:obj`, obj);
        const user = jwtDecode(idToken);
        done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  app.get('/auth/cognito', passport.authenticate('oauth2'));

  app.get(
    '/auth/cognito/callback',
    passport.authenticate('oauth2'),
    (req, res) => res.redirect('/auth/protected')
  );

  app.get('/auth/protected', (req: Request, res: Response) => {
    console.log('req.session', req.session);

    if (req.isAuthenticated()) {
      res.send(
        `Hello, ${JSON.stringify(req.user)} <a href="/auth/logout">Logout</a>`
      );
    } else {
      res.send('Please <a href="/auth/cognito">log in</a>.');
    }
  });

  app.get('/auth/logout', (req, res) => {
    req.logout(() => res.redirect('/auth/protected'));
  });
}
