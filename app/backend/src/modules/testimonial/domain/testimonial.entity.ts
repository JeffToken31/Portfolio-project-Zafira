export class Testimonial {
  private _id: string;
  private _authorName: string;
  private _content: string;
  private _avatarUrl?: string;
  private _beneficiaryId?: string;
  private _validated: boolean;
  private _published: boolean;
  private _publishedAt?: Date;

  constructor(
    id: string,
    authorName: string,
    content: string,
    beneficiaryId?: string,
    validated = false,
    published = false,
    publishedAt?: Date,
  ) {
    this._id = id;
    this._authorName = authorName;
    this._content = content;
    this._beneficiaryId = beneficiaryId;
    this._validated = validated;
    this._published = published;
    this._publishedAt = published ? publishedAt || new Date() : undefined;
  }

  // --- Getters ---
  get id() {
    return this._id;
  }
  get authorName() {
    return this._authorName;
  }
  get content() {
    return this._content;
  }
  get beneficiaryId() {
    return this._beneficiaryId;
  }
  get validated() {
    return this._validated;
  }
  get published() {
    return this._published;
  }
  get publishedAt() {
    return this._publishedAt;
  }

  // --- Méthodes métier ---
  update(fields: Partial<Omit<Testimonial, 'id'>>) {
    Object.assign(this, fields);
  }

  setValidated(state: boolean) {
    this._validated = state;
  }

  setPublished(state: boolean) {
    this._published = state;
    this._publishedAt = state ? new Date() : undefined;
  }

  toJSON() {
    return {
      id: this._id,
      authorName: this._authorName,
      content: this._content,
      avatarUrl: this._avatarUrl,
      beneficiaryId: this._beneficiaryId,
      validated: this._validated,
      published: this._published,
      publishedAt: this._publishedAt,
    };
  }
}
