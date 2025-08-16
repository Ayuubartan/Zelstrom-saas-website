export const metadata = { title: 'Login • Zelstrom' }

export default function LoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-white/70">Single Sign-On coming soon.</p>
        <a
          href="https://app.zelstrom.io"
          className="mt-6 inline-block rounded-xl bg-white/10 px-5 py-3 text-white hover:bg-white/20 transition"
        >
          Continue to Dashboard
        </a>
      </div>
    </div>
  )
}
