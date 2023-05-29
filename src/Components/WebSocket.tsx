import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

export const WebSocketComponent = () => {
  const [socketUrl, SetSocketUrl] = useState(
    "wss://trayapp.smartcorp.net:8889/?aHR0cDovL2xvY2FsaG9zdDo5MDkxLyMvZGFzaGJvYXJkL2hvbWU="
  );

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

  // //   disconnect , connect, webSocketIns
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: (e: any) => {
        // console.log(e);

        console.log("socket opened");
        console.log(e.currentTarget);
        // console.log(e.currentTarget.onopen);
      },
      onClose: () => {
        console.log("socket closed");
      },
      onMessage: (e : any) => {
        console.log("message received");
        console.log(e);
      },
      reconnectInterval: 2000,
      // shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    const eventData = { 
      eventType: "initialize",
      eventData: [JSON.stringify(trayAppConfig)],
    };
    
    if (readyState === 1) {
      console.log("initialize")
      sendJsonMessage(eventData);
    }
    console.log(lastJsonMessage)
  }, [readyState]);


useEffect(() => {
  const eventData = { 
    eventType: "trayappPoller",
    eventData: [],
  };
  const interval = setInterval(() => {
    console.log('Logs every sec');
    sendJsonMessage(eventData);
  }, 10000);

  return () => clearInterval(interval); // clear the interval
}, [])

  return (
    <>
      <p>WebSocket</p>
      <p>Last Message: {JSON.stringify(lastJsonMessage)}</p>
    </>
  );
};
