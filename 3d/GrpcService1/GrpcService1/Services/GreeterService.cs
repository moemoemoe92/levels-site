using Grpc.Core;
using GrpcService1;
using Anthropic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace GrpcService1.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    private readonly IConfiguration _configuration;
    private readonly AnthropicClient _anthropicClient;

    public GreeterService(ILogger<GreeterService> logger, IConfiguration configuration)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        
        var apiKey = _configuration["Anthropic:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new InvalidOperationException("Anthropic API key is not configured");
        }
        _anthropicClient = new AnthropicClient(apiKey);
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        if (string.IsNullOrWhiteSpace(request?.Name))
        {
            _logger.LogWarning("Received empty name in SayHello request");
            throw new RpcException(new Status(StatusCode.InvalidArgument, "Name is required"));
        }

        _logger.LogInformation("Processing SayHello request for {Name}", request.Name);
        
        return Task.FromResult(new HelloReply
        {
            Message = $"Hello {request.Name}"
        });
    }

    public override async Task<ClaudeReply> GetClaudeResponse(ClaudeRequest request, ServerCallContext context)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request?.Prompt))
            {
                _logger.LogWarning("Received empty prompt in GetClaudeResponse request");
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Prompt is required"));
            }

            _logger.LogInformation("Processing Claude request with prompt length: {Length}", request.Prompt.Length);

            var messageRequest = new CreateMessageRequest
            {
                Model = "claude-3-5-sonnet-20241022",
                MaxTokens = 1024,
                Messages = new List<AnthropicMessage>
                {
                    new AnthropicMessage { Role = "user", Content = request.Prompt }
                }
            };

            var response = await _anthropicClient.Messages.CreateAsync(messageRequest)
                .ConfigureAwait(false);

            if (string.IsNullOrEmpty(response?.Content))
            {
                _logger.LogError("Received empty response from Claude API");
                throw new RpcException(new Status(StatusCode.Internal, "Failed to get response from Claude"));
            }

            _logger.LogInformation("Successfully processed Claude request");
            
            return new ClaudeReply
            {
                Response = response.Content
            };
        }
        catch (Exception ex) when (ex is not RpcException)
        {
            _logger.LogError(ex, "Error processing Claude request");
            throw new RpcException(new Status(StatusCode.Internal, "An error occurred processing your request"), ex.Message);
        }
    }
}
