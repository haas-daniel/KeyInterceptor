using KeyInterceptor.Components;
using Microsoft.AspNetCore.Components.Web;

namespace KeyInterceptor.Services;

public class KeyInterceptor : IKeyInterceptor
{
    private readonly KeyInterceptorService _keyInterceptorService;
    private string _elementId = "";

    public KeyInterceptor(KeyInterceptorService keyInterceptorService)
    {
        _keyInterceptorService = keyInterceptorService;
    }
    
    public void Connect(string elementId)
    {
        if(!string.IsNullOrEmpty(_elementId)) return;
        
        _elementId = elementId;
        _keyInterceptorService.Provider.Connect(this, elementId);
    }

    public void Disconnect(string elementId)
    {
        _keyInterceptorService.Provider.Disconnect(this, elementId);
    }

    public event EventHandler<KeyboardEventArgs>? KeyDown;
    
    internal void OnKeyDown(KeyboardEventArgs eventArgs)
    {
        KeyDown?.Invoke(this, eventArgs);
    }

    public void Dispose()
    {
        Disconnect(_elementId);
    }
}