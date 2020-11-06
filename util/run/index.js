const { spawn } = require('child_process')

const run = async (cmd, opts) => new Promise(
    (resolve, reject) => {
        const process = spawn(
            cmd, {
                ...opts,
                shell: true, 
                stdio: [0, 1, 2]
            }
        )
        process.addListener("error", reject)
        process.addListener("exit", resolve)
    }
)

exports.run = run