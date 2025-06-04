import { Meta, StoryObj } from '@storybook/angular';

import {
  BackgroundDustComponent,
  DEFAULT_COLOR,
  DEFAULT_GLOW,
} from './background-dust.component';

type ComponentWithCustomControls = BackgroundDustComponent;

export default {
  title: 'Components/Background Dust',
  component: BackgroundDustComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `BackgroundDust` } },
    layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    baseColorHex: DEFAULT_COLOR,
    glowColorHex: DEFAULT_GLOW,
  },
} satisfies Meta<ComponentWithCustomControls>;

export const BackgroundDust: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
