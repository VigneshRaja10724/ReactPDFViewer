import { attachmentPlugin } from '@react-pdf-viewer/attachment';
import { DocumentLoadEvent, MinimalButton, RotateDirection, ScrollMode, SpecialZoomLevel, Viewer } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { RotateBackwardIcon, RotateForwardIcon } from "@react-pdf-viewer/rotate";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { ToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { RenderZoomProps } from '@react-pdf-viewer/zoom';
import { useEffect, useRef, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useCustomZoomPlugin from '../Plugin/ZoomPlugin';
import { deletedPages, totalPages } from "../Strore/SelecetedPageSclice";
import { CustomThumbnail } from './CustomThumbnail';
import { Sidebar } from "./Sidebar";
import { RenderSwitchScrollModeProps, scrollModePlugin } from '@react-pdf-viewer/scroll-mode';


export const CustomPDFViewer = () => {
  const dispatch = useDispatch();


  const thumbnailPluginInstance = thumbnailPlugin({
    thumbnailWidth: 100,
  });
  const { Thumbnails, Cover } = thumbnailPluginInstance;

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const rotatePluginInstance = toolbarPluginInstance.rotatePluginInstance;
  const { RotatePage } = rotatePluginInstance;

  const attachmentPluginInstance = attachmentPlugin();
  const { Attachments } = attachmentPluginInstance;

  const customZoomPluginInstance = useCustomZoomPlugin();
  const { zoomTo } = customZoomPluginInstance;

  const scrollModePluginInstance = scrollModePlugin();
  const { SwitchScrollMode } = scrollModePluginInstance;

  const [totalPDFPages, setTotalPDFPages] = useState<any>(0);
  const [currentPage, setCurrenrPage] = useState<number>(1);
  const [startPageNumber, setStartPageNumber] = useState<number>();
  const [endPageNumber, setEndPageNumber] = useState<number>();
  const [selectedPages, setSelectedPages] = useState<any[]>([0]);
  const [showAttachment, setShowAttachment] = useState(false)

  const [selectedOption, setSelectedOption] = useState("Ship");
  const [docTitle, setDocTitle] = useState();
  const [url, setUrl] = useState("assets/MultiPage.pdf");
  const [header, setHeader] = useState();
  const [pageIndex, setPageIndex] = useState<number>(0);


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
  const [scale, setScale] = useState<number>(0.9);
  const [zoomLevel, setZoomLevel] = useState<number>(0.8)
  // const [zoomArea, setZoomArea] = useState<ZoomArea | null>(null);

  const [reduct, setReduct] = useState<boolean>(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textInputsRef = useRef<HTMLInputElement[]>([]);
  const [inputValues, setInputValues] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>();

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    const pages = ` ${e.doc.numPages}`;
    setTotalPDFPages(+pages);
    dispatch(totalPages(pages));
    // setScale(1)
  };


  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    if (event.button === 0 && !showMarquee || reduct) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setStartX(clientX - left);
      setStartY(clientY - top);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (startX !== null && startY !== null && !showMarquee || reduct) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setEndX(clientX - left);
      setEndY(clientY - top);
    }
  };

  const handleMouseUp = () => {
    if (startX !== null && startY !== null && endX !== null && endY !== null && !showMarquee || reduct) {

      if (!showMarquee) {
        // switch (scale ) {
        switch (zoomLevel) {
          case 1:
            setStartX(null);
            setStartY(null);
            setEndX(null);
            setEndY(null);
            // setScale(1.2)
            setZoomLevel(1.2)
            zoomTo(1.2)
            return
          case 1.2:
            setStartX(null);
            setStartY(null);
            setEndX(null);
            setEndY(null);
            // setScale(1.3)
            setZoomLevel(1.2)
            zoomTo(1.2)
            return
          default:
            setStartX(null);
            setStartY(null);
            setEndX(null);
            setEndY(null);
            // setScale(1)
            setZoomLevel(1)
            zoomTo(1.1)
        }
      }

      if (showMarquee && startX !== null && startY !== null && endX !== null && endY !== null) {
        if (canvasContainerRef.current) {
          const width = endX - startX;
          const height = endY - startY;

          if (width > 0 && height > 0) {

            const inputId = `${startX},${startY}`;

            // Create a text input element
            const newTextInput = document.createElement('input');
            newTextInput.type = 'text';
            newTextInput.style.position = 'absolute';
            newTextInput.style.top = `${startY}px`;
            newTextInput.style.left = `${startX}px`;
            newTextInput.style.width = `${width}px`;
            newTextInput.style.height = `${height}px`;

            // if (inputValues[inputId]) {
            //   newTextInput.value = inputValues[inputId];
            // }

            newTextInput.addEventListener('input', (event) => {
              const target = event.target as HTMLInputElement;
              const { value } = target;
              const inputValue = {
                X: startX,
                Y: startY,
                value: value
              }

              setInputValue((prevInputValues: any) => ({
                ...prevInputValues,
                X: startX,
                Y: startY,
                value: value,
              }));
            });

            canvasContainerRef.current.appendChild(newTextInput);

            textInputsRef.current.push(newTextInput);
          }
        }
        setStartX(null);
        setStartY(null);
        setEndX(null);
        setEndY(null);
      }
    }
  };


  useEffect(() => {
    const updatedInputs = [...inputValues]

    if (inputValues.length >= 1) {
      const objectToUpdate = updatedInputs.find((obj: any) => obj.X === inputValue.X && obj.Y === inputValue.Y);

      if (objectToUpdate) {

        const updatedObject = { ...objectToUpdate };
        updatedObject.value = inputValue.value;

        const index = updatedInputs.indexOf(objectToUpdate);
        updatedInputs[index] = updatedObject;

        setInputValues(updatedInputs);
      } else {
        setInputValues((previousValue: any) => [...previousValue, inputValue])
      }
    } else {
      if (inputValue !== undefined) {
        setInputValues((previousValue: any) => [...previousValue, inputValue])
      }
    }


  }, [inputValue]);

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues])



  const handleMarquee = () => {
    setShowMarquee(false)
  }

  const handleFit = (props: any) => {
    props.onZoom(SpecialZoomLevel.PageFit)
    setShowMarquee(true)
    setScale(1)
  }


  const handleReduct = (props: RenderSwitchScrollModeProps) => {
    props.onClick();
    setReduct(!reduct);

  }

  const removeLatestCanvas = (props: RenderSwitchScrollModeProps) => {

    if (canvasContainerRef.current && textInputsRef.current.length > 0) {
      const latestTextInput = textInputsRef.current.pop();
      if (latestTextInput) {
        const updateInputes = [...inputValues];
        const removeInput = updateInputes.find((input) => input.value === latestTextInput.value);
        if(removeInput !==  undefined){
          const removeIndex = updateInputes.indexOf(removeInput);
          const newInputValues = updateInputes.splice(removeIndex, 1);
          setInputValues(updateInputes)
        }
        canvasContainerRef.current.removeChild(latestTextInput);
      }
    } else {
      props.onClick();

    }
  };

  const saveReduct = () =>{
    console.log("save")
  }

  // const handleZoom = (e: ZoomEvent) => {
  //   const zoomScale = e.scale;
  //   console.log(`Zoom to ${zoomScale}`);
  //   setScale(zoomScale - 0.1)
  // };

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
                  <Zoom levels={[0.3, 0.5, 0.8, 1, 1.2]} />
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
                  overlay={<Tooltip id="button-tooltip-2">Reduct</Tooltip>}
                >
                  <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                    <SwitchScrollMode mode={ScrollMode.Page}>
                      {(props: RenderSwitchScrollModeProps) => (
                        <img src="icons/eraser-fill.svg" onClick={() => handleReduct(props)} />
                      )}
                    </SwitchScrollMode>
                  </div>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">Undo</Tooltip>}
                >
                  <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                    < SwitchScrollMode mode={ScrollMode.Wrapped}>
                      {(props: RenderSwitchScrollModeProps) => (
                        <img src="icons/reply-fill.svg" onClick={() => removeLatestCanvas(props)} />
                      )}
                    </SwitchScrollMode>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">save</Tooltip>}
                >
                  <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                    <img src="icons/save.svg" onClick={saveReduct} />
                  </div>
                </OverlayTrigger>
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
            <Col xs={4} style={{ height: "46rem", width: "10rem" }}>
              <CustomThumbnail Thumbnail={Thumbnails} setPageIndex={setPageIndex} />
            </Col>
          </Row>
        </div>

        <div
          style={{
            flex: 1,
            width: "40rem",
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
              // transform: `scale(${scale})`,
              userSelect: !showMarquee || reduct ? 'none' : "text",
              position: 'relative',
              // display: 'inline-block' 
            }}>
            <Viewer
              // onZoom={handleZoom}
              fileUrl={url}
              httpHeaders={header}
              onDocumentLoad={handleDocumentLoad}
              plugins={
                [
                  thumbnailPluginInstance,
                  toolbarPluginInstance,
                  attachmentPluginInstance,
                  customZoomPluginInstance,
                  scrollModePluginInstance
                ]
              }
            />
            <div ref={canvasContainerRef} style={{ position: 'absolute', top: 0, left: 0 }} />
            {!showMarquee && startX !== null && startY !== null && endX !== null && endY !== null
              && (
                <div
                  style={{
                    position: 'absolute',
                    left: startX,
                    top: startY,

                    // left: Math.min(startX),
                    // top: Math.min(startY),
                    width: Math.abs(endX - startX),
                    height: Math.abs(endY - startY),
                    border: '2px solid black',
                  }}
                />
              )
            }
            {reduct && startX !== null && startY !== null && endX !== null && endY !== null
              && (
                <div
                  style={{
                    position: 'absolute',
                    left: startX,
                    top: startY,
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
