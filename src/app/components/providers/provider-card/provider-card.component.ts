import { Component, OnInit, Input } from '@angular/core';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { Router } from '@angular/router';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { StorageManager } from 'src/app/utils/StorageManager';

@Component({
  selector: 'provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.scss']
})
export class ProviderCardComponent implements OnInit {

  @Input("supplier") supplier: ISupplier | null = null;
  @Input("company") company: ICompany | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  colorStatus() {
    return statusNameColor(this.supplier!.statusData.status);
  }

  goToProvidersDetail(supplierId: number)
  {
    StorageManager.setStringValue("supplierId",supplierId.toString())
    this.router.navigateByUrl(`/providers/assignments/${supplierId}`)
  }

  getPendingAssignaments() {

    let assignaments: string[] = [];
  }

}
