let express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	product = require('./routes/product.route'), // Imports routes for the products
	path = require('path'),
	publicDir = require('path').join(__dirname,'/public'),
	publico = require('path').join(__dirname, 'uploads'),
	app = express(),

// Set up mongoose connection
	dev_db_url = 
	'mongodb+srv://Admin:123456aaa@db-8wqvt.mongodb.net/test?retryWrites=true',
	mongoose = require('mongoose').connect(dev_db_url, {useNewUrlParser:true});
	mongoDB = process.env.MONGODB_URI || 
				dev_db_url;

//mongoose.Promise = global.Promise;
//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//app.set('index', path.join(__dirname, 'index'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', product);
app.use(express.static(publicDir));
app.use('/uploads',express.static(publico));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

let port = 1234;

http.createServer(app).listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});