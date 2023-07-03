import { Worker } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import "./App.css";
import { CustomPDFViewer } from "./Components/PDFViewer";
import { setLastJSONMessage, setWebSocketConnection } from "./Strore/WebsocketSlice";
import  ImageWithCanvas  from "./Components/sample";


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

  const imageSrc = 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg';
  const canvasWidth = 800;
  const canvasHeight = 600;
  const canvases = [
    { x: 100, y: 100, width: 200, height: 200 },
    { x: 400, y: 200, width: 150, height: 250 },
    // Add more canvas objects as needed
  ];

  return (

    <Container fluid style={{ paddingTop: 20 }}>
      <Row xs={12}>
        <Col xs={5} >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <CustomPDFViewer />
          </Worker>
        </Col>
        <Col xs={5}>
          {/* <ImageWithCanvas 
           imageSrc={imageSrc}
           canvasWidth={canvasWidth}
           canvasHeight={canvasHeight}
           canvases={canvases}
            /> */}
          {/* <LoadSelectedThumbnails /> */}
        </Col>
      </Row>
    </Container>

  );
}

export default App;
