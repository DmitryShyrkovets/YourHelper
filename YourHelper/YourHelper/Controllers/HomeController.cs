using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace YourHelper.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        public IActionResult Diary()
        {
            return View();
        }
        
        public IActionResult Note()
        {
            return View();
        }
        
        public IActionResult Schedule()
        {
            return View();
        }
    }
}
