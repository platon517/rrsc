const STUN = {
  urls: 'stun:stun.l.google.com:19302'
};

const TURN = {
  urls: 'turn:turn.bistri.com:80',
  credential: 'homeo',
  username: 'homeo'
};

export const iceServersDefault = {
  iceServers: [STUN, TURN]
};