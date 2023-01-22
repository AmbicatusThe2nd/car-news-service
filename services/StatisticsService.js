const axios = require('axios');

require("dotenv").config(); // Primer: process.env.SERVER_AUTH_API_URL

const StatisticsAPICall = (data) => {
    console.log(data);
    axios.post(process.env.HAROKU_API_URL, { 
        calledMethod: data.calledMethod,
        method: data.method,
        service: data.service
     }).then((response) => {
        console.log(response.message);
    }).catch((error) => {
        console.log(error.message);
    })
}

module.exports = {
    StatisticsAPICall
};