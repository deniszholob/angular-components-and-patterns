import { Pipe, PipeTransform } from '@angular/core';

/** Transform milliseconds into a human readable duration string.
```
Input (ms)	Output
999       999ms
1500      1s 500ms
65000     1m 5s
3723000   1h 2m 3s
90061000  1d 1h 1m 1s
```
*/
@Pipe({ name: 'appDurationFormat', standalone: true })
export class DurationFormatPipe implements PipeTransform {
  public transform(milliseconds: number): string {
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return '0ms';

    const ms = Math.floor(milliseconds % 1000);
    const totalSeconds = Math.floor(milliseconds / 1000);
    const s = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const m = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const h = totalHours % 24;
    const d = Math.floor(totalHours / 24);

    const parts: string[] = [];

    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);
    if (milliseconds < 1000 || parts.length === 0) parts.push(`${ms}ms`);

    return parts.join(' ');
  }

  // public transform(ms: number): string {
  //   if (ms < 0 || isNaN(ms)) return '0:00';

  //   const milliseconds = ms % 1000;
  //   const totalSeconds = Math.floor(ms / 1000);
  //   const seconds = totalSeconds % 60;
  //   const minutes = Math.floor((totalSeconds / 60) % 60);
  //   const hours = Math.floor(totalSeconds / 3600);

  //   const pad = (n: number, z = 2) => n.toString().padStart(z, '0');

  //   if (hours > 0) {
  //     return `${hours}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  //   } else {
  //     return `${minutes}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  //   }
  // }
}
