// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { HomePageComponent } from './home-page.component';

type ComponentWithCustomControls = HomePageComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Pages/Home Page',
  component: HomePageComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `HomePage` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // someControl: { table: { disable: true } },
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {},
};
export default meta;

export const HomePage: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
