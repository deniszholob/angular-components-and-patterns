// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { ProgressBarComponent } from './progress-bar.component';
import { ProgressBar as ProgressBarModel } from './progress-bar.model';
import { MOCK_ProgressBar } from './progress-bar.model.mock';

type ComponentWithCustomControls = ProgressBarComponent & ProgressBarModel;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Progress Bar',
  component: ProgressBarComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `ProgressBar` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    $ProgressBar: { table: { disable: true } },
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    $ProgressBar: MOCK_ProgressBar,
    ...MOCK_ProgressBar,
  },
};
export default meta;

export const ProgressBar: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: { ...args, $ProgressBar: args },
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
