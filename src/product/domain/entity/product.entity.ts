import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
        
        this.name = createProductOrder.name;
        this.price = createProductOrder.price;
        this.description = createProductOrder.description;
        this.isActive = createProductOrder.isActive ?? true;
        this.stock = createProductOrder.stock ?? 0;
    }

    public deleteProduct(): void {

    }
}
