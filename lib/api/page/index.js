const { createPage, readPage } = require("../../util/page/crud")


const postPage = async (req, res, next) => {
    const id = req.params[0]
    const serialisedState = req.body
    try {
        await createPage(id, serialisedState)
        res.send()
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
}

const getPage = async (req, res, next) => {    
    const id = req.params[0]
    try {
        const serialisedState = await readPage(id)
        res.json(serialisedState)
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
}

const getPages = async (req, res, next) => {
    
}

const putPage = async (req, res, next) => {
    
}

const deletePage = async (req, res, next) => {
    
}

//

const servePageApi = (router) => {
    router.post(/\/api\/page\/(.*)/, postPage)
    router.get(/\/api\/page\/(.*)/, getPage)
}

module.exports = {
    servePageApi
}