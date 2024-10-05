const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);

module.exports = stripe;
