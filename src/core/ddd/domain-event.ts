import { v4 } from 'uuid'

export abstract class DomainEvent<Name, Payload> {
  public readonly id: string
  public readonly createdAt: string
  public readonly name: Name
  public readonly payload: Payload

  public snapshotId: string
  public sequence: number

  protected constructor(name: Name, payload: Payload) {
    this.name = name
    this.payload = payload
    this.createdAt = new Date().toISOString()
    this.id = v4()
  }
}
