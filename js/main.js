import { Keyboard } from "./Keyboard.js"
window.onload = function () {
  const keyboard = new Keyboard('en');
  const keyboardElement = keyboard.keyBoardElement;
  const textArea = document.createElement('textarea');
  textArea.className = 'text-arae';
  // textArea.textContent = 'fsaasdasdasdas';
  textArea.disabled = true;

  document.body.append(textArea, keyboardElement);
  // keyboard.changeShift();
  document.body.querySelector

  console.log(keyboardElement);
  document.addEventListener('keydown', event => {
    if ((event.key === 'CapsLock' || event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.key === 'OS' ) && event.repeat ) {
      return;
    }
    if (event.key === 'CapsLock') {
      if (keyboard.capsLock) {
        keyboard.toLower();
      } else {
        keyboard.toUpper();
        keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
      }
      return;
    }

    if (event.key === 'Shift') {
      keyboard.changeShift();
      const shiftKeys = keyboardElement.querySelectorAll('[data-key="Shift"]');
      if (event.code === "ShiftLeft"){
        shiftKeys[0].classList.add('keyboard__active');
      } else {
        shiftKeys[1].classList.add('keyboard__active');
      }
      if (keyboard.capsLock) {
        keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
      }
      return;
    }
    if (event.key === 'Tab') {
      textArea.textContent += '\t';
      keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      event.preventDefault();
      return;
    }
    if (event.key === 'Alt') {
      const altKeys = keyboardElement.querySelectorAll('[data-key="Alt"]');
      if (event.code === "AltLeft"){
        altKeys[0].classList.add('keyboard__active');
      } else {
        altKeys[1].classList.add('keyboard__active');
      }
      // keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      event.preventDefault();
      return;
    }
    if (event.key === 'Control') {
      const controlKeys = keyboardElement.querySelectorAll('[data-key="Control"]');
      if (event.code === "ControlLeft"){
        controlKeys[0].classList.add('keyboard__active');
      } else {
        controlKeys[1].classList.add('keyboard__active');
      }
      // keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      event.preventDefault();
      return;
    }




    textArea.textContent += event.key;
    keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');

  })
  document.addEventListener('keyup', event => {
    if (event.key === 'Shift') {
      keyboard.changeShift();
      if (keyboard.capsLock) {
        keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
      }
      return;
    }
    if (event.key === 'CapsLock') {
      return;
    }
    if (event.key === 'Alt') {
      const altKeys = keyboardElement.querySelectorAll('[data-key="Alt"]');
      if (event.code === "AltLeft"){
        altKeys[0].classList.remove('keyboard__active');
      } else {
        altKeys[1].classList.remove('keyboard__active');
      }
      // keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      event.preventDefault();
      return;
    }
    if (event.key === 'Control') {
      const controlKeys = keyboardElement.querySelectorAll('[data-key="Control"]');
      if (event.code === "ControlLeft"){
        controlKeys[0].classList.remove('keyboard__active');
      } else {
        controlKeys[1].classList.remove('keyboard__active');
      }
      // keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      event.preventDefault();
      return;
    }

    keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.remove('keyboard__active');
    console.log('1');
  })




  document.addEventListener('keydown', event =>{
    console.log(event);
  })
}