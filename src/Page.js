import React, { useState } from 'react';
import "./index.css";

const Pagination = ({ data, query, pageLimit, dataLimit, showModel }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div className='container'>
            {getPaginatedData().filter(poke => {
                if (query === '') {
                    return poke;
                } else if (poke.name.toLowerCase().includes(query.toLowerCase())) {
                    return poke;
                }
            }).map(({ name, url }, index) =>
                <b className="pokemon" key={index} onClick={() => showModel(url)}>{name}</b>
            )}
            <div className="page">
                <button id='btn'
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {getPaginationGroup().map((item, index) => (
                    <button id='btn'
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        {item}
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    )
}

export default Pagination
