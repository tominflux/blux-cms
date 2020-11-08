

const validatePage = (serialisedState) => {
    if (typeof serialisedState !== "object") {
        throw new Error(
            `Expected serialised page state to be of type 'object', ` +
            `instead found '${typeof serialisedState}'.`
        )
    }
    // TODO: Validate properties.
}

exports.validatePage = validatePage