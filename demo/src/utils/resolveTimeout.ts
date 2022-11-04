export async function resolveTimeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
