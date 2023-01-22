const GetCurrentDate = require('../helpers/DateHelper');
const GetUUID = require('../helpers/UUIDHelper');
const GetLogMessage = require('../helpers/LogerHelper'); 

const Producer = (url) => {
  const message = GetLogMessage(
    GetCurrentDate(),
    "info",
    url,
    GetUUID(),
    "[CarNewsService]",
    "<* Successfully got car news *>"
  );
  Logger.successfullLogger.log("info", message);
  Producer(message)
    .then(() => {
      console.log("RabitMQ works");
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
};

module.exports = Producer;