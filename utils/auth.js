<<<<<<< HEAD
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
=======

>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22
