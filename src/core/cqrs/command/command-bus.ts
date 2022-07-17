import { ModulesContainer } from '@nestjs/core'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

import { ClassConstructor } from 'class-transformer'
import { COMMAND_HANDLER_METADATA_KEY } from './command-metadata-keys'
import { ICommandHandler } from './command-handler.type'
import { CommandOutput } from './command-output.type'
import { Command } from './command'

@Injectable()
export class CommandBus implements OnApplicationBootstrap {
  private readonly handlers = new Map<string, ICommandHandler<any>>()

  public constructor(private readonly modulesContainer: ModulesContainer) {}

  public async execute<Input, Output, ICommand extends Command<Input, Output>>(
    command: ICommand,
  ): Promise<CommandOutput<ICommand>> {
    const commandName = Object.getPrototypeOf(command).constructor.name
    const handler = this.handlers.get(commandName)
    if (!handler) {
      throw new Error(`The handler for command ${commandName} was not found!`)
    }

    return (await handler.handle(command)) as Promise<CommandOutput<ICommand>>
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
          this.handlers.set(
            commandClassReference.name,
            instanceWrapper.instance as ICommandHandler<any>,
          )
        }
      })
    })
  }
}
