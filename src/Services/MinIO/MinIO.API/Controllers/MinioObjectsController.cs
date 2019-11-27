using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinIO.API.Dtos;
using MinIO.API.Services.Interfaces;

namespace MinIO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MinioObjectsController : ControllerBase
    {
        private readonly IMinioObjectService _objectService;

        public MinioObjectsController(IMinioObjectService objectService)
        {
            this._objectService = objectService;
        }

        [HttpPost, DisableRequestSizeLimit]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> PostObject([FromForm] ObjectDto objectCreation)
        {
            var result = await _objectService.CreateObject(objectCreation.BucketName,
                objectCreation.ObjectName,
                objectCreation.ObjectData.OpenReadStream(),
                objectCreation.ObjectData.Length,
                objectCreation.ObjectData.ContentType
            );

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetObject(string bucketName, string objectName)
        {
            var result = await _objectService.GetObject(bucketName, objectName);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
    }
}