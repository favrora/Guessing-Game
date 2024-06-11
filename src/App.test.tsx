import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);

describe('App', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      reduxStore: {
        userName: '',
        balance: 1000,
        generatedValue: 0,
        speed: 0,
        animShow: false,
        usersRanking: [
          { id: '1', name: 'John Doe', score: 100 },
          { id: '2', name: 'Jane Doe', score: 200 },
        ],
      },
    });
  });

  test('renders the App component with all child components', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('join-component')).toBeInTheDocument();
    expect(screen.getByTestId('info-graph-container')).toBeInTheDocument();
    expect(screen.getByTestId('ranking-chat-container')).toBeInTheDocument();
  });

  test('renders the Join component and allows input', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'John Doe' } });

    await waitFor(() => {
      expect(input).toHaveValue('John Doe');
    });
  });

  test('renders the GameController component and allows interaction', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(startButton).toBeDisabled();
    });
  });
});
