import {
  Evidence,
  InsurancePolicy,
  personInjured,
  PrismaClient,
  Report,
  User,
  VehicleInformation,
  Witness,
  PoliceInvestigation,
  ReportPersonalInfo,
  PropertyDamage,
} from '@prisma/client';

export const prisma = new PrismaClient();

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
  const { policyId } = await prisma.insurancePolicy.create({
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
  return policyId;
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
  insurerName: InsurancePolicy['insurerName'],
  policyNumber: InsurancePolicy['policyNumber'],
  Agent?: InsurancePolicy['Agent'],
  homeStreet?: InsurancePolicy['homeStreet'],
  homeCity?: InsurancePolicy['homeCity'],
  homeCountry?: InsurancePolicy['homeCountry'],
  homeProvince?: InsurancePolicy['homeProvince'],
  homePostalCode?: InsurancePolicy['homePostalCode'],
  insurer?: InsurancePolicy['insurer'],
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

  let policyId = -1;
  await getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then((insurancePolicy) => {
    console.log(insurerName, policyNumber);
    if (insurancePolicy !== null) {
      policyId = insurancePolicy['policyId'];
      console.log(policyId, ' is policyId');
    }
  });
  if (policyId == -1) {
    console.log(
      licensePlateNo,
      'does not have a VehiclePolicy bridge table due to getPolicyByUsernameAndPolicyNumber not finding a row.'
    );
  } else {
    await prisma.vehiclePolicy.create({
      data: {
        policyId,
        licensePlateNo,
      },
    });
  }

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

// ====CRUD for report====
/* This accepts attributes of report, including:
   - policyId for InsurancePolicy
   - username of the user
   - licensePlateNo of the user
   - an array of PersonInjured
   - an array of Evidence
   - an array of PropertyDamage

Witness and Police policy are not covered.

This returns the id of the report.*/
export async function insertReportRow(
  dayTime: Report['dayTime'],
  dayLight: Report['dayLight'],
  roadCondition: Report['roadCondition'],
  weatherCondition: Report['weatherCondition'],
  location: Report['location'],
  accidentDescription: Report['accidentDescription'],
  comment: Report['comment'],
  speed: Report['speed'],
  direction: Report['direction'],
  purposeForUsage: Report['purposeForUsage'],
  EstimateOfDamage: Report['EstimateOfDamage'],
  policyId: InsurancePolicy['policyId'],
  username: User['username'],
  licensePlateNo: VehicleInformation['licensePlateNo'],
  damageDescription?: Report['damageDescription'],
  PersonInjured?: personInjured[],
  Evidence?: Evidence[],
  PropertyDamage?: PropertyDamage[],
  Witnesses?: Witness[]
) {
  const { reportId } = await prisma.report.create({
    data: {
      dayTime,
      dayLight,
      roadCondition,
      weatherCondition,
      location,
      accidentDescription,
      comment,
      speed,
      direction,
      purposeForUsage,
      damageDescription,
      EstimateOfDamage,
      Insurance: { create: [{ policyId }] },
      PersonalInfo: { create: [{ username }] },
      VehicleInfo: { create: [{ licensePlateNo }] },
    },
  });

  if (PersonInjured && PersonInjured.length > 0) {
    PersonInjured.forEach(async (element: personInjured) => {
      await prisma.personInjured.create({
        data: {
          name: element.name,
          phone: element.phone,
          street: element.street,
          city: element.city,
          country: element.country,
          province: element.province,
          postalCode: element.postalCode,
          hospital: element.hospital,
          natureOfInjuries: element.natureOfInjuries,
          reportId,
        },
      });
    });
  }

  if (PropertyDamage && PropertyDamage.length > 0) {
    PropertyDamage.forEach(async (element: PropertyDamage) => {
      await prisma.propertyDamage.create({
        data: {
          nameOwner: element.nameOwner,
          phoneOwner: element.phoneOwner,
          ownerStreet: element.ownerStreet,
          ownerCity: element.ownerCity,
          ownerCountry: element.ownerCountry,
          ownerProvince: element.ownerProvince,
          ownerPostalCode: element.ownerPostalCode,
          licenseNumberOwner: element.licenseNumberOwner,
          ownerProvIssue: element.ownerProvIssue,
          yearOfVehicle: element.yearOfVehicle,
          nameInsurer: element.nameInsurer,
          policyNumber: element.policyNumber,
          nameDriver: element.nameDriver,
          phoneDriver: element.phoneDriver,
          driverStreet: element.driverStreet,
          driverCity: element.driverCity,
          driverCountry: element.driverCountry,
          driverProvince: element.driverProvince,
          driverPostalCode: element.driverPostalCode,
          driverLicenseNumber: element.driverLicenseNumber,
          driverProvIssue: element.driverProvIssue,
          reportId,
        },
      });
    });

    if (Witnesses && Witnesses.length > 0) {
      Witnesses.forEach(async (element: Witness) => {
        await prisma.witness.create({
          data: {
            name: element.name,
            phone: element.phone,
            street: element.street,
            city: element.city,
            country: element.country,
            province: element.province,
            postalCode: element.postalCode,
            reportId,
          },
        });
      });
    }
  }

  if (Evidence && Evidence.length > 0) {
    Evidence.forEach(async (element: Evidence) => {
      await prisma.evidence.create({
        data: {
          name: element.name,
          size: element.size,
          contentType: element.contentType,
          data: element.data,
          reportId,
        },
      });
    });
  }

  console.log(reportId, 'is added to the Report table.');

  return reportId;
}

/* This will take any info to update report by report id. Undefined arguments will be left alone.
 Wtiness and police report update are not covered by this. User prisma.witness.update() and prisma.policeInvestigation.update() instead.*/
export async function updateReportById(
  reportId: Report['reportId'],
  dayTime?: Report['dayTime'],
  dayLight?: Report['dayLight'],
  roadCondition?: Report['roadCondition'],
  weatherCondition?: Report['weatherCondition'],
  location?: Report['location'],
  accidentDescription?: Report['accidentDescription'],
  comment?: Report['comment'],
  flag?: Report['flag'],
  adminComments?: Report['adminComments'],
  speed?: Report['speed'],
  direction?: Report['direction'],
  purposeForUsage?: Report['purposeForUsage'],
  EstimateOfDamage?: Report['EstimateOfDamage'],
  AdminId?: Report['AdminId'],
  policyId?: InsurancePolicy['policyId'],
  username?: User['username'],
  licensePlateNo?: VehicleInformation['licensePlateNo'],
  damageDescription?: Report['damageDescription'],
  PersonInjured?: personInjured[],
  Evidence?: Evidence[],
  PropertyDamage?: PropertyDamage[]
) {
  await prisma.report.update({
    where: { reportId },
    data: {
      dayTime,
      dayLight,
      roadCondition,
      weatherCondition,
      location,
      accidentDescription,
      comment,
      flag,
      adminComments,
      speed,
      direction,
      purposeForUsage,
      damageDescription,
      EstimateOfDamage,
      AdminId,
      Insurance: { updateMany: { where: {}, data: { policyId } } },
      PersonalInfo: { updateMany: { where: {}, data: { username } } },
      VehicleInfo: { updateMany: { where: {}, data: { licensePlateNo } } },
    },
  });

  if (PersonInjured && PersonInjured.length > 0) {
    PersonInjured.forEach(async (element: personInjured) => {
      await prisma.personInjured.update({
        where: { id: element.id },
        data: {
          name: element.name,
          phone: element.phone,
          street: element.street,
          city: element.city,
          country: element.country,
          province: element.province,
          postalCode: element.postalCode,
          hospital: element.hospital,
          natureOfInjuries: element.natureOfInjuries,
        },
      });
    });
  }

  if (PropertyDamage && PropertyDamage.length > 0) {
    PropertyDamage.forEach(async (element: PropertyDamage) => {
      await prisma.propertyDamage.update({
        where: { id: element.id },
        data: {
          nameOwner: element.nameOwner,
          phoneOwner: element.phoneOwner,
          ownerStreet: element.ownerStreet,
          ownerCity: element.ownerCity,
          ownerCountry: element.ownerCountry,
          ownerProvince: element.ownerProvince,
          ownerPostalCode: element.ownerPostalCode,
          licenseNumberOwner: element.licenseNumberOwner,
          ownerProvIssue: element.ownerProvIssue,
          yearOfVehicle: element.yearOfVehicle,
          nameInsurer: element.nameInsurer,
          policyNumber: element.policyNumber,
          nameDriver: element.nameDriver,
          phoneDriver: element.phoneDriver,
          driverStreet: element.driverStreet,
          driverCity: element.driverCity,
          driverCountry: element.driverCountry,
          driverProvince: element.driverProvince,
          driverPostalCode: element.driverPostalCode,
          driverLicenseNumber: element.driverLicenseNumber,
          driverProvIssue: element.driverProvIssue,
        },
      });
    });
  }

  if (Evidence && Evidence.length > 0) {
    Evidence.forEach(async (element: Evidence) => {
      await prisma.evidence.update({
        where: { id: element.id },
        data: {
          name: element.name,
          size: element.size,
          contentType: element.contentType,
          data: element.data,
        },
      });
    });
  }

  console.log(reportId, 'is edited in the Report table.');
}

// This finds all the reportId by username, and then it uses the ids to find and push all the reports to return the result/reports
export async function getReportsByUsername(username: User['username']) {
  let reportIds: ReportPersonalInfo[] = [];
  await prisma.reportPersonalInfo.findMany({ where: { username } }).then((reportPersonalInfos) => {
    reportIds = reportPersonalInfos;
  });

  let reports: Report[] = [];
  if (reportIds && reportIds.length > 0) {
    for (let i = 0; i < reportIds.length; i++) {
      const report = await prisma.report.findUnique({
        where: { reportId: reportIds[i].reportId },
        include: {
          PersonInjured: true,
          PoliceInvestigation: true,
          Witness: true,
          Evidence: true,
          Insurance: true,
          PersonalInfo: true,
          VehicleInfo: true,
          PropertyDamage: true,
        },
      });

      if (report) {
        reports.push(report);
      }
    }
  }

  return reports;
}

export async function deleteReportById(reportId: Report['reportId']) {
  return await prisma.report.delete({
    where: { reportId },
  });
}

// This accepts report id, attributes of Witness, and a VehicleWitness to add the car they were on.
// This returns the id of the witness.
export async function addWitnessToReport(
  reportId: Report['reportId'],
  name: Witness['name'],
  phone: Witness['phone'],
  street: Witness['street'],
  city: Witness['city'],
  country: Witness['country'],
  province: Witness['province'],
  postalCode: Witness['postalCode'],
  whichCar?: VehicleInformation['licensePlateNo']
) {
  const { id } = await prisma.witness.create({
    data: {
      name,
      phone,
      street,
      city,
      country,
      province,
      postalCode,
      reportId,
    },
  });

  if (whichCar) {
    await prisma.vehicleWitness.create({
      data: {
        witnessId: id,
        licensePlateNo: whichCar,
      },
    });
  }

  return id;
}

// This accepts report id, and attributes of PoliceInvestigation.
// This returns the id of the investigation.
export async function addPoliceInvestigation(
  reportId: Report['reportId'],
  policeReportNo: PoliceInvestigation['policeReportNo']
) {
  return await prisma.policeInvestigation.create({
    data: {
      reportId,
      policeReportNo,
    },
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
