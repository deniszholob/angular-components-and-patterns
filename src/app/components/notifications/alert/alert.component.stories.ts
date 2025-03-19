// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { AlertComponent } from './alert.component';
import { MOCK_Notification } from '../notification.model.mock';
import { Notification } from '../notification.model';
import { NotificationType } from '../notification-type.enum';

type ComponentWithCustomControls = AlertComponent & Notification;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Alert',
  component: AlertComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `Alert` } },
    // layout: 'fullscreen',
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
    $Alert: { table: { disable: true } },
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    $Alert: MOCK_Notification,
    ...MOCK_Notification,
  },
};
export default meta;

export const Alert: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: { ...args, $Alert: args },
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
