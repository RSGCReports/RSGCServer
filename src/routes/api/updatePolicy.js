const { prisma } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');
module.exports = async (req, res) => {
  console.log('REACH UPDATE INSURANCE: ');
  const body = req.body;
  try {
    const updatedPolicy = {
      ...{ insurerName: body.insurerName },
      ...{ policyNumber: body.policyNumber },
      ...(body.Agent && { Agent: body.Agent }),
      ...(body.homeStreet && { homeStreet: body.homeStreet }),
      ...(body.homeCity && { homeCity: body.homeCity }),
      ...(body.homeCountry && { homeCountry: body.homeCountry }),
      ...(body.homeProvince && { homeProvince: body.homeProvince }),
      ...(body.homePostalCode && { homePostalCode: body.homePostalCode }),
      ...(body.insurer && { insurer: body.insurer }),
      ...(body.businessStreet && { businessStreet: body.businessStreet }),
      ...(body.businessCity && { businessCity: body.businessCity }),
      ...(body.businessCountry && { businessCountry: body.businessCountry }),
      ...(body.businessProvince && { businessProvince: body.businessProvince }),
      ...(body.businessPostalCode && { businessPostalCode: body.businessPostalCode }),
    };

    console.log(updatedPolicy);

    await prisma.insurancePolicy.update({
      where: {
        policyNumber: updatedPolicy.policyNumber,
      },
      data: {
        ...updatedPolicy,
      },
    });
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
