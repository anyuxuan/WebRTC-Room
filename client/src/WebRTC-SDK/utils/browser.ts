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
