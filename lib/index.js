const express = require("express")
const parcel = require("parcel-bundler")
const git = require("nodegit")
const util = require('util');
const path = require('path')
const { run } = require("../util/run")

/////////////

const BUNDLER_OPTIONS = {
    outDir: './.dev',
    sourceMaps: true,
}

const genBluxCms = async ({
    appRepoUrl, useLinkedBluxApp
}) => {
    const bluxCms = express.Router()

    // Ensure app is cloned.
    try {
        await git.Repository.open("./app")
    } catch (err) {
        await git.Clone(appRepoUrl, './app')
    }
    // Use locally linked 'blux-app' package for app if specified.
    if (useLinkedBluxApp) {
        await run('yarn link blux-app', { cwd: './app' })
    }
    // Install app's dependencies.
    await run('yarn install', { cwd: './app' })

    // Initialise bundler.
    const srcPath = path.join("./app", 'src', 'index.html')
    const bundler = new parcel(srcPath, BUNDLER_OPTIONS)

    // Serve state.
    const statePath = path.join("./app", 'state')
    bluxCms.use('/__state', express.static(statePath))

    // Attach bundler middleware (serve web-files).
    bluxCms.use(bundler.middleware())
    
    // Serve core APIs
    // TODO

    return bluxCms
}


/////////////

module.exports = genBluxCms