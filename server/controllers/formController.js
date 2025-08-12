const Form = require('../models/form');
const Response = require('../models/response');

exports.createForm = async (req, res) => {
    try {
        const newForm = new Form(req.body);
        await newForm.save();
        res.status(201).json(newForm);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.submitResponse = async (req, res) => {
    try {
        const newResponse = new Response(req.body);
        await newResponse.save();
        res.status(201).json(newResponse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};