using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace YourHelper.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Diary()
        {
            return View();
        }
        
        public IActionResult Notes()
        {
            return View();
        }
        
        public IActionResult Schedules()
        {
            return View();
        }
        
        public IActionResult Targets()
        {
            return View();
        }
        
        public IActionResult Finances()
        {
            return View();
        }
        
        public IActionResult Skills()
        {
            return View();
        }
        
        public IActionResult Statistic()
        {
            return View();
        }
    }
}
