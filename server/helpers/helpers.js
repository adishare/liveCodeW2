const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const daKey = process.env.secret;

module.exports = {

    createToken(tokenInfoObj) {
        return jwt.sign(tokenInfoObj, daKey, {
            expiresIn: 86400
        })
    },

    decodeToken(token) {
        return jwt.verify(token, daKey);
    },

    hash(password) {
        return bcrypt.hashSync(password);
    },

    compareSync(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    },


}