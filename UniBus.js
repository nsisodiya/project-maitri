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
    this.iframes = iframes;
    this._topicList = {};
    window.addEventListener('message', this._receiveMessage.bind(this), false);
    //TODO un-subscribe
  }
  _receiveMessage(event) {
    if (event.data.sender === __UniBus__) {
      const { topic, data } = event.data;
      this._spreadMessage(topic, data);
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
    if (this.insideIframe) {
      window.parent.postMessage(
        {
          sender: __UniBus__,
          topic,
          data: args
        },
        '*'
      );
    } else {
      //We are in main thread, now, send event to iframes
      if (this.iframes) {
        //TODO - this code is repeated. better created array of target to be published.
        this.iframes.forEach((frame) => {
          frame.contentWindow.postMessage(
            {
              sender: __UniBus__,
              topic,
              data: args
            },
            '*'
          );
        });
      }
    }
  }
}
export default UniBus;
