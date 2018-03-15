module.exports = {

    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) next();
        else res.redirect("/users/login");
    },

    attachAuthInfo: function (req, res, next) {
        res.locals.isLoggedin = req.isAuthenticated();
        next();
    },

    noCache: function (req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    }
};