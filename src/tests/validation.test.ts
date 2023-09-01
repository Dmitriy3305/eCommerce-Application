/**
 * @jest-environment node
 */

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import fetch from 'node-fetch';

import AppController from '../app/controller/controller';
import { InputDataType } from '../types/input-datas';
import ValidationCallback from '../types/validation-callback';
import { Countries } from '../utils/validators/postalCode-validator';

describe('Client validation', () => {
  const callbacks = new AppController().getValidationCallbacks();

  describe('Non special chars validation', () => {
    const appartmentValidation = callbacks.get(InputDataType.Apartment) as ValidationCallback;
    it('returns appropriate validation message if value is not valid', () => {
      const notValid = '#$TIojgr!!';
      expect(appartmentValidation(notValid, true)).toBeTruthy();
    });

    it('returns empty string when value is valid', () => {
      const valid = 'E21';
      expect(appartmentValidation(valid, true)).toBe('');
    });
  });

  describe('Birth date validator', () => {
    const birthDateValidation = callbacks.get(InputDataType.BirthDate) as ValidationCallback;
    it('returns appropriate validation message if date is not valid', () => {
      // No point in testing regular strings with date input
      let date = '2024-12-25';
      expect(birthDateValidation(date, true)).toBeTruthy();

      date = '2015-12-25';
      expect(birthDateValidation(date, true)).toBeTruthy();
    });
    it('returns empty string when date is valid', () => {
      const valid = '01-09-1990';
      expect(birthDateValidation(valid, true)).toBe('');
    });
  });

  describe('Email validator', () => {
    const emailValidation = callbacks.get(InputDataType.Email) as ValidationCallback;

    it('returns appropriate validation message if email is not valid', () => {
      let notValid = 'igrojeorg#4543tre342';
      expect(emailValidation(notValid, true)).toBeTruthy();

      notValid = '!!!!!!';
      expect(emailValidation(notValid, true)).toBeTruthy();
    });
    it('returns empty string when email is valid', () => {
      const valid = 'mail@example.com';
      expect(emailValidation(valid, true)).toBe('');
    });
  });

  describe('Only letters validator', () => {
    const nameValidation = callbacks.get(InputDataType.Name) as ValidationCallback;

    it('returns appropriate validation message if value is not valid', () => {
      const notValid = 'igrojeorg#4543tre342';
      expect(nameValidation(notValid, true)).toBeTruthy();
    });
    it('returns empty string when value is valid', () => {
      const valid = 'Alex';
      expect(nameValidation(valid, true)).toBe('');
    });
  });

  describe('Password validator', () => {
    const passwordValidation = callbacks.get(InputDataType.Password) as ValidationCallback;

    it('returns appropriate validation message if password is not valid', () => {
      let notValid = 'igrojeorg#4543tre342';
      expect(passwordValidation(notValid, true)).toBeTruthy();

      notValid = '12345656';
      expect(passwordValidation(notValid, true)).toBeTruthy();

      notValid = '12345656!kla';
      expect(passwordValidation(notValid, true)).toBeTruthy();

      notValid = '12345656POKWksdm';
      expect(passwordValidation(notValid, true)).toBeTruthy();

      notValid = '1234';
      expect(passwordValidation(notValid, true)).toBeTruthy();
    });
    it('returns empty string when password is valid', () => {
      const valid = '123pkPO!!';
      expect(passwordValidation(valid, true)).toBe('');
    });
  });

  describe('Postal code validator', () => {
    const postalCodeValdation = callbacks.get(InputDataType.PostalCode) as ValidationCallback;
    describe('Russia', () => {
      it('returns appropriate validation message if postal code is not valid', () => {
        const notValid = '19ejfWEf';
        expect(postalCodeValdation(notValid, true, Countries.Russia)).toBeTruthy();
      });
      it('returns empty string when postal code is valid', () => {
        const valid = '443093';
        expect(postalCodeValdation(valid, true, Countries.Russia)).toBe('');
      });
    });

    describe('United Kingdom', () => {
      it('returns appropriate validation message if postal code is not valid', () => {
        const notValid = '19ejfWEf';
        expect(postalCodeValdation(notValid, true, Countries.UnitedKingdom)).toBeTruthy();
      });
      it('returns empty string when postal code is valid', () => {
        const valid = 'AA9A 9AA';
        expect(postalCodeValdation(valid, true, Countries.UnitedKingdom)).toBe('');
      });
    });

    describe('United States', () => {
      it('returns appropriate validation message if postal code is not valid', () => {
        const notValid = '19ejfWEf';
        expect(postalCodeValdation(notValid, true, Countries.UnitedStates)).toBeTruthy();
      });
      it('returns empty string when postal code is valid', () => {
        const valid = '44309';
        expect(postalCodeValdation(valid, true, Countries.UnitedStates)).toBe('');
      });
    });
  });
});
