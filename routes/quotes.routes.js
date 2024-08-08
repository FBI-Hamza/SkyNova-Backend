const express = require('express');
const router = express.Router();
const Quote = require('../controller/quote.controller')

router.post('/createQuote', Quote.createQuote);
router.get('/viewQuotes', Quote.viewQuotes);
router.get('/viewQuote/:id', Quote.quoteViewById);
router.delete('/deleteQuote/:id', Quote.deleteQuote);
router.patch('/updateQuote/:id', Quote.updateQuote);
module.exports = router;
