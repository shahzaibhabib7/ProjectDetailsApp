const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');


exports.getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new appError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.createUser = catchAsync(async (req, res, next) => {

    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        // the 'new' updated document is the one that will be returned
        new: true,
        // so that each time that we update a certain document then the validators that
        // we specified in the schema will run again.
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            updatedUser
        }
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {

    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});