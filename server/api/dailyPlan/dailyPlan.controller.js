/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /dailyPlans              ->  index
 * POST    /dailyPlans              ->  create
 * GET     /dailyPlans/:id          ->  show
 * PUT     /dailyPlans/:id          ->  update
 * DELETE  /dailyPlans/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var DailyPlan = require('./dailyPlan.model.js');
var moment = require('moment');

// Get list of dailyPlans
exports.index = function(req, res) {
  DailyPlan.find(function (err, dailyPlans) {
    if(err) { return handleError(res, err); }
    return res.json(200, dailyPlans);
  });
};

exports.indexByOwnerId = function(req, res) {
  DailyPlan.find({owner : req.params.ownerId},function (err, dailyPlans) {
    if(err) { return handleError(res, err); }
    return res.json(200, dailyPlans);
  });
};

// Get a single dailyPlan
exports.show = function(req, res) {
  DailyPlan.findById(req.params.id, function (err, dailyPlan) {
    if(err) { return handleError(res, err); }
    if(!dailyPlan) { return res.send(404); }
    return res.json(dailyPlan);
  });
};
exports.showDayPlan = function(req, res) {
  //console.log(req.params.day);
  DailyPlan.find({owner:req.params.ownerId, day:req.params.day},null,{sort : {startTime:1}}, function (err, dailyPlan) {
    if(err) { return handleError(res, err); }
    if(!dailyPlan) { return res.send(404); }
    return res.json(dailyPlan);
  });
};

// Creates a new dailyPlan in the DB.
exports.create = function(req, res) {
  DailyPlan.create(req.body, function(err, dailyPlan) {
    if(err) {return handleError(res, err); }
    return res.json(201, dailyPlan);
  });
};

// Updates an existing dailyPlan in the DB.
// merge하면 값은 정확한데 원래값이랑 대치가 안된다..
// 하나씩 삽입하면 작동하는 걸로 봐서는 lodash에 문제가 있는 것 같다.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  DailyPlan.findById(req.params.id, function (err, dailyPlan) {
    if (err) { return handleError(res, err); }
    if(!dailyPlan) { return res.send(404); }
    console.log(req.body.title);
    dailyPlan.title = req.body.title;
    dailyPlan.day = req.body.day;
    dailyPlan.startTime = req.body.startTime;
    dailyPlan.endTime = req.body.endTime;
    //var updated = _.merge(dailyPlan, req.body);
    //updated.markModified('updated.day');
    //console.log(updated);
    dailyPlan.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dailyPlan);
    });
  });
};

// Deletes a dailyPlan from the DB.
exports.destroy = function(req, res) {
  DailyPlan.findById(req.params.id, function (err, dailyPlan) {
    if(err) { return handleError(res, err); }
    if(!dailyPlan) { return res.send(404); }
    dailyPlan.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  //Error 객체이므로 err.message로 보내야 한다.
  return res.send(500, err.message);
}
