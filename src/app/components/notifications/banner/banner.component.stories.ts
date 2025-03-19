// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { BannerComponent } from './banner.component';
import { NotificationType } from '../notification-type.enum';
import { MOCK_Notification } from '../notification.model.mock';
import { Notification } from '../notification.model';

type ComponentWithCustomControls = BannerComponent & Notification;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Banner',
  component: BannerComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
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
