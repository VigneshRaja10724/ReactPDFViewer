import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pageSelected } from "../Strore/SelecetedPageSclice";

export const CustomThumbnail = ({Thumbnail} : any) =>{
    const dispatch = useDispatch();
    const [selectedPages, setSelectedPages] = useState<any[]>([0]);
    const [color, setColor] = useState<string>("rgba(0, 0, 0, 0.3)");
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
    return(
        <>
        <Thumbnail renderThumbnailItem={renderThumbnailItem} />
        </>
    );
} 