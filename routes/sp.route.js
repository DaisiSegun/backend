const express = require('express');
const spController = require('../controllers/sp.controller.js');
const jwtMiddleware = require('../middleware/jwt.js');

const router = express.Router();

router.post("/", jwtMiddleware.verifyToken, spController.createService);
router.delete("/:id", jwtMiddleware.verifyToken, spController.deleteService);
router.get("/single/:id", spController.getService);
router.get("/all", spController.getServices);
router.get("/service-suggestions", spController.getServiceSuggestions);

module.exports = router;
