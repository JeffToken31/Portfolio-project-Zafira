export class Partner {
  private _id: string;
  private _companyName: string;
  private _name?: string;
  private _email?: string;
  private _phoneNumber?: string;
  private _logoUrl: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    companyName: string,
    logoUrl: string,
    name?: string,
    email?: string,
    phoneNumber?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._id = id;
    this._companyName = companyName;
    this._logoUrl = logoUrl;
    this._name = name;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }

  get id() {
    return this._id;
  }
  get companyName() {
    return this._companyName;
  }
  get logoUrl() {
    return this._logoUrl;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get phoneNumber() {
    return this._phoneNumber;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  update(fields: Partial<Omit<Partner, 'id' | 'createdAt'>>) {
    Object.assign(this, fields);
    this.touch();
  }

  private touch() {
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      companyName: this._companyName,
      name: this._name ?? null,
      email: this._email ?? null,
      phoneNumber: this._phoneNumber ?? null,
      logoUrl: this._logoUrl,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
