import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Worker } from "@react-pdf-viewer/core";
import { SelectThumbnail } from "./Components/SelectThumbnail";
import { Container, Row, Col } from "react-bootstrap";
import { LoadSelectedThumbnails } from "./Components/LoadThumbnails";
import { WebSocketComponent } from "./Components/WebSocket";
import { store } from "./Strore/store";
import { Provider } from "react-redux";
import { CustomPDFViewer } from "./Components/PDFViewer";

function App() {
  
 return (
<Provider store={store}>
    <Container fluid style={{ paddingTop: 20 }}>
      <Row xs={12}>
          <Col xs={7} >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {/* <SelectThumbnail  /> */}
            <CustomPDFViewer />
        </Worker>
          </Col>
        <Col xs={3}>
          <LoadSelectedThumbnails/>
        </Col>
        <Col>
        <WebSocketComponent/>
        </Col>
      </Row>
    </Container>
    </Provider>
  );
}

export default App;
