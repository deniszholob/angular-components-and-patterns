import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Injectable,
  Injector,
} from '@angular/core';
import { Observable, Subject, take } from 'rxjs';

import { ModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastContainerRef?: ComponentRef<ModalComponent>;

  private modalClosedSignal = new Subject<boolean>(); // Subject to emit when a toast is removed

  constructor(private injector: Injector) {}

  public showModal() // modal: Modal
  : Observable<boolean> {
    this
      .ensureToastContainer
      // modal
      ();

    // Return an observable that emits when the toast is removed
    return new Observable<boolean>((observer) => {
      this.modalClosedSignal.pipe(take(1)).subscribe((v) => {
        observer.next(v);
        observer.complete();
      });
    });
  }

  /** Make sure to add component to the DOM */
  private ensureToastContainer() // modal: Modal
  : void {
    // cannot use inject(ApplicationRef) nor  constructor(private appRef: ApplicationRef)
    // @see https://kingtigerebooks.co.uk/post/circular-dependency-in-di-detected-for-application-ref-how
    const appRef: ApplicationRef = this.injector.get(ApplicationRef);
    if (this.toastContainerRef) return;
    this.toastContainerRef = createComponent(ModalComponent, {
      environmentInjector: appRef.injector,
    });
    appRef.attachView(this.toastContainerRef.hostView);
    document.body.appendChild(this.toastContainerRef.location.nativeElement);
    this.initTostContainer(
      this.toastContainerRef,
      // modal
    );
  }

  /** Set component inputs/outputs */
  private initTostContainer(
    componentRef: ComponentRef<ModalComponent>,
    // modal: Modal,
  ): void {
    const componentInstance: ModalComponent = componentRef.instance;
    // componentInstance.$Modal = modal;
    // componentInstance.$Modal = signal(modal).asReadonly() as InputSignal<Modal>;
    // componentRef.setInput('$Modal', modal);

    componentInstance.modalClose.subscribe((v) => {
      this.modalClosedSignal.next(v);
    });
  }
}
