const { prisma } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  // console.log(req.body);

  try {
    const person = req.body;

    const updatedPerson = {
      ...{ username: req.user },
      ...{ fullname: person.fullname },
      ...{ email: person.email },
      ...(person.dob && { dob: new Date(person.dob) }),
      ...(person.disabilities && { disabilities: person.disabilities }),
      ...(person.yearsDriving && { yearsDriving: parseInt(person.yearsDriving) }),
      ...(person.homeStreet && { homeStreet: person.homeStreet }),
      ...(person.homeCity && { homeCity: person.homeCity }),
      ...(person.homeProvince && { homeProvince: person.homeProvince }),
      ...(person.homeCountry && { homeCountry: person.homeCountry }),
      ...(person.homePostalCode && { homePostalCode: person.homePostalCode }),
      ...(person.businessStreet && { businessStreet: person.businessStreet }),
      ...(person.businessCity && { businessCity: person.businessCity }),
      ...(person.businessProvince && { businessProvince: person.businessProvince }),
      ...(person.businessCountry && { businessCountry: person.businessCountry }),
      ...(person.businessPostalCode && { businessPostalCode: person.businessPostalCode }),
      ...(person.phoneNumber && { phoneNumber: person.phoneNumber }),
      ...(person.driverLicense && { driverLicense: person.driverLicense }),
    };

    console.log('DO WE GET HERE');
    console.log('THIS IS DATE: ', person.dob);

    await prisma.user.update({
      where: { username: req.user },
      data: { ...updatedPerson },
    });

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
