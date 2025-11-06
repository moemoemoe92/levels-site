using Grpc.Core;
using GrpcService1;
using Anthropic.SDK;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using System.Text;

namespace GrpcService1.Services;

/// <summary>
/// Greeter Service with Anthropic Claude AI integration
/// خدمة التحية مع تكامل Anthropic Claude AI
/// </summary>
public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    private readonly IConfiguration _configuration;
    private readonly AnthropicClient? _anthropicClient;
    private readonly bool _isAnthropicConfigured;

    // Performance metrics
    private static int _totalRequests = 0;
    private static int _successfulRequests = 0;
    private static int _failedRequests = 0;

    public GreeterService(ILogger<GreeterService> logger, IConfiguration configuration)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));

        // Try to initialize Anthropic client
        var apiKey = _configuration["Anthropic:ApiKey"];
        if (!string.IsNullOrEmpty(apiKey) && !apiKey.Contains("your-api-key"))
        {
            try
            {
                _anthropicClient = new AnthropicClient(apiKey);
                _isAnthropicConfigured = true;
                _logger.LogInformation("✅ Anthropic Claude client initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "⚠️ Failed to initialize Anthropic client");
                _isAnthropicConfigured = false;
            }
        }
        else
        {
            _logger.LogWarning("⚠️ Anthropic API key is not configured. Claude AI features will be disabled.");
            _isAnthropicConfigured = false;
        }
    }

    /// <summary>
    /// Simple greeting service
    /// </summary>
    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        Interlocked.Increment(ref _totalRequests);

        try
        {
            if (string.IsNullOrWhiteSpace(request?.Name))
            {
                _logger.LogWarning("Received empty name in SayHello request");
                Interlocked.Increment(ref _failedRequests);
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Name is required"));
            }

            _logger.LogInformation("Processing SayHello request for {Name}", request.Name);

            // Generate personalized greeting based on name
            var greeting = GeneratePersonalizedGreeting(request.Name);

            Interlocked.Increment(ref _successfulRequests);

            return Task.FromResult(new HelloReply
            {
                Message = greeting
            });
        }
        catch (RpcException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error in SayHello");
            Interlocked.Increment(ref _failedRequests);
            throw new RpcException(new Status(StatusCode.Internal, "An unexpected error occurred"));
        }
    }

    /// <summary>
    /// Get AI response from Claude
    /// </summary>
    public override async Task<ClaudeReply> GetClaudeResponse(ClaudeRequest request, ServerCallContext context)
    {
        Interlocked.Increment(ref _totalRequests);
        var stopwatch = Stopwatch.StartNew();

        try
        {
            // Validate request
            if (string.IsNullOrWhiteSpace(request?.Prompt))
            {
                _logger.LogWarning("Received empty prompt in GetClaudeResponse request");
                Interlocked.Increment(ref _failedRequests);
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Prompt is required"));
            }

            // Check if Anthropic is configured
            if (!_isAnthropicConfigured || _anthropicClient == null)
            {
                _logger.LogWarning("Anthropic client is not configured. Returning fallback response.");
                Interlocked.Increment(ref _failedRequests);

                return new ClaudeReply
                {
                    Response = "⚠️ Anthropic Claude AI is not configured. Please add your API key to appsettings.json to enable AI features.\n\nFallback response: Thank you for your message! The AI service is currently unavailable."
                };
            }

            _logger.LogInformation("Processing Claude request with prompt length: {Length}", request.Prompt.Length);

            // Rate limiting check (simple implementation)
            if (request.Prompt.Length > 10000)
            {
                _logger.LogWarning("Prompt too long: {Length}", request.Prompt.Length);
                Interlocked.Increment(ref _failedRequests);
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Prompt is too long (max 10000 characters)"));
            }

            // Create Claude request
            var messageRequest = new CreateMessageRequest
            {
                Model = "claude-3-5-sonnet-20241022",
                MaxTokens = 1024,
                Messages = new List<AnthropicMessage>
                {
                    new AnthropicMessage
                    {
                        Role = "user",
                        Content = request.Prompt
                    }
                },
                Temperature = 1.0m,
                SystemMessage = "You are a helpful assistant for Levels Café, a specialty coffee shop and gaming lounge in Riyadh. Be friendly, informative, and enthusiastic about coffee and gaming."
            };

            // Call Claude API
            var response = await _anthropicClient.Messages.CreateAsync(messageRequest, context.CancellationToken)
                .ConfigureAwait(false);

            if (string.IsNullOrEmpty(response?.Content))
            {
                _logger.LogError("Received empty response from Claude API");
                Interlocked.Increment(ref _failedRequests);
                throw new RpcException(new Status(StatusCode.Internal, "Failed to get response from Claude"));
            }

            stopwatch.Stop();
            _logger.LogInformation("✅ Successfully processed Claude request in {ElapsedMs}ms", stopwatch.ElapsedMilliseconds);

            Interlocked.Increment(ref _successfulRequests);

            return new ClaudeReply
            {
                Response = response.Content
            };
        }
        catch (RpcException)
        {
            throw;
        }
        catch (TaskCanceledException)
        {
            _logger.LogWarning("Claude request was cancelled");
            Interlocked.Increment(ref _failedRequests);
            throw new RpcException(new Status(StatusCode.Cancelled, "Request was cancelled"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing Claude request");
            Interlocked.Increment(ref _failedRequests);
            throw new RpcException(new Status(StatusCode.Internal, "An error occurred processing your request"), ex.Message);
        }
    }

    /// <summary>
    /// Generate personalized greeting
    /// </summary>
    private string GeneratePersonalizedGreeting(string name)
    {
        var greetings = new[]
        {
            $"مرحباً {name}! أهلاً بك في مقهى ليفيلز ☕",
            $"Hello {name}! Welcome to Levels Café 🎮",
            $"أهلاً وسهلاً {name}! نتمنى لك وقتاً ممتعاً معنا 🌟",
            $"Welcome {name}! Enjoy your time at Levels Café ☕🎮",
            $"مرحباً {name}! استمتع بأفضل قهوة وألعاب في المدينة 🚀"
        };

        var random = new Random();
        return greetings[random.Next(greetings.Length)];
    }

    /// <summary>
    /// Get service statistics
    /// </summary>
    public static (int total, int successful, int failed, double successRate) GetStatistics()
    {
        var total = _totalRequests;
        var successful = _successfulRequests;
        var failed = _failedRequests;
        var successRate = total > 0 ? (double)successful / total * 100 : 0;

        return (total, successful, failed, successRate);
    }
}
