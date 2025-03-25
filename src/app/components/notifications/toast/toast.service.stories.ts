// @ref https://storybook.js.org/docs/writing-stories
import { Component, output, OutputEmitterRef } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';
import { expect, spyOn, userEvent, within } from '@storybook/test';

import { createMock_Toast } from './toast.model.mock';
import { ToastService } from './toast.service';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@Component({
  selector: 'sb-toasts-demo',
  template: `
    <button
      class="btn btn-primary"
      (click)="showToast()"
      data-testid="show-toast"
    >
      Show Toast
    </button>
  `,
  imports: [ToastContainerComponent],
  providers: [ToastService],
})
class ToastServiceDemoComponent {
  // @Input({ required: true })
  // public toast!: Toast;

  public removeToast: OutputEmitterRef<string> = output<string>();

  constructor(private toastService: ToastService) {}

  protected showToast(): void {
    const toast = createMock_Toast();
    // this.toastService.showToast(this.toast);
    this.toastService.showToast(toast).subscribe(() => {
      this.removeToast.emit(`toast-removed-${toast.id}`);
    });
  }
}

type ComponentWithCustomControls = ToastServiceDemoComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/Notifications/Toast/Toast Service Demo',
  component: ToastServiceDemoComponent,
  decorators: [
    // Cant use error module since it uses this service
    // applicationConfig({ providers: [importProvidersFrom(AppErrorsModule)] }),
  ],
  parameters: {
    docs: { description: { component: `ToastServiceDemo` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    removeToast: { action: 'removeToast', table: { disable: true } },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const consoleErrorSpy = spyOn(console, 'error');

    const openToastButton = canvas.getByTestId('show-toast');
    await userEvent.click(openToastButton);
    await userEvent.click(openToastButton);

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    // Make sure there is a toast shown in the toast container
    const toastContainer = document.querySelector('app-toast-container');
    expect(toastContainer).toBeInTheDocument();

    const toastElements = document.querySelectorAll('app-toast');
    expect(toastElements.length).toBe(2);
  },
};
