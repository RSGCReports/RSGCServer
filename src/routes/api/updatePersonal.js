const { updateUserRow } = require('../../../prisma/prismaFunction');
const logger = require('../../logger');

module.exports = async (req, res) => {
  // console.log(req.body);

  try {
    const person = req.body;

    const updatedPerson = {
      ...{ username: req.user },
      ...{ fullname: person.fullname },
      ...{ email: person.email },
      ...(person.dob && { dob: person.dob }),
      ...(person.disabilities && { disabilities: person.disabilities }),
      ...(person.yearsDriving && { yearsDriving: person.yearsDriving }),
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
    await updateUserRow(
      req.user,
      person.fullname,
      person.email,
      new Date(person.dob),
      person.disabilities,
      parseInt(person.yearsDriving),
      person.homeStreet,
      person.homeCity,
      person.homeProvince,
      person.homeCountry,
      person.homePostalCode,
      person.businessStreet,
      person.businessCity,
      person.businessProvince,
      person.businessCountry,
      person.businessPostalCode,
      person.phoneNumber,
      person.driverLicense
    );
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ status: 'bad request' });
  }
};
