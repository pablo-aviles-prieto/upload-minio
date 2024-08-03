import * as Minio from 'minio';

let minioClientInstance: Minio.Client | null = null;

export const retrieveMinioClient = () => {
  if (!minioClientInstance) {
    minioClientInstance = new Minio.Client({
      endPoint: process.env.MINIO_BASE_URL ?? '',
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY ?? '',
      secretKey: process.env.MINIO_SECRET_KEY ?? '',
    });
  }
  return minioClientInstance;
};
