const Users = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
    static async register(user) {
        try {
            const result = await Users.create(user);
            return result;
        } catch (error) {
            throw error;
        }

    }

    static async login(credentials){
        try {
            const {email, password} = credentials;
            const user = await Users.findOne({where: {email}});
            if(user){
                const isValid = bcrypt.compareSync( password, user.password);
                return isValid ? {isValid, user} : {isValid}
            } 
            return {isValid: false}
        } catch (error) {
            throw error;
        }
    }

    static async genToken(data){
        try {
            const token = jwt.sign(data, process.env.JWT_SECRET, {
                expiresIn: "10m",
                algorithm: "HS512",
            });
            return token;
        } catch (error) {
            
        }
    }
}

module.exports = AuthService;