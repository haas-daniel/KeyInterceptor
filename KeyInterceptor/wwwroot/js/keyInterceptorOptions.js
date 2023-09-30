class KeyInterceptorOptions extends HTMLElement {

    static observedAttributes = ["connect-to"];
    constructor() {
        super();
        
        const self = this;
        
        this.observer = new MutationObserver(function (mutations) {
            for(const mutation of mutations){
                if(mutation.addedNodes.length || mutation.removedNodes.length){
                    self.updateOptions(); 
                    break;
                }
            }
        });
    }
    
    updateOptions(){
        // TODO: read correct options from "key-option" child elements and call connect again
        const options = {foo: 'bar'};
        window.keyInterceptor.connect(this.getAttribute("connect-to"), options);
    }
    
    connectedCallback() {
        console.log("KeyInterceptorOptions element added to page.");
        
        this.updateOptions();
        this.observer.observe(this, { childList: true});
    }

    disconnectedCallback() {
        console.log("KeyInterceptorOptions element removed from page.");
        
        this.observer.disconnect();
        window.keyInterceptor.disconnect(this.getAttribute("connect-to"));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) return;
        
        if(name.toLowerCase() === "connect-to"){
            window.keyInterceptor.disconnect(oldValue);
            this.updateOptions();
        }
    }
    
}

window.customElements.define("key-interceptor-options", KeyInterceptorOptions);