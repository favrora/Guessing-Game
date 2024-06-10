import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

// Mocking the components used in App
const JoinMock = () => <div data-testid="join-component">Join Component</div>;
const GameControllerMock = () => <div data-testid="game-controller-component">GameController Component</div>;
const InfoMock = () => <div data-testid="info-component">Info Component</div>;
const GraphMock = () => <div data-testid="graph-component">Graph Component</div>;
const RankingMock = () => <div data-testid="ranking-component">Ranking Component</div>;
const ChatMock = () => <div data-testid="chat-component">Chat Component</div>;

// Setting display names for mocked components
JoinMock.displayName = 'JoinMock';
GameControllerMock.displayName = 'GameControllerMock';
InfoMock.displayName = 'InfoMock';
GraphMock.displayName = 'GraphMock';
RankingMock.displayName = 'RankingMock';
ChatMock.displayName = 'ChatMock';

jest.mock('./components/Join', () => JoinMock);
jest.mock('./components/GameController', () => GameControllerMock);
jest.mock('./components/Info', () => InfoMock);
jest.mock('./components/Graph', () => GraphMock);
jest.mock('./components/Ranking', () => RankingMock);
jest.mock('./components/Chat', () => ChatMock);

describe('App', () => {
  test('renders the App component with all child components', () => {
    render(<App />);

    expect(screen.getByTestId('join-component')).toBeInTheDocument();
    expect(screen.getByTestId('game-controller-component')).toBeInTheDocument();
    expect(screen.getByTestId('info-component')).toBeInTheDocument();
    expect(screen.getByTestId('graph-component')).toBeInTheDocument();
    expect(screen.getByTestId('ranking-component')).toBeInTheDocument();
    expect(screen.getByTestId('chat-component')).toBeInTheDocument();
  });
});

describe('Join', () => {
  test('renders Join component and allows input', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Join Component')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter your name');
    act(() => {
      fireEvent.change(input, { target: { value: 'John Doe' } });
    });
    expect(input).toHaveValue('John Doe');
  });
});

describe('GameController', () => {
  test('renders GameController component and allows interaction', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('GameController Component')).toBeInTheDocument();
    const startButton = screen.getByText('Start');
    act(() => {
      fireEvent.click(startButton);
    });
  });
});

describe('Graph', () => {
  test('renders Graph component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/x$/)).toBeInTheDocument();
  });
});
