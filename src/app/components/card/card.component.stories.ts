// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { CardComponent } from './card.component';
import { MOCK_Card } from './card.model.mock';

type ComponentWithCustomControls = CardComponent; // & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Card',
  component: CardComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `Card` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    selectedChange: { action: 'selectedChange', table: { disable: true } },
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    ...MOCK_Card,
  },
};
export default meta;

export const Card: StoryObj<ComponentWithCustomControls> = {};

export const CardContent: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: args,
    template: `
    <app-card
      [disabled]="disabled"
      [title]="title"
      [subtitle]="subtitle"
      [selectable]="selectable"
      [selected]="selected"
      (selectedChange)="selectedChange($event)"
    >
      <div class="px-4 py-2">
        Card Content
      </div>

      <div ngProjectAs="app-card-footer" class="px-4">Card Footer</div>
    </app-card>
    `,
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
