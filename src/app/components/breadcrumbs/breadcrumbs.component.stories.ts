import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { AppErrorsModule } from 'src/app/core';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { MOCK_BreadCrumbLinks } from './breadcrumbs.service.mock';

type ComponentWithCustomControls = BreadcrumbsComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `Breadcrumbs` } },
  },
  args: {
    links: MOCK_BreadCrumbLinks,
  },
};
export default meta;

export const Breadcrumbs: StoryObj<ComponentWithCustomControls> = {};
