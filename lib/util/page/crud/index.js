const { validatePage } = require('../validate')
const {
    pageDirectoryExists,
    pageFileExists,
    writePage,
    readPage
} = require("../io")

const createPage = async (id, seralisedState) => {
    validatePage(seralisedState)
    // Check if directory exists
    const directoryExists = await pageDirectoryExists(id)
    if (!directoryExists) {
        throw new Error(
            `Directory at '${relativeDirectory}' does not exist.`
        )
    }
    // Check if page already exists.
    const pageExists = await pageFileExists(id)
    if (pageExists) {
        throw new Error(
            `Page at '${id}' already exists.`
        )
    } 
    // Write seralised page state to JSON file.
    await writePage(id, serialisedState)
}

const readPage = async (id) => {
    // Check if directory exists
    const directoryExists = await pageDirectoryExists(id)
    if (!directoryExists) {
        throw new Error(
            `Directory at '${relativeDirectory}' does not exist.`
        )
    }
    // Check if page exists.
    const pageExists = await pageFileExists(id)
    if (!pageExists) {
        throw new Error(
            `Page at '${id}' does not exist.`
        )
    } 
    // Read serialised page state from JSON file.
    const serialisedState = await readPage(id)
    return serialisedState
}

module.exports = {
    createPage,
    readPage
}