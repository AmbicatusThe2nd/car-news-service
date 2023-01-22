const axios = require('axios');

const url = 'http://studentdocker.informatika.uni-mb.si:12670/api/getUser';

const getUserData = (username) => {
    const result = axios.get(`${url}/${username}`).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.message;
    });
    return result;
}

module.exports = {
    getUserData
};