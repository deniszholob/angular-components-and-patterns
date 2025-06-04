import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';

import { BannerFlagComponent } from './banner-flag.component';

type ComponentWithCustomControls = BannerFlagComponent;

export default {
  title: 'Components/Banner Flag',
  component: BannerFlagComponent,
  decorators: [
    // moduleMetadata({ imports: [] })
    componentWrapperDecorator(
      (story) => `<div style="max-width: 30px">${story}</div>`,
    ),
  ],
  parameters: {
    docs: { description: { component: `BannerFlag` } },
    // layout: 'fullscreen',
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
  args: {},
} satisfies Meta<ComponentWithCustomControls>;

export const BannerFlag: StoryObj<ComponentWithCustomControls> = {};

export const BannerFlagContent: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({
    props: args,
    template: `<app-banner-flag>^</app-banner-flag>`,
  }),
};
