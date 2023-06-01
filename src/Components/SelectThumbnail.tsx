import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import {
  DocumentLoadEvent,
  MinimalButton,
  RotateDirection,
  Viewer
} from "@react-pdf-viewer/core";
import {
  ThumbnailIcon,
  ToolbarProps,
  ToolbarSlot,
  defaultLayoutPlugin,
} from "@react-pdf-viewer/default-layout";
import {
  RotateBackwardIcon,
  RotateForwardIcon,
} from "@react-pdf-viewer/rotate";
import type { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { ReactElement, useState } from "react";
import { CloseButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deletedPages,
  pageSelected,
  totalPages,
} from "../Strore/SelecetedPageSclice";

export const SelectThumbnail = () => {
  const dispatch = useDispatch();

  const [selectedPages, setSelectedPages] = useState<any[]>([0]);
  const [color, setColor] = useState<string>("rgba(0, 0, 0, 0.3)");
  // const [thumbnailAngle, setThumbnailAngle] = useState<any>();



  const handleChoosePage = (e: any, props: any) => {
    console.log(props);
    console.log(props.currentPage);
    // console.log(props.numPages);
    // console.log("initial", props.renderPageThumbnail.props.pageRotation);
    // setThumbnailAngle(props.renderPageThumbnail.props.pageRotation);
    // console.log(props.numPages)
    // console.log(props.onRotatePage.length)
    // console.log(props.onRotatePage.Scopes[1].pagesRotation)

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
          props.pageIndex === selectedPages[props.pageIndex]  ? color : "#fff",
          // props.pageIndex === props.currentPage ? 'rgba(0, 0, 0, 0.3)' : '#fff',
        cursor: "pointer",
        padding: "0.5rem",
        width: "100%",
      }}
    >
      <div style={{ marginBottom: "0.5rem" }} onClick={props.onJumpToPage}>
        {props.renderPageThumbnail}
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          width: "100px",
        }}
      >
        <div style={{ marginRight: "auto" }}>Page {props.renderPageLabel}</div>
      </div>
    </div>
  );

  const rotateForward = (props: any) => {
    console.log(props);
    const selectedPageNumbers = selectedPages.filter(Number.isFinite);
    selectedPageNumbers.map((pages) => {
      props.onRotatePage(pages, RotateDirection.Forward);
    });
    // setColor("#fff")
  };
  const rotateBackward = (props: any) => {
    console.log(props);
    const selectedPageNumbers = selectedPages.filter(Number.isFinite);
    selectedPageNumbers.map((pages) => {
      props.onRotatePage(pages, RotateDirection.Backward);
    });
  };
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => {
    return (
      <>
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
                </div>
              </div>
            );
          }}
        </Toolbar>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
        >
          <CloseButton onClick={deletePages} />
        </OverlayTrigger>
      </>
    );
  };
  const deletePages = () => {
    console.log("deletePages");
    dispatch(deletedPages(selectedPages));
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) =>
      [
        {
          content: <Thumbnails renderThumbnailItem={renderThumbnailItem} />,
          icon: <ThumbnailIcon />,
          title: "Thumbnails",
        },
      ].concat(defaultTabs.slice(1)),
    renderToolbar,
  });

  const rotatePluginInstance =
    defaultLayoutPluginInstance.toolbarPluginInstance.rotatePluginInstance;
  const { RotatePage } = rotatePluginInstance;

  const thumbnailPluginInstance =
    defaultLayoutPluginInstance.thumbnailPluginInstance;
  const { Thumbnails } = thumbnailPluginInstance;

  //   const pageLayout: PageLayout = {
  //     buildPageStyles: ({numPages}) => ({
  //       alignItems: 'center',
  //       display: 'flex',
  //       justifyContent: 'center',

  //   }),
  //     transformSize: ({  numPages: number, pageIndex, size }) => ({ height: size.height - 70, width: size.width - 70 })

  // };
  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    const pages = ` ${e.doc.numPages}`;
    dispatch(totalPages(pages));
  };

  return (
    <div style={{ height: "900px" }}>
      <Viewer
        fileUrl="assets/sample.pdf"
        // pageLayout={pageLayout}
        onDocumentLoad={handleDocumentLoad}
        plugins={[defaultLayoutPluginInstance]}
      />
    </div>
  );
};
