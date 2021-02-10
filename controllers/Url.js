const shortId = require('short-uuid');
const validUrl = require('valid-url');
const urlModel = require('../models/Url');

const getUrl = async(req ,res) => {
    try{
        const {urlHash} = req.params;
        const urlExists = await urlModel.findOne({urlHash}).exec();
        if(urlExists){
            return res.status(404).json({ status: false , message : 'short url not exists' , data:''});
        }
        return res.render(urlExists.url);
    }catch(err){
        console.error('Internal server error' , err);
        return res.status(500).json({ status: false , message : 'internal server error'})
    }
}

const createUrl = async(req , res) => {
    try{
        const {url} = req.body;
        if (!validUrl.isUri(url)){
            return res.status(401).json({ status: false , message : 'Invalid input url'})
        }
        const urlHash = shortId.generate();
        const shortUrl = `${process.env.BASE_URL}/${urlHash}`;
        if (!validUrl.isUri(shortUrl)){
            return res.status(401).json({ status: false , message : 'Invalid short url found'})
        }
        const urlExists = await urlModel.findOne({url}).exec();
        if(urlExists){
            return res.status(200).json({ status: true , message : 'url already exists' , data: urlExists});
        }
        const shortUrlObj = new urlModel({url , shortUrl , urlHash});
        const data = await shortUrlObj.save();
        return res.status(201).json({ status: true , message : 'success' , data});
    }catch(err){
        console.error('Internal server error' , err);
        return res.status(500).json({ status: false , message : 'internal server error'})
    }
}

const updateUrl = async(req , res) => {
    try{
        const {urlHash} = req.params;
        const {url} = req.body;
        if (!validUrl.isUri(url)){
            return res.status(400).json({ status: false , message : 'Invalid input url'})
        }
        const newUrlHash = shortId.generate();
        const shortUrl = `${process.env.BASE_URL}/${newUrlHash}`;
        if (!validUrl.isUri(shortUrl)){
            return res.status(400).json({ status: false , message : 'Invalid short url found'})
        }
        const urlExists = await urlModel.findOne({urlHash}).exec();
        if(!urlExists){
            return res.status(404).json({ status: false , message : 'short url not exists' , data:''});
        }
        urlExists.url = url;
        urlExists.shortUrl= shortUrl;
        urlExists.urlHash= newUrlHash;
        const data = await urlExists.save();
        return res.status(200).json({ status: true , message : 'success' , data});
    }catch(err){
        console.error('Internal server error' , err);
        return res.status(500).json({ status: false , message : 'internal server error'})
    }
}

const deleteUrl = async(req , res) => {
    try{
        const {urlHash} = req.params;
        const urlExists = await urlModel.findOne({urlHash}).exec();
        if(!urlExists){
            return res.status(404).json({ status: false , message : 'short url not exists' , data:''});
        }
        await urlExists.delete({urlHash});
        return res.status(200).json({ status: true , message : 'success' , data: ''});
    }catch(err){
        console.error('Internal server error' , err);
        return res.status(500).json({ status: false , message : 'internal server error'})
    }
}

module.exports = {getUrl , createUrl , updateUrl , deleteUrl};