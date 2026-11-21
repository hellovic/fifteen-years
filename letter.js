const reading = document.querySelector('.reading');
const passages = [...reading.querySelectorAll('.letter p')];
const scene = reading.querySelector('.reading-scene');
const caption = reading.querySelector('[data-light]');
const evening = ['午後', '午後', '日落前', '黃昏', '薄暮', '入夜'];
let pending = false;
let currentPassage = -1;

function updateScene() {
  pending = false;
  const readingLine = window.innerHeight * 0.52;
  let activePassage = 0;

  for (const [index, passage] of passages.entries()) {
    if (passage.getBoundingClientRect().top <= readingLine) activePassage = index;
  }
  if (reading.getBoundingClientRect().bottom <= window.innerHeight) {
    activePassage = passages.length - 1;
  }

  if (activePassage === currentPassage) return;
  currentPassage = activePassage;
  const dusk = activePassage / (passages.length - 1);
  scene.style.setProperty('--dusk', dusk);
  caption.textContent = evening[activePassage];
}

function scheduleSceneUpdate() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(updateScene);
}

window.addEventListener('scroll', scheduleSceneUpdate, { passive: true });
window.addEventListener('resize', scheduleSceneUpdate);
window.addEventListener('pageshow', scheduleSceneUpdate);
updateScene();
