const { prisma, getVehicleBylicensePlateNo } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        PersonInjured: true,
        PoliceInvestigation: true,
        Witness: true,
        Evidence: true,
        Insurance: true,
        PersonalInfo: true,
        VehicleInfo: true,
        PropertyDamage: true,
      },
    });

    for (const report of reports) {
      const vehicle = await getVehicleBylicensePlateNo(report.VehicleInfo[0].licensePlateNo);

      report.vehicle = vehicle;
    }

    res.status(200).json({
      status: 'ok',
      text: 'Get all reports info for admin',
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
