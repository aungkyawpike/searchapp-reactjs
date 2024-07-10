import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import SearchResultList from '../SearchResultList';

const mockStore = configureStore([]);

describe('SearchResultList', () => {
  let store: any;

  beforeEach(() => {

    const initialState = {
      search: {
        results: [
            {
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
        ],
        totalNumberOfResults: 1,
        page: 1,
        pageSize: 10,
      },
    };
    store = mockStore(initialState);
  });

  
  test('Perform Search and Display Results', () => {
    render(
      <Provider store={store}>
        <SearchResultList />
      </Provider>
    );

    const resultItems = screen.getAllByRole('listitem');
    expect(resultItems.length).toBe(1); 
  });
});
