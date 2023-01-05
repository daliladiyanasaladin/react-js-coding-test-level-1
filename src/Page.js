import React, {useState} from "react";
import "./index.css"

const Page = ({data, query, LimitedPage, LimitedData, showModel}) => {
    const [pages] = useState(Math.round(data.length/LimitedData));
    const [currentPage, setCurrent] = useState(1);

    function nextPage() {
        setCurrent((page) => page + 1);
    }

    function prevPage() {
        setCurrent((page) => page - 1);
    }

    function changePage(event) {
        const numberpage = Number(event.target.textContent);
        setCurrent(numberpage);
    }

    const getPageData = () => {
        const startIndex = currentPage * LimitedData - LimitedPage;
        const endIndex = startIndex + LimitedData;
        return data.slice(startIndex, endIndex);
    }

    const pageGroup = () => {
        let start = Math.floor((currentPage-1)/ LimitedPage) * LimitedPage;
        return new Array(LimitedPage).fill().map((_, idx) => start + idx + 1);
    }

    return(
        <div className="container">
            {getPageData().filter(poke => {
                if (query === ''){
                    return poke;

                } else if (poke.name.toLowerCase().includes(query.toLowerCase())){
                    return poke;
                }
            }).map(({name, url}, index) => 
                <b className="pokemon" key={index} onClick={() => showModel(url)}>{name}</b>
                )}

                <div className="page-create">
                    <button
                    onClick={prevPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                    >Previous</button>

                    {pageGroup().map((item, index)=> 
                    <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        {item}
                        </button>
                    )}
                    <button
                    onClick={nextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                    > Next

                    </button>

                </div>

        </div>
    )

    

}
export default Page;
