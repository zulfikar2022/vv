export const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message,
    },
  });
};
