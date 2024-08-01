export interface UploadedFiles {
  url: string;
  name: string;
}

export interface ProcessedFiles {
  ok: boolean;
  uploadedFiles: UploadedFiles[];
}
