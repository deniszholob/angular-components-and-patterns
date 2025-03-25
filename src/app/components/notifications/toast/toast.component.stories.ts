// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule } from 'src/app/core';

import { NotificationType } from '../notification-type.enum';
import { ToastComponent } from './toast.component';
import { Toast as ToastModel } from './toast.model';
import { MOCK_Toast } from './toast.model.mock';

type ComponentWithCustomControls = ToastComponent & ToastModel;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Toast',
  component: ToastComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Toast - Displays a informative message (no actions) that will disappear after a set duration`,
      },
    },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    type: {
      options: Object.values(NotificationType),
      control: { type: 'select' },
    },
    /** === Output Actions === */
    removeToast: { action: 'removeToast', table: { disable: true } },
    hover: { action: 'hover', table: { disable: true } },
    /** === Control Hide === */
    $toast: { table: { disable: true } },
    /** === Control Disable === */
    // someControl: { control: { disable: true } },
  },
  args: {
    $toast: MOCK_Toast,
    ...MOCK_Toast,
  },
};
export default meta;

export const Toast: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: { ...args, $toast: args },
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
