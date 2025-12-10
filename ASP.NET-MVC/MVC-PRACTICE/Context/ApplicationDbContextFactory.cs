using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MVC_PRACTICE.Context;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        // 1. Build configuration to access appsettings.json
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json") // Load your settings
            .Build();

        // 2. Get the connection string
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            // Throw an informative error if the string is missing
            throw new InvalidOperationException("Could not find a connection string named 'DefaultConnection' in appsettings.json.");
        }

        // 3. Configure the DbContext options
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseSqlServer(connectionString); // Assumes you have the Microsoft.EntityFrameworkCore.SqlServer package

        // 4. Return the new DbContext instance
        return new ApplicationDbContext(optionsBuilder.Options);
    }
}