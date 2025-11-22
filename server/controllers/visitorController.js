const asyncHandler = require('express-async-handler');
const Visitor = require('../models/Visitor');

const incrementVisitor = asyncHandler(async (req, res) => {
    let visitor = await Visitor.findOne();

    if (!visitor) {
        visitor = new Visitor({ count: 1 });
    } else {
        visitor.count += 1;
        visitor.lastVisited = Date.now();
    }

    await visitor.save();
    res.json({ count: visitor.count });
});

const getVisitorCount = asyncHandler(async (req, res) => {
    const visitor = await Visitor.findOne();
    res.json({ count: visitor ? visitor.count : 0 });
});

module.exports = { incrementVisitor, getVisitorCount };
