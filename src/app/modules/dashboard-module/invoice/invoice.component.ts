import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data/data-share.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  

  constructor(private dataShareService: DataShareService) {}

  ngOnInit(): void {
    console.log(this.dataShareService.getComponentValueObj());
  }

}
