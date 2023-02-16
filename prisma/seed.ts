import {
  insertUserRow,
  insertPolicyRow,
  insertVehicleRow,
  deleteUserByUsername,
} from './prismaFunction';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  //await deleteUserByUsername('user1'); //<==TODO
  //await prisma.user.deleteMany({ where: { username: 'user1' } }); //<==TODO

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
    465461656,
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
    'Sunlife Inc.',
    4654616564
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
