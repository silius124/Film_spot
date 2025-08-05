import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("Test App", () => {
  test("include div", () => {
    render(<App />);
    expect(screen.getByTestId("divApp")).toBeInTheDocument();
  });
});
