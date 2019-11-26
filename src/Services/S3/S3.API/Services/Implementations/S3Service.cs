using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Util;
using S3.API.Models;
using S3.API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace S3.API.Services.Implementations
{
    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _client;

        public S3Service(IAmazonS3 client)
        {
            this._client = client;
        }

        public async Task<S3Response> CreateBucketAsync(string bucketName)
        {
            try
            {
                if (!await AmazonS3Util.DoesS3BucketExistV2Async(_client, bucketName))
                {
                    var putBucketRequest = new PutBucketRequest
                    {
                        BucketName = bucketName,
                        UseClientRegion = true
                    };

                    var response = await _client.PutBucketAsync(putBucketRequest);

                    return new S3Response
                    {
                        Message = response.ResponseMetadata.RequestId,
                        Status = response.HttpStatusCode
                    };
                }
            }
            catch (AmazonS3Exception e)
            {
                return new S3Response
                {
                    Status = e.StatusCode,
                    Message = e.Message
                };
            }
            catch (Exception e)
            {
                return new S3Response
                {
                    Status = HttpStatusCode.InternalServerError,
                    Message = e.Message
                };
            }
            return new S3Response
            {
                Status = HttpStatusCode.InternalServerError,
                Message = "Something went wrong"
            };
        }
    }
}
