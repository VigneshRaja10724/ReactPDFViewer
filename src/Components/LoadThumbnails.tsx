import { useSelector } from "react-redux";
import { RootState } from "../Strore/store";
import { useEffect } from "react";
export const LoadSelectedThumbnails = () => {
  const state = useSelector((state: RootState) => state);
  const pdf = state.selectPage;
  const pages = pdf.pagesSelected;
  const numPages = pdf.NumberOfPages;
  const deletedPages = pdf.deletedPages;
  const websocket = state.websocket;
  const connection = websocket.connection;
  const fun = () =>{

  }
  useEffect(() => {
    console.log(state.websocket);
    console.log(state.websocket.connection);
    // const {lastJsonMessage} = state.websocket.connection;
  }, [connection ! == null]);
  return (
    <p>
      No.of.Pages : {numPages}
      {" , "}
      Selected pages: {}
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
  );
};
