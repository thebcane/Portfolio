import { S3Client } from "@aws-sdk/client-s3";

export const ALLOWED_UPLOAD_EXTENSIONS = [
  "wav",
  "aif",
  "aiff",
  "flac",
  "mp3",
  "m4a",
  "ogg",
  "zip",
  "rar",
  "7z",
];

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024 * 1024;

export function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 credentials are not configured");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function getR2Bucket() {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) {
    throw new Error("R2_BUCKET_NAME is not configured");
  }
  return bucket;
}
