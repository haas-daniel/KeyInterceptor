using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

namespace KeyInterceptor.Services;

public interface IKeyInterceptor : IDisposable
{
    event EventHandler<KeyboardEventArgs>? KeyDown;
    void Connect(string elementId);
    void Disconnect(string elementId);
}