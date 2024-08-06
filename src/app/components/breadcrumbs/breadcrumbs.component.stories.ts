import { Meta, StoryObj } from '@storybook/angular';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { MOCK_BreadCrumbLinks } from './breadcrumbs.service.mock';

type ComponentWithCustomControls = BreadcrumbsComponent & {};

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  parameters: {
    docs: { description: { component: `Breadcrumbs` } },
  },
  args: {
    links: MOCK_BreadCrumbLinks,
  },
};
export default meta;

export const Breadcrumbs: StoryObj<ComponentWithCustomControls> = {};
