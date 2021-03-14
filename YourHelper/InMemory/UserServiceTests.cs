using System.Threading.Tasks;
using NUnit.Framework;
using RepositoryForTest;
using Services;
using YourHelper.Models;
using AutoMapper;
using Mapping;

namespace InMemory
{
    [TestFixture]
    public class UserServiceTests
    {
        UserService<UserData> userService;
        WorkingWithUserForTest workingWithUserForTest = new WorkingWithUserForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingUser<UserData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            userService = new UserService<UserData>(workingWithUserForTest, mapper);
        }

        [Test]
        public async Task Add_User_Test()
        {
            UserData data = new UserData { Email = "zzasd@mail.ru", Password = "123456" };

            Assert.AreEqual(1, await userService.TryAddUser(data));
        }
        
        [Test]
        public async Task Check_User_For_Registration_Test()
        {
            UserData registerModel = new UserData { Email = "qwed@mail.ru", Password = "123456789"};

            string param = "registration";

            Assert.AreEqual(false, await userService.CheckUser(registerModel, param));
        }
        
        [Test]
        public async Task Check_User_Login_Test()
        {
            UserData loginModel = new UserData { Email = "zoldikds@mail.ru", Password = "1111111" };
            string param = "login";

            Assert.AreEqual(true, await userService.CheckUser(loginModel, param));
        }

        [Test]
        public async Task Check_User_Email_For_Get_User_Data_Test()
        {
            UserData loginModel = new UserData { Email = "zoldikds@mail.ru"};
            string param = "email";

            Assert.AreEqual(true, await userService.CheckUser(loginModel, param));
        }
        
        [Test]
        public async Task Check_User_For_Change_Password_Test()
        {
            UserData loginModel = new UserData { Email = "zoldikds@mail.ru", Password = "1111111"};
            string param = "change";

            Assert.AreEqual(true, await userService.CheckUser(loginModel, param));
        }

        [Test]
        public async Task Get_Recovery_Data_Test()
        {
            UserData userData = new UserData { Email = "zoldikds@mail.ru", Password = "111111" };

            Assert.IsNotNull(await userService.TryGetData(userData));
        }
        
        [Test]
        public async Task Change_Password_Test()
        {
            UserData userData = new UserData { Email = "zoldikds@mail.ru", Password = "111111", NewPassword = "1111111"};

            Assert.AreEqual(1, await userService.TryChangePassword(userData));
        }
    }
}