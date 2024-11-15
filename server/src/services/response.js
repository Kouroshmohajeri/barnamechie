// src/services/response.js

const sendResponse = (
  res,
  statusCode,
  data = null,
  message = null,
  error = null
) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message: message || (data ? "Request successful" : "An error occurred"),
    data: data || null,
    error: error || null,
  };

  res.status(statusCode).json(response);
};

export default sendResponse;
