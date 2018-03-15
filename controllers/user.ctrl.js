const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserCtrl {

    signin(req, res) {
        res.render("login");
    }

    login(username, password, done) {

        User.findOne({ username: username })
            .then(function (user) {
                //validatee
                var result = bcrypt.compareSync(password, user.password);
                if (result) done(null, user);
                else done("Wrong username or password");
            })
            .catch(function () {
                done("Wrong username or password");
            });
    }

    logout(req, res) {
        req.logout();
        res.redirect("/users/login");
    }
}

module.exports = new UserCtrl();