const path = require('path');

module.exports = {
    name: 'wordRelay-webpack',
    mode: 'development', //production
    devtool: 'eval',

    entry: {
    },
    output: {
        path: path.join(__dirname, 'dist')
    }
}