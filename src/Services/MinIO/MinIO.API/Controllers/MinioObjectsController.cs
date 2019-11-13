using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> PostObject([FromForm] ObjectDto objectCreation)
        {
            var result = await _objectService.createObject(objectCreation.BucketName,
                objectCreation.ObjectName,
                objectCreation.ObjectData.OpenReadStream(),
                objectCreation.ObjectData.Length,
                objectCreation.ObjectData.ContentType
            );

            return Ok(result);
        }
    }
}