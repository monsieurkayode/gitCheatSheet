export default class LocalStorage {
  constructor() {
    this.state = {};
  }

  static setItem = (key, value) => {
    this.state[key] = value;
  }

  static getItem = key => this.state[key];

  static removeItem = key => delete this.state[key];
}
