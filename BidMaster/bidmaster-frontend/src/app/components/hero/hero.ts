import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroTitle', { static: true }) heroTitleRef!: ElementRef<HTMLHeadingElement>;

  readonly titleText = 'BIDMASTER';
  activeStat = 1204;

  private reduceMotion = false;
  private letterSpans: HTMLSpanElement[] = [];

  private onMouseMove = (e: MouseEvent) => this.updateLetters(e.clientX, e.clientY);
  private onTouchMove = (e: TouchEvent) => {
    if (e.touches && e.touches[0]) {
      this.updateLetters(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const titleEl = this.heroTitleRef.nativeElement;
    this.titleText.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      titleEl.appendChild(span);
      this.letterSpans.push(span);
    });

    if (!this.reduceMotion) {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
  }

  private updateLetters(clientX: number, clientY: number): void {
    const radius = 220;
    this.letterSpans.forEach((span) => {
      const r = span.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const t = Math.max(0, 1 - dist / radius);

      if (t <= 0) {
        span.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        span.style.color = '';
        span.style.textShadow = 'none';
        return;
      }
      const lift = -18 * t;
      const scale = 1 + 0.18 * t;
      const rotate = (dx / radius) * -8 * t;
      span.style.transform = `translateY(${lift.toFixed(1)}px) scale(${scale.toFixed(
        3
      )}) rotate(${rotate.toFixed(1)}deg)`;

      const mix = t;
      span.style.color =
        mix > 0.15
          ? `rgb(${Math.round(243 + (232 - 243) * mix)},${Math.round(
              238 + (196 - 238) * mix
            )},${Math.round(228 + (104 - 228) * mix)})`
          : '';
      span.style.textShadow =
        mix > 0.1
          ? `0 0 ${(18 * mix).toFixed(0)}px rgba(201,162,39,${(0.7 * mix).toFixed(2)})`
          : 'none';
    });
  }
}
