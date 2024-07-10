import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SearchBar from './components/SearchBar';
import SearchResultList from './components/SearchResultList';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <div className="search-container">
                    <SearchBar />
                    <SearchResultList />
                </div>
            </div>
        </Provider>
    );
};

export default App;
