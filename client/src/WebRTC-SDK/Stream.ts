export interface StreamProps {
  init(): void;
}

export interface StreamSpec {

}

class Stream implements StreamProps {
  private spec: StreamSpec;

  constructor(spec) {
    this.spec = spec;
  }

  init() {

  }
}

export { Stream };
