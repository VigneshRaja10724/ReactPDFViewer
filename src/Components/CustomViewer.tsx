import { DocumentLoadEvent, Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CustomThumbnail } from "./CustomThumbanil";

export const CustomViewer = () => {
console.log("CV")
    const thumbnailPluginInstance = thumbnailPlugin({
        
    });
    const { Thumbnails, onDocumentLoad, onViewerStateChange , install} = thumbnailPluginInstance;
    const [totalPages, setTotalPages] = useState<number>();
    // console.log(thumbnailPluginInstance);
    // console.log(Viewer);
    // console.log(Thumbnails);
    // console.log(install);
    // console.log(onDocumentLoad);
    // console.log(onViewerStateChange);

    const handelDocumentload = (e: DocumentLoadEvent) => {
        const pages = ` ${e.doc.numPages}`;
        setTotalPages(+pages)
    }

   

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
                        {/* <Thumbnails /> */}
                        <CustomThumbnail Thumbnails={Thumbnails} totalPages={totalPages} />
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