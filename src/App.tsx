import { useEffect, useState } from "react";
import "./App.css";

import { Worker } from "@react-pdf-viewer/core";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { LoadSelectedThumbnails } from "./Components/LoadThumbnails";
import { SelectThumbnail } from "./Components/SelectThumbnail";
import { setWebSocketConnection } from "./Strore/WebsocketSlice";


function App() {
  // const [readyState, SetreadyState] = useState<number>();
  const [socketUrl, SetSocketUrl] = useState(
    "wss://trayapp.smartcorp.net:8889/?aHR0cDovL2xvY2FsaG9zdDo5MDkxLyMvZGFzaGJvYXJkL2hvbWU="
  );


 

  // const socket = new WebSocket( "wss://trayapp.smartcorp.net:8889/?aHR0cDovL2xvY2FsaG9zdDo5MDkxLyMvZGFzaGJvYXJkL2hvbWU=");
  const  socket = useWebSocket(socketUrl);
  const {lastJsonMessage, sendJsonMessage, readyState} = socket;

  console.log(socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    // console.log(socket);
    if(readyState === 1){
      dispatch(setWebSocketConnection(socket))
    }
  },[readyState])
 
 return (

    <Container fluid style={{ paddingTop: 20 }}>
      <Row xs={12}>
          <Col xs={6} >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <SelectThumbnail  />
        </Worker>
          </Col>
        <Col xs={5}>
          <LoadSelectedThumbnails/>
        </Col>
      </Row>
      
        {/* <WebSocketComponent/> */}
    </Container>
   
  );
}

export default App;
