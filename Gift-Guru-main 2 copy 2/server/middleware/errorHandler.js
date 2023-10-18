class ApiError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
      this.isApiError = true;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    if (err.isApiError) {
      // Handling API Errors
      res.status(err.status).json({
        status: 'error',
        message: err.message
      });
    } else if (err.name === 'ValidationError') {
      // Handling Validation Errors
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    } else if (err.name === 'PermissionError') {
      // Handling Permission Errors
      res.status(403).json({
        status: 'fail',
        message: err.message
      });
    } else {
      // Handling Unknown Errors
      console.error('Unhandled Error:', err); // Logging unexpected error
      res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred.'
      });
    }
  };
  
  module.exports = {
    ApiError,
    errorHandler
  };
  