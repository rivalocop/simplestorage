using System;
using System.IO;
using System.Threading.Tasks;
using Minio;
using Minio.Exceptions;
using MinIO.API.AppSettings;
using MinIO.API.Services.Interfaces;
using Newtonsoft.Json.Linq;

namespace MinIO.API.Services.Implementations
{
    public class MinioObjectService : IMinioObjectService
    {
        private readonly MinioSetting _setting;
        private MinioClient minioClient;

        public MinioObjectService(MinioSetting setting)
        {
            this._setting = setting;

            minioClient = new MinioClient(_setting.Endpoint, _setting.AccessKey, _setting.SecretKey);
        }

        public async Task<JObject> createObject(string bucketName, string objectName, Stream inputStream, long size, string contentType)
        {
            JObject result = new JObject();
            try
            {
                bool found = await minioClient.BucketExistsAsync(bucketName);
                if (!found)
                {
                    await minioClient.MakeBucketAsync(bucketName);
                }
                await minioClient.PutObjectAsync(bucketName, objectName, inputStream, size, contentType);
                JObject data = new JObject();
                data.Add("object_name", objectName);
                data.Add("object_url", _setting.Endpoint + "/bucket/" + bucketName + "/object/" + objectName);

                result.Add("code", 200);
                result.Add("response", "success");
                result.Add("message", "Object " + objectName + " has been created.");
                result.Add("data", data);
            }
            catch (MinioException e)
            {
                result.Add("code", 201);
                result.Add("response", "failed");
                result.Add("message", e.Message);
            }
            return result;
        }
    }
}
