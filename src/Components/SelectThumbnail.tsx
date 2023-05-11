import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ThumbnailIcon,
} from "@react-pdf-viewer/default-layout";
import type { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SelectedPages } from "../Redux/actions/SelectedPageAction";

export const SelectThumbnail = () => {
  const dispatch = useDispatch();
 
  const [page, setPage] = useState<any>();
  const [selectedPages, setSelectedPages] = useState<any[]>([]);
  const [color, setColor] = useState<string>();

  const handleChoosePage = (e: any, props: any) => {
    if (e.ctrlKey) {
      if (selectedPages[props.pageIndex] === undefined) {
        const copy = [...selectedPages];
        copy[props.pageIndex] = props.pageIndex;
        setSelectedPages(copy);
        setColor("rgba(0, 0, 0, 0.3)");
        dispatch(SelectedPages(copy));
      }

      if (selectedPages[props.pageIndex] === props.pageIndex) {
        const copy = [...selectedPages];
        copy[props.pageIndex] = undefined;
        setSelectedPages(copy);
        dispatch(SelectedPages(copy));  
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

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) =>
      [
        {
          content: <Thumbnails renderThumbnailItem={renderThumbnailItem} />,
          icon: <ThumbnailIcon />,
          title: "Thumbnails",
        },
      ].concat(defaultTabs.slice(1)),
  });

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
