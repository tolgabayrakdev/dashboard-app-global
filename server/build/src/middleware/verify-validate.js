"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyValidate = void 0;
const verifyValidate = (schema) => (req, res, next) => {
    var _a;
    const { value, error } = schema.validate(req.body);
    if (error) {
        const errorMessage = (_a = error.details) === null || _a === void 0 ? void 0 : _a.map((detail) => detail.message).join(', ');
        res.status(400).json({ error: errorMessage });
        return;
    }
    else {
        next();
    }
};
exports.verifyValidate = verifyValidate;
