import { attachmentPlugin } from '@react-pdf-viewer/attachment';
import { DocumentLoadEvent, MinimalButton, RotateDirection, Viewer } from "@react-pdf-viewer/core";
import {
  RotateBackwardIcon,
  RotateForwardIcon
} from "@react-pdf-viewer/rotate";
import {
  RenderThumbnailItemProps,
  thumbnailPlugin
} from "@react-pdf-viewer/thumbnail";
import { ToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { useEffect, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deletedPages, pageSelected, totalPages } from "../Strore/SelecetedPageSclice";
import { ZoomArea } from '../Types/ZoomArea';
import { Sidebar } from "./Sidebar";
import { RenderZoomProps } from '@react-pdf-viewer/zoom';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import { deflate } from 'zlib';

export const CustomPDFViewer = () => {

  const dispatch = useDispatch();

  const thumbnailPluginInstance = thumbnailPlugin({
    thumbnailWidth: 100,
  });
  const { Thumbnails } = thumbnailPluginInstance;

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const rotatePluginInstance = toolbarPluginInstance.rotatePluginInstance;
  const { RotatePage } = rotatePluginInstance;

  const attachmentPluginInstance = attachmentPlugin();
  const { Attachments } = attachmentPluginInstance;
  const [totalPDFPages, setTotalPDFPages] = useState<any>(0);
  const [currentPage, setCurrenrPage] = useState<number>(1);
  const [startPageNumber, setStartPageNumber] = useState<number>();
  const [endPageNumber, setEndPageNumber] = useState<number>();
  const [selectedPages, setSelectedPages] = useState<any[]>([0]);
  const [color, setColor] = useState<string>("rgba(0, 0, 0, 0.3)");
  const [selectedOption, setSelectedOption] = useState("Ship");
  const [docTitle, setDocTitle] = useState();
  const [showAttachment, setShowAttachment] = useState(false)
  const [url, setUrl] = useState("assets/MultiPage.pdf");
  const [header, setHeader] = useState();


  const rotateForward = (props: any) => {
    const selectedPageNumbers = selectedPages.filter(Number.isFinite);
    selectedPageNumbers.map((pages) => {
      props.onRotatePage(pages, RotateDirection.Forward);
    });
  };

  const rotateBackward = (props: any) => {
    const selectedPageNumbers = selectedPages.filter(Number.isFinite);
    selectedPageNumbers.map((pages) => {
      props.onRotatePage(pages, RotateDirection.Backward);
    });
  };

  const deletePages = () => {
    dispatch(deletedPages(selectedPages));
  };

  const handleChoosePage = (e: any, props: any) => {
    console.log(props)
    // console.log("initial", props.renderPageThumbnail.props.pageRotation);
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

  const pageNumbers = Array.from({ length: totalPDFPages }, (index: number) => index + 1);
  const lastValue = pageNumbers.length;
  // const lastIndex = pageNumbers.lastIndexOf(lastValue);

  useEffect(() => {
    if (pageNumbers.length > 10) {
      const splitPages = pageNumbers.length / 2;
      const endVale = Math.round(splitPages);
      const startIndex = (currentPage - 1) * endVale;
      const endIndex = startIndex + endVale;
      if (startIndex >= 0 && endIndex <= lastValue) {
        setStartPageNumber(startIndex);
        setEndPageNumber(endIndex);
      }
    } else {

      setStartPageNumber(1);
      setEndPageNumber(pageNumbers.length);
    }
    // const displayedPages = pageNumbers.slice(startIndex, endIndex);

  }, [totalPDFPages, currentPage])

  const ShowNextPage = () => {
    const currentValue = currentPage * 19;
    if (currentValue < lastValue) {
      setCurrenrPage(currentPage + 1);
    }
  }
  const ShowPreviousPage = () => {
    if (currentPage > 1) {
      setCurrenrPage(currentPage - 1);
    }
  }

  const [showMarquee, setShowMarquee] = useState<boolean>(true);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);
  const [scale, setScale] = useState<number>(1);
  // const [zoomArea, setZoomArea] = useState<ZoomArea | null>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    if (event.button === 0 && !showMarquee) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setStartX(clientX - left);
      setStartY(clientY - top);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (startX !== null && startY !== null && !showMarquee) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();

      setEndX(clientX - left);
      setEndY(clientY - top);
    }
  };

  const handleMouseUp = () => {
    if (startX !== null && startY !== null && endX !== null && endY !== null && !showMarquee) {
      // console.log('Selected Area:', { startX, startY, endX, endY });
    if(scale < 2){
      console.log("h")
      setScale(scale + 0.5)
    }
    }

    setStartX(null);
    setStartY(null);
    setEndX(null);
    setEndY(null);

  };

  const handleMarquee = () => {
    setShowMarquee(false)
  }

  const handleFit = (props: any) => {
    props.onZoom(SpecialZoomLevel.PageFit)
    setShowMarquee(true)
      setScale(1)
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
              Print
            } = slots;
            return (
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  width: "100%",
                }}
              >
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">Previous</Tooltip>}
                >
                  <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                    <img src="icons/rewind.svg" onClick={ShowPreviousPage} />
                  </div>
                </OverlayTrigger>
                {' '}{startPageNumber} - {endPageNumber}{' '}
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">Next</Tooltip>}
                >
                  <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                    <img src="icons/fast-forward.svg" onClick={ShowNextPage} />
                  </div>
                </OverlayTrigger>
                {
                  showMarquee ?
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip-2">Marquee Zoom</Tooltip>}
                    >
                      <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                        <img src="icons/search.svg" onClick={handleMarquee} />
                      </div>
                    </OverlayTrigger> :
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip-2">Fit width</Tooltip>}
                    >
                      <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                        <Zoom>
                          {
                            (props: RenderZoomProps) => (
                              <img src="icons/search-heart.svg" onClick={() => handleFit(props)} />
                            )
                          }
                        </Zoom>
                      </div>
                    </OverlayTrigger>
                }

                <div style={{ padding: "0px 2px" }}>
                  <ZoomOut />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Zoom levels={[0.8, 1.2, 1.6, 2.4, 3.2]} />
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
                  <Print />
                </div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">Forward</Tooltip>}
                >
                  <div style={{ padding: "0px 2px" }}>
                    <RotatePage>
                      {(props) => (
                        <MinimalButton onClick={() => rotateForward(props)}>
                          <RotateForwardIcon />
                        </MinimalButton>
                      )}
                    </RotatePage>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">Backward</Tooltip>}
                >
                  <div>
                    <RotatePage>
                      {(props) => (
                        <MinimalButton onClick={() => rotateBackward(props)}>
                          <RotateBackwardIcon />
                        </MinimalButton>
                      )}
                    </RotatePage>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                >
                  <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                    <img src="icons/trash.svg" onClick={deletePages} />
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 50, hide: 100 }}
                  overlay={<Tooltip id="button-tooltip-2">Attachments</Tooltip>}
                >
                  <div style={{ padding: "0px 10px", cursor: "pointer" }}>
                    <img src="icons/paperclip.svg" onClick={() => { setShowAttachment(!showAttachment) }} />
                  </div>
                </OverlayTrigger>
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
            <Col xs={3} style={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)", height: "46.7rem", width: "3rem" }}>
              <Sidebar
                selectedOption={selectedOption}
                docName={handelDocTitle}
                url={setUrl}
                header={setHeader} />
            </Col>
            <Col xs={4} style={{ height: "46rem", width: "10rem" }}><Thumbnails renderThumbnailItem={renderThumbnailItem} /></Col>
          </Row>
        </div>
        <div
          style={{
            flex: 1,
            width: "45rem",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {showAttachment &&
            <div >
              <Attachments />
            </div>}
          <div
            className='viewer'
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{

              cursor: !showMarquee ? "zoom-in" : "default",
              transformOrigin: `${startX}px ${startY}px `,
              transform:  `scale(${scale})`,
              userSelect: !showMarquee ? 'none' : "text",
            }}>
            <Viewer
              fileUrl={url}
              httpHeaders={header}
              onDocumentLoad={handleDocumentLoad}
              plugins={[thumbnailPluginInstance, toolbarPluginInstance, attachmentPluginInstance]}
            />
            {!showMarquee && startX !== null && startY !== null && endX !== null && endY !== null && (
              <div
                style={{
                  position: 'absolute',
                  left: Math.min(startX, endX),
                  top: Math.min(startY, endY),
                  width: Math.abs(endX - startX),
                  height: Math.abs(endY - startY),
                  border: '2px solid red',
                }}
              />
            )
            }
          </div>
        </div>
      </div>
    </>
  );
};
