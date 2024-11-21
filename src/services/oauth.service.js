import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from '../models/user.model.js';
import { AuthService } from './auth.service.js';

export const OAuthService = {
  initialize() {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID || '934188418394-9sf3vh5ehjdj1krgtefacpud7luqek0f.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          id: profile.id,
          email: profile.emails[0].value
        };

        // Attempt to login or update OAuth info
        const user = await UserModel.updateOrLoginGoogleUser(userData);
        const token = AuthService.generateToken(user);

        return done(null, { user, token });
      } catch (error) {
        // Handle specific error cases
        if (error.message === 'Email not registered in system') {
          return done(null, false, { 
            message: 'Email not registered. Please contact administrator.' 
          });
        } else if (error.message === 'Google account mismatch') {
          return done(null, false, { 
            message: 'This Google account is not linked to your user profile.' 
          });
        }
        return done(error);
      }
    }));

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    return passport.initialize();
  }
};