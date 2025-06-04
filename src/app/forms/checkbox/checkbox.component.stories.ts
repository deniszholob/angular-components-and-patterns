// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { CheckboxComponent } from './checkbox.component';

type ComponentWithCustomControls = CheckboxComponent; // & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `Checkbox` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    checkedChange: { action: 'checkedChange', table: { disable: true } },
    indeterminateChange: {
      action: 'indeterminateChange',
      table: { disable: true },
    },
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    display: 'Checkbox',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};
export default meta;

export const Checkbox: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
