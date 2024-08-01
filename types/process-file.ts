export interface UploadedFiles {
  url: string;
  name: string;
  size: number;
}

export interface ProcessedFiles {
  ok: boolean;
  uploadedFiles: UploadedFiles[];
}
