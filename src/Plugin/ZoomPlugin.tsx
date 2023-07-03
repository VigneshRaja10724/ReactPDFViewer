import * as React from 'react';
import { createStore, Plugin, PluginFunctions, SpecialZoomLevel } from '@react-pdf-viewer/core';

import StoreProps from '../Strore/ZoomStore';

interface CustomZoomPlugin extends Plugin {
    zoomTo(scale: number | SpecialZoomLevel): void;
}

const useCustomZoomPlugin = (): CustomZoomPlugin => {
    const store = React.useMemo(() => createStore<StoreProps>({}), []);

    return {
        install: (pluginFunctions: PluginFunctions) => {
            store.update('zoom', pluginFunctions.zoom);
        },
        zoomTo: (scale: number | SpecialZoomLevel) => {
            const zoom = store.get('zoom');
            if (zoom) {
                // Zoom to that scale
                zoom(scale);
            }
        },
    };
};

export default useCustomZoomPlugin;