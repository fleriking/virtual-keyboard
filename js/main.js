import { Keyboard } from "./Keyboard.js"
window.onload = function () {
  let lang;
  if (document.cookie) {
    lang = document.cookie;
  } else {
    lang = 'en';
    document.cookie = lang;
  }
  const keyboard = new Keyboard(lang);
  const keyboardElement = keyboard.keyBoardElement;
  const textArea = document.createElement('textarea');
  textArea.placeholder = 'Change language: shift + ctrl\nWindows'
  textArea.className = 'text-arae';


  document.body.append(textArea, keyboardElement);

  document.addEventListener('keydown', event => {
    textArea.focus();
    if ((event.key === 'CapsLock' || event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.key === 'OS') && event.repeat) {
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
    if ((event.ctrlKey && event.key === 'Shift') || (event.shiftKey && event.key === 'Control')) {
      document.cookie = keyboard.switchLang();

      keyboardElement.querySelector(`[data-key="Shift"]`).classList.add('keyboard__active');
      keyboardElement.querySelector(`[data-key="Control"]`).classList.add('keyboard__active');
      if (keyboard.capsLock) {
        keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
      }
      return;
    }

    if (event.key === 'Shift') {
      keyboard.changeShift();
      const shiftKeys = keyboardElement.querySelectorAll('[data-key="Shift"]');
      if (event.code === "ShiftLeft") {
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
      event.preventDefault();
      addChar('\t', textArea);

      keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      console.log('tab');
      return;
    }
    if (event.code === 'AltLeft') {
      keyboardElement.querySelector(`[data-key="Alt"]`).classList.add('keyboard__active');
      return;
    }
    if (event.getModifierState('AltGraph')) {
      keyboardElement.querySelector(`[data-key="Control"]`).classList.remove('keyboard__active');
      keyboardElement.querySelectorAll(`[data-key="Alt"]`)[1].classList.add('keyboard__active');
      return;
    }
    if (event.code === 'AltRight') {
      keyboardElement.querySelectorAll(`[data-key="Alt"]`)[1].classList.add('keyboard__active');
      return;
    }
    if (event.key === 'Control') {
      const controlKeys = keyboardElement.querySelectorAll('[data-key="Control"]');
      if (event.code === "ControlLeft") {
        controlKeys[0].classList.add('keyboard__active');
      } else {
        controlKeys[1].classList.add('keyboard__active');
      }
      return;
    }

    if (event.key === 'Delete' || event.key === 'Backspace' || event.key === 'Enter' ||
      event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      return;
    }


    event.preventDefault();
    if (keyboardElement.querySelector(`[data-key="${event.key}"]`)) {

      addChar(event.key, textArea);
      keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
    }


  })
  document.addEventListener('keyup', event => {
    if ((event.ctrlKey && event.key === 'Shift') || (event.shiftKey && event.key === 'Control')) {
      keyboardElement.querySelector(`[data-key="Shift"]`).classList.remove('keyboard__active');
      keyboardElement.querySelector(`[data-key="Control"]`).classList.remove('keyboard__active');
      return;
    }
    if (event.key === 'Shift') {
      if (keyboard.capsLock) {
        keyboard.toUpper();
        keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
      } else {
        keyboard.toLower();
      }
      return;
    }
    if (event.key === 'CapsLock') {
      return;
    }
    if (event.getModifierState('AltGraph')) {
      keyboardElement.querySelectorAll(`[data-key="Alt"]`)[1].classList.remove('keyboard__active');
      return;
    }
    if (event.key === 'Alt') {
      const altKeys = keyboardElement.querySelectorAll('[data-key="Alt"]');
      if (event.code === "AltLeft") {
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
      if (event.code === "ControlLeft") {
        controlKeys[0].classList.remove('keyboard__active');
      } else {
        controlKeys[1].classList.remove('keyboard__active');
      }
      // keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.add('keyboard__active');
      event.preventDefault();
      return;
    }
    if (keyboardElement.querySelector(`[data-key="${event.key}"]`)) {
      keyboardElement.querySelector(`[data-key="${event.key}"]`).classList.remove('keyboard__active');
    }
  })

  document.addEventListener('mouseup', event => {
    console.log(event.target.closest('[data-key]'), event);
    
    let target = event.target.closest('[data-key]');
    if (target) {
      textArea.focus();
      if (target.className === 'keyboard__standart-button') {
        addChar(target.textContent, textArea);
        if (!keyboard.capsLock && keyboard.upperCase || keyboard.capsLock && !keyboard.upperCase) {
          keyboard.changeShift();
          target = document.elementsFromPoint(event.clientX, event.clientY)[0];
          if (keyboard.capsLock) {
            keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
          }
        }
        target.classList.add('keyboard__active');
        setTimeout(() => {
          target.classList.remove('keyboard__active');
        }, 300);
        return;
      }
      if (target.dataset.key === 'Shift') {
        keyboard.changeShift();
        target = document.elementsFromPoint(event.clientX, event.clientY)[0];
        if (!keyboard.capsLock && keyboard.upperCase || keyboard.capsLock && !keyboard.upperCase) {

          target.classList.add('keyboard__active');
        }
        if (keyboard.capsLock) {
          keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
        }
        // console.log(target);
        return;
      }
      if (target.dataset.key === 'CapsLock') {
        if (keyboard.capsLock) {
          keyboard.toLower();
        } else {
          keyboard.toUpper();
          keyboardElement.querySelector('[data-key="CapsLock"]').classList.add('keyboard__active');
        }
        return;
      }
      if (target.dataset.key === 'Tab') {
        simulateKeyPress(target.dataset.key, document);
      }
      // if (target.dataset.key === 'Delete') {
      //   textArea.focus();
      //   // simulateKeyPress('Delete',document);
      //   // setTimeout(()=>{
      //   simulateKeyPress('Delete', document);
      //   // },0)
      //   // simulateKeyPress('w',document);
      // }
      if (target.dataset.key === 'Backspace') {
        // textArea.focus();
        simulateKeyPress('Backspace',textArea, 8);
      }
      // if (target.dataset.key === ' ') {
      //   textArea.focus();
      //   simulateKeyPress(' ', document);
      // }
      // textArea.focus();
      // simulateKeyPress(target.dataset.key, document);
      if (target.dataset.key === 'Delete' || target.dataset.key === 'Backspace' || target.dataset.key === 'Enter' ||
        target.dataset.key === 'ArrowLeft' || target.dataset.key === 'ArrowUp' || target.dataset.key === 'ArrowDown' ||
         target.dataset.key === 'ArrowRight' || target.dataset.key === ' ' || target.dataset.key === 'Tab' || target.dataset.key === 'Control'
         || target.dataset.key === 'Alt' || target.dataset.key === 'OS') {
        target.classList.add('keyboard__active');
        setTimeout(() => {
          target.classList.remove('keyboard__active');
        }, 300);
        return;
      }
    }
  })
  1


  document.addEventListener('keydown', event => {
    console.log(event);
  })

  function addChar(char, node) {
    let start = node.selectionStart;
    let end = node.selectionEnd;
    node.value = node.value.substring(0, start) + char + node.value.substring(end);
    node.selectionStart = node.selectionEnd = start + 1;
  }
  function simulateKeyPress(key, node , code = 0) {
    const event = new KeyboardEvent('keydown', { key: key,code: key, keyCode: code, bubbles: true, cancelable: true, composed: true});
    node.dispatchEvent(event);
  }
}