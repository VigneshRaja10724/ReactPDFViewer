import { ReactNode } from "react";
import { Button, Container } from "react-bootstrap";

const upsideDownStyle = {
    transform: 'rotate(180deg)',
    writingMode: 'vertical-lr',
    textOrientation: 'mixed',
};

export const Sidebar = () => {
    return (
        < >
            <img style={{ width: "2rem", textAlign: "center", padding: "1px" }} src="icons/file-earmark-fill.svg" />
            <img style={{ width: "2rem", textAlign: "center", padding: "1px" }} src="icons/file-earmark-text-fill.svg" />
            <img style={{ width: "2rem", textAlign: "center", padding: "1px" }} src="icons/file-text-fill.svg" />
            <span style={{
                paddingBottom:"40px",
                textAlign: "center",
                transform: 'rotate(180deg)',
                writingMode: 'vertical-lr',
              
            }}>Shippable Docs</span>
        </>
    );
};