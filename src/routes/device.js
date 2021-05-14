const express = require('express');
const validateObjectId = require('../validators/validateObjectId');
const Devices = require('../controllers/device');

const {verifyToken} = require('../middlewares/verifyToken');
const router = express.Router();

// retrieve all devices
router.get('/', Devices.retriveDevices);

// create a new device
router.post('/create', verifyToken, Devices.createDevice);

// Retrieve a single DAevice
router.get('/:id', validateObjectId, Devices.retrieveOneDevice);

// Update an existing Device
router.patch('/:id/edit', validateObjectId, verifyToken, Devices.updateDevice);

// Delete an existing device
router.delete('/:id', validateObjectId, verifyToken, Devices.deleteDevice);

module.exports = router;
