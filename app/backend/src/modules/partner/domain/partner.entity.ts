export interface PartnerProps {
  id: string;
  companyName: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Partner {
  public readonly id: string;
  public companyName: string;
  public name?: string;
  public email?: string;
  public phoneNumber?: string;
  public logoUrl: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: PartnerProps & { id?: string }) {
    this.id = props.id;
    this.companyName = props.companyName;
    this.name = props.name ?? undefined;
    this.email = props.email ?? undefined;
    this.phoneNumber = props.phoneNumber ?? undefined;
    this.logoUrl = props.logoUrl || '';
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  update(companyName?: string, logoUrl?: string, name?: string, email?: string, phoneNumber?: string) {
    if (companyName !== undefined) {
      this.companyName = companyName;
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
    }
    if (logoUrl !== undefined) {
      this.logoUrl = logoUrl;
    }
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      companyName: this.companyName,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      logoUrl: this.logoUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
