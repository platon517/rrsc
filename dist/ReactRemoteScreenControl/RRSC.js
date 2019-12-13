function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { throttle } from "throttle-debounce";
import { RemoteCursor } from "./RemoteCursor/RemoteCursor";
import { setSocketEvent, socketConnect, socketSend } from "../helpers/wsHelper";
import { iceServersDefault } from "../helpers/peersHelper";
import { getScrollParent } from "../helpers/getScrollableParent";
import styles from "./RRSC.module.css";
const webRtcDefaultState = {
  localStream: null,
  pc: null,
  dataChannel: null,
  pcRemote: null,
  contrUserId: 0,
  isStreamConsumer: false,
  isStreaming: false,
  isNormalCursorEnabled: false,
  mouseInVideo: false
};
export const withRRSC = WrappedComponent => {
  var _temp;

  return _temp = class ReactRemoteScreenControl extends React.PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", _objectSpread({
        cursorPosition: {
          x: 0,
          y: 0
        }
      }, webRtcDefaultState, {
        wsId: 0
      }));

      _defineProperty(this, "clamp", val => Math.min(100, Math.max(val, 0)));

      _defineProperty(this, "convertToPercentage", (x, y) => {
        const rect = this.streamedScreen.getBoundingClientRect();
        return {
          xPercent: this.clamp((x - rect.left) / (rect.width / 100)),
          yPercent: this.clamp((y - rect.top) / (rect.height / 100))
        };
      });

      _defineProperty(this, "onMouseMoveSendData", throttle(5, (xPercent, yPercent) => {
        const {
          dataChannel
        } = this.state;
        dataChannel.send(JSON.stringify({
          type: "cursorPercentPos",
          data: {
            xPercent,
            yPercent
          }
        }));
      }));

      _defineProperty(this, "onMouseMove", e => {
        const {
          dataChannel,
          isStreamConsumer,
          isNormalCursorEnabled
        } = this.state;

        if (!isNormalCursorEnabled && (dataChannel === null || dataChannel === void 0 ? void 0 : dataChannel.readyState) === "open" && isStreamConsumer) {
          const {
            xPercent,
            yPercent
          } = this.convertToPercentage(e.clientX, e.clientY);
          this.onMouseMoveSendData(xPercent, yPercent);
        }
      });

      _defineProperty(this, "onMouseClick", () => {
        const {
          dataChannel,
          isStreamConsumer
        } = this.state;

        if ((dataChannel === null || dataChannel === void 0 ? void 0 : dataChannel.readyState) === "open" && isStreamConsumer) {
          dataChannel.send(JSON.stringify({
            type: "cursorClick"
          }));
        }
      });

      _defineProperty(this, "onKeyPress", e => {
        const {
          dataChannel,
          isStreamConsumer
        } = this.state;

        if ((dataChannel === null || dataChannel === void 0 ? void 0 : dataChannel.readyState) === "open" && isStreamConsumer) {
          dataChannel.send(JSON.stringify({
            type: "keyPress",
            data: {
              keyCode: e.keyCode,
              which: e.which
            }
          }));
        }
      });

      _defineProperty(this, "onKeyDown", e => {
        const {
          dataChannel,
          isStreamConsumer
        } = this.state;
        const {
          normalCursorKey = 16
        } = this.props;

        if (e.keyCode === normalCursorKey) {
          this.setState({
            isNormalCursorEnabled: true
          });
        }

        if ((dataChannel === null || dataChannel === void 0 ? void 0 : dataChannel.readyState) === "open" && isStreamConsumer) {
          dataChannel.send(JSON.stringify({
            type: "keyDown",
            data: {
              keyCode: e.keyCode,
              which: e.which
            }
          }));
        }
      });

      _defineProperty(this, "onKeyUp", e => {
        const {
          normalCursorKey = 16
        } = this.props;

        if (e.keyCode === normalCursorKey) {
          this.setState({
            isNormalCursorEnabled: false
          });
        }
      });

      _defineProperty(this, "onScrollSendData", throttle(10, direction => {
        const {
          dataChannel,
          isStreamConsumer
        } = this.state;

        if ((dataChannel === null || dataChannel === void 0 ? void 0 : dataChannel.readyState) === "open" && isStreamConsumer) {
          dataChannel.send(JSON.stringify({
            type: "scroll",
            data: {
              direction
            }
          }));
        }
      }));

      _defineProperty(this, "onScroll", e => {
        if (this.state.mouseInVideo) {
          this.onScrollSendData(e.deltaY > 0);
        }
      });

      _defineProperty(this, "onMouseEnter", () => {
        document.body.style.overflow = "hidden";
        this.setState({
          mouseInVideo: true
        });
      });

      _defineProperty(this, "onMouseLeave", () => {
        document.body.style.overflow = "auto";
        this.setState({
          mouseInVideo: false
        });
      });

      _defineProperty(this, "callToStream", () => {
        const {
          contrUserId
        } = this.state;
        socketSend({
          type: "callForStream",
          data: {
            userId: contrUserId
          }
        });
      });

      _defineProperty(this, "calledToStream", userId => {
        this.setState({
          contrUserId: userId
        }, this.start);
      });

      _defineProperty(this, "start", () => {
        this.initScreenCapture().then(stream => {
          stream.getVideoTracks()[0].onended = this.disconnect;
          this.setState({
            localStream: stream,
            isStreaming: true
          }, () => this.createPeer(this.peerCreateOffer));
        }, error => {
          console.log(error);
        });
      });

      _defineProperty(this, "initScreenCapture", () => {
        if (navigator.getDisplayMedia) {
          return navigator.getDisplayMedia({
            video: true
          });
        } else if (navigator.mediaDevices.getDisplayMedia) {
          return navigator.mediaDevices.getDisplayMedia({
            video: true
          });
        } else {
          return navigator.mediaDevices.getUserMedia({
            video: {
              mediaSource: "screen"
            }
          });
        }
      });

      _defineProperty(this, "createPeer", (callback = () => {}) => {
        const {
          iceServers = iceServersDefault
        } = this.props;
        const pc = new RTCPeerConnection(iceServers);
        pc.onicecandidate = this.iceCandidatePeer;
        pc.oniceconnectionstatechange = this.iceConnectionChange;

        pc.ondatachannel = event => this.setDataChannel(event.channel);

        pc.onaddstream = stream => this.gotRemoteStream(stream);

        this.setState({
          pc
        }, callback);
      });

      _defineProperty(this, "peerCreateOffer", () => {
        const {
          pc,
          localStream,
          contrUserId
        } = this.state;
        pc.addStream(localStream);
        const dataChannel = pc.createDataChannel("cursorEvents");
        this.setDataChannel(dataChannel);
        const options = {
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1
        };
        pc.createOffer(options).then(offer => {
          pc.setLocalDescription(offer).then(() => {
            socketSend({
              type: "sendOffer",
              data: {
                userId: contrUserId,
                offer
              }
            });
          }, error => {});
        }, error => console.error("Failed to create session description", error.toString()));
      });

      _defineProperty(this, "setRemoteOffer", offer => {
        console.log("got offer: ", offer);
        this.createPeer(() => {
          const {
            pc,
            contrUserId
          } = this.state;
          const remoteDescription = new RTCSessionDescription(offer);
          pc.setRemoteDescription(remoteDescription).then(() => {
            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer).then(() => {
                socketSend({
                  type: "sendAnswer",
                  data: {
                    userId: contrUserId,
                    answer
                  }
                });
              });
            });
          });
        });
      });

      _defineProperty(this, "iceCandidatePeer", event => {
        const {
          contrUserId
        } = this.state;
        const candidate = event.candidate;

        if (candidate) {
          socketSend({
            type: "setCandidate",
            data: {
              userId: contrUserId,
              candidate
            }
          });
        }
      });

      _defineProperty(this, "addIceCandidatePeer", data => {
        const {
          pc
        } = this.state;
        const candidate = data.candidate;
        const sdpMLineIndex = data.sdpMLineIndex;
        pc.addIceCandidate(new RTCIceCandidate({
          sdpMLineIndex: sdpMLineIndex,
          candidate: candidate
        })).then(() => {});
      });

      _defineProperty(this, "iceConnectionChange", () => {
        const {
          pc
        } = this.state;
        console.log("iceConnectionState ", pc.iceConnectionState);

        if (pc.iceConnectionState === "disconnected") {
          this.disconnect();
        }
      });

      _defineProperty(this, "disconnect", (initiator = false) => {
        const {
          pc,
          localStream,
          contrUserId
        } = this.state;

        if (localStream) {
          localStream.getTracks().forEach(function (track) {
            track.stop();
          });
        }

        if (pc) {
          pc.close();
        }

        initiator && socketSend({
          type: "disconnectFromStream",
          data: {
            userId: contrUserId
          }
        });
        this.setState(_objectSpread({}, webRtcDefaultState));
      });

      _defineProperty(this, "setRemoteAnswer", answer => {
        console.log("got answer: ", answer);
        const {
          pc
        } = this.state;
        const remoteDescription = new RTCSessionDescription(answer);
        pc.setRemoteDescription(remoteDescription).then(() => {});
      });

      _defineProperty(this, "gotRemoteStream", data => {
        this.setState({
          isStreamConsumer: true,
          isStreaming: true
        });
        this.streamedScreen.srcObject = data.stream;
        this.streamedScreen.play();
      });

      _defineProperty(this, "setDataChannel", dataChannel => {
        dataChannel.onopen = () => {
          console.log("Cursor channel opened");
        };

        dataChannel.onclose = () => {
          console.log("Cursor channel closed");
        };

        dataChannel.onerror = err => {
          console.log("Cursor channel error:", err);
        };

        dataChannel.onmessage = e => {
          const parsedData = JSON.parse(e.data);

          if (parsedData.type === "cursorPercentPos") {
            const {
              xPercent,
              yPercent
            } = parsedData.data;
            this.setState({
              cursorPosition: {
                x: xPercent * (window.innerWidth / 100),
                y: yPercent * (window.innerHeight / 100)
              }
            });
          }

          if (parsedData.type === "cursorClick") {
            const {
              cursorPosition: {
                x,
                y
              }
            } = this.state;
            const element = document.elementFromPoint(x, y);

            if (element) {
              element.click();
              element.focus();
            }
          }

          if (parsedData.type === "keyPress" || parsedData.type === "keyDown") {
            const {
              cursorPosition: {
                x,
                y
              }
            } = this.state;
            const element = document.elementFromPoint(x, y);
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

            if (parsedData.type === "keyPress") {
              const char = String.fromCharCode(parsedData.data.which || parsedData.data.keyCode);
              nativeInputValueSetter.call(element, element.value + char);
            }

            if (parsedData.type === "keyDown") {
              if (parsedData.data.keyCode === 8) {
                nativeInputValueSetter.call(element, element.value.slice(0, -1));
              }
            }

            try {
              const e = new Event("input", {
                bubbles: true
              });
              element.dispatchEvent(e);
            } catch (e) {
              console.log("key simulation failed");
            }
          }

          if (parsedData.type === "scroll") {
            const {
              cursorPosition: {
                x,
                y
              }
            } = this.state;
            const element = document.elementFromPoint(x, y);
            const scrollParent = getScrollParent(element);

            if (scrollParent !== undefined) {
              parsedData.data.direction ? scrollParent.scrollTop += 5 : scrollParent.scrollTop -= 5;
            }
          }
        };

        this.setState({
          dataChannel
        });
      });

      _defineProperty(this, "setContrUserId", val => this.setState({
        contrUserId: val
      }));

      _defineProperty(this, "initDisconnect", () => this.disconnect(true));
    }

    componentDidMount() {
      const {
        server
      } = this.props;
      document.addEventListener("click", this.onMouseClick);
      document.addEventListener("keypress", this.onKeyPress);
      document.addEventListener("keydown", this.onKeyDown);
      document.addEventListener("keyup", this.onKeyUp);
      setSocketEvent("calledToStream", userId => this.calledToStream(userId));
      setSocketEvent("getOffer", offer => this.setRemoteOffer(offer));
      setSocketEvent("getAnswer", answer => this.setRemoteAnswer(answer));
      setSocketEvent("getCandidate", candidate => this.addIceCandidatePeer(candidate));
      setSocketEvent("wsIdSet", data => this.setState({
        wsId: data.id
      }));
      setSocketEvent("disconnectedFromStream", this.disconnect);
      socketConnect(server);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.onMouseClick);
      document.removeEventListener("keypress", this.onKeyPress);
      document.removeEventListener("keydown", this.onKeyDown);
      document.removeEventListener("keyup", this.onKeyUp);
    }

    render() {
      const {
        cursorPosition,
        contrUserId,
        isStreamConsumer,
        wsId,
        isStreaming,
        isNormalCursorEnabled
      } = this.state;
      const {
        RemoteCursorComponent = RemoteCursor,
        videoContainer = CustomVideoContainer,
        videoProps = {}
      } = this.props;
      return React.createElement(React.Fragment, null, React.createElement(WrappedComponent, {
        rrscMyId: wsId,
        rrscCursorPosition: cursorPosition,
        rrscIsStreaming: isStreaming,
        rrscIsStreamConsumer: isStreamConsumer,
        rrscContrUserId: contrUserId,
        rrscSetContrUserId: this.setContrUserId,
        rrscAskContrUser: this.callToStream,
        rrscDisconnect: this.initDisconnect
      }), !isStreamConsumer && isStreaming && React.createElement(RemoteCursorComponent, {
        cursorPosition: cursorPosition
      }), isStreamConsumer && videoContainer(React.createElement("video", _extends({
        ref: streamedScreen => this.streamedScreen = streamedScreen,
        controls: false
      }, videoProps, {
        style: _objectSpread({}, videoProps.style, {
          cursor: isNormalCursorEnabled ? "default" : "none"
        }),
        onWheel: this.onScroll,
        onMouseMove: this.onMouseMove,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave
      }))));
    }

  }, _temp;
};

const CustomVideoContainer = video => React.createElement("div", {
  className: styles.stream
}, video);

class TestComponent extends React.PureComponent {
  render() {
    const {
      rrscMyId,
      rrscContrUserId,
      rrscSetContrUserId,
      rrscAskContrUser,
      rrscIsStreaming,
      rrscDisconnect
    } = this.props;
    return React.createElement("div", {
      className: styles.callPlate
    }, React.createElement("div", {
      className: styles.myId
    }, "My id: ", rrscMyId), React.createElement("input", {
      value: rrscContrUserId,
      onChange: e => rrscSetContrUserId(e.target.value),
      disabled: rrscIsStreaming
    }), !rrscIsStreaming && React.createElement("button", {
      disabled: !rrscContrUserId,
      onClick: rrscAskContrUser
    }, "call"), rrscIsStreaming && React.createElement("button", {
      onClick: rrscDisconnect
    }, "disconnect"));
  }

}

export const RrscPlate = withRRSC(TestComponent);