// tslint:disable no-console
const Logger = {
  prefix: 'WebRTC-SDK: ',
  setPrefix(prefix: string): void {
    this.prefix = prefix;
  },
  info(...args: any[]): void {
    console.log(`${this.prefix}`, ...args);
  },
  debug(...args: any[]): void {
    console.debug(`${this.prefix}`, ...args);
  },
  error(...args: any[]): void {
    console.error(`${this.prefix}`, ...args);
  },
  warning(...args: any[]): void {
    console.warn(`${this.prefix}`, ...args);
  },
};

export default Logger;
