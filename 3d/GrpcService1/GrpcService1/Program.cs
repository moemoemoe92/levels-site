using GrpcService1.Services;
using Microsoft.AspNetCore.Server.Kestrel.Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddGrpc(options =>
{
    options.EnableDetailedErrors = true;
    options.MaxReceiveMessageSize = 4 * 1024 * 1024; // 4 MB
    options.MaxSendMessageSize = 4 * 1024 * 1024; // 4 MB
});

// Add gRPC reflection for development
builder.Services.AddGrpcReflection();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
    });
});

// Configure Kestrel
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http2;
    });

    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
        listenOptions.UseHttps();
    });
});

// Add health checks
builder.Services.AddHealthChecks();

// Add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseCors("AllowAll");

// Map gRPC services
app.MapGrpcService<GreeterService>();

// Map gRPC reflection service in development
if (app.Environment.IsDevelopment())
{
    app.MapGrpcReflectionService();
}

// Health check endpoint
app.MapHealthChecks("/health");

// Root endpoint
app.MapGet("/", () => Results.Json(new
{
    service = "Levels Café gRPC Service",
    version = "1.0.0",
    status = "running",
    endpoints = new
    {
        grpc = "Use gRPC client to communicate",
        health = "/health",
        documentation = "https://go.microsoft.com/fwlink/?linkid=2086909"
    }
}));

// Swagger-like endpoint for service info
app.MapGet("/info", () => Results.Json(new
{
    serviceName = "Levels Café gRPC Service",
    version = "1.0.0",
    author = "Mohammed",
    description = "gRPC microservice for Levels Café with Anthropic Claude AI integration",
    services = new[]
    {
        new { name = "Greeter.SayHello", description = "Simple greeting service" },
        new { name = "Greeter.GetClaudeResponse", description = "Get AI response from Claude" }
    },
    features = new[]
    {
        "gRPC communication",
        "Anthropic Claude AI integration",
        "Health checks",
        "Detailed error logging",
        "CORS support"
    }
}));

app.Logger.LogInformation("🚀 Levels Café gRPC Service started successfully!");
app.Logger.LogInformation("📍 Listening on http://localhost:5000 (HTTP/2)");
app.Logger.LogInformation("📍 Listening on https://localhost:5001 (HTTP/1.1 + HTTP/2)");

await app.RunAsync();
