const express = require('express');
const { createForm, getForm, submitResponse } = require('../controllers/formController');
const router = express.Router();

router.post('/', createForm);
router.get('/:id', getForm);
router.post('/responses', submitResponse);

module.exports = router;