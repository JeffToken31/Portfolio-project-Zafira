export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export class Blog {
  private _id: string;
  private _title: string;
  private _slug: string;
  private _content: string;
  private _excerpt?: string;
  private _coverImageUrl?: string;
  private _mediaUrl?: string;
  private _mediaType?: MediaType;
  private _published: boolean;
  private _publishedAt?: Date;

  constructor(
    id: string,
    title: string,
    slug?: string,
    content?: string,
    excerpt?: string,
    coverImageUrl?: string,
    mediaUrl?: string,
    mediaType?: MediaType,
    published = false,
    publishedAt?: Date,
  ) {
    this._id = id;
    this._title = title;
    this._slug = slug || Blog.generateSlug(title);
    this._content = content || '';
    this._excerpt = excerpt || Blog.generateExcerpt(this._content);
    this._coverImageUrl = coverImageUrl;
    this._mediaUrl = mediaUrl;
    this._mediaType = mediaType;
    this._published = published;
    this._publishedAt = published ? publishedAt || new Date() : undefined;
  }

  // Utils static
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // to delete special characters
      .replace(/\s+/g, '-'); // switch space to tirets
  }

  static generateExcerpt(content: string, length = 150): string {
    return content.length > length
      ? content.substring(0, length) + '...'
      : content;
  }

  // Getters
  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get slug(): string {
    return this._slug;
  }
  get content(): string {
    return this._content;
  }
  get excerpt(): string {
    return this._excerpt || Blog.generateExcerpt(this._content);
  }
  get coverImageUrl(): string | undefined {
    return this._coverImageUrl;
  }
  get mediaUrl(): string | undefined {
    return this._mediaUrl;
  }
  get mediaType(): MediaType | undefined {
    return this._mediaType;
  }
  get published(): boolean {
    return this._published;
  }
  get publishedAt(): Date | undefined {
    return this._publishedAt;
  }

  // logic business
  updateTitle(newTitle: string): void {
    if (!newTitle.trim()) throw new Error('Le titre ne peut pas être vide.');
    this._title = newTitle;
    this._slug = Blog.generateSlug(newTitle);
  }

  updateContent(newContent: string): void {
    if (!newContent.trim())
      throw new Error('Le contenu ne peut pas être vide.');
    this._content = newContent;
    this._excerpt = Blog.generateExcerpt(newContent);
  }

  attachMedia(url: string, type: MediaType): void {
    if (!url.trim()) throw new Error('L’URL du média est invalide.');
    this._mediaUrl = url;
    this._mediaType = type;
  }

  setCoverImage(url: string): void {
    if (!url.trim()) throw new Error('L’URL de la cover image est invalide.');
    this._coverImageUrl = url;
  }

  setPublished(state: boolean): void {
    this._published = state;
    this._publishedAt = state ? new Date() : undefined;
  }

  // utils
  getDisplayImage(): string | undefined {
    return this._coverImageUrl || (this.isImage() ? this._mediaUrl : undefined);
  }

  isImage(): boolean {
    return this._mediaType === MediaType.IMAGE;
  }
  isVideo(): boolean {
    return this._mediaType === MediaType.VIDEO;
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this._id,
      title: this._title,
      slug: this._slug,
      content: this._content,
      excerpt: this.excerpt,
      coverImageUrl: this._coverImageUrl,
      mediaUrl: this._mediaUrl,
      mediaType: this._mediaType,
      published: this._published,
      publishedAt: this._publishedAt,
    };
  }
}
