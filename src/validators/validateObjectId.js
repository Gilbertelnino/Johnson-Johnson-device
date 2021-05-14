const mongoose = require('mongoose');
const {onError} = require('../utils/response');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return onError(res, 404, 'Not Found');
  }
  next();
};
module.exports = validateObjectId;
