// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { Checkbox, CheckboxSection } from 'src/app/forms';
import { MOCK_CheckboxSectionList } from 'src/app/forms/checkbox/checkbox.model.mock';

import { Card } from '../card/card.model';
import { MOCK_Card } from '../card/card.model.mock';
import { CardListComponent } from './card-list.component';

type ComponentWithCustomControls = CardListComponent; // & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Card List',
  component: CardListComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `CardList` } },
    // layout: 'fullscreen',
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
    sections: MOCK_CheckboxSectionList.map(
      (section): CheckboxSection<Card> => ({
        ...section,
        display: 'Section',
        items: section.items.map(
          (item): Checkbox<Card> => ({
            ...item,
            data: { ...MOCK_Card, ...item },
          }),
        ),
      }),
    ),
  },
};
export default meta;

export const CardList: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
