export interface UploadedFileEntity {
  originalName: string;
  fileName: string;
  path: string;
  size: number;
  mimeType: string; // MIME Type (ex: image/png)
  url: string; // URL public (Given by Nest)
  uploadedAt: Date;
}
