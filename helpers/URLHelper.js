const GetCurrentURL = (protocol, host, originalUrl) => {
    return `${protocol}://${host}${originalUrl}`
}


module.exports = GetCurrentURL;