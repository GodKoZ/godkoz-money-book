import { Router } from 'express';
import passport from 'passport';
import LINE from 'src/utils/line_login';
import * as Auth from 'src/controllers/auth.controller';
import isAuthenticated from 'src/utils/middlewares/isAuthenticated';

const router = Router();

router.get('/', isAuthenticated, Auth.GetUserProfile());
router.get('/logout', isAuthenticated, Auth.LogOut());

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
    session: false,
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
  }),
  Auth.AuthCallback()
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  Auth.AuthCallback()
);
router.get('/line', LINE.auth());
router.get('/line/callback', LINE.callback(Auth.AuthCallback()));

export default router;
