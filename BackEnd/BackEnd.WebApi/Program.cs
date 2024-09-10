using BackEnd.WebApi.Entities;
using BackEnd.WebApi.Storage;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Register DbContext with connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ErgoDbContext>(options => options.UseNpgsql(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowAllOrigins");
}

app.UseHttpsRedirection();

app.MapPost("/api/jobs", (ErgoDbContext db, Job job) =>
{
    db.Jobs.Add(job);
    db.SaveChanges();

    return Results.Created();
});

app.MapGet("/api/jobs", (ErgoDbContext db) => Results.Ok(db.Jobs)).WithOpenApi();

app.MapGet("/api/jobs/{id}", (ErgoDbContext db, int id) =>
{
    var job = db.Jobs.First(job => job.Id == id);
    return Results.Ok(job);
}).WithOpenApi();

app.MapGet("/api/jobs", (ErgoDbContext db) => Results.Ok(db.Jobs)).WithOpenApi();

app.Run();