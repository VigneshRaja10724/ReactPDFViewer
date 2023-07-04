import { MinimalButton, RotateDirection, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { ToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RotateBackwardIcon, RotateForwardIcon } from "@react-pdf-viewer/rotate";
import { RenderZoomProps } from '@react-pdf-viewer/zoom';
import { useEffect, useState } from "react";
import { attachmentPlugin } from '@react-pdf-viewer/attachment';
import { deletedPages } from "../Strore/SelecetedPageSclice";
import { useDispatch } from "react-redux";


export const CustomToolBar = ({Toolbar, RotatePage, } : any) => {

  


    const attachmentPluginInstance = attachmentPlugin();
    const { Attachments } = attachmentPluginInstance;

    const dispatch = useDispatch();

    const [totalPDFPages, setTotalPDFPages] = useState<any>(0);
    const [showMarquee, setShowMarquee] = useState<boolean>(true);
    const [startPageNumber, setStartPageNumber] = useState<number>();
    const [endPageNumber, setEndPageNumber] = useState<number>();
    const [currentPage, setCurrenrPage] = useState<number>(1);
    const [selectedPages, setSelectedPages] = useState<any[]>([0]);
    const [showAttachment, setShowAttachment] = useState(false)

    const [scale, setScale] = useState<number>();


    useEffect(() => {
        if (pageNumbers.length > 10) {
            const splitPages = pageNumbers.length / 2;
            const endVale = Math.round(splitPages);
            const startIndex = (currentPage - 1) * endVale;
            const endIndex = startIndex + endVale;
            if (startIndex >= 0 && endIndex <= lastValue) {
                setStartPageNumber(startIndex);
                setEndPageNumber(endIndex);
            }
        } else {

            setStartPageNumber(1);
            setEndPageNumber(pageNumbers.length);
        }
        // const displayedPages = pageNumbers.slice(startIndex, endIndex);

    }, [totalPDFPages, currentPage])

    const handleMarquee = () => {
        setShowMarquee(false)
    }

    const rotateForward = (props: any) => {
        const selectedPageNumbers = selectedPages.filter(Number.isFinite);
        selectedPageNumbers.map((pages) => {
            props.onRotatePage(pages, RotateDirection.Forward);
        });
    };

    const rotateBackward = (props: any) => {
        const selectedPageNumbers = selectedPages.filter(Number.isFinite);
        selectedPageNumbers.map((pages) => {
            props.onRotatePage(pages, RotateDirection.Backward);
        });
    };
    const deletePages = () => {
        dispatch(deletedPages(selectedPages));
      };

    const pageNumbers = Array.from({ length: totalPDFPages }, (index: number) => index + 1);
    const lastValue = pageNumbers.length;
    
    const ShowNextPage = () => {
        const currentValue = currentPage * 19;
        if (currentValue < lastValue) {
            setCurrenrPage(currentPage + 1);
        }
    }
    const ShowPreviousPage = () => {
        if (currentPage > 1) {
            setCurrenrPage(currentPage - 1);
        }
    }

    const handleFit = (props: any) => {
        props.onZoom(SpecialZoomLevel.PageFit)
        setShowMarquee(true)
        setScale(1)
    }
    return (
        <div>
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
                        Print
                    } = slots;
                    return (
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                width: "100%",
                            }}
                        >
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Previous</Tooltip>}
                            >
                                <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                                    <img src="icons/rewind.svg" onClick={ShowPreviousPage} />
                                </div>
                            </OverlayTrigger>
                            {' '}{startPageNumber} - {endPageNumber}{' '}
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Next</Tooltip>}
                            >
                                <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                                    <img src="icons/fast-forward.svg" onClick={ShowNextPage} />
                                </div>
                            </OverlayTrigger>
                            {
                                showMarquee ?
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Marquee Zoom</Tooltip>}
                                    >
                                        <div style={{ padding: "0px 20px", cursor: "pointer" }}>

                                            <img src="icons/search.svg" onClick={handleMarquee} />

                                        </div>
                                    </OverlayTrigger> :
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Fit width</Tooltip>}
                                    >
                                        <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                                            <Zoom>
                                                {
                                                    (props: RenderZoomProps) => (
                                                        <img src="icons/search-heart.svg" onClick={() => handleFit(props)} />
                                                    )
                                                }
                                            </Zoom>
                                        </div>
                                    </OverlayTrigger>
                            }

                            <div style={{ padding: "0px 2px" }}>
                                <ZoomOut />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                                <Zoom levels={[0.3, 0.5, 0.8, 1, 1.2]} />
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
                                <Print />
                            </div>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Forward</Tooltip>}
                            >
                                <div style={{ padding: "0px 2px" }}>
                                    <RotatePage>
                                        {(props : any) => (
                                            <MinimalButton onClick={() => rotateForward(props)}>
                                                <RotateForwardIcon />
                                            </MinimalButton>
                                        )}
                                    </RotatePage>
                                </div>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Backward</Tooltip>}
                            >
                                <div>
                                    <RotatePage>
                                        {(props : any) => (
                                            <MinimalButton onClick={() => rotateBackward(props)}>
                                                <RotateBackwardIcon />
                                            </MinimalButton>
                                        )}
                                    </RotatePage>
                                </div>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                            >
                                <div style={{ padding: "0px 20px", cursor: "pointer" }}>
                                    <img src="icons/trash.svg" onClick={deletePages} />
                                </div>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 50, hide: 100 }}
                                overlay={<Tooltip id="button-tooltip-2">Attachments</Tooltip>}
                            >
                                <div style={{ padding: "0px 10px", cursor: "pointer" }}>
                                    <img src="icons/paperclip.svg" onClick={() => { setShowAttachment(!showAttachment) }} />
                                </div>
                            </OverlayTrigger>
                        </div>
                    );
                }}
            </Toolbar>
        </div>
    );
}