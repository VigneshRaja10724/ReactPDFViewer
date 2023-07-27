import { DocumentLoadEvent, RenderPage, RenderPageProps, ScrollMode, SpecialZoomLevel, Viewer, ViewerState } from "@react-pdf-viewer/core";
import { thumbnailPlugin, ThumbnailPluginProps, ThumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CustomThumbnail } from "./CustomThumbanil";

export const CustomViewer = () => {
    const thumbnailPluginInstance = thumbnailPlugin();

    const { Thumbnails, onDocumentLoad, onViewerStateChange, install } = thumbnailPluginInstance;
    const [totalPages, setTotalPages] = useState<number>();
    const [DropIndex, setDropIndex] = useState<number>(1);
    

    const handelDocumentload = (e: DocumentLoadEvent) => {
        const pages = ` ${e.doc.numPages}`;
        setTotalPages(+pages)
    }

    const renderPage: RenderPage = (props: RenderPageProps) => {
        console.log(props)
        return (
            
            <>
                { props.canvasLayer.children}
                { props.textLayer.children}
                { props.annotationLayer.children} 
            </>
        )
    };
    const stateChange = (viewerState: ViewerState) => {
        // console.log("hit")
        // console.log(viewerState)
    }
    useEffect(() => {
        console.log(thumbnailPluginInstance)
    }, [Thumbnails])
    useEffect(() => {
        console.log(DropIndex)
    }, [DropIndex])
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
                        <CustomThumbnail Thumbnails={Thumbnails} setDropIndex={setDropIndex} />
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
                        defaultScale={SpecialZoomLevel.PageFit}
                        renderPage={renderPage}
                        scrollMode={ScrollMode.Page}   
                        initialPage={DropIndex}                 />
                </div>
            </div>
        </>
    );
}