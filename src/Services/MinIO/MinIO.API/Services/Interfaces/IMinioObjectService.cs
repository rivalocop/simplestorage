using Minio.DataModel;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MinIO.API.Services.Interfaces
{
    public interface IMinioObjectService
    {
        Task<JObject> CreateObject(string bucketName, string objectName, Stream inputStream, long size, string contentType);
        Task<Stream> GetObject(string bucketName, string objectName);
        Task<JObject> RemoveObject(string bucketName, string objectName);
        Task<JObject> RemoveListObject(string bucketName, IEnumerable<string> listObjectName);
        Task<JObject> GetObjectStat(string bucketName, string objectName);
    }
}
