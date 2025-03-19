import {
  Directive,
  effect,
  ElementRef,
  input,
  InputSignal,
  Renderer2,
} from '@angular/core';

import {
  TOOLTIP_POSITION_CLASSES,
  TOOLTIP_POSITION_CLASSES_UNIQUE,
  TooltipPosition,
} from './tooltip-position.enum';

const TOOLTIP_TRIGGER_CLASS = 'tooltip-trigger';
const TOOLTIP_CLASS = 'tooltip';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
  host: { class: TOOLTIP_TRIGGER_CLASS },
})
export class TooltipDirective {
  public appTooltip: InputSignal<string> = input.required<string>();
  public appTooltipPosition: InputSignal<TooltipPosition> =
    input<TooltipPosition>(TooltipPosition.UP);
  public appTooltipClassList: InputSignal<string> = input<string>('');

  private tooltipElement?: HTMLSpanElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    effect((): void => {
      this.renderTooltip(
        this.appTooltip(),
        this.appTooltipPosition(),
        this.appTooltipClassList(),
      );
    });
  }

  private renderTooltip(
    text: string,
    position: TooltipPosition,
    classList: string,
  ): void {
    if (!this.tooltipElement) this.addTooltip();
    if (!this.tooltipElement) throw new Error('Tooltip element not created');
    this.tooltipElement.textContent = text;
    this.removePositionClasses();
    this.applyPositionClasses(position);
    const classes: string[] = classList.length ? classList.split(' ') : [];
    this.tooltipElement.classList.add(...classes);
  }

  private addTooltip(): void {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, TOOLTIP_CLASS);
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  private applyPositionClasses(position: TooltipPosition): void {
    const positionClass: string = TOOLTIP_POSITION_CLASSES[position];
    this.renderer.addClass(this.tooltipElement, positionClass);
  }

  private removePositionClasses(): void {
    TOOLTIP_POSITION_CLASSES_UNIQUE.forEach((c: string): void => {
      this.renderer.removeClass(this.tooltipElement, c);
    });
  }
}
