require("dotenv").config(); // 
const { default: axios } = require("axios");


const validateToken = (req, res, next) => {
    console.log('Validating')
    const authorizationHeader = req.headers['authorization'];
    console.log(authorizationHeader);
    if(!authorizationHeader) {
        res.status(401).json({
            message: 'You need a token to authorize the API call'
        })
    }
    const jwtToken = authorizationHeader.split(' ')[1];
    axios.post(process.env.SERVER_AUTH_API_URL, {
        "token": jwtToken
    }).then((response) => {
        
        if (response.data.message == 'Token is valid') {
            console.log('Token is valid');
            next();
        }
        else {
            console.log('Token is invalid');
            res.status(401).json({
                message: 'The token you have send is invalid'
            })
        }
    }).catch((err) => {
        console.log('Token is ivalid');
        res.status(401).json({
            message: 'The token you have send is invalid',
            error: err.message
        })
    })

};

module.exports = {
    validateToken
};