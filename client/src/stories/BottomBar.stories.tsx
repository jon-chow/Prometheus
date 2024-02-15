import {type StoryFn} from "@storybook/react";
import BottomBar, { type BottomBarProps } from '../components/BottomBar';

export default {
  title: 'Components/BottomBar',
  component: BottomBar
};

const Template: StoryFn<BottomBarProps> = args => <BottomBar {...args} />;

export const Default = Template.bind({ });
Default.args = {};
