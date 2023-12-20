export const config = {
  matcher: '/api'
}

export default function middleware(request: Request): Response {
  const url = new URL(request.url)

  if (url.pathname === config.matcher) {
    url.pathname = process.env.POCKETBASE_URL + url.pathname
  }

  return Response.redirect(url)
}
