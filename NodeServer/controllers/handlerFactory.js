const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.query().deleteById(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(204).json({});
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.query().patchAndFetchById(req.params.id, req.body);

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.query().insert(req.body);

    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });
};

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let features = new APIFeatures(
      Model.query().findById(req.params.id),
      req.query
    ).withGraphFetched(popOptions);

    const doc = await features.query;

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};

exports.getAll = (Model, popOptions, isActive = false) => {
  return catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.query().select(), req.query)
      .filter(isActive)
      .sort()
      .limitFields()
      .paginate()
      .withGraphFetched(popOptions);

    const doc = await features.query;

    // const doc = await Model.query().select().offset(0).limit(100);

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
};