import _ from 'lodash';

function component() {
  const element = document.createElement('h1');
  element.innerHTML = _.join(['Project Maitri', 'Started'], ' ');
  return element;
}
function createIframe(src) {
  var frame = document.createElement('iframe');
  frame.src = src;

  frame.onload = function() {
    // If this is a Chrome content script, contentWindow is offlimits.
    frame.contentWindow.postMessage('A Message!', "https://<the mothership's domain>");
  };

  document.body.appendChild(frame);
}
document.body.appendChild(component());
createIframe('http://localhost:3000');
createIframe('http://localhost:4200');
