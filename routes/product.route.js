let express =  require('express'),
	controller = require('../controllers/product.controller'),
	UserDao = require('../models/product.model.js'),
	router = express.Router(),
	multer = require("multer"),
	storage = multer.diskStorage({

		destination: (req, file, cb) => {
			cb(null, './uploads/');
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname);
		}
	}),
	fileFilter = (req, file, cb) => {
		if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
			cb(null, true);
		else
			cb(null, true);
	}
	upload = multer({ 
		
		storage: storage, 
		limits: 
		{
			fileSize: 1024*1024*5
		},
		fileFilter: fileFilter
	});


router.get('', (req, res) => {
	UserDao.find().then((users) => {
		res.render('index', { users: users});
	})
	
});
//
//router.get('/test', controller.test);
router.post('/create', upload.single('imagem'), controller.create);
router.get(':id', controller.product_details);
router.post('/update/:id', controller.update);
router.post('/delete/:id', controller.delete);

module.exports = router;

