import { insertUserRow, insertPolicyRow, insertVehicleRow } from './prismaFunction';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  await insertPolicyRow(
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
