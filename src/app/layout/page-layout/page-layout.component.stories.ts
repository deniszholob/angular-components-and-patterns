// @ref https://storybook.js.org/docs/writing-stories
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { PageLayoutComponent } from './page-layout.component';
import {
  MOCK_APP_BUILD_DATE_Token,
  MOCK_APP_BUILD_VERSION_Token,
} from '../footer/footer-tokens.mock';
import { RouterModule, Router } from '@angular/router';
import { MOCK_Router } from 'src/app/core';

type ComponentWithCustomControls = PageLayoutComponent; // & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Layout/Page Layout',
  component: PageLayoutComponent,
  decorators: [
    moduleMetadata({
      // imports: [RouterModule],
      providers: [{ provide: Router, useValue: MOCK_Router }],
    }),
    applicationConfig({
      providers: [
        MOCK_APP_BUILD_DATE_Token,
        MOCK_APP_BUILD_VERSION_Token,
        // importProvidersFrom()
      ],
    }),
  ],
  parameters: {
    docs: { description: { component: `PageLayout` } },
    layout: 'fullscreen',
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
  args: {},
};
export default meta;

export const PageLayout: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({
    props: args,
    template: `<app-page-layout>Page Content</app-page-layout>`,
  }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
