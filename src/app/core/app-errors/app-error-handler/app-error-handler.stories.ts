// @ref https://storybook.js.org/docs/writing-stories
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  NgTemplateContextImplicit,
  NgTemplateTypedDirective,
} from 'src/app/utils';

import { AppErrorsModule } from '../app-errors.module';
import {
  errorToErrorDisplay,
  KNOWN_ERRORS_DISPLAY,
  MOCK_AppError_FULL,
  SbErrorDisplay,
} from './app-error-handler.mock';

@Component({
  selector: 'sb-error-handler-demo',
  template: `
    <!-- Storybook doesn't pick up tailwind classes unless they are in a component.ts, which is generally good but with custom demo components this shim is needed -->
    <style>
      .odd:bg-neutral-200:nth-child(odd) {
        background-color: #e5e5e5;
      }
      .even:bg-neutral-100:nth-child(even) {
        background-color: #f5f5f5;
      }
      .py-2 {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
    </style>

    <div class="flex flex-col">
      <ng-container
        *ngTemplateOutlet="
          ErrorDisplay.template;
          context: { $implicit: customError }
        "
      >
      </ng-container>

      @for (e of knownErrors; track $index) {
        <ng-container
          *ngTemplateOutlet="ErrorDisplay.template; context: { $implicit: e }"
        >
        </ng-container>
      }

      <ng-template
        #ErrorDisplay="ngTemplateType"
        [ngTemplateType]="KnownErrorDisplay"
        let-error
      >
        <div class="py-2 odd:bg-neutral-200 even:bg-neutral-100">
          <div>
            <button
              class="btn btn-icon"
              (click)="
                knownErrorsExpanded.set(
                  error.title,
                  !knownErrorsExpanded.get(error.title)
                )
              "
            >
              <i class="fa-solid fa-fw fa-info"></i>
            </button>
            <button class="btn btn-primary" (click)="error.action()">
              Throw {{ error.title }}
            </button>
          </div>

          <pre
            [ngStyle]="{
              display: knownErrorsExpanded.get(error.title) ? 'block' : 'none',
            }"
            style="white-space: pre-wrap;"
            >{{ error.content }}</pre
          >
        </div>
      </ng-template>
    </div>
  `,
  imports: [CommonModule, NgTemplateTypedDirective],
  providers: [],
})
export class ErrorHandlerDemoComponent {
  // Make "Types" available to the template
  protected readonly KnownErrorDisplay!: NgTemplateContextImplicit<SbErrorDisplay>;

  protected customError!: SbErrorDisplay;
  @Input({ required: true })
  public set error(value: Error) {
    this.customError = errorToErrorDisplay(`Custom Error`, value);
  }

  protected knownErrors: SbErrorDisplay[] = KNOWN_ERRORS_DISPLAY;
  protected knownErrorsExpanded: Map<string, boolean> = new Map(
    KNOWN_ERRORS_DISPLAY.map((e: SbErrorDisplay): [string, boolean] => [
      e.title,
      false,
    ]),
  );
}

type ComponentWithCustomControls = ErrorHandlerDemoComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Core/Error Handler Demo',
  component: ErrorHandlerDemoComponent,
  decorators: [
    moduleMetadata({ imports: [AppErrorsModule] }),
    // applicationConfig({ providers: [ importProvidersFrom(AppErrorsModule) ]})
  ],
  parameters: {
    docs: { description: { component: `ErrorHandlerDemoComponent` } },
    layout: 'fullscreen',
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
    error: MOCK_AppError_FULL,
  },
};
export default meta;

export const ErrorHandlerDemo: StoryObj<ComponentWithCustomControls> = {
  //   render: (args): StoryFnAngularReturnType => ({ props: args }),
  // play: async ({ canvasElement }) => { const canvasElement = within(canvasElement) },
};
