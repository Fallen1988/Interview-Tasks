const state = {};

function randomNumber() {
  const max = 6;
  const min = 1;
  return Math.round(Math.random() * (max - min)) + min;
}

function resetState() {
  state.angle = 0;
  state.size = 1;
  state.rotationSpeed = .7;
  state.dots = {
    top: randomNumber(),
    bottom: randomNumber()
  };
  state.selectedFace = null;

  updateDots();
  updateTransform();
  updateTransition();

  document.querySelector('#size').value = state.size;
  document.querySelector('#rotationSpeed').value = state.rotationSpeed;
}

function updateDots() {
  document.querySelector('.top').dataset.dots = String(state.dots.top);
  document.querySelector('.bottom').dataset.dots = String(state.dots.bottom);
}

function updateTransform() {
  document.querySelector('.tile').style.transform = `rotate(${state.angle}deg) scale(${state.size})`;
}

function updateTransition() {
  document.querySelector('.tile').style.transition= `${state.rotationSpeed}s`;
}

function selectFace(face) {
  state.selectedFace = face;

  const typeSelect = document.querySelector('#type');
  typeSelect.value = state.dots[face];
  typeSelect.disabled = false;
  removeTypeSelectionHint();
}

function removeTypeSelectionHint() {
  const typeSelect = document.querySelector('#type');
  const hint = typeSelect.querySelector('.hint');
  if (hint) {
    typeSelect.removeChild(hint);
  }
}

function setSelectedFaceDots(dots) {
  state.dots[state.selectedFace] = dots;
  updateDots();
}

function rotateLeft() {
  state.angle -= 90;
  updateTransform();
}

function rotateRight() {
  state.angle += 90;
  updateTransform();
}

function setSize(size) {
  state.size = size;
  updateTransform();
}

function setRotationSpeed(speed) {
  state.rotationSpeed = speed;
  updateTransition();
}

function attachEventListeners() {
  document.querySelector('#reset').addEventListener('click', () => resetState());
  document.querySelector('#rotateLeft').addEventListener('click', () => rotateLeft());
  document.querySelector('#rotateRight').addEventListener('click', () => rotateRight());

  document.querySelector('.top').addEventListener('click', () => selectFace('top'));
  document.querySelector('.bottom').addEventListener('click', () => selectFace('bottom'));

  document.querySelector('#type').addEventListener('change', e => setSelectedFaceDots(e.target.value));
  document.querySelector('#size').addEventListener('change', e => setSize(e.target.value));
  document.querySelector('#size').addEventListener('mousemove', e => setSize(e.target.value));
  document.querySelector('#rotationSpeed').addEventListener('change', e => setRotationSpeed(1 / e.target.value));
  document.querySelector('#rotationSpeed').addEventListener('mousemove', e => setRotationSpeed(1 / e.target.value));
}

function start() {
  resetState();
  attachEventListeners();
}

start();
