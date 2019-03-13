import { UAParser } from 'ua-parser-js';

interface OSInfo {
  name: string;
  version: string;
}

const uaParser = new UAParser();
const uaResult = uaParser.getResult();

export function detectRTC(): boolean {
  let isSupport = false;
  // @ts-ignore
  const pc = !!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection);
  // @ts-ignore
  const hasRTCApi = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || (navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
  // @ts-ignore
  const hasWebSocket = !!window.WebSocket;
  return isSupport && pc && hasRTCApi && hasWebSocket;
}

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
