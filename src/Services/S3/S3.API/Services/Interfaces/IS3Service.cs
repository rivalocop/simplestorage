using S3.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace S3.API.Services.Interfaces
{
    public interface IS3Service
    {
        Task<S3Response> CreateBucketAsync(string bucketName);
    }
}
