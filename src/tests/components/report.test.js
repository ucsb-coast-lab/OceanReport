import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Report from "../../components/report";
import { reportFixtures } from "../../fixtures/dataFixtures";

describe("Report tests", () => {
  test("renders without crashing when given complete data", async () => {
    const args = reportFixtures;
    const { getByTestId } = render(<Report {...args} />);

    // const button = getByTestId("commonsCard-button");
    // expect(button).toBeInTheDocument();
    // expect(typeof(button.textContent)).toBe('string');
    // expect(button.textContent).toEqual('Join');
    // fireEvent.click(button);
    // expect(click).toBeCalledTimes(1);

    // const name = getByTestId("commonsCard-name");
    // expect(name).toBeInTheDocument();
    // expect(typeof(name.textContent)).toBe('string');
    // expect(name.textContent).toEqual('Seths Common');

    // const id = getByTestId("commonsCard-id");
    // expect(id).toBeInTheDocument();
    // expect(typeof(id.textContent)).toBe('string');
    // expect(id.textContent).toEqual('5');
  });
});
