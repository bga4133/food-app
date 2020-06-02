import React from "react";
import { Render, render, findByText } from "@testing-library/react";
import App from "../App";

//firts test check the render of the app
test("home ok", async () => {
  const { findByText } = render(<App />);
  const title = await findByText(/Food search app/i);
  expect(title).toBeInTheDocument();
});
