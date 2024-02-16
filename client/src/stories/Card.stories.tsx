import {type StoryFn} from "@storybook/react";
import Card, { type CardProps } from '../components/Card';

import { EMPTY_TRACK } from '../data/tracks';

export default {
  title: 'Components/Card',
  component: Card
};

const Template: StoryFn<CardProps> = args => <Card {...args} />;

export const Default = Template.bind({ });
Default.args = {
  track: EMPTY_TRACK,
  isCurrentTrack: false
};
