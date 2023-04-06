const { prisma } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const reportId = parseInt(req.params.id);
  console.log('We reached the deleteReport id: ', req.params.id);
  try {
    await prisma.report.delete({
      where: { reportId },
    });
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
