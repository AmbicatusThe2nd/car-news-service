const express = require('express');
const router = express.Router();
const CarNewsController = require('../controllers/CarNewsController');
const ValidateToken = require('../middleware/ValidateToken');

/**
 * @api {get} /carNews Request Car news information
 * @apiName GetCarNews
 * @apiGroup News
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         id: 5,
 *         title: "Lorem ipsum",
 *         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 *         date: "2022-11-23, 15:00",
 *         user: {
 *             id: 1,
 *             firstname: "Luka",
 *             lastname: "Mlinaric Fekonja"
 *         }
 *     }
 */
router.get('/', CarNewsController.getCarNewsFromDB);

// router.get('/', async function (req, res) {
//     // const results = allCarNews;
//     // res.send(apiResponse(results));
// });


/**
 * @api {get} /carNews/:id Request specific Car news information
 * @apiName GetNewsId
 * @apiGroup News
 *
 * @apiParam {Number} id News' unique ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         id: 5,
 *         title: "Lorem ipsum",
 *         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 *         date: "2022-11-23, 15:00",
 *         user: {
 *             id: 1,
 *             firstname: "Luka",
 *             lastname: "Mlinaric Fekonja"
 *         }
 *     }
 */
router.get('/:id', CarNewsController.getSpecCarNewsFromDB);

// router.get('/:id', (req, res) => {
//     // req.params.id;
//     const result = allCarNews.find(x => x.id === parseInt(req.params.id));
//     if(!result) {
//         res.sendStatus(404);
//         return;
//     }
//     res.send(apiResponse(result));
// });

/**
 * @api {post} /carNews     Post car news
 * @apiName PostNews
 * @apiGroup News
 *
 * @apiBody {Number} [id]       Optional id of news.
 * @apiBody {String} title          Mandatory title.
 * @apiBody {String} text="Lorem ipsum"      Mandatory Text.
 * @apiBody {String}  date          Mandatory date of the car news.
 *
 * @apiBody {Object} [user]         Optional user object.
 * @apiBody {String} [user[username]]      Optional username.
 */
router.post('/', ValidateToken.validateToken, CarNewsController.postCarNewsInDB);

// router.post('/', (req, res) => {
//     const data = bodyParser(req);
//     allCarNews.push(data);
//     res.send(apiResponse(data));
// });

/**
 * @api {put} /carNews/:id     Put car news
 * @apiName PutNews
 * @apiGroup News
 *
 * @apiParam {Number} id          News' unique ID.
 *
 * @apiBody {Number} [id]       Optional id of news.
 * @apiBody {String} title          Mandatory title.
 * @apiBody {String} text="Lorem ipsum"      Mandatory Text.
 * @apiBody {String}  date          Mandatory date of the car news.
 *
 * @apiBody {Object} [user]         Optional user object.
 * @apiBody {String} [user[firstname]] Optional firstname.
 * @apiBody {String} [user[lastname]]    Optional lastname.
 */
router.put('/:id', ValidateToken.validateToken, CarNewsController.putCarNewsInDB);

// router.put('/:id', (req, res) => {
//     const itemIndex = allCarNews.indexOf(allCarNews.find(x => x.id === parseInt(req.params.id)));
//     if(itemIndex === -1) {
//         res.sendStatus(404);
//     }
//     const data = bodyParser(req);
//     allCarNews[itemIndex] = data;
//     res.sendStatus(200);
// });

/**
 * @api {delete} /carNews/:id     Delete car news
 * @apiName DeleteNews
 * @apiGroup News
 * @apiParam {Number} id          News' unique ID.
 *
 */
router.delete('/:id', ValidateToken.validateToken, CarNewsController.deleteCarNewsInDB);

// router.delete('/:id', (req, res) => {
//     const itemIndex = allCarNews.indexOf(allCarNews.find(x => x.id === parseInt(req.params.id)));
//     if(itemIndex === -1) {
//         res.sendStatus(404);
//     }
//     allCarNews.splice(itemIndex, 1);
//     res.sendStatus(200);
// });

/**
 * @api {get} /carNews/searchByText/:id Request specific Car news information by search
 * @apiName GetNewsBySearch
 * @apiGroup News
 *
 * @apiParam {String} id News' substring.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         id: 5,
 *         title: "Lorem ipsum",
 *         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 *         date: "2022-11-23, 15:00",
 *         user: {
 *             id: 1,
 *             firstname: "Luka",
 *             lastname: "Mlinaric Fekonja"
 *         }
 *     }
 */
router.get('/searchByText/:id', CarNewsController.findByTextCarNewsInDB);

// router.get('/searchByText/:id', (req, res) => {
//     const results = allCarNews.filter(x => x.text.includes(req.params.id));
//     res.send(apiResponse(results));
// });

/**
 * @api {get} /carNews/searchByAuthor/:id Request specific Car news information by author information
 * @apiName GetNewsByAuthor
 * @apiGroup News
 *
 * @apiParam {Number} id News' author id.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         id: 5,
 *         title: "Lorem ipsum",
 *         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 *         date: "2022-11-23, 15:00",
 *         user: {
 *             id: 1,
 *             firstname: "Luka",
 *             lastname: "Mlinaric Fekonja"
 *         }
 *     }
 */
router.get('/searchByAuthor/:id', CarNewsController.findByAuthorCarNewsInDB);


// router.get('/searchByAuthor/:id', (req, res) => {
//     const results = allCarNews.filter(x => x.user.id === parseInt(req.params.id));
//     res.send(apiResponse(results));
// });

/**
 * @api {get} /carNews/searchByDate/:id Request specific Car news information by date it was published
 * @apiName GetNewsByDate
 * @apiGroup News
 *
 * @apiParam {String} id News' Date.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         id: 5,
 *         title: "Lorem ipsum",
 *         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 *         date: "2022-11-23, 15:00",
 *         user: {
 *             id: 1,
 *             firstname: "Luka",
 *             lastname: "Mlinaric Fekonja"
 *         }
 *     }
 */
router.get('/searchByDate/:id', CarNewsController.findByDateCarNewsInDB);

// router.get('/searchByDate/:id', (req, res) => {
//     const results = allCarNews.filter(x => x.date.includes(req.params.id));
//     res.send(apiResponse(results));
// })

// function apiResponse(results){
//     return JSON.stringify({"status": 200, "error": null, "response": results});
// }

// function bodyParser(req) {
//     return {
//         id: req.body.id,
//         title: req.body.title,
//         text: req.body.text,
//         date: req.body.date,
//         user: {
//             id: req.body.user.id,
//             firstname: req.body.firstname,
//             lastname: req.body.lastname
//         }
//     }
// }

module.exports = router;
