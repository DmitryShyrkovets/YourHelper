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

    [Route("/")]
    [Route("General")]
    public class GeneralController : Controller
    {
        private readonly UserService<UserData> _service;

        public GeneralController(IMapper mapper, IUser<User> service)
        {
            _service = new UserService<UserData>(service, mapper);
        }
        [Route("")]
        public IActionResult General()
        {
            return View();
        }
        
        [HttpPost]
        [Route("Massage")]
        public async Task<IActionResult> Massage([FromBody] GeneralData data)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Письмо от пользователя", "self.helper@mail.ru"));
            emailMessage.To.Add(new MailboxAddress("", "self.helper@mail.ru"));
            emailMessage.Subject = data.Title;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = 
                    "<p>Пользователь: " + data.Name + "</p>"+
                    "<p>Почта: " + data.Email + "</p>"+
                    "<p>Сообщение: " + data.Text + "</p>"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.mail.ru", 465, true);
                await client.AuthenticateAsync("self.helper@mail.ru", "12#QWEasd");
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }

            return Ok();
        }
        
    }
}
