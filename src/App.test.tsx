import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders questionnaire", () => {
  render(<App />);
  const titleElement = screen.getByTestId('titleQuiz');
  expect(titleElement).toBeInTheDocument();

  const questionsElement = screen.getByRole("button");
  expect(questionsElement).toBeInTheDocument();

  const linkElement = screen.getByRole("link");
  expect(linkElement).toBeInTheDocument();

  const submitButton = screen.getByText(/Envoyer/i);
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);


});
