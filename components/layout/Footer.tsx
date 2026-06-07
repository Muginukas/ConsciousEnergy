import Link from 'next/link'

type Props = {
  dict: {
    footer: { disclaimer: string; copyright: string }
    nav: { home: string; techniques: string; about: string; getApp: string }
  }
}

export default function Footer({ dict }: Props) {
  return (
    <footer
      className="mt-auto py-12 px-4"
      style={{
        backgroundColor: 'var(--color-forest-900)',
        color: 'var(--color-forest-200)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
          >
            ConsciousEnergy
          </h3>
          <p className="text-sm opacity-70 max-w-xs">
            Ancient practices for modern consciousness expansion.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          <Link href="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
            {dict.nav.home}
          </Link>
          <Link href="/techniques" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
            {dict.nav.techniques}
          </Link>
          <Link href="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
            {dict.nav.about}
          </Link>
          <Link href="/get-the-app" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
            {dict.nav.getApp}
          </Link>
        </nav>

        {/* Disclaimer */}
        <div>
          <p className="text-xs opacity-60 leading-relaxed">{dict.footer.disclaimer}</p>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-8 pt-6 text-xs opacity-40"
        style={{ borderTop: '1px solid rgba(183,223,201,0.2)' }}
      >
        © {new Date().getFullYear()} {dict.footer.copyright}
      </div>
    </footer>
  )
}
