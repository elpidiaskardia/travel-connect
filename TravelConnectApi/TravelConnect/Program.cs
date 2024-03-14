using TravelConnect.Application.Interface;
using TravelConnect.Application.Impl;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("cors",
  builder =>
  {
      builder.WithOrigins("https://*")
      .SetIsOriginAllowedToAllowWildcardSubdomains()
       .AllowAnyOrigin()
       .AllowAnyMethod()
       .AllowAnyHeader();
  });
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITravelConnect, TravelConnectImpl>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
public partial class Program { }