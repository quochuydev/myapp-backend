import RedisStore from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import { jwtDecode } from 'jwt-decode';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

export default function PassportService(app: any, injection: any) {
  const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
  });
  // docker run -d --name redis -p 6379:6379 redis:7.2

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'your-session-secret',
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session({ secret: 'your-session-secret' }));

  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: `/oauth2/authorize`,
        tokenURL: `/oauth2/token`,
        clientID: '',
        clientSecret: '',
        callbackURL: '',
        scope: ['openid', 'email', 'profile'],
      },
      (idToken, _, obj, profile, done) => {
        console.log(`debug:obj`, obj);
        const user = jwtDecode(idToken);
        done(null, user);
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj: any, done) => {
    done(null, obj);
  });

  app.get('/auth/cognito', (req, res, next) => {
    passport.authenticate('oauth2', {
      failureRedirect: '/login',
    })(req, res, next);
  });

  app.get(
    '/auth/cognito/callback',
    passport.authenticate('oauth2', { failureRedirect: '/' }),
    (req, res) => res.redirect('/protected')
  );

  app.get('/protected', (req, res) => {
    console.log('req.session', req.session);

    if (req.isAuthenticated()) {
      res.send(
        `Hello, ${JSON.stringify(req.user)} <a href="/logout">Logout</a>`
      );
    } else {
      res.send('Please <a href="/auth/cognito">log in</a>.');
    }
  });

  app.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
  });
}
