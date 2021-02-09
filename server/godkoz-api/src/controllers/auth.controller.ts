import { Request, Response } from 'express';
import * as UserService from 'src/services/user.service';
import { User } from 'src/interfaces/User';

export function GetUserProfile() {
  return async (req: Request, res: Response) => {
    console.log(req.headers);
    const user = req.user as User;
    const profile = {
      display_name: user?.display_name,
      picture_url: user?.picture_url,
    };
    return res.json(profile);
  };
}

export function AuthCallback() {
  return async (req: Request, res: Response) => {
    const user = req.user as { _id: string };
    try {
      const token = await UserService.UpdateUserLoggedIn(user?._id);
      let origin = process.env.CLIENT_URL || 'https://localhost:3000';
      if (process.env.NODE_ENV === 'production') {
        // todo set secure, sameSite, domain
        res.cookie('godkoz_id', token, {
          httpOnly: true,
          // sameSite: true,\
          domain: process.env.COOKIE_DOMAIN,
          secure: process.env.COOKIE_PROTOCOL === 'https',
          path: '/',
        });
      } else {
        res.cookie('godkoz_id', token, {
          httpOnly: true,
        });
      }

      return res.redirect(origin);
    } catch (e) {
      return res
        .status(500)
        .json({ statusCode: '500', message: 'something went wrong' });
    }
  };
}

export function LogOut() {
  return async (req: Request, res: Response) => {
    if (process.env.NODE_ENV === 'production') {
      // todo set secure, sameSite, domain
      res.cookie('godkoz_id', 'removed', {
        httpOnly: true,
        // sameSite: true,\
        domain: process.env.COOKIE_DOMAIN,
        secure: process.env.COOKIE_PROTOCOL === 'https',
        path: '/',
        maxAge: 0,
      });
    } else {
      res.cookie('godkoz_id', 'removed', {
        httpOnly: true,
        maxAge: 0,
      });
    }

    return res.json({
      success: true,
      message: 'logout success',
    });
  };
}
