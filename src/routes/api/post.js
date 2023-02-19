const logger = require('../../logger');
// const prisma = require('../../../prisma/prismaFunction.ts');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = async (req, res) => {
  try {
    // log the body
    let body = req.body;
    console.log(body);
    logger.debug({ body }, 'This is the body');

    // check form validity
    if (registrationValidation(req.body.completeProfile)) {
      //Create the user, the policy and the vehicle info from validated completeProfile

      const user = req.body.completeProfile.user;
      console.log('Do we get to the DB stuff?');
      const insurancePolicy = req.body.completeProfile.insurancePolicy;
      const vehicleInfo = req.body.completeProfile.vehicleInfo;

      // const createdUser = await prisma.insertUserRow({ user });
      const createdUser = await prisma.user.create({
        data: {
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          dob: new Date(user.dob),
          disabilities: user.disabilities,
          yearsDriving: parseInt(user.yearsDriving),
          homeStreet: user.homeStreet,
          homeCity: user.homeCity,
          homeProvince: user.homeProvince,
          homeCountry: user.homeCountry,
          homePostalCode: user.homePostalCode,
          businessStreet: user.businessStreet,
          businessCity: user.businessCity,
          businessProvince: user.businessProvince,
          businessCountry: user.businessCountry,
          businessPostalCode: user.businessPostalCode,
          phoneNumber: user.phoneNumber,
          driverLicense: user.driverLicense,
        },
      });
      // const createdInsurancePolicy = await prisma.insertPolicyRow({ insurancePolicy });
      const createdInsurancePolicy = await prisma.insurancePolicy.create({
        data: {
          insurer: insurancePolicy.insurer,
          insurerName: insurancePolicy.insurerName,
          Agent: insurancePolicy.Agent,
          homeStreet: insurancePolicy.homeStreet,
          homeCity: insurancePolicy.homeCity,
          homeCountry: insurancePolicy.homeCountry,
          homeProvince: insurancePolicy.homeProvince,
          homePostalCode: insurancePolicy.homePostalCode,
          businessStreet: insurancePolicy.businessStreet,
          businessCity: insurancePolicy.businessCity,
          businessCountry: insurancePolicy.businessCountry,
          businessProvince: insurancePolicy.businessProvince,
          businessPostalCode: insurancePolicy.businessPostalCode,
          policyNumber: insurancePolicy.policyNumber,
        },
      });
      // const createdVehicleInfo = await prisma.insertVehicleRow({ vehicleInfo });
      const createdVehicleInfo = await prisma.vehicleInformation.create({
        data: {
          licensePlateNo: vehicleInfo.licensePlateNo,
          registeredOwner: vehicleInfo.registeredOwner,
          actualOwner: vehicleInfo.actualOwner,
          registeredOwnerStreet: vehicleInfo.RegisteredOwnerStreet,
          registeredOwnerCity: vehicleInfo.RegisteredOwnerCity,
          registeredOwnerCountry: vehicleInfo.RegisteredOwnerCountry,
          registeredOwnerProvince: vehicleInfo.RegisteredOwnerProvince,
          registeredOwnerPostalCode: vehicleInfo.RegisteredOwnerPostalCode,
          actualOwnerStreet: vehicleInfo.ActualOwnerStreet,
          actualOwnerCity: vehicleInfo.ActualOwnerCity,
          actualOwnerCountry: vehicleInfo.ActualOwnerCountry,
          actualOwnerProvince: vehicleInfo.ActualOwnerProvince,
          actualOwnerPostalCode: vehicleInfo.ActualOwnerPostalCode,
          province: vehicleInfo.province,
          make: vehicleInfo.make,
          year: parseInt(vehicleInfo.year),
          model: vehicleInfo.model,
          type: vehicleInfo.type,
          VIN: vehicleInfo.VIN,
        },
      });

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
