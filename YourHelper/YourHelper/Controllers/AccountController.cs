using System;
using AutoMapper;
using DbModels;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Repository;
using Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using YourHelper.Models;

namespace YourHelper.Controllers
{
    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly UserService<UserData> _service;

        public AccountController(IMapper mapper, IUser<User> service)
        {
            _service = new UserService<UserData>(service, mapper);
        }

        [Route("Login")]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserData data)
        {
            if (await _service.CheckUser(data, "login") == true)
            {
                await Authenticate(data.Email);

                string test = Url.Action("Index", "Home");

                return Json(new { redirectToUrl = Url.Action("Index", "Home"), type = "ok" });
            }

            return Json(new { error = "Введённые данные не верны", type = "bad"});
        }

        [Route("Register")]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserData data)
        {
            if (await _service.CheckUser(data, "registration") == false)
            {

                await _service.TryAddUser(data);

                await Authenticate(data.Email);

                return Json(new { redirectToUrl = Url.Action("Index", "Home"), type = "ok" });
            }

            return Json(new { error = "Данная почта и/или пароль уже используются", type = "bad" });
        }

        private async Task Authenticate(string userName)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };

            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Json(new { redirectToUrl = Url.Action("Login", "Account") });
        }
        
        [Route("Recovery")]
        public IActionResult Recovery()
        {
            return View();
        }

        [HttpPost]
        [Route("Recovery")]
        public async Task<IActionResult> Recovery([FromBody] UserData data)
        {
            if (await _service.CheckUser(data, "email") == true)
            {
                UserData user = await _service.TryGetData(data);
                var emailMessage = new MimeMessage();

                emailMessage.From.Add(new MailboxAddress("Администрация сайта", "self.helper@mail.ru"));
                emailMessage.To.Add(new MailboxAddress("", data.Email));
                emailMessage.Subject = "Данные авторизации вашего аккаунта";
                emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = "<h2>Данны вашего аккаунта: </h2>" +
                    "<p>Логин: " + user.Email + "</p>" +
                    "<p>Пароль: " + user.Password + "</p>" +
                    "<h5>В целях безопасности после прочтения удалите письмо</h5>"
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.mail.ru", 465, true);
                    await client.AuthenticateAsync("self.helper@mail.ru", "12#QWEasd");
                    await client.SendAsync(emailMessage);

                    await client.DisconnectAsync(true);
                }

                return Json(new { redirectToUrl = Url.Action("Login", "Account"), type = "ok" });
            }
            
            return Json(new { error = "Данной почты не найдено", type = "bad" });
        }
        
        [Route("Settings")]
        public IActionResult Settings()
        {
            return View();
        }
        
        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] UserData data)
        {
            try
            {
                data.Email = User.Identity.Name;
                
                if (!await _service.CheckUser(data, "change"))
                {
                    return Json(new { type = "bad" });
                }   
                await _service.TryChangePassword(data);
                
                return Json(new { type = "ok" });
            }
            catch (Exception e)
            {
                return Json(new { type = "bad" });
            }
        }
        
        [Route("GetEmail")]
        public IActionResult GetEmail()
        {
            string data;

            if (User.Identity.Name.Length > 16)
            {
                data = User.Identity.Name.Substring(0, 5) + "..." +
                       User.Identity.Name.Substring(User.Identity.Name.Length - 8, 8);
            }
            else
            {
                data = User.Identity.Name;
            }
            
            return Json(new { email = data });
        }
    }
}
