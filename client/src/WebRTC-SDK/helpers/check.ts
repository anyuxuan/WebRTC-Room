import { isChrome, getBrowserVersion, isFirefox, isOpera, isSafari } from '@/WebRTC-SDK/utils';

export function detectRTC(): boolean {
  let isSupport = false;
  // @ts-ignore
  const pc = !!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection);
  // @ts-ignore
  const hasRTCApi = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || (navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
  // @ts-ignore
  const hasWebSocket = !!window.WebSocket;
  if (isChrome() && getBrowserVersion() >= 56) {
    isSupport = true;
  }
  if (isFirefox() && getBrowserVersion() >= 22) {
    isSupport = true;
  }
  if (isOpera() && getBrowserVersion() >= 43) {
    isSupport = true;
  }
  if (isSafari() && getBrowserVersion() >= 11) {
    isSupport = true;
  }
  return isSupport && pc && hasRTCApi && hasWebSocket;
}
