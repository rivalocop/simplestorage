using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace S3.API.Services.Interfaces
{
    public interface IS3ObjectService
    {
        Task UploadFileAsync(string bucketName);
    }
}
