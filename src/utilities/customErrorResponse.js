export const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message,
    success: false,
  });
};
