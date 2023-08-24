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
  Countrys = 'countrys',
  Appartment = 'appartment',
}

export type InputData = {
  label: string;
  dataType: InputDataType;
  value?: string;
  isRequired?: boolean;
};

export enum SelectType {
  Country = 'country',
}
