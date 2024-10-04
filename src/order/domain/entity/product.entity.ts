import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SendMailServiceInterface } from "../port/mail/send-mail.service.interface";

export interface CreateProductOrder {
    name: string;
    price: number;
    description: string;
    stock: number | null;
    isActive: boolean | null;
}

@Entity()
export class Product {
    

    @PrimaryGeneratedColumn()
    private id: string;

    @Column()
    private name: string;

    @Column()
    private price: number;

    @Column()
    private stock: number;

    @Column()
    private isActive: boolean;

    @Column()
    private description: string;

    public constructor(createProductOrder?: CreateProductOrder) {
        if (!createProductOrder) {
            return;
        }

        this.checkProductOrderIsValid(createProductOrder);
        
        this.name = createProductOrder.name;
        this.price = createProductOrder.price;
        this.description = createProductOrder.description;
        this.isActive = createProductOrder.isActive ?? true;
        this.stock = createProductOrder.stock ?? 0;
    }

    public modify(createProductOrder: CreateProductOrder): void {
        this.checkProductOrderIsValid(createProductOrder);

        this.name = createProductOrder.name;
        this.price = createProductOrder.price;
        this.description = createProductOrder.description;
        this.isActive = createProductOrder.isActive ?? true;
        this.stock = createProductOrder.stock ?? 0;
    }

    private checkProductOrderIsValid(createProductOrder: CreateProductOrder): void {
        if(
            !createProductOrder.name || 
            !createProductOrder.price || 
            !createProductOrder.description || 
            createProductOrder.name.trim() === '' ||
            createProductOrder.description.trim() === ''
        ) {
            throw new Error('A product must have a name, a price and a description');
        }
    }

    public getPrice() {
        return this.price;
    }

    public decreaseStock(quantity: number, mailer: SendMailServiceInterface) {
        if(quantity > this.stock) {
            throw new Error('Not enough stock')
        }

        this.stock -= quantity

        if(this.stock == 0) {
            mailer.sendMail('admin@test.fr', 'Stock is low')
        }
    }

    public getId() {
        return this.id;
    }
}
