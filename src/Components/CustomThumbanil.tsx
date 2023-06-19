import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { Thumbnail } from "./Thumbnails";
import { useEffect, useState } from "react";

export const CustomThumbnail = ({ Thumbnails, thumbnailSize }: any) => {
    const [thumbnail, setThumbnail] = useState<any>();
    const [thumbnails, setThumbnails] = useState<any[]>();

    const renderThumbnailItem = (props: RenderThumbnailItemProps) => 
         (
            <div

                key={props.pageIndex}
                className="custom-thumbnail-item"
                data-testid={`thumbnail-${props.pageIndex}`}
                style={{
                    backgroundColor: props.pageIndex === props.currentPage ? 'rgba(0, 0, 0, 0.3)' : '#fff',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    width: '100%',
                }}
            >
                <div style={{ marginBottom: '0.5rem' }} onClick={props.onJumpToPage}>

                    <Thumbnail
                    index={props.pageIndex}
                    thumbnail={props.renderPageThumbnail}
                    initialThumbnailsIndex={thumbnailSize}
                />
                </div>
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '0 auto',
                        width: '100px',
                    }}
                >
                    <div style={{ marginRight: 'auto' }}>
                        {props.renderPageLabel}
                    </div>

                </div>
            </div>
        );
    return (
        <Thumbnails renderThumbnailItem={renderThumbnailItem} />
    );
}