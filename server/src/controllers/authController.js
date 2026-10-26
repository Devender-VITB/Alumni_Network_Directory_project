import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { generateToken } from '../utils/tokenUtils.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { dataRepository } from '../services/dataRepository.js';

export const register = async (req, res, next) => {
  try {
    const { fullName, name, email, password, graduationYear, department, degree } = req.body;
    const displayName = fullName || name;

    // Check duplicate email
    const existing = await dataRepository.findUserByEmail(email);
    if (existing) {
      return errorResponse(res, 409, 'An account with this email address already exists.');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create User record
    const user = await dataRepository.createUser({
      name: displayName,
      email,
      passwordHash,
      role: 'user',
      avatar: '',
      graduationYear: graduationYear ? Number(graduationYear) : 2024,
      department: department || 'General Engineering',
      degree: degree || 'Bachelor of Technology',
    });

    const token = generateToken({ id: user.id || user._id, role: user.role });

    // Set cookie
    res.cookie('alumniconnect_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, 201, 'Account successfully created', {
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userWithPassword = await dataRepository.findUserByEmail(email, true);
    if (!userWithPassword) {
      return errorResponse(res, 401, 'Invalid email or password.');
    }

    const isMatch = await comparePassword(password, userWithPassword.passwordHash);
    if (!isMatch) {
      return errorResponse(res, 401, 'Invalid email or password.');
    }

    const token = generateToken({
      id: userWithPassword.id || userWithPassword._id,
      role: userWithPassword.role,
    });

    // Sanitized user object without password
    const safeUser = { ...userWithPassword };
    delete safeUser.passwordHash;

    res.cookie('alumniconnect_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, 200, 'Login successful', {
      token,
      user: safeUser,
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res) => {
  return successResponse(res, 200, 'Current user profile retrieved', req.user);
};

export const logout = (req, res) => {
  res.clearCookie('alumniconnect_token');
  return successResponse(res, 200, 'Successfully logged out.');
};

export default { register, login, getMe, logout };
