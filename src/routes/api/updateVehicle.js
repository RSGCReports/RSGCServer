const { prisma } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');
module.exports = async (req, res) => {
  vehicleToBeUpdated = req.body.newVehicle;
  try {
    await prisma.vehicleInformation.update({
      where: { licensePlateNo: vehicleToBeUpdated.licensePlateNo },
      data: { ...vehicleToBeUpdated },
    });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
