const router = require("express").Router();

const { updatePersonal } = require('./personal');

router.route('/personal').put(updatePersonal);

module.exports = router;
