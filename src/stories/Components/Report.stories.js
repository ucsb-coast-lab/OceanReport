import React from "react";
import Report from "../../components/report";
import { reportFixtures } from "../../fixtures/dataFixtures";

export default {
  title: "Components/Report",
  component: Report,
};

const Template = (args) => {
  return <Report {...args} />;
};

export const risingData = Template.bind({});
risingData.args = reportFixtures.rising;

export const fallingData = Template.bind({});
fallingData.args = reportFixtures.falling;
