const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleSchema =  require( './../models/articles');

const Article = mongoose.model('Article', ArticleSchema);

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

router.get('/', asyncMiddleware(async(req, res, next) => {
    const articles = await Article.find({});

    res.send(articles);
}));

router.post('/', asyncMiddleware(async(req, res, next) => {
    const newArticle = await Article.create(req.body);

    res.send(JSON.stringify({
            status: 'OK',
            msg: `Atricle id - ${newArticle._id} was created`,
        }));
}));


router.get('/:id', asyncMiddleware(async(req, res, next) => {
    const article = await Article.findById(req.params.id);

    if (article) {
        res.send(article);
    } else {
        throw Error(`Cannot find article with Id: ${req.params.id}`);
    }
}));


router.put('/:id', asyncMiddleware(async(req, res, next) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body);

    res.send(JSON.stringify({
        status: 'OK',
        msg: `Atricle id - ${article._id} was updated`,
    }));
}));


router.delete('/:id', asyncMiddleware(async(req, res, next) => {
    const article = await Article.findByIdAndRemove(req.params.id);

    res.send(JSON.stringify({
        status: 'OK',
        msg: `Atricle id - ${article._id} was deleted`,
    }));
}));

module.exports = router;
