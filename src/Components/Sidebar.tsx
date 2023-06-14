import { useEffect } from "react";

export const Sidebar = ({selectedOption , docName, url, header} : any) => {
    useEffect(()=>{
        if(selectedOption === "Non-Ship"){
            docName("Misc")
        }else{
            docName("Request Letter")
        }
    },[selectedOption])
    const handelClick = (value : any) => {
        docName(value)
        if(value === "Request Letter"){
            url("https://unityqa01.cioxhealth.com/proxyservices/v1/artifacts/download-artifact/REQ?eRequestId=11449982&timestamp=323")
            header({
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJncm91cGFkbWluaXN0cmF0b3IubWFudWFsQGNpb3hoZWFsdGguY29tIiwiaXNJbnRlcm5hbEFwcCI6ZmFsc2UsInBlcm1pc3Npb25zIjpbIkZ1bGZpbGxlciBQZW5kIiwiUHJpb3JpdHkgU2V0IiwiUHJlLUZ1bGZpbGxtZW50IFYmQSIsIlNwbGl0IiwiRXhwb3J0IHRvIEV4Y2VsLUFsbCBGaWVsZHMiLCJMb2dnZXIgRXhjZXB0aW9uIiwiU2VhcmNoIiwiQ01TIEFkZHJlc3MgdG8gUmVxdWVzdGVyIE1hcHBpbmciLCJGdWxmaWxsbWVudCIsIkVkaXQiLCJEaWdpdGFsIEZ1bGZpbGxtZW50IFJldmlldyIsIlNlYXJjaCBOZXcgV2luZG93IiwiQ3JlYXRlIE5ldyBSZXF1ZXN0ZXIiLCJCdWxrIENhbmNlbCIsIkNlcnRpZnkiLCJVcGxvYWQiLCJBZGQgTmV3IFJlcXVlc3QiLCJQcmUtRGVsaXZlcnkgViZBIiwiRnVsZmlsbGVyIE9uIEhvbGQiLCJDTVMgU2l0ZSB0byBQYXllciBNYXBwaW5nIiwiU1RBVCBSZXF1ZXN0IiwiT3BlcmF0aW9uYWwgUmVwb3J0cyIsIkZ1bGZpbGxlciBRQyIsIkVzY2FsYXRpb24iLCJMb2dnaW5nIiwiTXkgRGFzaGJvYXJkIiwiSW1wb3J0IFJlcXVlc3QiLCJMb2dnZXIgT24gSG9sZCIsIk1UUSIsIkVtYmVkZGVkIFJlcG9ydHMiLCJWaWV3IE90aGVyIFVzZXIgUmVxdWVzdCIsIkZ1bGZpbGxlciBFeGNlcHRpb24iLCJBZG1pbmlzdHJhdGlvbiIsIk15IFdvcmsgUXVldWUiLCJFeHBvcnQgdG8gRXhjZWwtQWxsIEZpZWxkcyBQbHVzIENvbW1lbnRzIiwiVXBsb2FkIFJlcXVlc3QgTGV0dGVycyIsIkV4cG9ydCB0byBFeGNlbC1DdXJyZW50IEZpZWxkcyIsIlBlcmZvcm1hbmNlIFRyZW5kaW5nIiwiUGF0aWVudCBSZXN0cmljdGlvbiBSZXZpZXciLCJTdWJ3YXkiLCJMb2dnZXIgUUMiLCJSZXBvcnQiLCJDb25maWd1cmF0aW9uIE1hbmFnZXIiXSwiaXNzIjoiaHR0cDovL2tleXMuY2lveGhlYWx0aC5jb20iLCJncm91cHMiOlt7ImlkIjoyNywibmFtZSI6Ikdyb3VwIEFkbWluaXN0cmF0b3IiLCJ1c2VyVHlwZSI6bnVsbCwiaW50ZXJuYWxBcHAiOm51bGx9XSwiZXhwIjoxNjg2NzQxMzI0LCJlbWFpbCI6Imdyb3VwYWRtaW5pc3RyYXRvci5tYW51YWxAY2lveGhlYWx0aC5jb20iLCJpc1NlcnZpY2VBY2NvdW50IjpmYWxzZSwiZW1wbG95ZWVOdW1iZXIiOiJOb3QgRm91bmQifQ.dC8t7gq3fm-ULbwEgmwa1JGkAYJ9veiyUmo7Lwsw1etnm12mDRBxYEd0ChqSR0Sd4sUa-yntbjAazx7DC3DOJgyeUc_yR1eplEWuE7oajYLxqNVRXCtBZml25SsMvK0Zpyg5OKY9_fc8oP5NaMI5Fn33d3YSvm2S8j7Hg5b_v_HZRrJ4sFhGnSXViOQjY1Zssw-GFb4eLOKPGkXq-f1Zx2l1Nw3efqzxPrN-FSkjs6JDKp5XDB5yn2MbZSupxMGui29i__8suhLUg91kPVa4E5W9d1U-vU6BQtQNP0wz4IdOuUdIWea6BfxKgye-Fs7-NyAG8S2h-JQ6KrphJK3HwQ'

            })
        }
    }
    if(selectedOption === "Ship"){
        return (
            < >
                <img 
                style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }} 
                src="icons/file-earmark-fill.svg"
                onClick ={() => handelClick("Request Letter")} />
                <img 
                style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }} 
                src="icons/file-earmark-text-fill.svg"
                onClick ={() => handelClick("Medical Records")} />
                <img
                 style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }}
                  src="icons/file-text-fill.svg"
                  onClick ={() => handelClick("Certification")} />
                <span style={{
                    paddingBottom:"40px",
                    textAlign: "center",
                    transform: 'rotate(180deg)',
                    writingMode: 'vertical-lr',
                  
                }}>Shippable Docs</span>
            </>
        );
    }else{
        
        return(
            <>
            <img 
            style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }} 
            src="icons/file-earmark-fill.svg"
            onClick ={() => handelClick("Misc")} />
            <span style={{
                    paddingBottom:"80px",
                    textAlign: "center",
                    transform: 'rotate(180deg)',
                    writingMode: 'vertical-lr',
                  
                }}>Miscellaneous Docs</span>
            </>
        );
    }
   
};