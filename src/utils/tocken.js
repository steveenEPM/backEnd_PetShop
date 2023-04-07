const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config({ path: '../../config/.env' })

const tokenKey = "$2a$08$r1qtwgSBKndCaqcgJpaBdub7QkZktWSyPGZrYRdIdlh/Pww2huuxe"

const tokenExpiri = "30d"

const setToken = (privateKey) => {
    var token = jwt.sign({ key: privateKey }, tokenKey, {
        expiresIn: tokenExpiri,
        algorithm:"HS256"
    });
    return token
}


const getToken = (token) => {
    try {
        let verify = jwt.verify(token,tokenKey);
        return verify.key
    } catch (error) {
        return "invalid signature"
    }
}

module.exports= {setToken,getToken}