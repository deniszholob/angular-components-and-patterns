// @ref https://storybook.js.org/docs/writing-stories
import { importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { AppErrorsModule, MOCK_Router } from 'src/app/core';

import {
  MOCK_APP_BUILD_DATE_Token,
  MOCK_APP_BUILD_VERSION_Token,
} from '../footer/footer-tokens.mock';
import { PageLayoutComponent } from './page-layout.component';

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
        importProvidersFrom(AppErrorsModule),
        MOCK_APP_BUILD_DATE_Token,
        MOCK_APP_BUILD_VERSION_Token,
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
