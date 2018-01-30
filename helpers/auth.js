// var Users = require("../models/users");
// var Idea = require("../models/ideas");



module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'You must be logged in to add an idea');
        res.redirect("/users/login");
    }
}

// module.exports = {
//     ensureAuthenticated: function (req, res, next) {
//         if (req.isAuthenticated()) {
//             return next();
//         }
//         req.flash('error_msg', 'Not Authorized');
//         res.redirect('/users/login');
//     }
// }