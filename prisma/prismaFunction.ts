import { InsurancePolicy, PrismaClient, User, VehicleInformation } from '@prisma/client';

const prisma = new PrismaClient();

// ====CRUD for User====
export async function insertUserRow(
  username: User['username'],
  fullname: User['fullname'],
  email: User['email'],
  dob: User['dob'],
  yearsDriving: User['yearsDriving'],
  homeStreet: User['homeStreet'],
  homeCity: User['homeCity'],
  homeProvince: User['homeProvince'],
  homeCountry: User['homeCountry'],
  homePostalCode: User['homePostalCode'],
  phoneNumber: User['phoneNumber'],
  driverLicense: User['driverLicense'],
  businessStreet?: User['businessStreet'],
  businessCity?: User['businessCity'],
  businessProvince?: User['businessProvince'],
  businessCountry?: User['businessCountry'],
  businessPostalCode?: User['businessPostalCode'],
  disabilities?: User['disabilities']
) {
  await prisma.user.create({
    data: {
      username,
      fullname,
      email,
      dob,
      disabilities,
      yearsDriving,
      homeStreet,
      homeCity,
      homeProvince,
      homeCountry,
      homePostalCode,
      businessStreet,
      businessCity,
      businessProvince,
      businessCountry,
      businessPostalCode,
      phoneNumber,
      driverLicense,
    },
  });

  console.log(fullname, 'is added to the user table.');
}

export async function getUserByUsername(username: User['username']) {
  return await prisma.user.findUnique({ where: { username } });
}

export async function updateUserRow(
  username: User['username'],
  fullname?: User['fullname'],
  email?: User['email'],
  dob?: User['dob'],
  disabilities?: User['disabilities'],
  yearsDriving?: User['yearsDriving'],
  homeStreet?: User['homeStreet'],
  homeCity?: User['homeCity'],
  homeProvince?: User['homeProvince'],
  homeCountry?: User['homeCountry'],
  homePostalCode?: User['homePostalCode'],
  businessStreet?: User['businessStreet'],
  businessCity?: User['businessCity'],
  businessProvince?: User['businessProvince'],
  businessCountry?: User['businessCountry'],
  businessPostalCode?: User['businessPostalCode'],

  phoneNumber?: User['phoneNumber'],
  driverLicense?: User['driverLicense']
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
      homeStreet,
      homeCity,
      homeProvince,
      homeCountry,
      homePostalCode,
      businessStreet,
      businessCity,
      businessProvince,
      businessCountry,
      businessPostalCode,
      phoneNumber,
      driverLicense,
    },
  });

  console.log(fullname, 'is updated in the user table.');
}

export async function deleteUserByUsername(username: User['username']) {
  return await prisma.user.delete({ where: { username } });
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
  homePostalCode: InsurancePolicy['homePostalCode'],
  policyNumber: InsurancePolicy['policyNumber'],
  username: User['username'],
  businessStreet?: InsurancePolicy['businessStreet'],
  businessCity?: InsurancePolicy['businessCity'],
  businessCountry?: InsurancePolicy['businessCountry'],
  businessProvince?: InsurancePolicy['businessProvince'],
  businessPostalCode?: InsurancePolicy['businessPostalCode']
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
  return await prisma.insurancePolicy.findFirst({
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
  homePostalCode: InsurancePolicy['homePostalCode'],
  policyNumber: InsurancePolicy['policyNumber'],
  businessStreet?: InsurancePolicy['businessStreet'],
  businessCity?: InsurancePolicy['businessCity'],
  businessCountry?: InsurancePolicy['businessCountry'],
  businessProvince?: InsurancePolicy['businessProvince'],
  businessPostalCode?: InsurancePolicy['businessPostalCode']
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
  return await prisma.insurancePolicy.delete({ where: { policyId } });
}

// ====CRUD for VehicleInformation====
export async function insertVehicleRow(
  licensePlateNo: VehicleInformation['licensePlateNo'],
  registeredOwner: VehicleInformation['registeredOwner'],
  actualOwner: VehicleInformation['actualOwner'],
  registeredOwnerStreet: VehicleInformation['registeredOwnerStreet'],
  registeredOwnerCity: VehicleInformation['registeredOwnerCity'],
  registeredOwnerCountry: VehicleInformation['registeredOwnerCountry'],
  registeredOwnerProvince: VehicleInformation['registeredOwnerProvince'],
  registeredOwnerPostalCode: VehicleInformation['registeredOwnerPostalCode'],
  actualOwnerStreet: VehicleInformation['actualOwnerStreet'],
  actualOwnerCity: VehicleInformation['actualOwnerCity'],
  actualOwnerCountry: VehicleInformation['actualOwnerCountry'],
  actualOwnerProvince: VehicleInformation['actualOwnerProvince'],
  actualOwnerPostalCode: VehicleInformation['actualOwnerPostalCode'],
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
      registeredOwnerStreet,
      registeredOwnerCity,
      registeredOwnerCountry,
      registeredOwnerProvince,
      registeredOwnerPostalCode,
      actualOwnerStreet,
      actualOwnerCity,
      actualOwnerCountry,
      actualOwnerProvince,
      actualOwnerPostalCode,
      province,
      make,
      year,
      model,
      type,
      VIN,
    },
  });

  let policyId = 0;
  await getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then((insurancePolicy) => {
    //console.log(insurancePolicy, 'is insurancePolicy'); //<==TODO 0
    if (insurancePolicy !== null) {
      policyId = insurancePolicy.policyId;
      //console.log(policyId, ' is policyId'); //<==TODO  null
      //console.log(insurancePolicy.policyId, ' is insurancePolicy.policyId'); //<==TODO PrismaClientKnownRequestError:
    }
  });
  //console.log(policyId, 'is policyId agian'); //<==TODO 0
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
  return await prisma.vehicleInformation.findUnique({
    where: { licensePlateNo },
  });
}

export async function updateVehicleRow(
  licensePlateNo: VehicleInformation['licensePlateNo'],
  registeredOwner?: VehicleInformation['registeredOwner'],
  actualOwner?: VehicleInformation['actualOwner'],
  registeredOwnerStreet?: VehicleInformation['registeredOwnerStreet'],
  registeredOwnerCity?: VehicleInformation['registeredOwnerCity'],
  registeredOwnerCountry?: VehicleInformation['registeredOwnerCountry'],
  registeredOwnerProvince?: VehicleInformation['registeredOwnerProvince'],
  registeredOwnerPostalCode?: VehicleInformation['registeredOwnerPostalCode'],
  actualOwnerStreet?: VehicleInformation['actualOwnerStreet'],
  actualOwnerCity?: VehicleInformation['actualOwnerCity'],
  actualOwnerCountry?: VehicleInformation['actualOwnerCountry'],
  actualOwnerProvince?: VehicleInformation['actualOwnerProvince'],
  actualOwnerPostalCode?: VehicleInformation['actualOwnerPostalCode'],
  province?: VehicleInformation['province'],
  make?: VehicleInformation['make'],
  year?: VehicleInformation['year'],
  model?: VehicleInformation['model'],
  type?: VehicleInformation['type'],
  VIN?: VehicleInformation['VIN']
) {
  // Do the update
  await prisma.vehicleInformation.update({
    where: { licensePlateNo },
    data: {
      licensePlateNo,
      registeredOwner,
      actualOwner,
      registeredOwnerStreet,
      registeredOwnerCity,
      registeredOwnerCountry,
      registeredOwnerProvince,
      registeredOwnerPostalCode,
      actualOwnerStreet,
      actualOwnerCity,
      actualOwnerCountry,
      actualOwnerProvince,
      actualOwnerPostalCode,
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
  return await prisma.vehicleInformation.delete({
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
