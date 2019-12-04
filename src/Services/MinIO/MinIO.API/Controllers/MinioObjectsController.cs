using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinIO.API.Dtos;
using MinIO.API.Services.Interfaces;
using Newtonsoft.Json.Linq;

namespace MinIO.API.Controllers
{
    [Route("api/[controller]/[action]")]
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
                objectCreation.ObjectData.FileName,
                objectCreation.ObjectData.OpenReadStream(),
                objectCreation.ObjectData.Length,
                objectCreation.ObjectData.ContentType
            );

            return Ok(result);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> PostMultiObject([FromForm]CreateObjectsReq objectCreation)
        {

            var result = new JObject();
            var data = new List<JObject>();
            int i = 1;
            try
            {
                foreach(var obj in objectCreation.Files)
                {
                    var objName = new JObject();
                    var getObjectName = await _objectService.GetObjectStat(objectCreation.BucketName, obj.FileName);
                    if (getObjectName != null)
                    {
                        objName.Add("object_name", obj.FileName);
                        result.Add($"data{i}", new JObject(objName));
                        data.Add(objName);
                        i++;
                    }else
                    {
                        await _objectService.CreateObject(objectCreation.BucketName,
                        obj.FileName,
                        obj.OpenReadStream(),
                        obj.Length,
                        obj.ContentType);
                        objName.Add("object_name", obj.FileName);
                        result.Add($"data{i}", new JObject(objName));
                        i++;
                    }

                }
                if (data.Count() == objectCreation.Files.Count())
                {
                    result.Add("code", 201);
                    result.Add("response", "failed");
                    result.Add("message", "Object Exists");
                    return Ok(result);
                }
            }
            catch (Exception e)
            {
                result.Add("code", 201);
                result.Add("response", "failed");
                result.Add("message", e.Message);
            }
            result.Add("code", 200);
            result.Add("response", "success");
            result.Add("message", "List object has been created.");

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

        [HttpPost]
        public async Task<ActionResult> Delete(RemoveObjectReq objReq)
        {
            var result = await _objectService.RemoveObject(objReq.BucketName, objReq.ObjectName);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> DeleteMultiData([FromForm] RemoveObjectsReq objReq)
        {
            var result = await _objectService.RemoveListObject(objReq.BucketName, objReq.ObjectNames);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetStatObject(string bucketName, string objectName)
        {
            var result = await _objectService.GetObjectStat(bucketName, objectName);
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