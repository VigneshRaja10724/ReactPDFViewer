import {
  RenderThumbnailItemProps,
  thumbnailPlugin,
} from "@react-pdf-viewer/thumbnail";
import { DocumentLoadEvent, MinimalButton, RotateDirection, Viewer } from "@react-pdf-viewer/core";
import { ToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import {
  RotateBackwardIcon,
  RotateForwardIcon,
} from "@react-pdf-viewer/rotate";
import { Button, CloseButton, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { deletedPages, totalPages } from "../Strore/SelecetedPageSclice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Strore/store";
import { useEffect, useState } from "react";
import { pageSelected } from "../Strore/SelecetedPageSclice";
import { Sidebar } from "./Sidebar";
import { current } from "@reduxjs/toolkit";

export const CustomPDFViewer = () => {
  const dispatch = useDispatch();
  const pdf = useSelector((state: RootState) => state.selectPage);
  const thumbnailPluginInstance = thumbnailPlugin({
    thumbnailWidth: 100,
  });
  const { Thumbnails } = thumbnailPluginInstance;

  const rotateForward = (props: any) => {
    console.log(props);
    const selectedPageNumbers = selectedPages.filter(Number.isFinite);
    selectedPageNumbers.map((pages) => {
      props.onRotatePage(pages, RotateDirection.Forward);
    });
  };
  const rotateBackward = (props: any) => {
    console.log(props);
    const selectedPageNumbers = selectedPages.filter(Number.isFinite);
    selectedPageNumbers.map((pages) => {
      props.onRotatePage(pages, RotateDirection.Backward);
    });
  };
  const deletePages = () => {
    console.log("deletePages");
    dispatch(deletedPages(selectedPages));
  };

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const rotatePluginInstance = toolbarPluginInstance.rotatePluginInstance;
  const { RotatePage } = rotatePluginInstance;

  const [totalPDFPages, setTotalPDFPages] = useState<any>(0);
  const [currentPage, setCurrenrPage] = useState<number>(1);
  const [startPageNumber, setStartPageNumber] = useState<number>();
  const [endPageNumber, setEndPageNumber] = useState<number>();

  const [selectedPages, setSelectedPages] = useState<any[]>([0]);
  const [color, setColor] = useState<string>("rgba(0, 0, 0, 0.3)");

  const [selectedOption, setSelectedOption] = useState("Ship");
  const [docTitle, setDocTitle] = useState();

  const handleChoosePage = (e: any, props: any) => {
    console.log(props);
    console.log("initial", props.renderPageThumbnail.props.pageRotation);
    if (e.ctrlKey) {
      if (selectedPages[props.pageIndex] === undefined) {
        const copy = [...selectedPages];
        copy[props.pageIndex] = props.pageIndex;
        setSelectedPages(copy);
        setColor("rgba(0, 0, 0, 0.3)");
        dispatch(pageSelected(copy));
      }

      if (selectedPages[props.pageIndex] === props.pageIndex) {
        const copy = [...selectedPages];
        copy[props.pageIndex] = undefined;
        setSelectedPages(copy);
        dispatch(pageSelected(copy));
      }
    }
  };

  const renderThumbnailItem = (props: RenderThumbnailItemProps) => (
    <div
      onClick={(e) => handleChoosePage(e, props)}
      key={props.pageIndex}
      className="custom-thumbnail-item"
      data-testid={`thumbnail-${props.pageIndex}`}
      style={{
        backgroundColor:
          props.pageIndex === selectedPages[props.pageIndex] ? color : "#fff",
        cursor: "pointer",
        padding: "0.1rem",
        width: "7rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onClick={props.onJumpToPage}
      >
        {props.renderPageThumbnail}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {props.renderPageLabel}
      </div>
    </div>
  );

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    const pages = ` ${e.doc.numPages}`;
    setTotalPDFPages(+pages);
    dispatch(totalPages(pages));
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handelDocTitle = (docTitle: any) => {
    setDocTitle(docTitle);
  }

  const pageNumbers = Array.from({ length: totalPDFPages }, (_, index) => index + 1);
  const lastValue = pageNumbers.length;
  useEffect(() => {
    const startIndex = (currentPage - 1) * 19;
    const endIndex = startIndex + 19;
    const lastIndex = pageNumbers.lastIndexOf(lastValue);
    if (startIndex >= 0 && endIndex <= lastValue) {
      setStartPageNumber(startIndex);
      setEndPageNumber(endIndex);
    }
    // const displayedPages = pageNumbers.slice(startIndex, endIndex);
  }, [totalPDFPages, currentPage])

  const ShowNextPage = () => {
    const currentValue = currentPage * 19;
    if(currentValue < lastValue){
      console.log(currentPage)
      setCurrenrPage(currentPage + 1);
    }
  }
  const ShowPreviousPage = () => {
    if (currentPage > 1) {
      console.log(currentPage)
      setCurrenrPage(currentPage - 1);
    }
  }
  return (
    <>
      {/* CustomToolbar */}
      <div>
        <Toolbar>
          {(slots: ToolbarSlot) => {
            const {
              CurrentPageInput,
              Download,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Zoom,
              ZoomIn,
              ZoomOut,
              Open,
            } = slots;
            return (
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  width: "100%",
                }}
              >

                <div style={{ padding: "0px 20px" }}>
                  <img src="icons/rewind.svg" onClick={ShowPreviousPage} />
                </div>{' '}{startPageNumber} - {endPageNumber}{' '}
                <div style={{ padding: "0px 20px" }}>
                  <img src="icons/fast-forward.svg" onClick={ShowNextPage} />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomOut />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Zoom />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomIn />
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <GoToPreviousPage />
                </div>
                <div style={{ padding: "0px 2px", width: "4rem" }}>
                  <CurrentPageInput />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  / <NumberOfPages />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <GoToNextPage />
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <Download />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Open />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <RotatePage>
                    {(props) => (
                      <MinimalButton onClick={() => rotateForward(props)}>
                        <RotateForwardIcon />
                      </MinimalButton>
                    )}
                  </RotatePage>{" "}
                  <RotatePage>
                    {(props) => (
                      <MinimalButton onClick={() => rotateBackward(props)}>
                        <RotateBackwardIcon />
                      </MinimalButton>
                    )}
                  </RotatePage>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                  >
                    <CloseButton onClick={deletePages} />
                  </OverlayTrigger>
                </div>
              </div>
            );
          }}
        </Toolbar>
      </div>

      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          height: "50rem",
          // width: "50rem"
        }}
      >
        {/* Custom Thumbnail */}
        <div
          style={{
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <label>
              <input
                type="radio"
                value="Ship"
                checked={selectedOption === 'Ship'}
                onChange={handleOptionChange} />
              Ship
            </label>{"  "}
            <label>
              <input
                type="radio"
                value="Non-Ship"
                checked={selectedOption === 'Non-Ship'}
                onChange={handleOptionChange} />
              Non - Ship
            </label>
          </div>
          <div style={{ border: "1px solid rgba(0, 0, 0, 0.1)", textAlign: "center", width: "12rem" }}>{docTitle}</div>
          <Row xs={7}>
            <Col xs={3} style={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)", height: "46.7rem", width: "3rem" }}><Sidebar selectedOption={selectedOption} docName={handelDocTitle} /></Col>
            <Col xs={4} style={{ height: "46rem", width: "10rem" }}><Thumbnails renderThumbnailItem={renderThumbnailItem} /></Col>
          </Row>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Viewer
            fileUrl="assets/MultiPage.pdf"
            onDocumentLoad={handleDocumentLoad}
            plugins={[thumbnailPluginInstance, toolbarPluginInstance]}
          />
        </div>
      </div>
    </>
  );
};
