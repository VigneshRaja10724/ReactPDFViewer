import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Worker } from "@react-pdf-viewer/core";
import { SelectThumbnail } from "./Components/SelectThumbnail";
import { Container, Row, Col } from "react-bootstrap";
import { LoadSelectedThumbnails } from "./Components/LoadThumbnails";

function App() {
  const [selectedPages, setSelectedPages] = useState<any[]>([]);

  
  const handelSelectedPages = (pages: any) =>{
    setSelectedPages(pages);
  }

  return (

    <Container fluid style={{ paddingTop: 20 }}>
      <Row xs={12}>
          <Col xs={6} >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <SelectThumbnail selectedArray = {handelSelectedPages} />
        </Worker>
          </Col>
        <Col xs={5}>
          <LoadSelectedThumbnails pages={selectedPages}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
