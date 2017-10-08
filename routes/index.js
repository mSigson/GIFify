const express = require('express');
const router = express.Router();
const RankedGif = require('../models/RankedGIFs');
const utils = require('../utils');

router.route('/')
.get((req, res) => {
    res.send({
        message: "What's up, dog?" 
    });
}) 
.post((req, res) => {
    res.send("POST REQUEST!");
})

router.route('/rankedgifs')
.get((req, res) => {

    const results = RankedGif.find();
    const params = req.query;

    if(params.order_by === 'score'){
        results.sort({
            score: -1
        });
    }

    results.exec((err, docs) => {
        if (err) {
            return utils.handleErrors(err, res);
        }
        res
            .status(201)
            .send(docs);
    });
})
.post((req, res) => {
    const body = req.body;
    const gif = new GIF(body);

    gif.save((err, doc) => {
        if (err) {
            return utils.handleErrors(err, res);
        }
        res 
            .status(201)
            .send(doc);
    });

});

router.route("/RankedGif/:gif_id")
.get((req, res) => {
   const id = req.params.pet_id
   RankedGif.findOne({_id: id}, (err, doc)=> {
        if (err) {
            return utils.handleErrors(err, res);
        }
        res.status(200)
        res.send(doc);
   })
})
.put((req, res) => {
    RankedGif.findById(req.params.gif_id, (err, doc) => {
        if (err) {
            return utils.handleErrors(err, res);
        }
        Object.assign(doc, req.body, {score: doc.score + 1});
        
        doc.save((err, savedDoc) => {
            if (err) {
                return utils.handleErrors(err, res);
            }
            res
                .status(201)
                .send(savedDoc);
        });
    });
});

module.exports = router;