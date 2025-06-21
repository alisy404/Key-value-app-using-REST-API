const express = require('express');

const KeyValueRouter = express.Router();
const { KeyValue } = require('../models/keyvalue');


KeyValueRouter.post('/', async (req, res) => {
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).json({ error: 'Both "key" and "value" are required' });
    }
    try {
        const existingKey = await KeyValue.findOne({ key });


        if (existingKey) {
            return res.status(400).json({ error: 'Key already exists!' });
        }

        const newKeyValue = new KeyValue({ key, value });
        await newKeyValue.save();

        return res.status(201).json({ message: 'key value stored successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

KeyValueRouter.get('/:key', async (req, res) => {
    const { key } = req.params;

    try {
        const keyValue = await KeyValue.findOne({ key });

        if (!keyValue) {
            return res.status(404).json({ error: 'Key not found!' });
        }

        return res.status(200).json({ key, value: keyValue.value });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

KeyValueRouter.put('/:key', async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    if (!value) {
        return res.status(400).json({ error: 'Value is required' });
    }
    try {
        const keyValue = await KeyValue.findOneAndUpdate({ key }, { value }, { new: true });

        if (!keyValue) {
            return res.status(404).json({ error: 'Key not found!' });
        }

        res.status(200).json({ message: 'Key updated successfully', key: keyValue.key, value: keyValue.value });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

KeyValueRouter.delete('/:key', async (req, res) => {
    const { key } = req.params;

    try {
        const keyValue = await KeyValue.findOneAndDelete({ key });

        if (!keyValue) {
            return res.status(404).json({ error: 'Key not found!!!' });
        }

        return res.status(200).json({ message: 'Key deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

module.exports = {
    KeyValueRouter,
};

