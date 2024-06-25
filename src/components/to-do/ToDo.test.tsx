import { describe, expect, test } from "vitest";
import { ToDo } from "./ToDo";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("Tests for ToDo", () => {
  test("Title Rendered Correctly", async () => {
    render(<ToDo />);

    const title = await screen.findByText(/Todo List/);

    expect(title).not.toBeInTheDocument();
  });

  test("Input should be showing what is typed", async () => {
    render(<ToDo />);

    const input = screen.getByPlaceholderText("Type your task");
    await userEvent.type(input, "Jane Doe");
    expect(input).toHaveValue("Jane Doe");
  });

  /*
Continue aqui:

- Apertar os botôes e suas consequencias
- Verificar o que acontece ao submeter input
- Verificar se o botao de submit deve ou nao esta habilitado

etc
*/
});
