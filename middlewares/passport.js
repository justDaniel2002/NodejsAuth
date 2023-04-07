const passport = require("passport");

const jwtStrategy = require("passport-jwt").Strategy;

const LocalStrategy = require("passport-local").Strategy;

const GoogleTokenStrategy = require("passport-google-token").Strategy;

const { ExtractJwt } = require("passport-jwt");

const { jwt_secret } = require("../configs");

const User = require("../models/User");

//passport jwt
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: jwt_secret,
    },
    async (payload, done) => {
      await User.findById(payload.sub)
        .then((user) => done(null, user))
        .catch((error) => done(error, false));
    }
  )
);

//passport local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      await User.findOne({ email: email })
        .then(async (user) => {
          if (await user.isValidPassword(password)) {
            return done(null, user);
          } else done(new Error("false password"), false);
        })
        .catch((error) => done(error, false));
    }
  )
);

//passport google
passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async function (accessToken, refreshToken, profile, done) {

      const count = await User.countDocuments({
        authenGoogleID: profile.id,
        authType: "google",
      });

      if (count > 0) {
        await User.findOne({
          authenGoogleID: profile.id,
          authType: "google",
        }).then((user) => done(null, user));
      }

      const newUser = new User({
        firstName: profile.family_name,
        lastName: profile.given_name,
        email: profile.emails[0].value,
        authenGoogleID: profile.id,
        authType: "google",
      });

      await newUser
        .save()
        .then((user) => done(null, user))
        .catch((err) => done(err, false));
    }
  )
);
