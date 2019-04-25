import './main.css';

function createIframe(src, cls) {
  var frame = document.createElement('iframe');
  frame.src = src;
  frame.classList.add(cls);

  frame.onload = function() {
    // If this is a Chrome content script, contentWindow is offlimits.
    frame.contentWindow.postMessage('A Message!', "https://<the mothership's domain>");
  };

  document.body.appendChild(frame);
}
createIframe('http://localhost:3000', 'frame1');
createIframe('http://localhost:4200', 'frame2');
