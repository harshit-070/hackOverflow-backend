"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => (req, res, next) => {
    try {
        const response = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        req.query = response.query;
        req.body = response.body;
        req.params = response.params;
        next();
    }
    catch (e) {
        return res.status(400).json({ success: false, error: e.errors });
    }
};
exports.default = validateRequest;
