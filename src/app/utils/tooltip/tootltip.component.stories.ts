// @ref https://storybook.js.org/docs/writing-stories
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { TooltipDirective } from './tooltip.directive';
import { TooltipPosition } from './tooltip-position.enum';

type ComponentWithCustomControls = TooltipDirective;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Utils/Tooltip Demo',
  component: TooltipDirective,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [importProvidersFrom()] })],
  parameters: {
    docs: { description: { component: `appTooltip Directive usage deo` } },
    layout: 'centered',
  },
  argTypes: {
    /** === Input Mapping === */
    appTooltipPosition: {
      options: Object.values(TooltipPosition),
      control: { type: 'select' },
    },
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    appTooltip: 'Testing Tooltip Content',
    appTooltipPosition: TooltipPosition.UP,
    appTooltipClassList: 'text-lg font-bold',
  },
};
export default meta;

export const TooltipDemo: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: args,
    template: `
    <button
      class="btn btn-primary"
      [appTooltip]="appTooltip"
      [appTooltipPosition]="appTooltipPosition"
      [appTooltipClassList]="appTooltipClassList"
    >
      Hover over me
    </button>
    `,
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
