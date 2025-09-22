using Grpc.Core;
using GrpcService1;
using Anthropic.SDK;

namespace GrpcService1.Services;

public class GreeterService : Greeter.GreeterBase
{
    public GreeterService() { }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }

    public override Task<ClaudeReply> GetClaudeResponse(ClaudeRequest request, ServerCallContext context)
    {
        return Task.FromResult(new ClaudeReply
        {
            Response = $"Hello! You said: {request.Prompt}"
        });
    }
}
