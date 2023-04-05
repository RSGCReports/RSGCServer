const { prisma } = require('../../../prisma/prismaFunction');

module.exports = async (req, res) => {
  try {
    const policies = await prisma.insurancePolicy.findMany({
      where: { PolicyClient: { some: { username: req.user } } },
    });
    console.log(policies);
    res.status(200).json({
      status: 'ok',
      text: 'Get policies by user',
      policies,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      status: 'Not Ok',
      error: e,
    });
  }
};
