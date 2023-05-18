import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { MinimalButton, RotateDirection, Viewer } from "@react-pdf-viewer/core";
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
import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pageSelected } from "../Strore/SelecetedPageSclice";

export const SelectThumbnail = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<any>();
  const [selectedPages, setSelectedPages] = useState<any[]>([]);
  const [color, setColor] = useState<string>();
  const [thumbnailAngle, setThumbnailAngle] = useState<any>();

  useEffect(() =>{
    console.log(thumbnailAngle)
  },[thumbnailAngle]);


  const handleChoosePage = (e: any, props: any) => {
    console.log(props);
    console.log(props.numPages);
    console.log("initial", props.renderPageThumbnail.props.pageRotation);
    setThumbnailAngle(props.renderPageThumbnail.props.pageRotation);
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
          props.pageIndex === selectedPages[props.pageIndex] ? color : "#fff",
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
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
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
          Open
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
  );

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

  return (
    <div style={{ height: "900px" }}>
      <Viewer
        fileUrl="assets/sample.pdf"
        plugins={[defaultLayoutPluginInstance]}
      />
    </div>
  );
};
