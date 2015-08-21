'use strict';

var express = require('express');
var controller = require('./diary.controller.js');

var router = express.Router();

router.get('/', controller.index);// api/thing 디렉토리 아래에 있으므로 '/' get / 오면 controller.index실행
router.get('/:id', controller.show);
router.get('/byOwnerId/:ownerId', controller.indexByOwnerId);
router.get('/promise/yesterday/:ownerId', controller.promiseShow);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
