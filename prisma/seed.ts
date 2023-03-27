import {
  insertUserRow,
  insertPolicyRow,
  insertVehicleRow,
  insertReportRow,
  addWitnessToReport,
  addPoliceInvestigation,
} from './prismaFunction';
import { PrismaClient, personInjured, PropertyDamage } from '@prisma/client';

export const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany().catch(() => {});
  await prisma.insurancePolicy.deleteMany().catch(() => {});
  await prisma.policyClient.deleteMany().catch(() => {});
  await prisma.vehicleInformation.deleteMany().catch(() => {});
  await prisma.vehiclePolicy.deleteMany().catch(() => {});

  await prisma.report.deleteMany().catch(() => {});
  await prisma.reportInsurance.deleteMany().catch(() => {});
  await prisma.reportPersonalInfo.deleteMany().catch(() => {});
  await prisma.vehicleWitness.deleteMany().catch(() => {});
  await prisma.reportVehicleInfo.deleteMany().catch(() => {});

  await insertUserRow(
    'user1',
    'John Smith',
    'js@gmail.com',
    new Date('2000-04-23'),
    10,
    '221 Victoria',
    'Toronto',
    'ON',
    'CA',
    'J1D 0I3',
    '121-315-6625',
    'F2548956525',
    '58 York',
    'Toronto',
    'ON',
    'CA',
    'H2E 1G4',
    'lost of hearing on left side'
  );

  // get the id for inserting other things in relation to this
  const policyId = await insertPolicyRow(
    'Sunlife Inc.',
    'John Smith',
    'Alice Reiner',
    '221 Victoria',
    'Toronto',
    'ON',
    'CA',
    'J1D 0I3',
    '465461656',
    'user1',
    '58 York',
    'Toronto',
    'ON',
    'CA',
    'H2E 1G4'
  );

  await insertVehicleRow(
    'DHHE-875',
    'John Smith',
    'John Smith',
    '221 Victoria',
    'Toronto',
    'ON',
    'CA',
    'J1D 0I3',
    '221 Victoria',
    'Toronto',
    'ON',
    'CA',
    'J1D 0I3',
    'ON',
    'HONDA',
    2015,
    'Starlight',
    'Personal',
    '8G5HJUS68J5260025',
    'John Smith',
    '465461656'
  );

  // id and reportId are -1 since we won't use them
  const injuredPerson: personInjured[] = [
    {
      id: -1,
      name: 'Alice Smith',
      phone: '459-865-4256',
      street: '221 Victoria Rd.',
      city: 'Toronto',
      country: 'CA',
      province: 'ON',
      postalCode: 'J1D 0I3',
      hospital: "St. Henry Children's Hopsital",
      natureOfInjuries: 'Broken right arm',
      reportId: -1,
    },
  ];
  const damage: PropertyDamage[] = [
    {
      id: -1,
      nameOwner: 'Eric Wong',
      phoneOwner: '526-859-5255',
      ownerStreet: '25 Warrent St.',
      ownerCity: 'Toronto',
      ownerCountry: 'CA',
      ownerProvince: 'ON',
      ownerPostalCode: 'H1N8I6',
      licenseNumberOwner: 'UCCR-257',
      ownerProvIssue: 'ON',
      yearOfVehicle: 2013,
      nameInsurer: 'West Sun Foundation',
      policyNumber: '125486595',
      nameDriver: 'Eric Wong',
      phoneDriver: '526-859-5255',
      driverStreet: 'Warrent St.',
      driverCity: 'Toronto',
      driverCountry: 'CA',
      driverProvince: 'ON',
      driverPostalCode: 'H1N8I6',
      driverLicenseNumber: 'UCCR-257',
      driverProvIssue: 'ON',
      reportId: -1,
    },
  ];

  const reportId = await insertReportRow(
    new Date('2000-04-23'),
    `dark`,
    'Pretty slippery and icy',
    'Light snowing',
    'Steeles and Finch Ave',
    'The other car T-boned my car while it drove through a red light.',
    'I had two children in the car. This is outrageous!',
    60,
    'South',
    'Personal',
    `major`,
    policyId,
    'user1',
    'DHHE-875',
    '$4000 cost to replace right doors',
    injuredPerson,
    undefined,
    damage
  );

  await addWitnessToReport(
    reportId,
    'Amber Ellis',
    '458-562-5897',
    '223 Donda St.',
    'Toronto',
    'CA',
    'ON',
    'X2A 5U9',
    'DHHE-875'
  );

  await addPoliceInvestigation(reportId, '12565');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
