// @ref https://storybook.js.org/docs/writing-stories
import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

import { createMock_Toast } from './toast.model.mock';
import { ToastService } from './toast.service';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@Component({
  selector: 'sb-toasts-demo',
  template: `
    <button class="btn btn-primary" (click)="showToast()">Show Toast</button>
  `,
  imports: [ToastContainerComponent],
  providers: [ToastService],
})
class ToastServiceDemoComponent {
  // @Input({ required: true })
  // public toast!: Toast;

  constructor(private toastService: ToastService) {}

  protected showToast(): void {
    // this.toastService.showToast(this.toast);
    this.toastService.showToast(createMock_Toast());
  }
}

type ComponentWithCustomControls = ToastServiceDemoComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Toast/Toast Service Demo',
  component: ToastServiceDemoComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `ToastServiceDemo` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // removeToast: { action: 'removeToast', table: { disable: true } },
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    // toast: MOCK_Toast,
  },
};
export default meta;

export const ToastServiceDemo: StoryObj<ComponentWithCustomControls> = {
  render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
