using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using S3.API.Services.Interfaces;

namespace S3.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class S3BucketsController : ControllerBase
    {
        private readonly IS3Service _service;

        public S3BucketsController(IS3Service service)
        {
            this._service = service;
        }

        [HttpPost("{bucketName}")]
        public async Task<IActionResult> CreateBucket([FromRoute] string bucketName)
        {
            var response = await _service.CreateBucketAsync(bucketName);
            return Ok(response);
        }
    }
}