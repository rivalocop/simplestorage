using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace S3.API.Models
{
    public class S3Object
    {
        public string KeyName { get; set; }
        public string FullPath { get; set; }
    }
}
