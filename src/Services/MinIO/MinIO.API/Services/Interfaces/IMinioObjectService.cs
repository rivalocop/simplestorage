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
        JObject createObject(string bucketName, string objectName, Stream data, long size, string contentType);
    }
}
