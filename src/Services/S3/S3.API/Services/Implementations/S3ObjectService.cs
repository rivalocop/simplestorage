using Amazon.S3;
using S3.API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace S3.API.Services.Implementations
{
    public class S3ObjectService : IS3ObjectService
    {
        private readonly IAmazonS3 _client;
        public S3ObjectService(IAmazonS3 client)
        {
            this._client = client;
        }

        public Task UploadFileAsync(string bucketName)
        {
            throw new NotImplementedException();
        }
    }
}
