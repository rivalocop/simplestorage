using System;
using System.Threading.Tasks;
using Minio;
using Minio.Exceptions;
using MinIO.API.AppSettings;
using MinIO.API.Services.Interfaces;
using Newtonsoft.Json.Linq;

namespace MinIO.API.Services.Implementations
{
    public class MinioBucketService : IMinioBucketService
    {
        private readonly MinioSetting _setting;
        private MinioClient minioClient;

        public MinioBucketService(MinioSetting setting)
        {
            this._setting = setting;

            minioClient = new MinioClient(_setting.Endpoint, _setting.AccessKey, _setting.SecretKey);
        }

        public async Task<JObject> check(string bucketName)
        {
            JObject result = new JObject();
            try
            {
                if (await minioClient.BucketExistsAsync(bucketName))
                {
                    result.Add("message", "Bucket " + bucketName + " exists.");
                    result.Add("data", true);
                }
                else
                {
                    result.Add("message", "Bucket " + bucketName + " doesn't exists.");
                    result.Add("data", false);
                }
                
            }
            catch (MinioException ex)
            {
                Console.WriteLine("Error: {0}", ex.Message);
            }
            return result;
        }

        public async Task<JObject> create(string bucketName)
        {
            JObject result = new JObject();
            try
            {
                if (!await minioClient.BucketExistsAsync(bucketName))
                {
                    await minioClient.MakeBucketAsync(bucketName);

                    result.Add("code", 200);
                    result.Add("response", "success");
                    result.Add("message", "Bucket " + bucketName + " has been created.");
                }
                else
                {
                    result.Add("code", 200);
                    result.Add("response", "success");
                    result.Add("message", "Bucket " + bucketName + " exists.");
                }
            }
            catch (MinioException ex)
            {
                Console.WriteLine("Error: {0}", ex.Message);
            }
            return result;
        }

        public async Task<JObject> list()
        {
            JObject result = new JObject();
            try
            {
                JArray bucketAsJsonResult = new JArray();
                var bucketList = await minioClient.ListBucketsAsync();
                foreach (var bucket in bucketList.Buckets)
                {
                    JObject bucketAsJson = new JObject();
                    bucketAsJson.Add("bucket_name", bucket.Name);
                    bucketAsJson.Add("bucket_creation_date", bucket.CreationDateDateTime);
                    bucketAsJsonResult.Add(bucketAsJson);
                }
            }
            catch (MinioException ex)
            {
                Console.WriteLine("Error: {0}", ex.Message);
            }
            return result;
        }

        public async Task<JObject> remove(string bucketName)
        {
            JObject result = new JObject();
            try
            {
                await minioClient.RemoveBucketAsync(bucketName);
                result.Add("code", 200);
                result.Add("response", "success");
                result.Add("message", "Bucket " + bucketName + " has been removed.");
                result.Add("data", true);
            }
            catch (MinioException ex)
            {
                Console.WriteLine("Error: {0}", ex.Message);
            }
            return result;
        }
    }
}
