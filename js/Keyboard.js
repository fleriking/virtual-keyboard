import { Key } from "./Key.js";
import { language } from "./language.js";
export class Keyboard {
  constructor(lang) {
    this.upperCase = false;
    this.capsLock = false;
    this.lang = lang;
    switch (lang) {
      case 'en':
        this.language = language.languageEng;
        break;
      case 'ru':
        this.language = language.languageRu;
        break;
    }
    this.keyBoardElement = document.createElement('div');
    this.keyBoardElement.className = 'keyboard';

    this.createKeyboard();



  }

  createKeyButton(key, classKey) {
    const keyElement = document.createElement('div');
    keyElement.textContent = this.upperCase ? key.key.keyUpper : key.key.keyLower;
    keyElement.className = classKey;
    keyElement.dataset.key = keyElement.textContent;
    return keyElement;
  }

  createRowKeys(startId, endId, beforeKeys, afterKeys) {
    const rowKeys = document.createElement('div');
    rowKeys.className = 'keyboard__row';
    beforeKeys.forEach(element => {
      rowKeys.append(this.createKeyButton(element.key, element.classKey));
    })

    for (let i = startId; i < endId + 1; i++) {
      const keyButton = this.createKeyButton(this.language[i], 'keyboard__standart-button');
      // keyButton.dataset.key = 'key' + i;
      rowKeys.append(keyButton);
    }

    afterKeys.forEach(element => {
      rowKeys.append(this.createKeyButton(element.key, element.classKey));
    })
    return rowKeys;
  }
  createKeyboard() {
    this.keyBoardElement.innerHTML = '';
    this.keyBoardElement.append(this.createRowKeys(0, 12, [],
      [{
        key: new Key('Backspace'),
        classKey: 'keyboard__large-button',
      },]
    ));

    this.keyBoardElement.append(this.createRowKeys(13, 24,
      [
        {
          key: new Key('Tab'),
          classKey: 'keyboard__meadle-button',
        },
      ],
      [
        {
          key: new Key('Delete'),
          classKey: 'keyboard__meadle-button',
        },
      ]
    ));

    this.keyBoardElement.append(this.createRowKeys(25, 36,
      [
        {
          key: new Key('CapsLock'),
          classKey: 'keyboard__meadle-button',
        },
      ],
      [
        {
          key: new Key('Enter'),
          classKey: 'keyboard__large-button',
        },
      ]
    ));

    this.keyBoardElement.append(this.createRowKeys(37, 46,
      [
        {
          key: new Key('Shift'),
          classKey: 'keyboard__large-button',
        },
      ],
      [
        {
          key: new Key('ArrowUp'),
          classKey: 'keyboard__large-button',
        },
        {
          key: new Key('Shift'),
          classKey: 'keyboard__large-button',
        },
      ]
    ));

    this.keyBoardElement.append(this.createRowKeys(47, 46,
      [
        {
          key: new Key('Control'),
          classKey: 'keyboard__meadle-button',
        },
        {
          key: new Key('OS'),
          classKey: 'keyboard__meadle-button',
        },
        {
          key: new Key('Alt'),
          classKey: 'keyboard__meadle-button',
        },
        {
          key: new Key(' '),
          classKey: 'keyboard__extra-large-button',
        },
      ],
      [
        {
          key: new Key('Alt'),
          classKey: 'keyboard__meadle-button',
        },
        {
          key: new Key('Control'),
          classKey: 'keyboard__meadle-button',
        },
        {
          key: new Key('ArrowLeft'),
          classKey: 'keyboard__large-button',
        },
        {
          key: new Key('ArrowDown'),
          classKey: 'keyboard__large-button',
        },
        {
          key: new Key('ArrowRight'),
          classKey: 'keyboard__large-button',
        },
      ]
    ));
  }
  changeShift() {
    this.upperCase = this.upperCase ? false : true;
    // console.log(this.upperCase);
    this.createKeyboard();
  }
  toUpper() {
    this.upperCase = true;
    this.capsLock = true;
    this.createKeyboard();
  }
  toLower() {
    this.upperCase = false;
    this.capsLock = false;
    this.createKeyboard();
  }
  switchLang(){
    console.log('switch');
    if (this.language === language.languageEng) {
      this.language = language.languageRu;
      this.lang = 'ru';
    } else {
      this.language = language.languageEng;
      this.lang = 'en'
    }
    this.createKeyboard();
    return this.lang;
  }

}