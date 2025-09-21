using Grpc.Core;
using GrpcService1;
using Anthropic;

namespace GrpcService1.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    private readonly IConfiguration _configuration;
    public GreeterService(ILogger<GreeterService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }

    public override async Task<ClaudeReply> GetClaudeResponse(ClaudeRequest request, ServerCallContext context)
    {
        var apiKey = _configuration["Anthropic:ApiKey"];
        var client = new AnthropicClient(apiKey);

        var messageRequest = new CreateMessageRequest
        {
            Model = "claude-3-5-sonnet-20241022",
            MaxTokens = 1024,
            Messages = new List<AnthropicMessage>
            {
                new AnthropicMessage { Role = "user", Content = request.Prompt }
            }
        };

        var response = await client.Messages.CreateAsync(messageRequest);

        return new ClaudeReply
        {
            Response = response.Content
        };
    }
}
