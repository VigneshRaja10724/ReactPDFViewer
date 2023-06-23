import { DocumentLoadEvent, Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { RootState } from "../Strore/store";
import { CustomThumbnail } from "./CustomThumbanil";
import { DragDropComponent } from "./DragDropComponent";

export const CustomViewer = () => {

    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;
    const [totalPages, setTotalPages] = useState<number>();
    const [renderComplete, setRenderComplete] = useState<boolean>();
    const state = useSelector((state: RootState) => state);
    const render = state.thumbnails.renderThums;
    const handelDocumentload = (e: DocumentLoadEvent) => {
        const pages = ` ${e.doc.numPages}`;
        setTotalPages(+pages)
    }
   
    useEffect(() => {
        console.log(render)
        setRenderComplete(render);
    }, [render])

    return (
        <>
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    height: '50rem',
                }}
            >
                <div
                    style={{
                        borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                        width: '20%',
                    }}
                >
                    <DndProvider backend={HTML5Backend}>
                        {renderComplete ?
                            <DragDropComponent Thumbnails={Thumbnails} totalPages={totalPages} />
                            : <CustomThumbnail Thumbnails={Thumbnails} totalPages={totalPages} />}

                    </DndProvider>
                </div>
                <div
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Viewer
                        onDocumentLoad={handelDocumentload}
                        fileUrl={"assets/sample.pdf"}
                        plugins={[thumbnailPluginInstance]}
                    />
                </div>
            </div>
        </>
    );
}