import { configureStore } from "@reduxjs/toolkit";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, test, vi } from "vitest";
import App from "./App";
import reduxStoreReducer from "./store/reduxStoreSlice";

vi.mock("./services/ws", () => ({
  default: {
    emit: vi.fn(),
    off: vi.fn(),
    on: vi.fn(),
  },
}));

const renderApp = () => {
  const store = configureStore({
    reducer: { reduxStore: reduxStoreReducer },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  return store;
};

describe("Multiplier Arena", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  test("renders the complete dashboard", async () => {
    renderApp();

    expect(screen.getByRole("heading", { name: "Multiplier Arena" })).toBeInTheDocument();
    expect(screen.getByTestId("join-component")).toBeInTheDocument();
    expect(
      await screen.findByTestId("info-graph-container", {}, { timeout: 5000 }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("ranking-chat-container")).toBeInTheDocument();
  });

  test("accepts a valid player name", () => {
    const store = renderApp();
    const input = screen.getByRole("textbox", { name: "Player name" });

    fireEvent.change(input, { target: { value: "David" } });
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(store.getState().reduxStore.userName).toBe("David");
    expect(screen.getByText("David")).toBeInTheDocument();
  });

  test("prevents overlapping rounds", () => {
    vi.useFakeTimers();
    renderApp();

    const startButton = screen.getByRole("button", { name: "Start" });
    fireEvent.click(startButton);

    expect(startButton).toBeDisabled();
    expect(startButton).toHaveTextContent("Started");
  });
});
