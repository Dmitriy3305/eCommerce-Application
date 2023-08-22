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
}

export type InputData = {
  label: string;
  dataType: InputDataType;
  value?: string;
  isRequired?: boolean;
};
