import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Strore/store";

export const Sidebar = ({ selectedOption, docName, url, header }: any) => {
    const state = useSelector((state: RootState) => state);
    const websocket = state.websocket;

    useEffect(() => {
        if (selectedOption === "Non-Ship") {
            docName("Misc")
        } else {
            docName("Request Letter")
        }
    }, [selectedOption]);

    const handelClick = (value: any) => {
        docName(value)
        switch (value) {
            case "Request Letter": {
                url("https://unityqa01.cioxhealth.com/proxyservices/v1/artifacts/download-artifact/REQ?eRequestId=11449982&timestamp=317")
                header({
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJncm91cGFkbWluaXN0cmF0b3IubWFudWFsQGNpb3hoZWFsdGguY29tIiwiaXNJbnRlcm5hbEFwcCI6ZmFsc2UsInBlcm1pc3Npb25zIjpbIkZ1bGZpbGxlciBQZW5kIiwiUHJpb3JpdHkgU2V0IiwiUHJlLUZ1bGZpbGxtZW50IFYmQSIsIlNwbGl0IiwiRXhwb3J0IHRvIEV4Y2VsLUFsbCBGaWVsZHMiLCJMb2dnZXIgRXhjZXB0aW9uIiwiU2VhcmNoIiwiQ01TIEFkZHJlc3MgdG8gUmVxdWVzdGVyIE1hcHBpbmciLCJGdWxmaWxsbWVudCIsIkVkaXQiLCJEaWdpdGFsIEZ1bGZpbGxtZW50IFJldmlldyIsIlNlYXJjaCBOZXcgV2luZG93IiwiQ3JlYXRlIE5ldyBSZXF1ZXN0ZXIiLCJCdWxrIENhbmNlbCIsIkNlcnRpZnkiLCJVcGxvYWQiLCJBZGQgTmV3IFJlcXVlc3QiLCJQcmUtRGVsaXZlcnkgViZBIiwiRnVsZmlsbGVyIE9uIEhvbGQiLCJDTVMgU2l0ZSB0byBQYXllciBNYXBwaW5nIiwiU1RBVCBSZXF1ZXN0IiwiT3BlcmF0aW9uYWwgUmVwb3J0cyIsIkZ1bGZpbGxlciBRQyIsIkVzY2FsYXRpb24iLCJMb2dnaW5nIiwiTXkgRGFzaGJvYXJkIiwiSW1wb3J0IFJlcXVlc3QiLCJMb2dnZXIgT24gSG9sZCIsIk1UUSIsIkVtYmVkZGVkIFJlcG9ydHMiLCJWaWV3IE90aGVyIFVzZXIgUmVxdWVzdCIsIkZ1bGZpbGxlciBFeGNlcHRpb24iLCJBZG1pbmlzdHJhdGlvbiIsIk15IFdvcmsgUXVldWUiLCJFeHBvcnQgdG8gRXhjZWwtQWxsIEZpZWxkcyBQbHVzIENvbW1lbnRzIiwiVXBsb2FkIFJlcXVlc3QgTGV0dGVycyIsIkV4cG9ydCB0byBFeGNlbC1DdXJyZW50IEZpZWxkcyIsIlBlcmZvcm1hbmNlIFRyZW5kaW5nIiwiUGF0aWVudCBSZXN0cmljdGlvbiBSZXZpZXciLCJTdWJ3YXkiLCJMb2dnZXIgUUMiLCJSZXBvcnQiLCJDb25maWd1cmF0aW9uIE1hbmFnZXIiXSwiaXNzIjoiaHR0cDovL2tleXMuY2lveGhlYWx0aC5jb20iLCJncm91cHMiOlt7ImlkIjoyNywibmFtZSI6Ikdyb3VwIEFkbWluaXN0cmF0b3IiLCJ1c2VyVHlwZSI6bnVsbCwiaW50ZXJuYWxBcHAiOm51bGx9XSwiZXhwIjoxNjg2ODE4MTE0LCJlbWFpbCI6Imdyb3VwYWRtaW5pc3RyYXRvci5tYW51YWxAY2lveGhlYWx0aC5jb20iLCJpc1NlcnZpY2VBY2NvdW50IjpmYWxzZSwiZW1wbG95ZWVOdW1iZXIiOiJOb3QgRm91bmQifQ.hSOa9csmvRoUIbo8yGrsR6JunFZXH6V_E8f8c2acLSVlLWuz4PHUTLodvwbq9LW5h5-9tFHenuOSwTdjzkKsOXTRGdSAOikMih4iRaaxx1WqzqVVKWdONmyNUx3RLlduesxjezR7BX0y4HjydBRU3p0jQnTR-_BAe2Bzu73yKhwirtgWF1PULSdEQ7KNIOzihMeqnlM5h9T4nW2-iePeBnxW0Wogke_Tpae4-2vOI26bv7f69g-LKjbAg0pGPKhaJ6Fom05-XbVcqNyX6hRerYLraNVbS30oRyiv2276upbyN91oUPuXW-vddRhbmxnh-y2TtLpCqatOE-sfkbT6WQ'})
                break;
            }
            case "Medical Records": {
                const data = JSON.parse(websocket.lastMessage.data);
                const modifiedString = data.eventData.slice(1, -1)
                console.log(modifiedString)
                const modifiedUrl = `${modifiedString}${"/11449982/MR/sample.pdf"}`
                console.log(modifiedUrl)
                url(modifiedUrl)
                break;
            }

        }
    }

    if (selectedOption === "Ship") {
        return (
            < >
                <img
                    style={{ width: "2rem", textAlign: "center", padding: "1px", cursor: "pointer" }}
                    src="icons/file-earmark-fill.svg"
                    onClick={() => handelClick("Request Letter")} />
                <img
                    style={{ width: "2rem", textAlign: "center", padding: "1px", cursor: "pointer" }}
                    src="icons/file-earmark-text-fill.svg"
                    onClick={() => handelClick("Medical Records")} />
                <img
                    style={{ width: "2rem", textAlign: "center", padding: "1px", cursor: "pointer" }}
                    src="icons/file-text-fill.svg"
                    onClick={() => handelClick("Certification")} />
                <span style={{
                    paddingBottom: "40px",
                    textAlign: "center",
                    transform: 'rotate(180deg)',
                    writingMode: 'vertical-lr',

                }}>Shippable Docs</span>
            </>
        );
    } else {

        return (
            <>
                <img
                    style={{ width: "2rem", textAlign: "center", padding: "1px", cursor: "pointer" }}
                    src="icons/file-earmark-fill.svg"
                    onClick={() => handelClick("Misc")} />
                <span style={{
                    paddingBottom: "80px",
                    textAlign: "center",
                    transform: 'rotate(180deg)',
                    writingMode: 'vertical-lr',

                }}>Miscellaneous Docs</span>
            </>
        );
    }

};