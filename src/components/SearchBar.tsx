import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../store/searchSlice';
import { fetchSuggestions } from '../store/suggestionSlice';
import { AppDispatch, RootState } from '../store';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../css/SearchBar.css';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const dispatch = useDispatch<AppDispatch>();
    const suggestions = useSelector((state: RootState) => state.suggestions.suggestions);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (query.length > 2) {
            dispatch(fetchSuggestions(query));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [query, dispatch]);

    const handleSearch = () => {
        if (query.trim() !== '') {
            dispatch(fetchSearchResults(query));
            setShowSuggestions(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                setQuery(suggestions[selectedIndex]);
            }
            handleSearch();
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        handleSearch();
    };

    const handleClear = () => {
        setQuery('');
        setShowSuggestions(false);
        setSelectedIndex(-1);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const filteredSuggestions = suggestions
        .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6);

    return (
        <div className="search-bar">
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search..."
            />
            {query.length > 0 && (
                <button className="clear-button" role="clear-button" onClick={handleClear}>
                    <FaTimes className="icon" />
                </button>
            )}
            <button className="search-button" onClick={handleSearch}>
                <FaSearch className="icon" />
                Search
            </button>
            {showSuggestions && (
                <ul className="suggestions-list" role="suggestions-list">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            role="suggestion-item"
                            className={index === selectedIndex ? 'selected' : ''}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;