using Microsoft.EntityFrameworkCore;
using MVC_PRACTICE.Models; 

namespace MVC_PRACTICE.Context;

public class ApplicationDbContext : DbContext
{

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    public DbSet<Joke> Jokes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Any custom table/schema configuration goes here
    }
}



