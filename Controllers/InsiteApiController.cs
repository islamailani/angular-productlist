﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace insite.Controllers
{
    using System.Net.Http;

    [Route("api/v1/{*url}")]
    public class InsiteApiController : Controller
    {
        private readonly HttpClient httpClient = new HttpClient()
                                    {
                                        BaseAddress = new Uri("http://trunk.local.com")
                                    };

        [HttpGet]
        public async Task<string> Get(string url)
        {
            var response = await this.httpClient.GetAsync($"api/v1/{url}{this.Request.QueryString}");

            return await response.Content.ReadAsStringAsync();
        }

        [HttpPost]
        public async Task<string> Post(string url, [FromBody]object contentIn)
        {
            var content = new StringContent(contentIn.ToString());
            var response = await this.httpClient.PostAsync($"api/v1/{url}{this.Request.QueryString}", content);

            return await response.Content.ReadAsStringAsync();
        }
    }
}
