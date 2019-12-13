let socket = null;
let toBeKilled = false;
const events = {};
export const setSocketEvent = (name, event) => {
  events[name] = event;
};
export const socketSend = data => {
  try {
    socket.send(JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};
export const socketConnect = server => {
  try {
    if (socket) {
      socketKill();
    }

    socket = new WebSocket(`${server}`);

    socket.onopen = () => {
      console.log('WebSockets connection created.');
    };

    socket.onmessage = message => {
      const parsedMessage = JSON.parse(message.data);
      events[parsedMessage.type](parsedMessage.data);
    };

    socket.onclose = () => {
      if (!toBeKilled) {
        socket = null;
        socketConnect();
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const socketKill = () => {
  toBeKilled = true;
  socket && socket.close();
  socket = null;
  toBeKilled = false;
  console.log('WebSockets connection killed.');
};