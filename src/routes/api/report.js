const { insertReportRow } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');
const { prisma } = require('../../../prisma/prismaFunction');

module.exports = async (req, res) => {
  const body = req.body;

  let report = JSON.parse(body.reportBody);
  let witnesses = JSON.parse(req.body.witnesses);
  let propertyDamages = JSON.parse(req.body.propertyDamages);
  let personsInjured = JSON.parse(req.body.personsInjured);
  let evidence;

  if (req.files.length === 0) {
    logger.info('Missing image files');
  } else {
    evidence = [];
    req.files.forEach((file) => {
      evidence.push({
        name: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
        size: file.size,
      });
    });
  }

  if (!body.witnesses) {
    logger.info('Missing Witnesses');
  } else {
    witnesses.forEach((witness) => {
      witnesses.push({
        name: witness.witnessName,
        phone: witness.witnessPhoneNumber,
        street: witness.witnessAddress,
        city: witness.witnessCity,
        country: witness.witnessCountry,
        province: witness.witnessProvince,
        postalCode: witness.witnessPostalCode,
      });
      witnesses.shift();
    });
  }

  if (!body.propertyDamages) {
    logger.info('Missing property damages');
  } else {
    propertyDamages.forEach((propertyDamage) => {
      propertyDamages.push({
        nameOwner: propertyDamage.propertyDamageOwnerName,
        phoneOwner: propertyDamage.propertyDamageOwnerPhone,
        ownerStreet: propertyDamage.propertyDamageOwnerCity,
        ownerCity: propertyDamage.propertyDamageOwnerAddress,
        ownerCountry: propertyDamage.propertyDamageOwnerCountry,
        ownerProvince: propertyDamage.propertyDamageOwnerProvince,
        ownerPostalCode: propertyDamage.propertyDamageOwnerPostalCode,
        licenseNumberOwner: propertyDamage.propertyDamageOwnerLicenseNumber,
        ownerProvIssue: propertyDamage.propertyDamageOwnerIssueProvince,
        yearOfVehicle: parseInt(propertyDamage.propertyDamageYearOfVehicle),
        nameInsurer: propertyDamage.propertyDamageInsurerName,
        policyNumber: propertyDamage.propertyDamageInsurancePolicyNumber,
        nameDriver: propertyDamage.propertyDamageDriverName,
        phoneDriver: propertyDamage.propertyDamageDriverPhone,
        driverStreet: propertyDamage.propertyDamageDriverAddress,
        driverCity: propertyDamage.propertyDamageDriverCity,
        driverCountry: propertyDamage.propertyDamageDriverCountry,
        driverProvince: propertyDamage.propertyDamageDriverProvince,
        driverPostalCode: propertyDamage.propertyDamageDriverPostalCode,
        driverLicenseNumber: propertyDamage.propertyDamageDriverLicenseNumber,
        driverProvIssue: propertyDamage.propertyDamageDriverIssueProvince,
      });
      propertyDamages.shift();
    });

    // propertyDamages = JSON.parse(body.propertyDamages);
  }

  if (!body.personsInjured) {
    logger.info('Missing Injuries');
  } else {
    personsInjured.forEach((personInjured) => {
      personsInjured.push({
        name: personInjured.personInjuredName,
        phone: personInjured.personInjuredPhone,
        street: personInjured.personInjuredAddress,
        city: personInjured.personInjuredCity,
        country: personInjured.personInjuredCountry,
        province: personInjured.personInjuredProvince,
        postalCode: personInjured.personInjuredPostalCode,
        hospital: personInjured.personInjuredHospital,
        natureOfInjuries: personInjured.personInjuredNatureOfInjuries,
      });
      personsInjured.shift();
    });

    // personsInjured = JSON.parse(body.personsInjured);
  }

  // if there is ____ then add _____ to report

  report = {
    ...report,
    ...(personsInjured && { personsInjured }),
    ...(evidence && { evidence }),
    ...(propertyDamages && { propertyDamages }),
    ...(witnesses && { witnesses }),
  };

  try {
    const policy = await prisma.insurancePolicy.findFirst({
      where: { Vehicle_Policy: { some: { licensePlateNo: report.licensePlate } } },
    });

    await insertReportRow(
      new Date(report.date + 'T' + report.time),
      report.dayLight,
      report.roadConditions,
      report.weatherConditions,
      report.location,
      report.accidentConditions,
      null, //comment
      // null, //flag
      // null, //adminComment
      parseInt(report.speed),
      report.direction,
      report.purposeForUsage,
      report.severity,

      //insert policyID
      policy.policyId,
      req.user,
      report.licensePlate,
      //insert license plate
      report.damageConditions,
      report.personsInjured,
      report.evidence,
      report.propertyDamages,
      report.witnesses
      //insert property damage array
    );

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
