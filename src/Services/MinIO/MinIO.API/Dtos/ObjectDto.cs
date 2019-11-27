using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MinIO.API.Dtos
{
    public class ObjectDto
    {
        public string BucketName { get; set; }
        public string ObjectName { get; set; }
        public IFormFile ObjectData { get; set; }
    }
}
