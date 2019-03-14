import { UAParser } from 'ua-parser-js';

interface OSInfo {
  name: string;
  version: string;
}

const uaParser = new UAParser();
const uaResult = uaParser.getResult();

export function isChrome(): boolean {
  return uaResult.browser.name === 'Chrome';
}

export function isSafari(): boolean {
  return uaResult.browser.name === 'Safari';
}

export function isFirefox(): boolean {
  return uaResult.browser.name === 'Firefox';
}

export function isOpera(): boolean {
  return uaResult.browser.name === 'Opera';
}

export function isWeChat(): boolean {
  return uaResult.browser.name === 'WeChat';
}

export function getBrowserVersion(): number {
  const version = uaResult.browser.version;
  const REG = /\d+/g;
  const majorVersion = +version.match(REG)[0];
  if (Number.isNaN(majorVersion)) {
    return -1;
  }
  return majorVersion;
}

export function getOS(): OSInfo {
  return uaResult.os;
}
