
import React from 'react';
import '../css/SearchResultList.css'

interface Highlight {
    BeginOffset: number;
    EndOffset: number;
}
interface DocumentTitle {
    Text: string;
    Highlights: Highlight[];
}
interface DocumentExcerpt {
    Text: string;
    Highlights: Highlight[];
}
interface SearchResult {
    DocumentId: string;
    DocumentTitle: DocumentTitle;
    DocumentExcerpt: DocumentExcerpt;
    DocumentURI: string;
}
interface Props {
    result: SearchResult;
}

const SearchResultItem: React.FC<Props> = ({ result }) => {
    return (
        <div className="search-result-item" role="listitem">
            <div className="color-blue">
                <h3>{result.DocumentTitle.Text}</h3>
            </div>
            <p>{result.DocumentExcerpt.Text}</p>
            <span
                style={{ color: 'grey', cursor: 'pointer' }}
                onClick={() => window.open(result.DocumentURI, '_blank', 'noopener,noreferrer')}
            >
                {result.DocumentURI}
            </span>
        </div>
    );
};

export default SearchResultItem;