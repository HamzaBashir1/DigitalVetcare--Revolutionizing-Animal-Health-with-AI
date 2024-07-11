import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update' });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Successfully deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete' });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'No user found' });
        }

        res.status(200).json({ success: true, message: 'User found', data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        res.status(200).json({ success: true, message: 'Users found', data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const getUserProfile = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { password, ...rest } = user._doc;

        res.status(200).json({ success: true, message: 'Profile info is getting', data: { ...rest } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const getMyAppointments = async (req, res) => {
    try {
        // Step 1: Retrieve appointments from booking for a specific user
        const bookings = await Booking.find({ user: req.userId });
        // Step 2: Extract doctor ids from appointment bookings
        const doctorIds = bookings.map(el => el.doctor.id);
        // Step 3: Retrieve doctors using doctor ids
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');

        res.status(200).json({ success: true, message: 'Appointments are getting', data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};