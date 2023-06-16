import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { Thumbnail } from "./Thumbnails";

export const CustomThumbnail = ({ Thumbnails, thumbnailSize }: any) => {

const thumbnail = (props : any) =>{
console.log(props)
}

    const renderThumbnailItem = (props: RenderThumbnailItemProps) => (
        <div
        onClick={() => thumbnail(props)}
            key={props.pageIndex}
            className="custom-thumbnail-item"
            // data-testid={`thumbnail-${props.pageIndex}`}
            style={{
                backgroundColor: props.pageIndex === props.currentPage ? 'rgba(0, 0, 0, 0.3)' : '#fff',
                cursor: 'pointer',
                padding: '0.5rem',
                width: '100%',
            }}
        >
            <div style={{ marginBottom: '0.5rem' }} onClick={props.onJumpToPage}>
                {props.pageIndex == 1 && props.renderPageThumbnail}
                

                {/* <Thumbnail
                    index={props.pageIndex}
                    thumbnails={props.renderPageThumbnail}
                    moveThumbnail={thumbnailSize}
                /> */}
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
                <div style={{ marginRight: 'auto' }}>Page {props.renderPageLabel}</div>

            </div>
        </div>
    );
    return (
        <Thumbnails renderThumbnailItem={renderThumbnailItem} />
    );
}