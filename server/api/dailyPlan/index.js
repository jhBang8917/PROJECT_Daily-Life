'use strict';

var express = require('express');
var controller = require('./dailyPlan.controller');

var router = express.Router();

router.get('/', controller.index);// api/thing 디렉토리 아래에 있으므로 '/' get / 오면 controller.index실행
router.get('/:id', controller.show);
router.get('/query/:day', controller.showDayPlan);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
