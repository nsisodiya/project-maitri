import UniBus from './../UniBus';

const bridge = new UniBus();

bridge.on('FROM_Parent', function(param1, param2) {
  console.log('Message received from Parent inside Frame2', typeof param1, param1, param2);
});
bridge.on('FROM_IFRAME1', function(param1, param2) {
  console.log('Iframe to Iframe Communication - Received FROM_IFRAME1 on frame2', typeof param1, param1, param2);
});

bridge.on('FROM_IFRAME2', function(param1, param2) {
  console.log('This was published and catched inside iframe2', typeof param1, param1, param2);
});

window.setTimeout(function() {
  bridge.emit('FROM_IFRAME2', { from: 'child2', val: '187' }, { s: 8 });
  bridge.emit('FROM_IFRAME2', { from: 'child2', val: '188' }, { s: 9 });
}, 2000);
