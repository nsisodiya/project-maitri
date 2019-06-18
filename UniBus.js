console.log('Loading Universal Bus for communications');
function isInsideIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
const __UniBus__ = '__UniBus__';

class UniBus {
  constructor({ iframes } = {}) {
    console.log('Creating Bus instance');
    this.insideIframe = isInsideIframe();
    this.iframes = iframes || [];
    window.__UNIBUS__TOPLEVEL__IFRAMES = this.iframes;
    this._topicList = {};
    window.addEventListener('message', this._receiveMessage.bind(this), false);
    //TODO un-subscribe
  }
  _receiveMessage(event) {
    //TODO - origin check - if (~event.origin.indexOf('http://yoursite.com')) {
    if (event.data.sender === __UniBus__) {
      const { topic, data } = event.data;
      this._spreadMessage(topic, data);
      //TODO - WE have received this message from some iframe, we need to send this message to other iframe
    }
  }
  _spreadMessage(topic, ...args) {
    if (this._topicList[topic] !== undefined) {
      this._topicList[topic].map(function(callback) {
        if (callback !== null) {
          //SKIP the unsubscribed callback !
          callback.apply(null, ...args);
        }
      });
    }
  }

  on(topic, callback) {
    if (typeof topic !== 'string' || typeof callback !== 'function') {
      throw 'EventBus Unable to subscribe - topic is not string or callback is not a function';
    }
    if (this._topicList[topic] === undefined) {
      this._topicList[topic] = [];
    }
    var i = this._topicList[topic].push(callback) - 1;
    //UnSub function !!
    return () => {
      //Setting Callback as null;
      this._topicList[topic][i] = null;
    };
  }
  emit(topic, ...args) {
    console.log('EMIT MESSAGE', topic);
    //Publish on Iframes or other things.
    var targets = [];
    if (this.insideIframe) {
      targets = [window.parent];
      //console.log('__UNIBUS__TOPLEVEL__IFRAMES', window.parent.__UNIBUS__TOPLEVEL__IFRAMES);
    } else {
      targets = this.iframes.map((f) => f.contentWindow);
    }
    targets.forEach((t) => {
      t.postMessage(
        {
          sender: __UniBus__,
          topic,
          data: args
        },
        '*'
      );
    });
    //Publish message here itself to spread inside the frames
    this._spreadMessage(topic, args);
  }
}
export default UniBus;
