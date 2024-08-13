using BackEnd.WebApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.WebApi.Storage;

public class ErgoDbContext : DbContext
{
    public ErgoDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Message> Messages { get; set; }
}