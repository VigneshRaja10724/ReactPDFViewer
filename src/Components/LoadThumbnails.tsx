import { useSelector } from "react-redux";
import { RootState } from "../Strore/store";
import { useEffect, useState } from "react";

interface socket {
  readyState: number,
  lastjson: {}
}

export const LoadSelectedThumbnails = () => {

  const [pages, setPages] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>([]);
  const [deletedPages, setDeletedPages] = useState<any>([]);
  const [connection, setConnection] = useState<any>();
  const [message, setMessage] = useState<any>();
  const state = useSelector((state: RootState) => state);
  const websocket = state.websocket;
  const pdf = state.selectPage;

  const trayAppConfig: any = {
    "pdf.split.size.number": "100",
    "pdf.split.page.number": "1000",
    "ciox.holidays":
      "01/01/2019,07/04/2019,09/02/2019,11/28/2019,12/25/2019,09/06/2021,11/25/2021,12/24/2021,12/31/2021,01/01/2022,05/30/2022,07/04/2022,09/05/2022,11/24/2022,12/26/2022,03/11/2022,03/14/2022,09/04/2023,07/04/2023,05/29/2023,01/16/2023,12/25/2023,11/23/2023,01/16/2023",
    "pdf.split.page.limit": "3000",
    "pdf.split.by.page": "true",
    "pdf.subsidiary.split.count": "2",
    "pdf.split.by.size": "true",
    "pdf.split.size.limit": "100",
  };
  const eventData = {
    eventType: "initialize",
    eventData: [JSON.stringify(trayAppConfig)],
  };

  useEffect(() => {
    setPages(pdf.pagesSelected);
    setTotalPages(pdf.NumberOfPages);
    setDeletedPages(pdf.deletedPages);
  }, [pdf]);

  useEffect(() => {
    console.log(websocket.initialWebSocket)
    setConnection(websocket.initialWebSocket);
  }, [websocket.initialWebSocket]);


  useEffect(() => {
    if (connection !== undefined) {
      console.log(connection);
      const { sendJsonMessage, lastJsonMessage } = connection;
      console.log(connection.readyState);
      sendJsonMessage(eventData)
    }

  }, [connection])

  useEffect(() => {
    console.log(websocket.lastMessage)
  }, [websocket.lastMessage])

  return (
    <>
      <p>{message}</p>
      <p>
        No.of.Pages : {totalPages}
        {" , "}
        Selected pages: { }
        {pages
          .map((v: any) => v + 1)
          .filter(Number)
          .join(",")}
        {" , "}
        DeletedPages :{" "}
        {deletedPages
          .map((v: any) => v + 1)
          .filter(Number)
          .join(",")}
      </p>
    </>
  );
};
