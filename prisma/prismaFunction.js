"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.addPoliceInvestigation = exports.addWitnessToReport = exports.deleteReportById = exports.getReportsByUsername = exports.updateReportById = exports.insertReportRow = exports.deleteVehicleBylicensePlateNo = exports.updateVehicleRow = exports.getVehicleBylicensePlateNo = exports.insertVehicleRow = exports.deletePolicyByUsername = exports.updatePolicyRow = exports.getPolicyByUsernameAndPolicyNumber = exports.insertPolicyRow = exports.deleteUserByUsername = exports.updateUserRow = exports.getUserByUsername = exports.insertUserRow = exports.prisma = void 0;
var client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
// ====CRUD for User====
function insertUserRow(username, fullname, email, dob, yearsDriving, homeStreet, homeCity, homeProvince, homeCountry, homePostalCode, phoneNumber, driverLicense, businessStreet, businessCity, businessProvince, businessCountry, businessPostalCode, disabilities) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.user.create({
                        data: {
                            username: username,
                            fullname: fullname,
                            email: email,
                            dob: dob,
                            disabilities: disabilities,
                            yearsDriving: yearsDriving,
                            homeStreet: homeStreet,
                            homeCity: homeCity,
                            homeProvince: homeProvince,
                            homeCountry: homeCountry,
                            homePostalCode: homePostalCode,
                            businessStreet: businessStreet,
                            businessCity: businessCity,
                            businessProvince: businessProvince,
                            businessCountry: businessCountry,
                            businessPostalCode: businessPostalCode,
                            phoneNumber: phoneNumber,
                            driverLicense: driverLicense
                        }
                    })];
                case 1:
                    _a.sent();
                    console.log(fullname, 'is added to the user table.');
                    return [2 /*return*/];
            }
        });
    });
}
exports.insertUserRow = insertUserRow;
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.user.findUnique({ where: { username: username } })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUserByUsername = getUserByUsername;
function updateUserRow(username, fullname, email, dob, disabilities, yearsDriving, homeStreet, homeCity, homeProvince, homeCountry, homePostalCode, businessStreet, businessCity, businessProvince, businessCountry, businessPostalCode, phoneNumber, driverLicense) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.user.update({
                        where: { username: username },
                        data: {
                            username: username,
                            fullname: fullname,
                            email: email,
                            dob: dob,
                            disabilities: disabilities,
                            yearsDriving: yearsDriving,
                            homeStreet: homeStreet,
                            homeCity: homeCity,
                            homeProvince: homeProvince,
                            homeCountry: homeCountry,
                            homePostalCode: homePostalCode,
                            businessStreet: businessStreet,
                            businessCity: businessCity,
                            businessProvince: businessProvince,
                            businessCountry: businessCountry,
                            businessPostalCode: businessPostalCode,
                            phoneNumber: phoneNumber,
                            driverLicense: driverLicense
                        }
                    })];
                case 1:
                    _a.sent();
                    console.log(fullname, 'is updated in the user table.');
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateUserRow = updateUserRow;
function deleteUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.user["delete"]({ where: { username: username } })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteUserByUsername = deleteUserByUsername;
// ====CRUD for Policy====
function insertPolicyRow(insurer, insurerName, Agent, homeStreet, homeCity, homeCountry, homeProvince, homePostalCode, policyNumber, username, businessStreet, businessCity, businessCountry, businessProvince, businessPostalCode) {
    return __awaiter(this, void 0, void 0, function () {
        var policyId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.insurancePolicy.create({
                        data: {
                            insurer: insurer,
                            insurerName: insurerName,
                            Agent: Agent,
                            homeStreet: homeStreet,
                            homeCity: homeCity,
                            homeCountry: homeCountry,
                            homeProvince: homeProvince,
                            homePostalCode: homePostalCode,
                            businessStreet: businessStreet,
                            businessCity: businessCity,
                            businessCountry: businessCountry,
                            businessProvince: businessProvince,
                            businessPostalCode: businessPostalCode,
                            policyNumber: policyNumber,
                            PolicyClient: {
                                create: { username: username }
                            }
                        }
                    })];
                case 1:
                    policyId = (_a.sent()).policyId;
                    console.log(policyNumber, 'is added to the InsurancePolicy table.');
                    return [2 /*return*/, policyId];
            }
        });
    });
}
exports.insertPolicyRow = insertPolicyRow;
function getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.insurancePolicy.findFirst({
                        where: { AND: [{ insurerName: insurerName }, { policyNumber: policyNumber }] }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPolicyByUsernameAndPolicyNumber = getPolicyByUsernameAndPolicyNumber;
function updatePolicyRow(insurerName, policyNumber, Agent, homeStreet, homeCity, homeCountry, homeProvince, homePostalCode, insurer, businessStreet, businessCity, businessCountry, businessProvince, businessPostalCode) {
    return __awaiter(this, void 0, void 0, function () {
        var policyId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    policyId = 0;
                    getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then(function (insurancePolicy) {
                        if (insurancePolicy) {
                            policyId = insurancePolicy.policyId;
                        }
                    });
                    // Do the update
                    return [4 /*yield*/, exports.prisma.insurancePolicy.update({
                            where: { policyId: policyId },
                            data: {
                                insurer: insurer,
                                insurerName: insurerName,
                                Agent: Agent,
                                homeStreet: homeStreet,
                                homeCity: homeCity,
                                homeCountry: homeCountry,
                                homeProvince: homeProvince,
                                homePostalCode: homePostalCode,
                                businessStreet: businessStreet,
                                businessCity: businessCity,
                                businessCountry: businessCountry,
                                businessProvince: businessProvince,
                                businessPostalCode: businessPostalCode,
                                policyNumber: policyNumber
                            }
                        })];
                case 1:
                    // Do the update
                    _a.sent();
                    console.log(policyNumber, 'is updated in the InsurancePolicy table.');
                    return [2 /*return*/];
            }
        });
    });
}
exports.updatePolicyRow = updatePolicyRow;
function deletePolicyByUsername(insurerName, policyNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var policyId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    policyId = 0;
                    getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then(function (insurancePolicy) {
                        if (insurancePolicy) {
                            policyId = insurancePolicy.policyId;
                        }
                    });
                    return [4 /*yield*/, exports.prisma.insurancePolicy["delete"]({ where: { policyId: policyId } })];
                case 1: 
                // Do the update
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deletePolicyByUsername = deletePolicyByUsername;
// ====CRUD for VehicleInformation====
function insertVehicleRow(licensePlateNo, registeredOwner, actualOwner, registeredOwnerStreet, registeredOwnerCity, registeredOwnerCountry, registeredOwnerProvince, registeredOwnerPostalCode, actualOwnerStreet, actualOwnerCity, actualOwnerCountry, actualOwnerProvince, actualOwnerPostalCode, province, make, year, model, type, VIN, insurerName, policyNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var policyId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.vehicleInformation.create({
                        data: {
                            licensePlateNo: licensePlateNo,
                            registeredOwner: registeredOwner,
                            actualOwner: actualOwner,
                            registeredOwnerStreet: registeredOwnerStreet,
                            registeredOwnerCity: registeredOwnerCity,
                            registeredOwnerCountry: registeredOwnerCountry,
                            registeredOwnerProvince: registeredOwnerProvince,
                            registeredOwnerPostalCode: registeredOwnerPostalCode,
                            actualOwnerStreet: actualOwnerStreet,
                            actualOwnerCity: actualOwnerCity,
                            actualOwnerCountry: actualOwnerCountry,
                            actualOwnerProvince: actualOwnerProvince,
                            actualOwnerPostalCode: actualOwnerPostalCode,
                            province: province,
                            make: make,
                            year: year,
                            model: model,
                            type: type,
                            VIN: VIN
                        }
                    })];
                case 1:
                    _a.sent();
                    policyId = -1;
                    return [4 /*yield*/, getPolicyByUsernameAndPolicyNumber(insurerName, policyNumber).then(function (insurancePolicy) {
                            console.log(insurerName, policyNumber);
                            if (insurancePolicy !== null) {
                                policyId = insurancePolicy['policyId'];
                                console.log(policyId, ' is policyId');
                            }
                        })];
                case 2:
                    _a.sent();
                    if (!(policyId == -1)) return [3 /*break*/, 3];
                    console.log(licensePlateNo, 'does not have a VehiclePolicy bridge table due to getPolicyByUsernameAndPolicyNumber not finding a row.');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, exports.prisma.vehiclePolicy.create({
                        data: {
                            policyId: policyId,
                            licensePlateNo: licensePlateNo
                        }
                    })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    console.log(licensePlateNo, 'is added to the VehicleInformation table.');
                    return [2 /*return*/];
            }
        });
    });
}
exports.insertVehicleRow = insertVehicleRow;
function getVehicleBylicensePlateNo(licensePlateNo) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.vehicleInformation.findUnique({
                        where: { licensePlateNo: licensePlateNo }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getVehicleBylicensePlateNo = getVehicleBylicensePlateNo;
function updateVehicleRow(licensePlateNo, registeredOwner, actualOwner, registeredOwnerStreet, registeredOwnerCity, registeredOwnerCountry, registeredOwnerProvince, registeredOwnerPostalCode, actualOwnerStreet, actualOwnerCity, actualOwnerCountry, actualOwnerProvince, actualOwnerPostalCode, province, make, year, model, type, VIN) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Do the update
                return [4 /*yield*/, exports.prisma.vehicleInformation.update({
                        where: { licensePlateNo: licensePlateNo },
                        data: {
                            licensePlateNo: licensePlateNo,
                            registeredOwner: registeredOwner,
                            actualOwner: actualOwner,
                            registeredOwnerStreet: registeredOwnerStreet,
                            registeredOwnerCity: registeredOwnerCity,
                            registeredOwnerCountry: registeredOwnerCountry,
                            registeredOwnerProvince: registeredOwnerProvince,
                            registeredOwnerPostalCode: registeredOwnerPostalCode,
                            actualOwnerStreet: actualOwnerStreet,
                            actualOwnerCity: actualOwnerCity,
                            actualOwnerCountry: actualOwnerCountry,
                            actualOwnerProvince: actualOwnerProvince,
                            actualOwnerPostalCode: actualOwnerPostalCode,
                            province: province,
                            make: make,
                            year: year,
                            model: model,
                            type: type,
                            VIN: VIN
                        }
                    })];
                case 1:
                    // Do the update
                    _a.sent();
                    console.log(licensePlateNo, 'is updated in the VehicleInformation table.');
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateVehicleRow = updateVehicleRow;
function deleteVehicleBylicensePlateNo(licensePlateNo) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.vehicleInformation["delete"]({
                        where: { licensePlateNo: licensePlateNo }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteVehicleBylicensePlateNo = deleteVehicleBylicensePlateNo;
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
function insertReportRow(dayTime, dayLight, roadCondition, weatherCondition, location, accidentDescription, comment, speed, direction, purposeForUsage, EstimateOfDamage, policyId, username, licensePlateNo, damageDescription, PersonInjured, Evidence, PropertyDamage, Witnesses) {
    return __awaiter(this, void 0, void 0, function () {
        var reportId;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.report.create({
                        data: {
                            dayTime: dayTime,
                            dayLight: dayLight,
                            roadCondition: roadCondition,
                            weatherCondition: weatherCondition,
                            location: location,
                            accidentDescription: accidentDescription,
                            comment: comment,
                            speed: speed,
                            direction: direction,
                            purposeForUsage: purposeForUsage,
                            damageDescription: damageDescription,
                            EstimateOfDamage: EstimateOfDamage,
                            Insurance: { create: [{ policyId: policyId }] },
                            PersonalInfo: { create: [{ username: username }] },
                            VehicleInfo: { create: [{ licensePlateNo: licensePlateNo }] }
                        }
                    })];
                case 1:
                    reportId = (_a.sent()).reportId;
                    if (PersonInjured && PersonInjured.length > 0) {
                        PersonInjured.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.prisma.personInjured.create({
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
                                                reportId: reportId
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if (PropertyDamage && PropertyDamage.length > 0) {
                        PropertyDamage.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.prisma.propertyDamage.create({
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
                                                reportId: reportId
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (Witnesses && Witnesses.length > 0) {
                            Witnesses.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, exports.prisma.witness.create({
                                                data: {
                                                    name: element.name,
                                                    phone: element.phone,
                                                    street: element.street,
                                                    city: element.city,
                                                    country: element.country,
                                                    province: element.province,
                                                    postalCode: element.postalCode,
                                                    reportId: reportId
                                                }
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                    }
                    if (Evidence && Evidence.length > 0) {
                        Evidence.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.prisma.evidence.create({
                                            data: {
                                                name: element.name,
                                                size: element.size,
                                                contentType: element.contentType,
                                                data: element.data,
                                                reportId: reportId
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    console.log(reportId, 'is added to the Report table.');
                    return [2 /*return*/, reportId];
            }
        });
    });
}
exports.insertReportRow = insertReportRow;
/* This will take any info to update report by report id. Undefined arguments will be left alone.
 Wtiness and police report update are not covered by this. User prisma.witness.update() and prisma.policeInvestigation.update() instead.*/
function updateReportById(reportId, dayTime, dayLight, roadCondition, weatherCondition, location, accidentDescription, comment, flag, adminComments, speed, direction, purposeForUsage, EstimateOfDamage, AdminId, policyId, username, licensePlateNo, damageDescription, PersonInjured, Evidence, PropertyDamage) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.report.update({
                        where: { reportId: reportId },
                        data: {
                            dayTime: dayTime,
                            dayLight: dayLight,
                            roadCondition: roadCondition,
                            weatherCondition: weatherCondition,
                            location: location,
                            accidentDescription: accidentDescription,
                            comment: comment,
                            flag: flag,
                            adminComments: adminComments,
                            speed: speed,
                            direction: direction,
                            purposeForUsage: purposeForUsage,
                            damageDescription: damageDescription,
                            EstimateOfDamage: EstimateOfDamage,
                            AdminId: AdminId,
                            Insurance: { updateMany: { where: {}, data: { policyId: policyId } } },
                            PersonalInfo: { updateMany: { where: {}, data: { username: username } } },
                            VehicleInfo: { updateMany: { where: {}, data: { licensePlateNo: licensePlateNo } } }
                        }
                    })];
                case 1:
                    _a.sent();
                    if (PersonInjured && PersonInjured.length > 0) {
                        PersonInjured.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.prisma.personInjured.update({
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
                                                natureOfInjuries: element.natureOfInjuries
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if (PropertyDamage && PropertyDamage.length > 0) {
                        PropertyDamage.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.prisma.propertyDamage.update({
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
                                                driverProvIssue: element.driverProvIssue
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if (Evidence && Evidence.length > 0) {
                        Evidence.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.prisma.evidence.update({
                                            where: { id: element.id },
                                            data: {
                                                name: element.name,
                                                size: element.size,
                                                contentType: element.contentType,
                                                data: element.data
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    console.log(reportId, 'is edited in the Report table.');
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateReportById = updateReportById;
// This finds all the reportId by username, and then it uses the ids to find and push all the reports to return the result/reports
function getReportsByUsername(username) {
    return __awaiter(this, void 0, void 0, function () {
        var reportIds, reports, i, report;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reportIds = [];
                    return [4 /*yield*/, exports.prisma.reportPersonalInfo.findMany({ where: { username: username } }).then(function (reportPersonalInfos) {
                            reportIds = reportPersonalInfos;
                        })];
                case 1:
                    _a.sent();
                    reports = [];
                    if (!(reportIds && reportIds.length > 0)) return [3 /*break*/, 5];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < reportIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, exports.prisma.report.findUnique({
                            where: { reportId: reportIds[i].reportId },
                            include: {
                                PersonInjured: true,
                                PoliceInvestigation: true,
                                Witness: true,
                                Evidence: true,
                                Insurance: true,
                                PersonalInfo: true,
                                VehicleInfo: true,
                                PropertyDamage: true
                            }
                        })];
                case 3:
                    report = _a.sent();
                    if (report) {
                        reports.push(report);
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, reports];
            }
        });
    });
}
exports.getReportsByUsername = getReportsByUsername;
function deleteReportById(reportId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.report["delete"]({
                        where: { reportId: reportId }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteReportById = deleteReportById;
// This accepts report id, attributes of Witness, and a VehicleWitness to add the car they were on.
// This returns the id of the witness.
function addWitnessToReport(reportId, name, phone, street, city, country, province, postalCode, whichCar) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.witness.create({
                        data: {
                            name: name,
                            phone: phone,
                            street: street,
                            city: city,
                            country: country,
                            province: province,
                            postalCode: postalCode,
                            reportId: reportId
                        }
                    })];
                case 1:
                    id = (_a.sent()).id;
                    if (!whichCar) return [3 /*break*/, 3];
                    return [4 /*yield*/, exports.prisma.vehicleWitness.create({
                            data: {
                                witnessId: id,
                                licensePlateNo: whichCar
                            }
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, id];
            }
        });
    });
}
exports.addWitnessToReport = addWitnessToReport;
// This accepts report id, and attributes of PoliceInvestigation.
// This returns the id of the investigation.
function addPoliceInvestigation(reportId, policeReportNo) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.prisma.policeInvestigation.create({
                        data: {
                            reportId: reportId,
                            policeReportNo: policeReportNo
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.addPoliceInvestigation = addPoliceInvestigation;
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
