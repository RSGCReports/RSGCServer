import { InsurancePolicy, PrismaClient, User, VehicleInformation } from '@prisma/client';

const prisma = new PrismaClient();

// ====CRUD for User====
export async function insertUserRow(
  username: User['username'],
  fullname: User['fullname'],
  email: User['email'],
  dob: User['dob'],
  disabilities: User['disabilities'],
  yearsDriving: User['yearsDriving'],
  homeAddress: User['homeAddress'],
  businessAddress: User['businessAddress'],
  phoneNumber: User['phoneNumber'],
  driverLicense: User['driverLicense']
) {
  await prisma.user.create({
    data: {
      username,
      fullname,
      email,
      dob,
      disabilities,
      yearsDriving,
      homeAddress,
      businessAddress,
      phoneNumber,
      driverLicense,
    },
  });

  console.log(fullname, 'is added to the user table.');
}

export async function getUserByUsername(username: User['username']) {
  return prisma.user.findUnique({ where: { username } });
}

export async function updateUserRow(
  username: User['username'],
  fullname: User['fullname'],
  email: User['email'],
  dob: User['dob'],
  disabilities: User['disabilities'],
  yearsDriving: User['yearsDriving'],
  homeAddress: User['homeAddress'],
  businessAddress: User['businessAddress'],
  phoneNumber: User['phoneNumber'],
  driverLicense: User['driverLicense']
) {
  await prisma.user.update({
    where: { username },
    data: {
      username,
      fullname,
      email,
      dob,
      disabilities,
      yearsDriving,
      homeAddress,
      businessAddress,
      phoneNumber,
      driverLicense,
    },
  });

  console.log(fullname, 'is updated in the user table.');
}

export async function deleteUserByUsername(username: User['username']) {
  return prisma.user.delete({ where: { username } });
}

// ====CRUD for Policy====
export async function insertPolicyRow(
  insurer: InsurancePolicy['insurer'],
  insurerName: InsurancePolicy['insurerName'],
  Agent: InsurancePolicy['Agent'],
  homeStreet: InsurancePolicy['homeStreet'],
  homeCity: InsurancePolicy['homeCity'],
  homeCountry: InsurancePolicy['homeCountry'],
  homeProvince: InsurancePolicy['homeProvince'],
  homePostalCode: InsurancePolicy['hhomePostalCode'],
  businessStreet: InsurancePolicy['businessStreet'],
  businessCity: InsurancePolicy['businessCity'],
  businessCountry: InsurancePolicy['businessCountry'],
  businessProvince: InsurancePolicy['businessProvince'],
  businessPostalCode: InsurancePolicy['businessPostalCode'],
  policyNumber: InsurancePolicy['policyNumber'],
  username: User['username']
) {
  await prisma.insurancePolicy.create({
    data: {
      insurer,
      insurerName,
      Agent,
      homeStreet,
      homeCity,
      homeCountry,
      homeProvince,
      homePostalCode,
      businessStreet,
      businessCity,
      businessCountry,
      businessProvince,
      businessPostalCode,
      policyNumber,
      PolicyClient: {
        create: { username },
      },
    },
  });

  console.log(policyNumber, 'is added to the InsurancePolicy table.');
}

export async function getPolicyByUsernameAndPolicyNumber(
  insurerName: InsurancePolicy['insurerName'],
  policyNumber: InsurancePolicy['policyNumber']
) {
  return prisma.insurancePolicy.findFirst({
    where: { AND: [{ insurerName }, { policyNumber }] },
  });
}

export async function updatePolicyRow(
  insurer: InsurancePolicy['insurer'],
  insurerName: InsurancePolicy['insurerName'],
  Agent: InsurancePolicy['Agent'],
  homeStreet: InsurancePolicy['homeStreet'],
  homeCity: InsurancePolicy['homeCity'],
  homeCountry: InsurancePolicy['homeCountry'],
  homeProvince: InsurancePolicy['homeProvince'],
  homePostalCode: InsurancePolicy['hhomePostalCode'],
  businessStreet: InsurancePolicy['businessStreet'],
  businessCity: InsurancePolicy['businessCity'],
  businessCountry: InsurancePolicy['businessCountry'],
  businessProvince: InsurancePolicy['businessProvince'],
  businessPostalCode: InsurancePolicy['businessPostalCode'],
  policyNumber: InsurancePolicy['policyNumber']
) {
  // Get policy id
  let policyId = 0;
  getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then((insurancePolicy) => {
    if (insurancePolicy) {
      policyId = insurancePolicy.policyId;
    }
  });

  // Do the update
  await prisma.insurancePolicy.update({
    where: { policyId },
    data: {
      insurer,
      insurerName,
      Agent,
      homeStreet,
      homeCity,
      homeCountry,
      homeProvince,
      homePostalCode,
      businessStreet,
      businessCity,
      businessCountry,
      businessProvince,
      businessPostalCode,
      policyNumber,
    },
  });

  console.log(policyNumber, 'is updated in the InsurancePolicy table.');
}

export async function deletePolicyByUsername(
  insurerName: InsurancePolicy['insurerName'],
  policyNumber: InsurancePolicy['policyNumber']
) {
  // Get policy id
  let policyId = 0;
  getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then((insurancePolicy) => {
    if (insurancePolicy) {
      policyId = insurancePolicy.policyId;
    }
  });

  // Do the update
  return prisma.insurancePolicy.delete({ where: { policyId } });
}

// ====CRUD for VehicleInformation====
export async function insertVehicleRow(
  licensePlateNo: VehicleInformation['licensePlateNo'],
  registeredOwner: VehicleInformation['registeredOwner'],
  actualOwner: VehicleInformation['actualOwner'],
  addressRegisteredOwner: VehicleInformation['addressRegisteredOwner'],
  addressActualOwner: VehicleInformation['addressActualOwner'],
  province: VehicleInformation['province'],
  make: VehicleInformation['make'],
  year: VehicleInformation['year'],
  model: VehicleInformation['model'],
  type: VehicleInformation['type'],
  VIN: VehicleInformation['VIN'],
  insurerName: InsurancePolicy['insurerName'],
  policyNumber: InsurancePolicy['policyNumber']
) {
  await prisma.vehicleInformation.create({
    data: {
      licensePlateNo,
      registeredOwner,
      actualOwner,
      addressRegisteredOwner,
      addressActualOwner,
      province,
      make,
      year,
      model,
      type,
      VIN,
    },
  });

  let policyId = 0;
  getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then((insurancePolicy) => {
    if (insurancePolicy) {
      policyId = insurancePolicy.policyId;
    }
  });

  await prisma.vehiclePolicy.create({
    data: {
      policyId,
      licensePlateNo,
    },
  });

  console.log(licensePlateNo, 'is added to the VehicleInformation table.');
}

export async function getVehicleBylicensePlateNo(
  licensePlateNo: VehicleInformation['licensePlateNo']
) {
  return prisma.vehicleInformation.findUnique({
    where: { licensePlateNo },
  });
}

export async function updateVehicleRow(
  licensePlateNo: VehicleInformation['licensePlateNo'],
  registeredOwner: VehicleInformation['registeredOwner'],
  actualOwner: VehicleInformation['actualOwner'],
  addressRegisteredOwner: VehicleInformation['addressRegisteredOwner'],
  addressActualOwner: VehicleInformation['addressActualOwner'],
  province: VehicleInformation['province'],
  make: VehicleInformation['make'],
  year: VehicleInformation['year'],
  model: VehicleInformation['model'],
  type: VehicleInformation['type'],
  VIN: VehicleInformation['VIN']
) {
  // Do the update
  await prisma.vehicleInformation.update({
    where: { licensePlateNo },
    data: {
      licensePlateNo,
      registeredOwner,
      actualOwner,
      addressRegisteredOwner,
      addressActualOwner,
      province,
      make,
      year,
      model,
      type,
      VIN,
    },
  });

  console.log(licensePlateNo, 'is updated in the VehicleInformation table.');
}

export async function deleteVehicleBylicensePlateNo(
  licensePlateNo: VehicleInformation['licensePlateNo']
) {
  return prisma.vehicleInformation.delete({
    where: { licensePlateNo },
  });
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
