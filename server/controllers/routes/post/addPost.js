const postEvent = require('../../../database/queries/postEvent');

module.exports =  (req, res) => {
  const {type} = req.body;
  const {id} = req.user;

  if(type === 'event') {
    postEvent()
    console.log(req.body)
    res.status(201).send({a:'res from'});
  } else{
    console.log('111111111111111111111111111111');
    res.status(201).send({a:'res from '});
  }
  return 1;
};
