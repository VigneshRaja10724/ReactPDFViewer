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
import { CloseButton, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { deletedPages, totalPages } from "../Strore/SelecetedPageSclice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Strore/store";
import { useState } from "react";
import { pageSelected } from "../Strore/SelecetedPageSclice";
import { Sidebar } from "./Sidebar";

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

  const [selectedPages, setSelectedPages] = useState<any[]>([0]);
  const [color, setColor] = useState<string>("rgba(0, 0, 0, 0.3)");

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
    dispatch(totalPages(pages));
  };

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
          <label>
            <input type="radio" value="Ship" />
            Ship
          </label>{"  "}
          <label>
            <input type="radio" value="Non-Ship" />
            Non-Ship
          </label>
          <div style={{ border: "1px solid rgba(0, 0, 0, 0.1)", textAlign: "center",  width: "12rem" }}>Medical Records</div>
          <Row xs={7}>
            <Col xs={3} style={{borderRight: "1px solid rgba(0, 0, 0, 0.2)", height : "46.7rem",width: "3rem"}}><Sidebar /></Col>
            <Col xs={4} style={{height : "46rem",  width: "10rem"}}><Thumbnails renderThumbnailItem={renderThumbnailItem} /></Col>
          </Row>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Viewer
            fileUrl="assets/sample.pdf"
            onDocumentLoad={handleDocumentLoad}
            plugins={[thumbnailPluginInstance, toolbarPluginInstance]}
          />
        </div>
      </div>
    </>
  );
};
