using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace insite.Controllers
{
    using System.Net.Http;

    [Route("scripts/{*url}")]
    public class TemplateApiController : Controller
    {
        private readonly HttpClient httpClient = new HttpClient()
                                                 {
                                                     BaseAddress = new Uri("http://trunk.local.com")
                                                 };

        [HttpGet]
        public async Task<string> Get(string url)
        {
            var response = await this.httpClient.GetAsync($"scripts/{url}");

            return await response.Content.ReadAsStringAsync();
        }
    }
}
