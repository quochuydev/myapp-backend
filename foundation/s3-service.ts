import AWS from 'aws-sdk';

export default async function S3Service() {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'ap-southeast-1',
  });

  const createBucket = async (bucketName: string) => {
    await s3.createBucket({
      Bucket: bucketName,
    });
  };

  const createPutPresignedUrl = async (bucketName: string) => {
    await s3.createPresignedPost({
      Bucket: bucketName,
    });
  };

  const createGetPresignedUrl = async (bucketName: string) => {
    await s3.createPresignedPost({
      Bucket: bucketName,
    });
  };

  return {
    createBucket,
    createPutPresignedUrl,
    createGetPresignedUrl,
  };
}
