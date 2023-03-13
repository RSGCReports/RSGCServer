const logger = require('../../logger');
const {
  insertUserRow,
  insertPolicyRow,
  insertVehicleRow,
} = require('../../../prisma/prismaFunction.js');

module.exports = async (req, res) => {
  try {
    // check form validity
    if (registrationValidation(req.body.completeProfile)) {
      //Create the user, the policy and the vehicle info from validated completeProfile

      const user = req.body.completeProfile.user;
      const insurancePolicy = req.body.completeProfile.insurancePolicy;
      const vehicleInfo = req.body.completeProfile.vehicleInfo;

      const createdUser = await insertUserRow(
        user.username,
        user.fullname,
        user.email,
        new Date(user.dob),
        parseInt(user.yearsDriving),
        user.homeStreet,
        user.homeCity,
        user.homeProvince,
        user.homeCountry,
        user.homePostalCode,
        user.phoneNumber,
        user.driverLicense,
        user.businessStreet,
        user.businessCity,
        user.businessProvince,
        user.businessCountry,
        user.businessPostalCode,
        user.disabilities
      );

      const createdInsurancePolicy = await insertPolicyRow(
        insurancePolicy.insurer,
        insurancePolicy.insurerName,
        insurancePolicy.Agent,
        insurancePolicy.homeStreet,
        insurancePolicy.homeCity,
        insurancePolicy.homeCountry,
        insurancePolicy.homeProvince,
        insurancePolicy.homePostalCode,
        insurancePolicy.policyNumber,
        user.username,
        insurancePolicy.businessStreet,
        insurancePolicy.businessCity,
        insurancePolicy.businessCountry,
        insurancePolicy.businessProvince,
        insurancePolicy.businessPostalCode
      );

      const createdVehicleInfo = await insertVehicleRow(
        vehicleInfo.licensePlateNo,
        vehicleInfo.registeredOwner,
        vehicleInfo.actualOwner,
        vehicleInfo.RegisteredOwnerStreet,
        vehicleInfo.RegisteredOwnerCity,
        vehicleInfo.RegisteredOwnerCountry,
        vehicleInfo.RegisteredOwnerProvince,
        vehicleInfo.RegisteredOwnerPostalCode,
        vehicleInfo.ActualOwnerStreet,
        vehicleInfo.ActualOwnerCity,
        vehicleInfo.ActualOwnerCountry,
        vehicleInfo.ActualOwnerProvince,
        vehicleInfo.ActualOwnerPostalCode,
        vehicleInfo.province,
        vehicleInfo.make,
        parseInt(vehicleInfo.year),
        vehicleInfo.model,
        vehicleInfo.type,
        vehicleInfo.VIN,
        insurancePolicy.insurerName,
        insurancePolicy.policyNumber
      );

      console.log(createdUser);
      console.log(createdInsurancePolicy);
      console.log(createdVehicleInfo);

      res.status(201).json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'error' });
    }
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ status: 'error', message: err.message });
  }
};

function registrationValidation(completeProfile) {
  // check if required fields are filled
  console.log('Validation');
  if (
    completeProfile.user.username &&
    completeProfile.user.fullname &&
    completeProfile.user.email &&
    completeProfile.user.dob /* check format for date*/ &&
    completeProfile.user.yearsDriving &&
    completeProfile.user.homeStreet &&
    completeProfile.user.homeCity &&
    completeProfile.user.homeCountry &&
    completeProfile.user.homeProvince &&
    completeProfile.user.homePostalCode &&
    completeProfile.user.phoneNumber &&
    completeProfile.user.driverLicense &&
    completeProfile.insurancePolicy.insurer &&
    completeProfile.insurancePolicy.insurerName &&
    completeProfile.insurancePolicy.Agent &&
    completeProfile.insurancePolicy.homeStreet &&
    completeProfile.insurancePolicy.homeCity &&
    completeProfile.insurancePolicy.homeCountry &&
    completeProfile.insurancePolicy.homeProvince &&
    completeProfile.insurancePolicy.homePostalCode &&
    completeProfile.insurancePolicy.policyNumber &&
    completeProfile.vehicleInfo.licensePlateNo &&
    completeProfile.vehicleInfo.registeredOwner &&
    completeProfile.vehicleInfo.RegisteredOwnerStreet &&
    completeProfile.vehicleInfo.RegisteredOwnerCity &&
    completeProfile.vehicleInfo.RegisteredOwnerCountry &&
    completeProfile.vehicleInfo.RegisteredOwnerProvince &&
    completeProfile.vehicleInfo.RegisteredOwnerPostalCode &&
    completeProfile.vehicleInfo.province &&
    completeProfile.vehicleInfo.make &&
    completeProfile.vehicleInfo.year &&
    completeProfile.vehicleInfo.model &&
    completeProfile.vehicleInfo.type &&
    completeProfile.vehicleInfo.VIN
  ) {
    // check if required fields are valid
    if (
      !(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(completeProfile.user.email) &&
        completeProfile.user.homeCountry === 'Canada' &&
        ['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
          completeProfile.user.homeProvince
        ) &&
        /^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(completeProfile.user.homePostalCode) &&
        /[0-9-]+/.test(completeProfile.user.phoneNumber) &&
        completeProfile.insurancePolicy.homeCountry === 'Canada' &&
        ['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
          completeProfile.insurancePolicy.homeProvince
        ) &&
        /^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(completeProfile.insurancePolicy.homePostalCode)
      )
    ) {
      console.log('false on required');
      return false;
    }

    // check if optional user fields are filled
    if (
      completeProfile.user.businessStreet &&
      completeProfile.user.businessCity &&
      completeProfile.user.businessCountry &&
      completeProfile.user.businessProvince &&
      completeProfile.user.businessPostalCode
    ) {
      // check if optional user fields are valid
      if (
        !(
          completeProfile.user.businessCountry === 'Canada' &&
          ['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
            completeProfile.user.homeProvince
          ) &&
          /^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(completeProfile.user.businessPostalCode)
        )
      ) {
        console.log('false on first optional');
        return false;
      }
    }

    // check if optional insurancePolicy fields are filled
    if (
      completeProfile.insurancePolicy.businessStreet &&
      completeProfile.insurancePolicy.businessCity &&
      completeProfile.insurancePolicy.businessCountry &&
      completeProfile.insurancePolicy.businessProvince &&
      completeProfile.insurancePolicy.businessPostalCode
    ) {
      // check if optional insurancePolicy fields are valid
      if (
        !(
          completeProfile.insurancePolicy.businessCountry === 'Canada' &&
          ['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
            completeProfile.insurancePolicy.homeProvince
          ) &&
          /^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(
            completeProfile.insurancePolicy.businessPostalCode
          )
        )
      ) {
        console.log('false on last optional');
        return false;
      }
    }
    console.log('it be returning true');
    return true;
  }
  console.log('false out of hand');
  return false;
}
