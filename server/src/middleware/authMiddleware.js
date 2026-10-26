import { verifyToken } from '../utils/tokenUtils.js';
import { errorResponse } from '../utils/apiResponse.js';
import { dataRepository } from '../services/dataRepository.js';

export const protect = async (req, res, next) => {
  let token = null;

  // Check Authorization Bearer header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.alumniconnect_token) {
    token = req.cookies.alumniconnect_token;
  }

  if (!token) {
    return errorResponse(res, 401, 'Authentication required. Please sign in to access this resource.');
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    return errorResponse(res, 401, 'Invalid or expired authentication token. Please sign in again.');
  }

  try {
    const user = await dataRepository.findUserById(decoded.id);
    if (!user) {
      return errorResponse(res, 401, 'User associated with this token no longer exists.');
    }

    if (user.isActive === false) {
      return errorResponse(res, 403, 'Account is inactive. Please contact alumni administration.');
    }

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, 500, 'Authentication check failed.');
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `Access denied. Requires one of the following permissions: [${roles.join(', ')}]`
      );
    }
    next();
  };
};

export default { protect, authorize };
