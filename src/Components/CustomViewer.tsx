import { DocumentLoadEvent, Viewer } from "@react-pdf-viewer/core"
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { CustomThumbnail } from "./CustomThumbanil";
import { useEffect, useState } from "react";

export const CustomViewer = () => {



    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;
    
    const handelDocumentload = (e: DocumentLoadEvent) => {
        const pages = ` ${e.doc.numPages}`;
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
                    <CustomThumbnail Thumbnails={Thumbnails}  />
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
                        plugins={[thumbnailPluginInstance]} />
                </div>
            </div>
        </>
    );
}