import Generator from '@/core/generator';

export default class Mine {
  make(level) {
    return new Generator(level).make();
  }
  check() {}
}