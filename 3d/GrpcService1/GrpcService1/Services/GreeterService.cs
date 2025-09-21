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

        var messageRequest = new MessageRequest
        {
            Model = "claude-opus-4-1-20250805",
            MaxTokens = 1,
            Temperature = 1,
            Messages = new List<Message>
            {
                new Message { Role = "user", Content = request.Prompt }
            },
            Thinking = new Thinking
            {
                Type = "enabled",
                BudgetTokens = 21545
            }
        };

        var response = await client.Messages.CreateMessageAsync(messageRequest);

        return new ClaudeReply
        {
            Response = response.Content
        };
    }
}
