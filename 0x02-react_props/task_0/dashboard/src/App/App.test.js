import App from "./App";
import { render } from '@testing-library/react';

test("renders without crashings", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});