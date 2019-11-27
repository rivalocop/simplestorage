using System;
using System.Threading.Tasks;
using Minio;
using Newtonsoft.Json.Linq;

namespace MinIO.API.Services.Interfaces
{
    public interface IMinioBucketService
    {
        Task<JObject>Create(string bucketName);
        Task<JObject> List();
        Task<JObject> Remove(string bucketName);
        Task<JObject> Check(string bucketName);
    }
}
