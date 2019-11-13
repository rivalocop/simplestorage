using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MinIO.API.Dtos;
using MinIO.API.Services.Interfaces;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MinIO.API.Controllers
{
    [Route("api/[controller]")]
    public class BucketsController : Controller
    {
        private readonly IMinioBucketService _bucketService;

        public BucketsController(IMinioBucketService bucketService)
        {
            this._bucketService = bucketService;
        }

        [HttpPost]
        public async Task<ActionResult> PostBucket([FromBody]BucketDto bucketDto)
        {
            var result = await _bucketService.create(bucketDto.BucketName);
            return Ok(result.ToString());
        }

        [HttpGet]
        public async Task<ActionResult> GetBuckets()
        {
            var result = await _bucketService.list();
            return Ok(result.ToString());
        }
    }
}
