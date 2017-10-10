module.exports = {
    handleErrors (err, res) {
        res
            .status(400)
            .send({
                error: err
            });
    }
}