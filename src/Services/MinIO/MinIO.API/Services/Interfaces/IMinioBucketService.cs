using System;
using System.Threading.Tasks;
using Minio;
using Newtonsoft.Json.Linq;

namespace MinIO.API.Services.Interfaces
{
    public interface IMinioBucketService
    {
        Task<JObject>create(string bucketName);
        Task<JObject> list();
        Task<JObject> remove(string bucketName);
        Task<JObject> check(string bucketName);
    }
}
