import { OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

export class CreateProviderCategoriesModalOverlayRef {
  public events = new BehaviorSubject<any>(null);

  constructor(private overlayRef: OverlayRef) { }

  public close(): void {
    this.overlayRef.dispose();
  }
}
