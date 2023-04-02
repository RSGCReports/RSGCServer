const { getReportsByUsername } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const reports = await getReportsByUsername(req.user);

    res.status(200).json({
      status: 'ok',
      text: 'Get reports info',
      reports,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      status: 'Not Ok',
      error: e,
    });
  }
};
