type Props = {
  dict: {
    home: {
      philosophy: {
        title: string
        what: { title: string; text: string }
        why: { title: string; text: string }
        how: { title: string; text: string }
      }
    }
  }
}

export default function PhilosophySection({ dict }: Props) {
  const ph = dict.home.philosophy

  return (
    <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-earth-50)' }}>
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-semibold text-center mb-12"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {ph.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[ph.what, ph.why, ph.how].map((item, i) => (
            <div key={i} className="flex flex-col">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                style={{ backgroundColor: 'var(--color-forest-700)', color: '#fff', fontFamily: 'var(--font-ui)' }}
              >
                {i + 1}
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                {item.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
