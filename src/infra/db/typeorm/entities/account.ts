import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from 'typeorm'

@Entity('accounts')
export class Account{
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}