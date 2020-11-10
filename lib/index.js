const express = require("express")
const parcel = require("parcel-bundler")
const git = require("nodegit")
const path = require('path')
const { run } = require("./util/run")
const fs = require("fs-extra")
const PATHS = require("./util/paths")

/////////////

const BUNDLER_OPTIONS = {
    outDir: './.dev',
    sourceMaps: true,
}

const genBluxCms = async ({
    appRepoUrl, 
    useLinkedBluxApp,
    middlewares
}) => {
    // Initialise router.
    const bluxCms = express.Router()

    // Ensure app is cloned.
    try {
        await git.Repository.open(PATHS.APP)
    } catch (err) {
        await git.Clone(appRepoUrl, PATHS.APP)
        // Write enabled CMS flag to app's dotenv.
        await fs.writeFile(
            path.join(PATHS.APP, ".env"),
            "IS_CMS=true"
        )
    }

    // Use locally linked 'blux-app' package for app if specified.
    if (useLinkedBluxApp) {
        await run('yarn link blux-app', { cwd: PATHS.APP })
    }

    // Install/update app's dependencies.
    await run('yarn install', { cwd: PATHS.APP})

    // Initialise bundler.
    const srcPath = path.join(PATHS.APP, 'src', 'index.html')
    const bundler = new parcel(srcPath, BUNDLER_OPTIONS)

    // Serve state.
    bluxCms.use(PATHS.STATE_SERVE, express.static(PATHS.STATE))

    // Attach bundler middleware (serve web-files).
    bluxCms.use(bundler.middleware())
    
    // Attach middlewares.
    for (const middleware of middlewares) {
        bluxCms.use(middleware)
    }

    // Return router.
    return bluxCms
}

/////////////

module.exports = genBluxCms