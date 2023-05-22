import { useSelector } from "react-redux";
import { RootState } from "../Strore/store";
import { useEffect } from "react";
export const LoadSelectedThumbnails = () => {
  const pdf = useSelector((state: RootState) => state.selectPage);
  const pages = pdf.pagesSelected;
  const numPages = pdf.NumberOfPages;
  useEffect(() => {
    console.log(pdf);
  }, []);
  return (
    <p>
      No.of.Pages : {numPages}
      {" , "}
      Selected pages: {}
      {pages
        .map((v: any) => v + 1)
        .filter(Number)
        .join(",")}     
    </p>
  );
};
