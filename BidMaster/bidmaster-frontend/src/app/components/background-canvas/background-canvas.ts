import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

interface GhostNumber {
  x: number;
  y: number;
  text: string;
  size: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  speedY: number;
  drift: number;
  baseAlpha: number;
}

@Component({
  selector: 'app-background-canvas',
  standalone: true,
  template: `<canvas #canvas class="bg-canvas"></canvas>`,
  styles: [
    `
      .bg-canvas {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
      }
    `,
  ],
})
export class BackgroundCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;
  private DPR = 1;
  private mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
  private ghostNumbers: GhostNumber[] = [];
  private particles: Particle[] = [];
  private reduceMotion = false;
  private rafId: number | null = null;

  private onResize = () => this.resize();
  private onMouseMove = (e: MouseEvent) => {
    this.mouse.targetX = e.clientX;
    this.mouse.targetY = e.clientY;
  };
  private onTouchMove = (e: TouchEvent) => {
    if (e.touches && e.touches[0]) {
      this.mouse.targetX = e.touches[0].clientX;
      this.mouse.targetY = e.touches[0].clientY;
    }
  };

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;

    this.resize();
    this.buildParticles();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });

    // Run the animation loop outside Angular's zone so it doesn't trigger
    // change detection on every frame.
    this.zone.runOutsideAngular(() => {
      this.draw();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.DPR = Math.min(window.devicePixelRatio || 1, 2);
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    canvas.width = this.W * this.DPR;
    canvas.height = this.H * this.DPR;
    canvas.style.width = this.W + 'px';
    canvas.style.height = this.H + 'px';
    this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    this.buildGhostNumbers();
  }

  private buildGhostNumbers(): void {
    this.ghostNumbers = [];
    const cols = Math.ceil(this.W / 130) + 1;
    const rows = Math.ceil(this.H / 110) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const amount = (Math.floor(Math.random() * 480) + 20) * 5;
        this.ghostNumbers.push({
          x: c * 130 + (r % 2 === 0 ? 0 : 65) + (Math.random() * 20 - 10),
          y: r * 110 + (Math.random() * 20 - 10),
          text: '€' + amount.toLocaleString('de-DE'),
          size: 12 + Math.random() * 6,
        });
      }
    }
  }

  private buildParticles(): void {
    this.particles = [];
    const count = this.reduceMotion ? 0 : 60;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        r: 0.6 + Math.random() * 1.6,
        speedY: 0.12 + Math.random() * 0.28,
        drift: (Math.random() - 0.5) * 0.15,
        baseAlpha: 0.05 + Math.random() * 0.12,
      });
    }
  }

  private draw = (): void => {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#120F17';
    ctx.fillRect(0, 0, W, H);

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * (this.reduceMotion ? 1 : 0.08);
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * (this.reduceMotion ? 1 : 0.08);

    const spotR = 340;

    ctx.textBaseline = 'middle';
    for (const g of this.ghostNumbers) {
      const dx = g.x - this.mouse.x;
      const dy = g.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / spotR);
      const alpha = 0.035 + proximity * 0.5;
      ctx.fillStyle = 'rgba(201,162,39,' + alpha.toFixed(3) + ')';
      ctx.font = 500 + ' ' + g.size + 'px JetBrains Mono, monospace';
      ctx.fillText(g.text, g.x, g.y);
    }

    for (const pt of this.particles) {
      pt.y -= pt.speedY;
      pt.x += pt.drift;
      if (pt.y < -10) {
        pt.y = H + 10;
        pt.x = Math.random() * W;
      }
      if (pt.x < -10) pt.x = W + 10;
      if (pt.x > W + 10) pt.x = -10;

      const ddx = pt.x - this.mouse.x;
      const ddy = pt.y - this.mouse.y;
      const dd = Math.sqrt(ddx * ddx + ddy * ddy);
      const prox = Math.max(0, 1 - dd / spotR);
      const a = pt.baseAlpha + prox * 0.55;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.r + prox * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232,196,104,' + a.toFixed(3) + ')';
      ctx.fill();
    }

    const grad = ctx.createRadialGradient(
      this.mouse.x,
      this.mouse.y,
      0,
      this.mouse.x,
      this.mouse.y,
      spotR
    );
    grad.addColorStop(0, 'rgba(201,162,39,0.09)');
    grad.addColorStop(0.5, 'rgba(201,162,39,0.03)');
    grad.addColorStop(1, 'rgba(201,162,39,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const vgrad = ctx.createRadialGradient(
      W / 2,
      H / 2,
      H * 0.2,
      W / 2,
      H / 2,
      H * 0.9
    );
    vgrad.addColorStop(0, 'rgba(0,0,0,0)');
    vgrad.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vgrad;
    ctx.fillRect(0, 0, W, H);

    this.rafId = requestAnimationFrame(this.draw);
  };
}
