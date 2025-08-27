// src/sections/Forecasts.tsx
'use client'

import Section from '@/sections/Section'
import ForecastPreview from '@/components/ForecastPreview'

export default function Forecasts() {
  // Optional: supply real data; otherwise ForecastPreview renders a demo series
  // const data = [...]

  return (
    <Section
      id="forecasts"
      heading="Forecasts"
      subheading="Preview of actuals vs. forecast with confidence intervals."
    >
      <div className="grid gap-6">
        <ForecastPreview
          title="7–30 Day KPI Forecast"
          metric="CTR"
          horizons={['7d','14d','30d']}
          // data={data}
          formatY={(v) => `${v.toFixed(1)}%`}
        />
      </div>
    </Section>
  )
}
