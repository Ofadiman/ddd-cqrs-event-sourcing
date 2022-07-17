export abstract class Query<Input, Output> {
  public _output: Output

  public constructor(public readonly input: Input) {}
}
