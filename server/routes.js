const path = require('path');

module.exports = (app, passport) => {
  // route middleware to make sure
  const isLoggedIn = (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    return res.redirect('/');
  };

  const callback = req => {
    const host = req.get('host');
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    return `${protocol}://${host}/__/auth/google/callback`;
  };

  app.get('/__/user', (req, res) => {
    res.send(req.user || {});
  });

  app.get('/__/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/__/auth/google', (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      callbackURL: callback(req),
    })(req, res, next);
  });

  // the callback after google has authenticated the user
  app.get('/__/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/',
      callbackURL: callback(req),
    })(req, res, next);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
};
