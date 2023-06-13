const withAuth = (req, res, next) => {
    // redirect to login if not logged in.
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
