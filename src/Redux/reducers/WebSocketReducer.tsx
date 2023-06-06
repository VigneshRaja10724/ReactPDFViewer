interface WebSocketState {
  initialWebSocket: initialWebSocket;
}
interface initialWebSocket {
  getWebSocket: (message: any, keep: boolean) => void;
  lastJsonMessage: any | null;
  lastMessage: any | null;
  readyState: number;
  sendJsonMessage: (message: any, keep: boolean) => void;
  sendMessage: (message: any, keep: boolean) => void;
}
const initialState: WebSocketState = {
  initialWebSocket: {
    getWebSocket: (message: any, keep: boolean) => { },
    lastJsonMessage: null,
    lastMessage: null,
    readyState: 0,
    sendJsonMessage: (message: any, keep: boolean) => { },
    sendMessage: (message: any, keep: boolean) => { },
  }
};

export const WebSocketReducer = (state = initialState, action: any) => {

  switch (action.type) {

    case 'Set_Websocket_instance':
      return { WebSocketInit: action.payload }

    default:
      return state
  }
}