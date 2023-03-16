const { getUserByUsername, prisma } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const user = await getUserByUsername(req.user);
    // console.log('Retrieved User: ' + JSON.stringify(user));
    const policies = await prisma.insurancePolicy.findMany({
      where: { PolicyClient: { some: { username: req.user } } },
    });
    const vehicles = await prisma.vehicleInformation.findMany({
      where: {
        Vehicle_Policy: {
          some: { InsurancePolicy: { PolicyClient: { some: { username: req.user } } } },
        },
      },
    });

    // console.log(user);
    // console.log(policies);
    // console.log(vehicles);

    let userInfo = { user, policies, vehicles };

    // console.log(userInfo);

    res.status(200).json({
      status: 'ok',
      text: 'Get user info',
      userInfo,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      status: 'Not Ok',
      error: e,
    });
  }
};
