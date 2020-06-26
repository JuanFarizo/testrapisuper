const Buyers = require('../../models/Buyers');
const BuyersPersonalInfo = require('../../models/BuyersPersonalInfo');
const BuyersAddresses = require('../../models/BuyersAddresses');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const {
    filterObj
} = require('../../utils/utils');

////////// FILES

///////////////// FUNCIONES

////////////// HANDLERS


exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password update. Please use /updateMyPassword',
                400
            )
        );
    }

    // 2) Filter the data that send the user
    const filteredUser = filterObj(
        req.body,
        'email',
        'username'
    );
    const filteredBuyersInfo = filterObj(
        req.body,
        'name',
        'surname',
        'phone',
        'dob',
    );

    // 3) Update user document
    // const updatedBuyer = await User.query().patchAndFetchById(
    //     req.user.id,
    //     filteredBody
    // );


    const buyer = await Buyers.query().findOne({
        userID: req.user.id
    }) // Busco Buyer asociado a usuario (para luego buscar su personal info)
    const updateBuyersInfo = await BuyersPersonalInfo.query().findOne({
        buyerID: buyer.id
    }).patch(
        filteredBuyersInfo
    ) // Updateo BuyersPersonalInfo
    const updatedUser = await User.query().findById(req.user.id).patch({
        filteredUser
    }).withGraphFetched("[buyer[personalInfo, addresses.city]]")

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    const user = await User.query().patchAndFetchById(req.user.id, {
        isActive: false,
    });

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
});


exports.getAllBuyers = factory.getAll(Buyers);
exports.getBuyer = factory.getOne(Buyers, '[personalInfo, addresses.city]');
exports.updateBuyer = factory.updateOne(Buyers);
exports.deleteBuyer = factory.deleteOne(Buyers);