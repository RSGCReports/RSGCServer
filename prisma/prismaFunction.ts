import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertUserRow(
  username: number,
  fullname: string,
  email: string,
  dob: Date,
  disabilities: string,
  yearsDriving: Date,
  homeAddress: string,
  businessAddress: string,
  phoneNumber: string
) {
  await prisma.user.create({
    data: {
      username: username,
      fullname: fullname,
      email: email,
      dob: dob,
      disabilities: disabilities,
      yearsDriving: yearsDriving,
      homeAddress: homeAddress,
      businessAddress: businessAddress,
      phoneNumber: phoneNumber,
    },
  });

  console.log(fullname, 'is added to the user table.');
}

/** Add these after a fucntion when you wish to disconnect from databse, including when errors occur
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
*/

module.exports = insertUserRow;
