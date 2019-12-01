using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<JObject> CreateObject(string bucketName, string objectName, Stream inputStream, long size, string contentType)
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

        public async Task<Stream> GetObject(string bucketName, string objectName)
        {
            Stream fileStream = new MemoryStream();
            try
            {
                var metadata = await minioClient.StatObjectAsync(bucketName, objectName);
                Console.WriteLine(metadata);

                await minioClient.GetObjectAsync(bucketName, objectName,
                 (stream) =>
                {
                    fileStream.Position = 0;
                    stream.CopyTo(fileStream);
                });
            }
            catch (MinioException e)
            {
                System.Console.WriteLine("New error will promt here {0}", e);
                throw;
            }
            return fileStream;
        }

        /// <summary>
        /// Xử lý logic API xóa nhiều file trên minio
        /// </summary>
        /// <param name="bucketName"></param>
        /// <param name="listObjectName"></param>
        /// <returns></returns>
        public async Task<JObject> RemoveListObject(string bucketName, IEnumerable<string> listObjectName)
        {
            JObject result = new JObject();
            try
            {
                bool found = await minioClient.BucketExistsAsync(bucketName);
                if (!found)
                {
                    result.Add("code", 201);
                    result.Add("response", "failed");
                    result.Add("message", "bucket not found");
                }
                foreach(var objName in listObjectName)
                {
                    await minioClient.RemoveObjectAsync(bucketName, objName);
                }
                JObject data = new JObject();
                result.Add("code", 200);
                result.Add("response", "success");
                result.Add("message", "List object has been removed!");
            }
            catch (MinioException e)
            {
                result.Add("code", 201);
                result.Add("response", "failed");
                result.Add("message", e.Message);
            }
            return result;
        }

        /// <summary>
        /// Xử lý logic API xóa một file trên minio
        /// </summary>
        /// <param name="bucketName"></param>
        /// <param name="objectName"></param>
        /// <returns></returns>
        public async Task<JObject> RemoveObject(string bucketName, string objectName)
        {
            JObject result = new JObject();
            try
            {
                bool found = await minioClient.BucketExistsAsync(bucketName);
                if (!found)
                {
                    result.Add("code", 201);
                    result.Add("response", "failed");
                    result.Add("message", "bucket not found");
                }
                await minioClient.RemoveObjectAsync(bucketName, objectName);
                JObject data = new JObject();
                data.Add("object_name", objectName);
                data.Add("object_url", _setting.Endpoint + "/bucket/" + bucketName + "/object/" + objectName);

                result.Add("code", 200);
                result.Add("response", "success");
                result.Add("message", "Object " + objectName + " has been removed.");
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
