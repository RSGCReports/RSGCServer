const { insertVehicleRow } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  const body = req.body;

  try {
    vehicle = body.newVehicle;
    policy = body.policy;

    await insertVehicleRow(
      vehicle.licensePlateNo,
      vehicle.registeredOwner,
      vehicle.actualOwner,
      vehicle.registeredOwnerStreet,
      vehicle.registeredOwnerCity,
      vehicle.registeredOwnerCountry,
      vehicle.registeredOwnerProvince,
      vehicle.registeredOwnerPostalCode,
      vehicle.actualOwnerStreet,
      vehicle.actualOwnerCity,
      vehicle.actualOwnerCountry,
      vehicle.actualOwnerProvince,
      vehicle.actualOwnerPostalCode,
      vehicle.province,
      vehicle.make,
      parseInt(vehicle.year),
      vehicle.model,
      vehicle.type,
      vehicle.VIN,
      policy.insurerName,
      policy.policyNumber
    );
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
