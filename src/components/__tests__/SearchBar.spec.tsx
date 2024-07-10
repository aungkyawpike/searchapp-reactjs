import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchBar from '../SearchBar';


var searchResult = {
  "TotalNumberOfResults": 100,
  "Page": 1,
  "PageSize": 10,
  "ResultItems": [{
    "DocumentId": "8f09d0d0898e5470189120415158f7b5",
    "DocumentTitle": {
      "Text": "Choose a Child Care Centre",
      "Highlights": [{
        "BeginOffset": 9,
        "EndOffset": 14
      }]
    },
    "DocumentExcerpt": {
      "Text": "...as partners to optimise the child physical, intellectual, emotional and social development. Choosing a Child Care Centre for Your Child In choosing the appropriate child care arrangement, the age and personality of your child are important factors for consideration...",
      "Highlights": [{
        "BeginOffset": 31,
        "EndOffset": 36
      },
      {
        "BeginOffset": 106,
        "EndOffset": 111
      },
      {
        "BeginOffset": 133,
        "EndOffset": 138
      },
      {
        "BeginOffset": 167,
        "EndOffset": 172
      },
      {
        "BeginOffset": 223,
        "EndOffset": 228
      }
      ]
    },
    "DocumentURI": "https://www.ecda.gov.sg/Parents/Pages/ParentsChooseCCC.aspx"
  }
  ]
}


jest.mock('../../store/searchSlice', () => ({
  ...jest.requireActual('../../store/searchSlice'),
  fetchSearchResults: jest.fn(() => ({ type: 'SEARCH/FETCH_RESULTS', payload: searchResult })),
}));


jest.mock('../../store/suggestionSlice', () => ({
  ...jest.requireActual('../../store/suggestionSlice'),
  fetchSuggestions: jest.fn(() => ({
    type: 'SUGGESTIONS/FETCH_SUGGESTIONS', payload: [
      "child care",
      "child vaccination",
      "child health",
      "child education",
      "child development account",
      "register childcare"
    ]
  })),
}));

const mockStore = configureStore([]);

const preloadedSearchState = {
  results: [],
  totalNumberOfResults: 0,
  page: 1,
  pageSize: 10,
  status: 'idle',
  error: null,
};

const preloadedSuggestionsState = {
  suggestions: [
    "child care",
    "child vaccination",
    "child health",
    "child education",
    "child development account",
    "register childcare"
  ],
  status: 'idle',
  error: null,
};

describe('SearchBar', () => {
  let store: any;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      search: preloadedSearchState,
      suggestions: preloadedSuggestionsState,
    });
  });
 
  test('Typeahead Suggestion Dropdown', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'child' } });
  
    const suggestionItems = screen.getAllByRole('suggestion-item');
    expect(suggestionItems.length).toBe(6);
    suggestionItems.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  test('Select Suggestion', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'child' } });
  
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });   
    expect((input as HTMLInputElement).value).toBe('child care');       
  });

  test('X Button in SearchBar', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'a' } });
  
    const clearButton = screen.getByRole('clear-button');
    expect(clearButton).toBeInTheDocument();
  });

  test('Click X Button in SearchBar', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'child' } });  

    const suggestionDropdown = screen.getByRole('suggestions-list'); 
    expect(suggestionDropdown).toBeInTheDocument();
  
    const clearButton = screen.getByRole('clear-button');
    expect(clearButton).toBeInTheDocument();
  
    fireEvent.click(clearButton);
  
    expect(suggestionDropdown).not.toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(clearButton).not.toBeInTheDocument();
  });
});