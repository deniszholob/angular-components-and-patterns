// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { LinkComponent } from './link.component';
import { MOCK_Link } from './link.model.mock';
import { Link as LinkModel } from './link.model';

type ComponentWithCustomControls = LinkComponent & LinkModel;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Link',
  component: LinkComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `Link` } },
    layout: 'centered',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    link: { table: { disable: true } },
    /** === Control Disable === */
    // link: { control: { disable: true } },
  },
  args: {
    ...MOCK_Link,
    link: MOCK_Link,
  },
};
export default meta;

export const Link: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: { ...args, link: args },
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
