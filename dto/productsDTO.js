export default class ProductsForIndexDTO {
	constructor(product) {
		this.name = product.name;
		this.id = product.id;
		this.price = product.price;
		this.img = product.img;
	}

	product = async () => this;
}
