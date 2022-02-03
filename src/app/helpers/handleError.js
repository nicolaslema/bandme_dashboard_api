const httpError = (req, res)=>{
    res.send({error: 'error'})
}

module.exports = {httpError}