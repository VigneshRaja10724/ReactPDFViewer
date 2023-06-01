import { createSlice } from '@reduxjs/toolkit';

const trayAppConfig: any = {
  "pdf.split.size.number": "100",
  "pdf.split.page.number": "1000",
  "ciox.holidays":
    "01/01/2019,07/04/2019,09/02/2019,11/28/2019,12/25/2019,09/06/2021,11/25/2021,12/24/2021,12/31/2021,01/01/2022,05/30/2022,07/04/2022,09/05/2022,11/24/2022,12/26/2022,03/11/2022,03/14/2022,09/04/2023,07/04/2023,05/29/2023,01/16/2023,12/25/2023,11/23/2023,01/16/2023",
  "pdf.split.page.limit": "3000",
  "pdf.split.by.page": "true",
  "pdf.subsidiary.split.count": "2",
  "pdf.split.by.size": "true",
  "pdf.split.size.limit": "100",
};
const eventData = { 
  eventType: "initialize",
  eventData: [JSON.stringify(trayAppConfig)],
};


export const WebsocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    connection:  {},
  },
  reducers: {
    setWebSocketConnection: (state, action) => {
      console.log(action.payload)
      state.connection = action.payload;
      const {sendJsonMessage} = action.payload;
      // console.log(eventData)
      sendJsonMessage(eventData)
    },
  },
});

export const { setWebSocketConnection } = WebsocketSlice.actions;
