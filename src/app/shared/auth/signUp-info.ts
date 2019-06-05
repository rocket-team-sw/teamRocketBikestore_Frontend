// Esta clase contendrá la información del registro del usuario, tener en cuenta los datos que se van a pedir al final.
export class SignUpInfo {
  name: string;
  userName: string;
  email: string;
  role: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  password: string;
  phone: string;
  address: string;
  documentNumber: number;
  documentType: string;

  constructor(name: string, userName: string, email: string, role: string, companyName: string,
    companyAddress: string, companyPhone: string, password: string,
    phone: string, address: string, documentNumber: number, documentType: string) {
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyPhone = companyPhone;
    this.phone = phone;
    this.address = address;
    this.documentNumber = documentNumber;
    this.documentType = documentType;
  }
}
