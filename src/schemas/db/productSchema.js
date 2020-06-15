'use strict';

const { Schema } = require('mongoose');
const discountSchema = require('./discountSchema');

const partsOfRegex = [
  String.raw`(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]`,
  String.raw`[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}`,
  String.raw`|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})`
];

const urlValidationRegex = new RegExp(partsOfRegex.join(''));

const productSchema = new Schema({
  productId: Schema.Types.ObjectID,
  name: {
    type: String,
    required: true
  },
  description: String,
  productImageLinks: [
    {
      type: String,
      match: urlValidationRegex,
      required: true
    }
  ],
  quantityType: {
    type: String,
    default: 'pieces'
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: Number,
  category: String,
  price: {
    type: Number,
    required: true
  },
  brandName: String,
  brandLogoLink: {
    type: String,
    match: urlValidationRegex
  },
  discounts: [discountSchema]
});

module.exports = productSchema;
