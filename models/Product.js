import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{type: String}],
  category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  properties: { type: Object},
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;

