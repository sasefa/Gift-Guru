class PermissionError extends Error {
    constructor(message) {
      super(message);
      this.name = 'PermissionError';
    }
  }
  
  const restrictTo = (...allowedRoles) => {
    return (req, res, next) => {
      try {
        // Ensure user is set on request (presuming authentication middleware has run)
        if (!req.user) {
          throw new PermissionError('User data is unavailable. Make sure authentication middleware is run before restrictTo.');
        }
  
        // Check if user role is in the list of allowed roles
        if (!allowedRoles.includes(req.user.role)) {
          throw new PermissionError('You do not have permission to perform this action');
        }
  
        next();
      } catch (error) {
        handlePermissionError(error, res, next);
      }
    };
  };
  
  const handlePermissionError = (error, res, next) => {
    if (error instanceof PermissionError) {
      // Optionally: Log the error (to a file, monitoring system, etc.)
      console.error('[PermissionError]', error.message);
      return res.status(403).json({
        status: 'fail',
        message: error.message
      });
    }
  
    // Pass other types of errors to the next error handler
    next(error);
  };
  
  module.exports = restrictTo;
  