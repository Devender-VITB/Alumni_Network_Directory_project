import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { dataRepository } from '../services/dataRepository.js';

export const getEvents = async (req, res, next) => {
  try {
    const events = await dataRepository.queryEvents(req.query);
    return successResponse(res, 200, 'Events retrieved successfully', { items: events });
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await dataRepository.getEventById(id);
    if (!event) {
      return errorResponse(res, 404, `Event not found for id: ${id}`);
    }
    return successResponse(res, 200, 'Event retrieved', event);
  } catch (err) {
    next(err);
  }
};

export const registerForEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;

    const event = await dataRepository.getEventById(id);
    if (!event) {
      return errorResponse(res, 404, 'Event not found.');
    }

    if (event.status === 'cancelled' || event.status === 'completed') {
      return errorResponse(res, 400, 'Registrations are closed for this event.');
    }

    if (event.registeredCount >= event.capacity) {
      return errorResponse(res, 400, 'This event is currently at full capacity.');
    }

    const reg = await dataRepository.registerUserForEvent(id, userId);
    return successResponse(res, 200, 'Successfully registered for event', reg);
  } catch (err) {
    if (err.message && err.message.includes('already registered')) {
      return errorResponse(res, 409, err.message);
    }
    next(err);
  }
};

export const cancelRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;

    await dataRepository.cancelEventRegistration(id, userId);
    return successResponse(res, 200, 'Event registration cancelled successfully');
  } catch (err) {
    next(err);
  }
};

export default { getEvents, getEventById, registerForEvent, cancelRegistration };
