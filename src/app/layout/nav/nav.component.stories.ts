// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { NavComponent } from './nav.component';
import { MOCK_Nav } from './nav.model.mock';

type ComponentWithCustomControls = NavComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Layout/Nav',
  component: NavComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `Nav` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // $Nav: { table: { disable: true } },
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    $Nav: MOCK_Nav,
  },
};
export default meta;

export const Nav: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: args,
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
