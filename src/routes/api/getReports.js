const {
  getReportsByUsername,
  getVehicleBylicensePlateNo,
} = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const reports = await getReportsByUsername(req.user);

    for (const report of reports) {
      const vehicle = await getVehicleBylicensePlateNo(report.VehicleInfo[0].licensePlateNo);
      // console.log(vehicle);
      report.vehicle = vehicle;
    }

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
