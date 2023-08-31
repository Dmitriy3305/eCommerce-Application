export enum InputDataType {
  Email = 'email',
  Password = 'password',
  Name = 'name',
  Date = 'date',
  Street = 'street',
  Country = 'country',
  City = 'city',
  PostalCode = 'postalCode',
  BirthDate = 'birthDate',
  Appartment = 'appartment',
  Toggle = 'toggle',
}

export type InputData = {
  label: string;
  dataType: InputDataType;
  name?: string;
  value?: string;
  isRequired?: boolean;
  resourceName?: string;
  options?: string[];
  isDisabled?: boolean;
};
