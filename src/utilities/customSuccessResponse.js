export const sendSuccessResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};
