export class Action {
  private _id: string;
  private _title: string;
  private _description: string;
  private _imageUrl?: string;
  private _published: boolean;
  private _publishedAt?: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    imageUrl?: string,
    published = false,
    publishedAt?: Date,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._imageUrl = imageUrl;
    this._published = published;
    this._publishedAt = published ? publishedAt || new Date() : undefined;
  }

  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get imageUrl() {
    return this._imageUrl;
  }
  get published() {
    return this._published;
  }
  get publishedAt() {
    return this._publishedAt;
  }

  update(fields: Partial<Omit<Action, 'id'>>) {
    Object.assign(this, fields);
  }

  setPublished(state: boolean) {
    this._published = state;
    this._publishedAt = state ? new Date() : undefined;
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      imageUrl: this._imageUrl,
      published: this._published,
      publishedAt: this._publishedAt,
    };
  }
}
