import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.testTable1.create({
    data: {
      phoneNum: 125,
      address: 'nowhere',
      orderNum: 999,
    },
  });

  const ans = await prisma.testTable1.findMany();
  console.log(ans);
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
