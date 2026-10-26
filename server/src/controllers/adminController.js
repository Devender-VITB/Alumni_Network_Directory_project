import { successResponse } from '../utils/apiResponse.js';
import { dataRepository } from '../services/dataRepository.js';

export const getStats = async (req, res, next) => {
  try {
    const stats = await dataRepository.getSystemStats();
    return successResponse(res, 200, 'System statistics retrieved', stats);
  } catch (err) {
    next(err);
  }
};

export default { getStats };
