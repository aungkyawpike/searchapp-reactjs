import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import SearchResultItem from './SearchResultItem';
import '../css/SearchResultList.css'; 

const SearchResultList: React.FC = () => {
    
    const results = useSelector((state: RootState) => state.search.results);
    const totalNumberOfResults = useSelector((state: RootState) => state.search.totalNumberOfResults);
    const page = useSelector((state: RootState) => state.search.page);
    const pageSize = useSelector((state: RootState) => state.search.pageSize);

    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalNumberOfResults);

    return (
        <div className="search-result-list">
            <p className="font-weight-bold">
                Showing {start}-{end} of {totalNumberOfResults} results
            </p>
            {results.map((result) => (
                <SearchResultItem key={result.DocumentId} result={result} />
            ))}
        </div>
    );
};

export default SearchResultList;