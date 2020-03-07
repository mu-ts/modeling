export interface ValueGenerator {
  <T>(object: T, uuid: string): string;
}
