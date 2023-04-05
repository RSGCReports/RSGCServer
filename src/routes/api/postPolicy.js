const { insertPolicyRow } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const body = req.body;
  console.log('We reached the postPolicy Body: ', body);
  try {
    await insertPolicyRow(
      body.insurer,
      body.insurerName,
      body.Agent,
      body.homeStreet,
      body.homeCity,
      body.homeCountry,
      body.homeProvince,
      body.homePostalCode,
      body.policyNumber,
      req.user,
      body.businessStreet,
      body.businessCity,
      body.businessCountry,
      body.businessProvince,
      body.businessPostalCode
    );
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
