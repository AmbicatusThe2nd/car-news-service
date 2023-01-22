const CarNews = require('../models/CarNews');
const UserService = require('../services/UserService');
const Logger = require('../middleware/Logger');
const GetCurrentDate = require('../helpers/DateHelper');
const GetURL = require('../helpers/URLHelper');
const GetUUID = require('../helpers/UUIDHelper');
const GetLogMessage = require('../helpers/LogerHelper');
const Producer = require('../services/RabbitService');
const ProducerSend = require('../middleware/Producer');
const StatsticsService = require('../services/StatisticsService');

const getCarNewsFromDB = (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-News-API' })
    CarNews.find().then(response => {
        const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
        res.json({
            response
        });
        // ProducerSend(url);
    }).catch(error => {
        res.json({
            message: error.message
        });
        Logger.failedLogger.log('error', 'This call was <* Unsuccessfull got car news *>');
    })
}

const getSpecCarNewsFromDB = (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-News-API' })
    const carNewsId = req.params.id;
    const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
    CarNews.findById(carNewsId).then(response => {
        res.json({
            response
        });
        const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarNewsService]', "<* Successfully got specific car news *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    }).catch(error => {
        res.json({
            message: error.message
        });
        Logger.failedLogger.log('error', 'This call was unsuccessfull');
    });
}

const postCarNewsInDB = (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route, method: req.method, service: 'Car-News-API' })
    UserService.getUserData(req.body.user.username).then((result) => {
        const newCarNews = new CarNews({
            title: req.body.title,
            text: req.body.text,
            date: req.body.date,
            user: {
                id: result.userId,
                firstname: result.name,
                lastname: result.surname
            }
        })
        newCarNews.save().then(() => {
            const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
            res.json({
                message: 'Car news article added successfully'
            })
            const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarNewsService]', "<* Successfully got specific car news *>");
            Logger.successfullLogger.log('info', message);
            Producer(message).then(() => {
                console.log('RabitMQ works');
            }).catch(error => {
                console.log('Error:', error.message);
            })
        }).catch(err => {
            res.json({
                message: err.message
            });
        });
    }).catch((error) => {
        res.status(404).json({
            message: error.message
        });
        Logger.failedLogger.log('error', 'This call was unsuccessfull');
    });
}

const putCarNewsInDB = (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route, method: req.method, service: 'Car-News-API' })
    const carNewsId = req.params.id;

    const newCarNews = ({
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        user: {
            id: req.body.user.id,
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname
        }
    });

    CarNews.findByIdAndUpdate(carNewsId, {$set: newCarNews}).then(() => {
        StatsticsService.StatisticsAPICall({ calledMethod: req.route, method: req.method, service: 'Car-News-API' })
        const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
        res.json({
            message: 'Data has been updated'
        })
        const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarNewsService]', "<* Successfully updated specific car news *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    }).catch(error => {
        res.status(400).json({
            message: error.message
        })
        Logger.failedLogger.log('error', 'This call was unsuccessfull');
    });
}

const deleteCarNewsInDB = (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route, method: req.method, service: 'Car-News-API' })
    const carNewsId = req.params.id;

    CarNews.findByIdAndDelete(carNewsId).then(() => {
        const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
        res.json({
            message: 'The item has been deleted'
        });
        const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarNewsService]', "<* Successfully deleted specific car news *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    }).catch(error => {
        res.json({
            message: error.message
        })
        Logger.failedLogger.log('error', 'This call was unsuccessfull');
    });
}

const findByTextCarNewsInDB = async (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route, method: req.method, service: 'Car-News-API' })
    try {
        const data = await CarNews.find();
        const results = data.filter(x => x.text.includes(req.params.id));
        const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
        res.json({
            results
        })
        const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarNewsService]', "<* Successfully found specific car news by text *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    }
    catch(err) {
        res.json({
            message: err.message
        })
        Logger.failedLogger.log('error', 'This call was unsuccessfull');
    }
}

const findByAuthorCarNewsInDB = (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route, method: req.method, service: 'Car-News-API' })
    const carNewsId = req.params.id;
    CarNews.find({ 'user.id': carNewsId }).then(response => {
        const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
        res.json({
            response
        })
        const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarNewsService]', "<* Successfully got specific car news by author *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    }).catch(error => {
        res.status(400).json({
            message: error.message
        })
        Logger.failedLogger.log('error', 'This call was unsuccessfull');
    })
}

const findByDateCarNewsInDB = async (req, res, next) => {
    StatsticsService.StatisticsAPICall({ calledMethod: req.route, method: req.method, service: 'Car-News-API' })
    try {
        const data = await CarNews.find();
        const results = data.filter(x => x.date.includes(req.params.id));
        const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
        res.json({
            results
        })
        const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarNewsService]', "<* Successfully got specific car news by date *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    }
    catch(err) {
        res.json({
            message: err.message
        })
        Logger.failedLogger.log('error', 'This call was unsuccessfull');
    }
}



module.exports = {
    getCarNewsFromDB,
    getSpecCarNewsFromDB,
    postCarNewsInDB,
    putCarNewsInDB,
    deleteCarNewsInDB,
    findByTextCarNewsInDB,
    findByAuthorCarNewsInDB,
    findByDateCarNewsInDB
};