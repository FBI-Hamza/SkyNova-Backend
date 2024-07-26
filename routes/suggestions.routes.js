const express = require('express');
const router = express.Router();
const Suggestions = require('../controller/suggestion.controller')

router.post('/createSuggestion', Suggestions.createSuggestion);
router.get('/viewSuggestion', Suggestions.viewSuggestions);
router.get('/viewSuggestion/:id', Suggestions.viewById);
router.get('/countSuggestions', Suggestions.countSuggestions);
router.delete('/deleteSuggestion/:id', Suggestions.deleteSuggestion);
// router.patch('/updateComplaint/:id', Suggestions.updateComplaint);
module.exports = router;
