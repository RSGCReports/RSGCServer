const logger = require('../../logger');

module.exports = (req, res) => {
  try {
    // logger.debug({ req.body }, 'This is the req body');
    console.log(req.body);
    res.status(201).json({ status: 'ok' });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ status: 'error', message: err.message });
  }
};
