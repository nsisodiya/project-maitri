import UniBus from './UniBus';

const bridge = new UniBus();

bridge.on('FROM_Parent', function(param1, param2) {
  console.log('Message received from Parent inside Frame1', typeof param1, param1, param2);
});

bridge.on('FROM_IFRAME1', function(param1, param2) {
  console.log('This was published and catched inside iframe1', typeof param1, param1, param2);
});
bridge.on('FROM_IFRAME2', function(param1, param2) {
  console.log('Iframe to Iframe Communication - Received FROM_IFRAME2 on frame1', typeof param1, param1, param2);
});

window.setTimeout(function() {
  bridge.emit('FROM_IFRAME1', { from: 'child1', val: '826' }, { s: 1 });
  bridge.emit('FROM_IFRAME1', { from: 'child1', val: '827' }, { s: 2 });
}, 2000);

console.log('bridge', bridge);
window.onpopstate = function(...args) {
  console.log('POP');
  console.log(...args);
};

function onPushStateCalled(...args) {
  console.log(...args);
}
var pushStateOrig = history.pushState; // eslint-disable-line
// eslint-disable-next-line
history.pushState = function() {
  pushStateOrig.apply(history, arguments); // eslint-disable-line
  onPushStateCalled('pushState', arguments); // Some event-handling function
};

window.addEventListener('replaceState', function(e) {
  console.warn('THEY DID IT AGAIN!, replaceState');
});
