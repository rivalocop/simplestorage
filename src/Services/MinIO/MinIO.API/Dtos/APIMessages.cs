using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MinIO.API.Dtos
{
    public class RemoveObjectReq
    {
        public string BucketName { get; set; }
        public string ObjectName { get; set; }
    }

    public class RemoveObjectsReq
    {
        public string BucketName { get; set; }
        public List<string> ObjectNames { get; set; }
    }

    public class CreateObjectsReq
    {
        public string BucketName { get; set; }
        public List<IFormFile> Files { get; set; }
    }
}
