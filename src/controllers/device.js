const Device = require('../models/device');
const deviceValidation = require('../validators/deviceValidation');
const {onSuccess, onError} = require('../utils/response');
class Devices {
  //  Retrieve a list of all devices
  static async retriveDevices(req, res) {
    try {
      const devices = await Device.find();

      if (devices.length === 0) {
        return onError(res, 404, 'No Device available Yet!');
      } else {
        return onSuccess(res, 200, 'Devices fetched successfully', devices);
      }
    } catch (error) {
      return onError(res, 500, 'Internal Server Error');
    }
  }

  // create an device
  static async createDevice(req, res) {
    const {error} = deviceValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    const device = new Device({
      device: req.body.device,
      os: req.body.os,
      manufacturer: req.body.manufacturer,
      lastCheckedOutBy: req.body.lastCheckedOutBy,
      isCheckedOut: req.body.isCheckedOut,
    });

    try {
      const savedevice = await device.save();
      return onSuccess(res, 201, 'Device created successfully', savedevice);
    } catch (error) {
      return onError(res, 500, 'internal server error');
    }
  }
  // Retrieve a single device
  static async retrieveOneDevice(req, res) {
    try {
      const device = await Device.findOne({_id: req.params.id});

      if (!device) {
        return onError(res, 404, "Device doesn't exists");
      } else {
        return onSuccess(res, 200, 'Device fetched successfully', device);
      }
    } catch (error) {
      return onError(res, 500, 'internal server error');
    }
  }

  //// Update an existing device
  static async updateDevice(req, res) {
    try {
      const device = await Device.findOne({_id: req.params.id});
      if (!device) {
        return onError(res, 404, "Device doesn't exists");
      } else {
        device.device = req.body.device;
        device.os = req.body.os;
        device.manufacturer = req.body.manufacturer;
        device.lastCheckedOutBy = req.body.lastCheckedOutBy;
        device.isCheckedOut = req.body.isCheckedOut;
        const update = await device.save();
        return onSuccess(res, 200, 'Device updated successfully', update);
      }
    } catch (error) {
      console.log(error);
      return onError(res, 500, 'internal server error');
    }
  }
  // Delete an existing Device
  static async deleteDevice(req, res) {
    try {
      const device = await Device.findOne({_id: req.params.id});
      if (!device) return onError(res, 404, "device doesn't exist");
      else {
        const oneDevice = await Device.deleteOne({_id: req.params.id});
        return onSuccess(res, 200, 'Device deleted successfully', oneDevice);
      }
    } catch (error) {
      return onError(res, 500, 'Internal Server Error');
    }
  }
}

module.exports = Devices;
