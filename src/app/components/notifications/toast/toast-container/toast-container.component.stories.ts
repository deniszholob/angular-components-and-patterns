// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { MOCK_Toast_Array } from '../toast.model.mock';
import { ToastContainerComponent } from './toast-container.component';

type ComponentWithCustomControls = ToastContainerComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Toast/Toast Container',
  component: ToastContainerComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `ToastContainer` } },
    layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    removeToast: { action: 'removeToast', table: { disable: true } },
    hover: { action: 'hover', table: { disable: true } },
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    toasts: MOCK_Toast_Array,
  },
};
export default meta;

export const ToastContainer: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: args,
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
