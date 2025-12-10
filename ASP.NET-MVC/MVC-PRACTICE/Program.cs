using Microsoft.EntityFrameworkCore;
using MVC_PRACTICE.Context;

var builder = WebApplication.CreateBuilder(args);

// Ensure all builder.Services.Add* calls are here:
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddControllersWithViews();


var app = builder.Build(); // <--- This line must be exactly here.


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
} else
{
    // app.MapOpenApi() is a configuration/mapping call, so it MUST be AFTER app.Build()
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// This is the mapping for your MVC controllers:
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=About}/{action=Index}/{id?}");
app.Run();