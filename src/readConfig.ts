export function readConfig(key: string, required = true) {
  const value = Deno.env.get(key);

  if (required && !value) throw new Error(`Missing environment variable ${key}`);

  return value as string;
}
