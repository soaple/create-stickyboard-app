// app.js

var Server = require('http').Server;
var Express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var cors = require('cors');
var morgan = require('morgan');

// Load .env configuration
const envFilePath =
    process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development';
if (fs.existsSync(envFilePath)) {
    const envLoadResult = require('dotenv').config({ path: envFilePath });
    if (envLoadResult.error) {
        console.log(envLoadResult.error);
    } else {
        console.log(`env file '${envFilePath}' loaded successfully.`);
        if (process.env.NODE_ENV === 'development') {
            console.log('[BACK-END]', envLoadResult.parsed);
        }
    }
} else {
    console.log(`env file '${envFilePath}' does not exist.`);
}

// Initialize the app
const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
// Configure support for html using ejs templates
app.set('views', path.join(__dirname, 'dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Initialize the server
const server = new Server(app);

// Define static assets folder
app.use('/static', Express.static(path.join(__dirname, 'src', 'static')));
app.use('/dist', Express.static(path.join(__dirname, 'dist')));

// Set port and running environment
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
const isWebpackDevServerMode = process.env.WEBPACK_DEV_SERVER_MODE === 'true';
delete process.env.BROWSER;

if (isWebpackDevServerMode) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const historyApiFallback = require('connect-history-api-fallback');
    const config = require('./webpack.config.js');
    const compiler = webpack(config);
    const webpackInstance = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    });

    app.use(webpackInstance);
    app.use(historyApiFallback());
    app.use(webpackInstance);
} else {
    // Serving .js file from gzip file (WebPack CompressionPlugin)
    app.get('*.js', function(req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

// Start the server
server.listen(port, (err) => {
    if (err) {
        console.error(err);
        setTimeout(startServer, 3000);
        return;
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
