/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var diary = require('./diary.model.js');

exports.register = function(socket) {
  diary.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  diary.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('diary:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('diary:remove', doc);
}
