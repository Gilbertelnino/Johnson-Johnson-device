const onSuccess = (res, status, message, data) =>
  res.status(status).json({
    status,
    message,
    data,
  });
const onError = (res, status, error) =>
  res.status(status).json({
    status,
    error,
  });

module.exports = {onError, onSuccess};
