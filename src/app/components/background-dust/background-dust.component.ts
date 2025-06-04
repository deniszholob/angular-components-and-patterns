import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const DEFAULT_COLOR = '#969696';
export const DEFAULT_GLOW = '#ffffff';

@Component({
  selector: 'app-background-dust',
  template: `
    <canvas
      class="pointer-events-none absolute inset-0 z-30 h-full w-full"
      #bgCanvas
    ></canvas>
  `,
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule],
})
export class BackgroundDustComponent implements AfterViewInit {
  @Input()
  public baseColorHex: string = DEFAULT_COLOR;
  @Input()
  public glowColorHex: string = DEFAULT_GLOW;

  @ViewChild('bgCanvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private particles: Particle[] = [];
  private width = 0;
  private height = 0;

  public ngAfterViewInit(): void {
    this.initCanvas();
    this.createParticles();
    this.animate();
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.initCanvas();
    this.createParticles();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
  }

  private createParticles(): void {
    const count = 100;
    const speedMultiplier = 0.3;
    this.particles = [];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 3 + 2;
      const parallaxFactor = radius / 2.0; // larger = faster

      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius,
        speedX: (Math.random() - 0.5) * speedMultiplier * parallaxFactor,
        speedY: (Math.random() - 0.5) * speedMultiplier * parallaxFactor,
        opacity: Math.random() * 0.05 + 0.05,
      });
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'lighter'; // glow blend mode

    const glow = `${this.glowColorHex}${percentToHex(1)}`;
    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      // wrap around edges
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      const color = `${this.baseColorHex}${percentToHex(p.opacity)}`;

      // Add glow
      this.ctx.fillStyle = color;
      this.ctx.shadowColor = glow;
      this.ctx.shadowBlur = p.radius * 2; // More blur for larger particles
      this.ctx.fill();
    }

    // Reset shadow (important to avoid affecting future canvas ops)
    this.ctx.shadowBlur = 0;
    this.ctx.globalCompositeOperation = 'source-over'; // restore mode
  }
}

/**
 * Converts a percentage (0.0 to 1.0) to a 2-digit hexadecimal alpha string.
 * @param percent A number between 0 and 1 inclusive.
 * @returns A 2-digit hex string representing the alpha value.
 */
export function percentToHex(percent: number): string {
  const clamped = Math.max(0, Math.min(1, percent)); // Clamp between 0 and 1
  const hex = Math.round(clamped * 255)
    .toString(16)
    .padStart(2, '0');
  return hex.toLowerCase(); // lowercase to match CSS standards
}
