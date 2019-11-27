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
    public class S3ObjectsController : ControllerBase
    {
        private readonly IS3ObjectService _service;

        public S3ObjectsController(IS3ObjectService service)
        {
            this._service = service;
        }

        [HttpPost]
        [Route("createBucket/{bucketName}")]
        public async Task<IActionResult> UploadFileAsync([FromRoute] string bucketName,[FromForm] IFormFile file)
        {
            await _service.UploadFileAsync(bucketName);
            return Ok();
        }
    }
}