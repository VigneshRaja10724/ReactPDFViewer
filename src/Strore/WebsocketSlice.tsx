import { createSlice } from '@reduxjs/toolkit';
import { initializeConnect } from 'react-redux/es/components/connect';

interface WebSocketState {
  initialWebSocket: initialWebSocket;
}
interface initialWebSocket {
  getWebSocket : (message: any, keep: boolean) => void;
  lastJsonMessage: any | null;
  lastMessage: any | null;
  readyState: number;
  sendJsonMessage: (message: any, keep: boolean) => void;
  sendMessage: (message: any, keep: boolean) => void;
}
const initialState : WebSocketState = {
  initialWebSocket: {
  getWebSocket: (message: any, keep: boolean) => {},
  lastJsonMessage: null,
  lastMessage: null,
  readyState: 0,
  sendJsonMessage: (message: any, keep: boolean) => {},
  sendMessage: (message: any, keep: boolean) => {},
  }
};

export const WebsocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setWebSocketConnection: (state, action) => {
      console.log(action.payload)
      state.initialWebSocket = action.payload;
      
    },
  },
});

export const { setWebSocketConnection } = WebsocketSlice.actions;
