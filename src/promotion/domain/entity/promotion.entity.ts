
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface PromotionDetailCommand {
  name: string;
  code: string;
  discount: number | null;
}

@Entity('order-item')
export class OrderItem {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'int',
  })
  discount: number;

  @Column()
  code: string;

  constructor(promotionDetailCommand?: PromotionDetailCommand) {
    if (!promotionDetailCommand) {
      return;
    }

    this.name = promotionDetailCommand.name;
    this.code = promotionDetailCommand.code;
    this.discount = promotionDetailCommand.discount ?? 1500;
  }
}
