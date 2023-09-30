class KeyInterceptor {

    dotnet;
    keyDownOptions= new Map();
    
    initialize(dotnet) {
        this.dotnet = dotnet;
        document.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    connect(elementId, options /* TODO: supply correct options from keyInterceptionOptions */) {
        if(!elementId) return;
        this.keyDownOptions.set(elementId, options);
    }

    disconnect(elementId) {
        this.keyDownOptions.delete(elementId);
    }
    
    onKeyDown(args){
        const options = this.keyDownOptions.get(args.target.id);
        if(!options) return;
        
        //TODO: check and handle options correctly
        const eventArgs = this.toKeyboardEventArgs(args);
        
        this.dotnet.invokeMethodAsync("OnKeyDown", args.target.id, eventArgs);
    }

    toKeyboardEventArgs(args) {
        return {
            Key: args.key,
            Code: args.code,
            Location: args.location,
            Repeat: args.repeat,
            CtrlKey: args.ctrlKey,
            ShiftKey: args.shiftKey,
            AltKey: args.altKey,
            MetaKey: args.metaKey
        };
    }
}

window.keyInterceptor = new KeyInterceptor();