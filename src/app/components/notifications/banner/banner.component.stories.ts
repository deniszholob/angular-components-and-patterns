// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { Notification } from '../notification.model';
import { MOCK_Notification } from '../notification.model.mock';
import { NotificationType } from '../notification-type.enum';
import { BannerComponent } from './banner.component';

type ComponentWithCustomControls = BannerComponent & Notification;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Banner',
  component: BannerComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Banner/Alert at the page level like in https://clarity.design/documentation/alert`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    type: {
      options: Object.values(NotificationType),
      control: { type: 'select' },
    },
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    $Banner: { table: { disable: true } },
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    $Banner: MOCK_Notification,
    ...MOCK_Notification,
  },
};
export default meta;

export const Banner: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: { ...args, $Banner: args },
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
