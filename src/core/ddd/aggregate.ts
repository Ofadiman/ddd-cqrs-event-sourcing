import { Projection } from '../../users/domain/user.projection'
import { AggregateState } from './aggregate-state.type'
import { DomainEvent } from './domain-event'

export abstract class Aggregate<State extends AggregateState, Event extends DomainEvent<any, any>> {
  protected abstract projection: Projection<State, Event>

  protected state: State | null = null
  protected events: Event[] = []

  public getUncommittedEvents(): Event[] {
    return this.events
  }

  public clearEvents() {
    this.events = []
  }

  public getState(): State {
    if (this.state === null) {
      throw new Error('State in aggregate is null.')
    }

    return this.state
  }

  protected emit(event: Event): void {
    this.state = this.projection.project(event, this.state)

    event.sequence = this.state.version
    event.snapshotId = this.state.id

    this.events.push(event)
  }
}
