// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { FooterComponent } from './footer.component';
import {
  MOCK_APP_BUILD_DATE_Token,
  MOCK_APP_BUILD_VERSION_Token,
} from './footer-tokens.mock';

type ComponentWithCustomControls = FooterComponent; // & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Layout/Footer',
  component: FooterComponent,
  decorators: [
    // moduleMetadata({ imports: [] }),
    applicationConfig({
      providers: [
        importProvidersFrom(AppErrorsModule),
        MOCK_APP_BUILD_DATE_Token,
        MOCK_APP_BUILD_VERSION_Token,
      ],
    }),
  ],
  parameters: {
    docs: { description: { component: `Footer` } },
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
};
export default meta;

export const Footer: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
