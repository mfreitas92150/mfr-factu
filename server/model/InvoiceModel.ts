export class InvoiceModel {
    invoiceId: String;
    userId: String;
    createdAt: Date;
    updatedAt: Date;
    validatedAt: Date;
    products: Array<ProductModel>;

    map(invoice: any) {
        const model = new InvoiceModel();
        model.invoiceId = invoice.modelId
        return model;
    }
}

class ProductModel {
    name: String;
    quantity: Number;
    cost: Number;
    tva: Number;

    map(product: any){
        const model = new ProductModel();
        model.name= product.name;
        model.quantity= product.quantity;
        model.cost= product.cost;
        model.tva= product.tva;
        return model;
    }
}