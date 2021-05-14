const Joi = require('joi');

// validation schema
const deviceValidation = (data) => {
  const schema = Joi.object({
    device: Joi.string().min(3).required(),
    os: Joi.string().min(3).required(),
    manufacturer: Joi.string().min(8).required(),
    lastCheckedOutBy: Joi.string().min(3).required(),
    isCheckedOut: Joi.boolean().required(),
  });
  return schema.validate(data);
};

module.exports = deviceValidation;
