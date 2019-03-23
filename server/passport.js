const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

module.exports = (passport, User) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // used to deserialize the user
  passport.deserializeUser((id, done) => User.getById(id, done));

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
      },
      (token, refreshToken, profile, done) => {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(() => {
          const email = get(["emails", 0, "value"], profile); // pull the first email

          User.getByEmail(email, (err, user) => {
            if (err) return done(err);
            return done(null, user);

            // We don't want to create new users.

            // if (user) {
            //   // all is well, return successful user
            //   return done(null, user);
            // }
            // // if there is no user with that email
            // // create the user
            // const newUser = {
            //   email,
            //   username: get(['displayName'], profile),
            //   photo: get(['photos', 0, 'value'], profile),
            //   language: get(['_json', 'language'], profile),
            // };

            // return User.create(newUser, done);
          });
        });
      }
    )
  );
};
