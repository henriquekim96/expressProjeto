let mongoose = require('mongoose'),
	ProductSchema = new mongoose.Schema({
		modelo: {type: String, required: true, max: 100},
		preco: {type: Number, required: true},
		ID: {type: String, required: true, max: 100},
		imagem: { type:String, required: true}
	});

module.exports = mongoose.model('Product',
								 ProductSchema);