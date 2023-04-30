export class Key {
  constructor(keyLower, keyUpper = keyLower){
    this.key = {
      keyLower,
      keyUpper,
    }
  }
}