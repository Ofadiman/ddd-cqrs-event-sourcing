export abstract class Command<Input, Output> {
  public _output: Output

  public constructor(public readonly input: Input) {}
}
