const getLogMessage = (timestamp, LogType, URL, CorrelationId, imeAplikacije, Sporocilo) => {
    return `${timestamp} ${LogType} ${URL} ${CorrelationId} ${imeAplikacije} - ${Sporocilo}`;
}

module.exports = getLogMessage;