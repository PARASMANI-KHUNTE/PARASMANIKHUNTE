const Contact = require('../models/Contact');

// GET single contact (there will be only one document)
const getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne();
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// UPDATE contact details (expects full payload)
const updateContact = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const contact = await Contact.findOne();
        if (!contact) {
            // If no contact exists yet, create one
            const newContact = await Contact.create({ name, email, phone, address });
            return res.status(201).json(newContact);
        }
        contact.name = name ?? contact.name;
        contact.email = email ?? contact.email;
        contact.phone = phone ?? contact.phone;
        contact.address = address ?? contact.address;
        await contact.save();
        res.json(contact);
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getContact, updateContact };
