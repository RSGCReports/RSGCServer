const { prisma } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const body = req.body;
  console.log('We reached the postFeedback Body: ', body);
  try {
    await prisma.report.update({
      where: { reportId: parseInt(body.reportId) },
      data: {
        flag: body.flag,
        adminComments: body.adminComments,
      },
    });
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
