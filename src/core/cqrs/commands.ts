import { ModulesContainer } from '@nestjs/core'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

import { ClassConstructor } from 'class-transformer'
import { COMMAND_HANDLER_METADATA_KEY } from './metadata-keys'

export const CommandHandler = <Input, Output, Command extends AbstractCommand<Input, Output>>(
  command: ClassConstructor<Command>,
): (<
  Target extends ClassConstructor<{
    handle(command: Command): Promise<CommandOutput<Command>>
  }>,
>(
  target: Target,
) => void) => {
  return (target) => {
    console.log(`target.name: ${target.name}`)
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA_KEY, command, target.prototype)
  }
}

export abstract class AbstractCommand<Input, Output> {
  public _output!: Output

  public constructor(public readonly input: Input) {}
}

export type CommandOutput<Command extends AbstractCommand<unknown, unknown>> = Command['_output']

export type Handler<Command extends AbstractCommand<unknown, unknown>> = {
  handle(command: Command): Promise<CommandOutput<Command>>
}

@Injectable()
export class CommandBus implements OnApplicationBootstrap {
  private handlers = new Map<string, Handler<any>>()

  public constructor(private readonly modulesContainer: ModulesContainer) {}

  public async execute<Input, Output, Command extends AbstractCommand<Input, Output>>(
    command: Command,
  ): Promise<CommandOutput<Command>> {
    const commandName = Object.getPrototypeOf(command).constructor.name
    const handler = this.handlers.get(commandName)
    if (!handler) {
      throw new Error(`The handler for command ${commandName} was not found!`)
    }

    return (await handler.handle(command)) as Promise<CommandOutput<Command>>
  }

  public onApplicationBootstrap(): void {
    void [...this.modulesContainer.values()].forEach((module): void => {
      if (!module.instance) {
        return
      }

      if (!module.instance.constructor) {
        return
      }

      module.providers.forEach((instanceWrapper) => {
        if (!instanceWrapper.instance) {
          return
        }

        const commandClassReference = Reflect.getMetadata(
          COMMAND_HANDLER_METADATA_KEY,
          instanceWrapper.instance as Object,
        ) as ClassConstructor<unknown>

        if (commandClassReference) {
          this.handlers.set(commandClassReference.name, instanceWrapper.instance as Handler<any>)
        }
      })
    })
  }
}
