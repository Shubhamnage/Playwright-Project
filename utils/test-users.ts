import { randomUUID } from 'node:crypto';
import testData from '../test-data/automationexercise.json';

const registrationTemplate = testData.registration;

export type TestUser = {
  name: string;
  email: string;
  password: string;
  registrationDetails: Omit<typeof registrationTemplate, 'namePrefix' | 'emailPrefix' | 'password'>;
};

export function createTestUser(): TestUser {
  const id = randomUUID();

  return {
    name: `${registrationTemplate.namePrefix} ${id.slice(0, 8)}`,
    email: `${registrationTemplate.emailPrefix}.${id}@example.com`,
    password: registrationTemplate.password,
    registrationDetails: {
      gender: registrationTemplate.gender,
      birthDate: registrationTemplate.birthDate,
      newsletter: registrationTemplate.newsletter,
      specialOffers: registrationTemplate.specialOffers,
      firstName: registrationTemplate.firstName,
      lastName: registrationTemplate.lastName,
      company: registrationTemplate.company,
      address1: registrationTemplate.address1,
      address2: registrationTemplate.address2,
      country: registrationTemplate.country,
      state: registrationTemplate.state,
      city: registrationTemplate.city,
      zipcode: registrationTemplate.zipcode,
      mobileNumber: registrationTemplate.mobileNumber
    }
  };
}

export function createInvalidLoginEmail(): string {
  return `${testData.invalidLogin.emailPrefix}.${randomUUID()}@example.com`;
}

export const invalidLoginPassword = testData.invalidLogin.password;
