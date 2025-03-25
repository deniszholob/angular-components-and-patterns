// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { MOCK_Notification } from 'src/app/components';
import { AppErrorsModule } from 'src/app/core';

import { MOCK_Nav } from '../nav/nav.model.mock';
import { HeaderComponent } from './header.component';

type ComponentWithCustomControls = HeaderComponent; // & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Layout/Header',
  component: HeaderComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `Header` } },
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
    $Banner: MOCK_Notification,
    $Nav: MOCK_Nav,
  },
};
export default meta;

export const Header: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
