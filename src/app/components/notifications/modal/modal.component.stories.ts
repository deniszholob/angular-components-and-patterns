// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { ModalComponent } from './modal.component';
// import { MOCK_Modal } from './modal.model.mock';
// import { Modal as ModalModel } from './modal.model';

type ComponentWithCustomControls = ModalComponent; // & ModalModel;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Modal',
  component: ModalComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `Modal` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    modalClose: { action: 'modalClose', table: { disable: true } },
    modalAction: { action: 'modalAction', table: { disable: true } },
    /** === Control Hide === */
    // $Modal: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    // $Modal: MOCK_Modal,
    // ...MOCK_Modal,
  },
};
export default meta;

export const Modal: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    // props: { ...args, $Modal: args },
    props: args,
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
