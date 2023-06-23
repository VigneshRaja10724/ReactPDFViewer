import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useDispatch } from "react-redux";
import { DragDropComponent } from "./DragDropComponent";
import { RenderTHumbnails } from "./RenderThumbnails";


export const CustomThumbnail = ({ Thumbnails, totalPages }: any) => {
    console.log("CT")
    const renderThumbnailItem = (props: RenderThumbnailItemProps) => {
        // console.log(Thumbnails)
        console.log("render")
      return (
        // <RenderTHumbnails key={props.key} props={props} totalPages={totalPages}/>
        <DragDropComponent key={props.key} props={props} index = {props.pageIndex}/>
    );}
    return (
        <>
            <Thumbnails renderThumbnailItem={renderThumbnailItem} />
        </>
    );
}