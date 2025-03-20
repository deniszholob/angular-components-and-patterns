import { Router } from '@angular/router';
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { AppComponent } from './app.component';
import { MOCK_Router } from './core';
import {
  MOCK_APP_BUILD_DATE_Token,
  MOCK_APP_BUILD_VERSION_Token,
} from './layout/footer/footer-tokens.mock';

type ComponentWithCustomControls = AppComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'App',
  component: AppComponent,
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
    docs: { description: { component: `App` } },
    layout: 'fullscreen',
  },
  argTypes: {
    // Output
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {},
};
export default meta;

export const App: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
