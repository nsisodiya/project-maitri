import _ from 'lodash';

function component() {
  const element = document.createElement('h1');
  element.innerHTML = _.join(['Project Maitri', 'Started'], ' ');
  return element;
}

document.body.appendChild(component());
