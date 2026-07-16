import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const path = req.nextUrl.pathname
      if (path === '/admin/login') return true
      if (path.startsWith('/admin')) return !!token
      return true
    },
  },
})

export const config = {
  matcher: ['/admin/:path*'],
}
