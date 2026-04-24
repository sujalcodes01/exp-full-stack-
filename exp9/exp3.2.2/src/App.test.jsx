import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the experiment heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /ci\/cd pipeline with github actions/i
      })
    ).toBeInTheDocument();
  });

  it("shows docker image publishing details", () => {
    render(<App />);

    expect(
      screen.getByText(/docker image pushed to github container registry/i)
    ).toBeInTheDocument();
  });
});
