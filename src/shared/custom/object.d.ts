// namespace globalThis {
interface ObjectConstructor {
  keys<T>(o: T): Array<keyof T>;
}
// }

const a = Object.keys({ a: 2 });
