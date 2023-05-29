import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";

import router from "./router";

describe("App test", () => {
  it("renders App", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText("List")).toBeInTheDocument();
  });
});
