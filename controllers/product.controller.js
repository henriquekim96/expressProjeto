let Product = require('../models/product.model');
exports.test = (req, res) =>{
	res.send('Greetings from the Test controller');
};
//criar
exports.create = (req, res) => {
    let product = new Product(
        {
            modelo: req.body.modelo,
            preco: req.body.preco,
            ID: req.body.ID,
            imagem: req.file.path.toString()
        }
    );

    product.save((err) => {
        if (err) {
            next(err);
        }else
       		res.redirect('/');
    })
};

//ler
exports.product_details = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next(err);
        res.send(product);
    })
};
//update
exports.update = (req, res) => {
	Product.findByIdAndUpdate(req.params.id, {$set: req.body},
	(err, product) =>{
		if(err) return next(err);
		res.redirect('/');
	});
};

//deletar
exports.delete = (req, res) => {
	Product.findByIdAndRemove(req.params.id, (err) => {
		if(err) return next(err);
		res.redirect('/');
	})
}
