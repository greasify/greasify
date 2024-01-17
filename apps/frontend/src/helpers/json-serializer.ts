export const jsonSerializer = {
  read: (value: string) => (value ? JSON.parse(value) : null),
  write: (value: unknown) => JSON.stringify(value)
}
