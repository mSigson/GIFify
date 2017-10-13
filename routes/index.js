const express = require('express');
const router = express.Router();
const RankedGif = require('../models/RankedGIFs');
const utils = require('../dev/scripts/utils');

router.route('/')
.get((req, res) => {
    res.send({
        message: "You made it to the Top ranked API" 
    });
}) 
.post((req, res) => {
    res.send("POST REQUEST!");
})


// route for rankedGIFs 
router.route('/rankedgifs')
.get((req, res) => {

    const results = RankedGif.find();
    const params = req.query;

    // sort documents by score 
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

module.exports = router;