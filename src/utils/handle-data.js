export function handle(response) {
  if (response.code === 0) {
    return response.data
  }
  throw new Error(response.data.message)
}
