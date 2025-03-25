// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { NotFoundPageComponent } from './not-found-page.component';

type ComponentWithCustomControls = NotFoundPageComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Pages/Not Found Page',
  component: NotFoundPageComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `NotFoundPage` } },
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

export const NotFoundPage: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
