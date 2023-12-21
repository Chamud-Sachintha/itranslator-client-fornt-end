export class OrderRequest {
    id!: string;
    invoiceNo!: string;
    token!: any;
    flag!: any;
    bankSlip!: File;
    paymentStatus!: number;
    createTime!: number;
    orderStatus!: number;
    totalAmount!: number;
    paymentType!: number;
    deliveryTimeType!: Number;
    deliveryMethod!: Number;
    paymentMethod!: Number;
    // totalAmount!: Number;
}
