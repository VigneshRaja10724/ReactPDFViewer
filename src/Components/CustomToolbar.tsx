import { MinimalButton, RotateDirection, Viewer } from "@react-pdf-viewer/core";
import { ToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import {
  RotateBackwardIcon,
  RotateForwardIcon,
} from "@react-pdf-viewer/rotate";
import { CloseButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import { deletedPages } from "../Strore/SelecetedPageSclice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Strore/store";

export const Toolbar = () => {
  const dispatch = useDispatch();
  const pdf = useSelector((state: RootState) => state.selectPage);
  const selectedPages = pdf.pagesSelected;
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
