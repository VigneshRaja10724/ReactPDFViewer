import { Worker } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import "./App.css";
import { CustomPDFViewer } from "./Components/PDFViewer";
import { setLastJSONMessage, setWebSocketConnection } from "./Strore/WebsocketSlice";
import { LoadSelectedThumbnails } from "./Components/LoadThumbnails";


function App() {
  const [socketUrl, SetSocketUrl] = useState(
    "wss://trayapp.smartcorp.net:8889/?aHR0cDovL2xvY2FsaG9zdDo5MDkxLyMvZGFzaGJvYXJkL2hvbWU="
  );

  const socket = useWebSocket(socketUrl);
  const { readyState, sendJsonMessage, lastMessage } = socket;

  const dispatch = useDispatch();
  useEffect(() => {
    if (readyState === 1) {
      dispatch(setWebSocketConnection(socket))
    }
  }, [readyState])
  useEffect(() => {
    if (lastMessage !== null) {
      dispatch(setLastJSONMessage(lastMessage))
      // dispatch(setWebSocketConnection(socket))
    }
  }, [lastMessage])


  return (

    <Container fluid style={{ paddingTop: 20 }}>
      <Row xs={12}>
        <Col xs={5} >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <CustomPDFViewer />
          </Worker>
        </Col>
        <Col xs={5}  >
           <LoadSelectedThumbnails />
        </Col>
      </Row>
    </Container>

  );
}

export default App;
