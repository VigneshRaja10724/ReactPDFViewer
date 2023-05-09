import React, { createContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Worker } from "@react-pdf-viewer/core";
import { SelectThumbnail } from "./Components/SelectThumbnail";
import { Container, Row, Col } from "react-bootstrap";
import { LoadSelectedThumbnails } from "./Components/LoadThumbnails";

interface SelectedPages {
  selectedPages : any[],
  setSelectedPages : any
}
export const PageContext = createContext<SelectedPages | null>(null);
function App() {
  const [selectedPages, setSelectedPages] = useState<any[]>([]);

 

  return (
<PageContext.Provider value={{selectedPages, setSelectedPages}}>
    <Container fluid style={{ paddingTop: 20 }}>
      <Row xs={12}>
          <Col xs={6} >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <SelectThumbnail />
        </Worker>
          </Col>
        <Col xs={5}>
          <LoadSelectedThumbnails />
        </Col>
      </Row>
    </Container>
    </PageContext.Provider>
  );
}

export default App;
