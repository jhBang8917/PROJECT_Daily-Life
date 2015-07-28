/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var thing = require('./dailyPlan.model.js');

exports.register = function(socket) {
  dailyPlan.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  dailyPlan.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dailyPlan:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dailyPlan:remove', doc);
}
