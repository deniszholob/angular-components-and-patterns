// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { CheckboxSelectionComponent } from './checkbox-selection.component';

type ComponentWithCustomControls = CheckboxSelectionComponent; // & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Checkbox Selection',
  component: CheckboxSelectionComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `CheckboxSelection` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    sectionsChange: { action: 'sectionsChange', table: { disable: true } },
    itemsChange: { action: 'itemsChange', table: { disable: true } },
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    sections: [
      {
        display: 'Section 1',
        items: [
          { id: '1_1', display: 'Item 1', checked: false },
          { id: '1_2', display: 'Item 2', checked: false, disabled: false },
          { id: '1_3', display: 'Item 3', checked: false },
        ],
      },
      {
        display: 'Section 2',
        items: [
          { id: '2_1', display: 'Item 1', checked: false },
          { id: '2_2', display: 'Item 2', checked: false },
          { id: '2_3', display: 'Item 3', checked: false },
        ],
      },
    ],
  },
};
export default meta;

export const CheckboxSelection: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
