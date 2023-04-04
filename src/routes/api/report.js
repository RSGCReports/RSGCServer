const { insertReportRow } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');
const { prisma } = require('../../../prisma/prismaFunction');

module.exports = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  const body = req.body;

  let report = JSON.parse(body.reportBody);
  let witnesses;
  let propertyDamages;
  let personsInjured;
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
    if (Array.isArray(body.witnesses)) {
      body.witnesses.forEach((witness) => {
        witnesses.push(JSON.parse(witness));
      });
    } else {
      witnesses.push(JSON.parse(body.witnesses));
    }
  }

  if (!body.propertyDamages) {
    logger.info('Missing property damages');
  } else {
    if (Array.isArray(body.propertyDamages)) {
      body.propertyDamages.forEach((propertyDamage) => {
        propertyDamages.push(JSON.parse(propertyDamage));
      });
    } else {
      propertyDamages.push(JSON.parse(body.propertyDamages));
    }
  }

  if (!body.personsInjured) {
    logger.info('Missing Injuries');
  } else {
    if (Array.isArray(body.personsInjured)) {
      body.personsInjured.forEach((personInjured) => {
        personsInjured.push(JSON.parse(personInjured));
      });
    } else {
      personsInjured.push(JSON.parse(body.personsInjured));
    }
  }

  // if there is ____ then add _____ to report

  report = {
    ...report,
    ...(witnesses && { witnesses }),
    ...(propertyDamages && { propertyDamages }),
    ...(personsInjured && { personsInjured }),
    ...(evidence && { evidence }),
  };

  console.log('REPORT: ', report);

  try {
    const policy = await prisma.insurancePolicy.findFirst({
      where: { Vehicle_Policy: { some: { licensePlateNo: report.licensePlate } } },
    });

    console.log(policy);

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
      report.propertyDamages
      //insert property damage array
    );

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
