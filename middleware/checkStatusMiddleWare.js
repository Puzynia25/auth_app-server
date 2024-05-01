const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return next();
        }
        const token = req.headers.authorization.split(" ")[1]; //Bearer pdrgkdpjgjg

        if (!token) {
            return next(ApiError.unauthorized("User is not authorized"));
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            return next(ApiError.unauthorized("User is not authorized"));
        }

        if (user && user.status === "blocked") {
            next(ApiError.unauthorized("Your account is blocked!"));
        }

        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }
};
