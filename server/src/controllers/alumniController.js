import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { dataRepository } from '../services/dataRepository.js';

export const getAlumni = async (req, res, next) => {
  try {
    const result = await dataRepository.queryAlumni(req.query);
    return successResponse(res, 200, 'Alumni records retrieved successfully', result);
  } catch (err) {
    next(err);
  }
};

export const getAlumniById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const alumni = await dataRepository.getAlumniById(id);
    if (!alumni) {
      return errorResponse(res, 404, `Alumni profile not found for id: ${id}`);
    }
    return successResponse(res, 200, 'Alumni profile retrieved', alumni);
  } catch (err) {
    next(err);
  }
};

export const updateAlumniProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await dataRepository.getAlumniById(id);
    if (!existing) {
      return errorResponse(res, 404, 'Alumni profile not found');
    }

    // Authorization check: User can only update their own profile unless admin
    const currentUserId = req.user.id || req.user._id;
    const isOwner = String(existing.userId) === String(currentUserId) || existing.id === currentUserId;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return errorResponse(res, 403, 'Unauthorized. You may only edit your own alumni profile.');
    }

    const updated = await dataRepository.updateAlumniProfile(id, req.body);
    return successResponse(res, 200, 'Alumni profile updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

export const deleteAlumni = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await dataRepository.deleteAlumniProfile(id);
    if (!success) {
      return errorResponse(res, 404, 'Alumni record not found');
    }
    return successResponse(res, 200, 'Alumni record successfully deleted');
  } catch (err) {
    next(err);
  }
};

export default { getAlumni, getAlumniById, updateAlumniProfile, deleteAlumni };
