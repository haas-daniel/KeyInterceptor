namespace KeyInterceptor.Services;

public class KeyInterceptorFactory
{
    private readonly IServiceProvider _serviceProvider;

    public KeyInterceptorFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public IKeyInterceptor Create() => _serviceProvider.GetRequiredService<IKeyInterceptor>();
}