import React from "react";
import Graphs from "../../components/graphs";
import { graphFixtures } from "../../fixtures/dataFixtures";

export default {
  title: "Components/Graphs",
  component: Graphs,
};

const Template = (args) => {
  return <Graphs {...args} />;
};

export const emptyData = Template.bind({});
emptyData.args = graphFixtures.empty;

export const fullData = Template.bind({});
fullData.args = graphFixtures.full;
