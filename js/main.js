import { Keyboard } from "./Keyboard.js"
window.onload = function () {
  const keyboard = new Keyboard('en');
  const keyboardElement = keyboard.keyBoardElement;
  document.body.append(keyboardElement);
  // keyboard.changeShift();

  keyboardElement.addEventListener('keydown', event => {
    
  })




  document.addEventListener('keydown', event =>{
    console.log(event);
  })
}