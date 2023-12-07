import { InvoiceTable } from "../InvoiceTable/invoice-table";

export class Invoice {
    invoiceId!: string;
    invoiceTo!: string;
    invoiceAddress!: string;
    invoiveTable!: InvoiceTable[];
    mobileNumber!: string;
    issuedDate!: string;
    invoiceStatus!: string;
    subTotal!: number;
    totalAmount!: number;
}
