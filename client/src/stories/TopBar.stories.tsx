import {type StoryFn} from "@storybook/react";
import TopBar, { type TopBarProps } from '../components/TopBar';

export default {
  title: 'Components/TopBar',
  component: TopBar
};

const Template: StoryFn<TopBarProps> = (args) => <TopBar {...args} />;

export const Default = Template.bind({ });
Default.args = {
  header: 'Prometheus'
};
