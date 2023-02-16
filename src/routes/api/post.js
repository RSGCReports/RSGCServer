const logger = require('../../logger');

module.exports = (req, res) => {
  try {
    // log the body
    let body = req.body;
    logger.debug({ body }, 'This is the body');

    // check form validity
    if (registrationValidation(req.body.completeProfile)) {
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
    completeProfile.insurancePolicy.agent &&
    completeProfile.insurancePolicy.homeStreet &&
    completeProfile.insurancePolicy.homeCity &&
    completeProfile.insurancePolicy.homeCountry &&
    completeProfile.insurancePolicy.homeProvince &&
    completeProfile.insurancePolicy.homePostalCode &&
    completeProfile.insurancePolicy.policyNumber &&
    completeProfile.vehicle.licensePlateNo &&
    completeProfile.vehicle.registeredOwner &&
    completeProfile.vehicle.registeredOwnerStreet &&
    completeProfile.vehicle.registeredOwnerCity &&
    completeProfile.vehicle.registeredOwnerCountry &&
    completeProfile.vehicle.registeredOwnerProvince &&
    completeProfile.vehicle.registeredOwnerPostalCode &&
    completeProfile.vehicle.province &&
    completeProfile.vehicle.make &&
    completeProfile.vehicle.year &&
    completeProfile.vehicle.model &&
    completeProfile.vehicle.type &&
    completeProfile.vehicle.VIN
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
        return false;
      }
    }

    return true;
  }

  return false;
}
