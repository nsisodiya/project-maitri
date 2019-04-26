import './main.css';

import UniBus from '../UniBus';

const frame1 = createIframe('http://localhost:3000', 'frame1');
const frame2 = createIframe('http://localhost:4200', 'frame2');

const bridge = new UniBus({
  iframes: [frame1, frame2]
});

var x = bridge.on('FROM_IFRAME1', function(param1, param2) {
  console.log('Message received from iFrame1', typeof param1, param1, param2);
});

bridge.on('FROM_Parent', function(param1, param2) {
  console.log('This was published and catched inside main and top level', typeof param1, param1, param2);
});

window.setTimeout(function() {
  bridge.emit('FROM_Parent', { from: 'parent', val: '232' }, { s: 4 });
  bridge.emit('FROM_Parent', { from: 'parent', val: '233' }, { s: 5 });
}, 2000);
console.log('bridge', bridge);

function createIframe(src, cls) {
  var frame = document.createElement('iframe');
  frame.src = src;
  frame.classList.add(cls);

  frame.onload = function() {
    // If this is a Chrome content script, contentWindow is offlimits.
    //frame.contentWindow.postMessage('A Message!');
  };

  document.body.appendChild(frame);
  return frame;
}
