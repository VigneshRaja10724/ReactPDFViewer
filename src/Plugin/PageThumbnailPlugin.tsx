import { ReactElement } from 'react';
import { Plugin, RenderViewer, Slot } from '@react-pdf-viewer/core';

export interface PageThumbnailPluginProps {
    PageThumbnail: ReactElement;
}

export const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
    const { PageThumbnail } = props;

    return {
        renderViewer: (renderProps: RenderViewer) => {
            const { slot } = renderProps;
            slot.children =  <div style={{height : "48rem" , width : "46rem"}}> {PageThumbnail}</div>;
            (slot.subSlot as Slot).attrs = {};
            (slot.subSlot as Slot).children = <></> ;

            return slot;
        },
    };
};
