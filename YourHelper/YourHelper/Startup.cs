using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Repository;
using Mapping;
using YourHelper.Models;
using DbModels;
using Microsoft.Extensions.FileProviders;

namespace YourHelper
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                    .AddCookie(options =>
                    {
                        options.LoginPath = new Microsoft.AspNetCore.Http.PathString("/Account/Login");
                    });
            
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingUser<UserData>());
                mc.AddProfile(new MappingDiary<DiaryData>());
                mc.AddProfile(new MappingNote<NoteData>());
                mc.AddProfile(new MappingSchedule<ScheduleData>());
                mc.AddProfile(new MappingTarget<TargetData>());
                mc.AddProfile(new MappingFinance<FinanceData>());
                mc.AddProfile(new MappingSkill<SkillData>());
                mc.AddProfile(new MappingStatistic<StatisticData>());
                mc.AddProfile(new MappingWellBeing<WellBeingData>());
                mc.AddProfile(new MappingMood<MoodData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);

            services.AddSingleton<ApplicationContext>();

            services.AddTransient<IUser<User>, WorkingWithUser>();
            services.AddTransient<IDiary<Diary>, WorkingWithDiary>();
            services.AddTransient<INote<Note>, WorkingWithNote>();
            services.AddTransient<ISchedule<Schedule>, WorkingWithSchedule>();
            services.AddTransient<ITarget<Target>, WorkingWithTarget>();
            services.AddTransient<IFinance<Finance>, WorkingWithFinance>();
            services.AddTransient<ISkill<Skill>, WorkingWithSkill>();
            services.AddTransient<IStatistic<Statistic>, WorkingWithStatistic>();
            services.AddTransient<IWellBeing<WellBeing>, WorkingWithWellBeing>();
            services.AddTransient<IMood<Mood>, WorkingWithMood>();

            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseFileServer(new FileServerOptions()
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.ContentRootPath, "node_modules")
                ),
                RequestPath = "/node_modules",
                EnableDirectoryBrowsing = false
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=General}/{action=General}/{id?}");
            });
        }
    }
}
