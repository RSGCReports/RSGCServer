const { getUserByUsername, prisma } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const reportId = parseInt(req.params.id);

    const report = await prisma.report.findUnique({
      where: { reportId },
      include: {
        PersonInjured: true,
        PoliceInvestigation: true,
        Witness: true,
        Evidence: true,
        PersonalInfo: true,
        PropertyDamage: true,
        VehicleInfo: true,
      },
    });
    const user = await getUserByUsername(report.PersonalInfo[0].username);

    const vehicle = await prisma.vehicleInformation.findFirst({
      where: { licensePlateNo: report.VehicleInfo[0].licensePlateNo },
    });

    const vehiclesPolicies = await prisma.insurancePolicy.findMany({
      where: { Vehicle_Policy: { some: { licensePlateNo: report.VehicleInfo[0].licensePlateNo } } },
    });

    let reportInfo = { user, vehiclesPolicies, vehicle, report };

    res.status(200).json({
      status: 'ok',
      text: 'Get report byId',
      reportInfo,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      status: 'Not Ok',
      error: e,
    });
  }
};
