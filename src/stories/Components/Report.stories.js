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

export const fullData = Template.bind({});
fullData.args = reportFixtures;
