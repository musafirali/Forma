// Generic error reporting no-op to avoid runtime errors when external reporting is absent.
export function reportError(_error: unknown, _context: Record<string, unknown> = {}) {
  // intentionally no-op
}
