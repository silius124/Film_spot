import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/slicers/store";

describe("Test App", () => {
  test("include div", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("divApp")).toBeInTheDocument();
  });
});
