const UUIDGenerator = require('uuid');

const getGeneratedUUID = () => {
    return UUIDGenerator.v4();
}

module.exports = getGeneratedUUID;