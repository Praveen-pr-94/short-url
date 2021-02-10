const express = require('express');
const router = express.Router();
const controller = require('../controllers/Url');

router.get('/test' , (req, res) => {
    return res.json('Server up')
});
/*** list the url data by passing urlHash code **/
router.get('/:urlHash' , controller.getUrl);
/*** create short url 
 *  body : { url : 'valid url'}
 * **/
router.post('/short-url/links' , controller.createUrl);
/*** 
 *  update the url data by passing url hash
 * **/
router.put('/short-url/links/:urlHash' , controller.updateUrl);
/***
 *  delete url data by passing url hash
 * **/
router.delete('/short-url/links/:urlHash' , controller.deleteUrl);

module.exports = router;

