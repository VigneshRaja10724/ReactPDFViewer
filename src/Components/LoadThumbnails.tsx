interface SelectedPages {
    pages: any[];
  }

export const LoadSelectedThumbnails = (selectedPages : SelectedPages) =>{
    
    return(
        <p>
             Selected pages:{' '}
         {selectedPages.pages
            .map((v, idx) => 
                ( v + 1 )
            )
            .filter(Number)
            .join(',')
            }
        </p>
    );
}