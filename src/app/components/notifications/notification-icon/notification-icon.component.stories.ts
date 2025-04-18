// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { NotificationType } from '../notification-type.enum';
import { NotificationIconComponent } from './notification-icon.component';

type ComponentWithCustomControls = NotificationIconComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Notification Icon',
  component: NotificationIconComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `NotificationIcon` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    $NotificationType: {
      options: Object.values(NotificationType),
      control: { type: 'select' },
    },
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    $NotificationType: NotificationType.Info,
  },
};
export default meta;

export const NotificationIcon: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
