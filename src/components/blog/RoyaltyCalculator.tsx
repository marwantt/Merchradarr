'use client';

import { useState } from 'react';

const PRICE_MIN = 14;
const PRICE_MAX = 35;
const SALES_MIN = 5;
const SALES_MAX = 500;

function getRoyalty(price: number, multiplier: number): number {
  // Plus rate (current standard) ≈ $4.88 at $19.99
  // Formula derived from Amazon's known values: royalty ≈ price × 0.244
  const plus = price * 0.244;
  return +(plus * multiplier).toFixed(2);
}

const tiers = [
  {
    key: 'creator',
    label: 'Creator',
    sublabel: 'Default — no traffic required',
    multiplier: 0.5,
    threshold: '0%',
    color: 'bg-foreground/10 border-foreground/20',
    barColor: 'bg-foreground/30',
    textColor: 'text-foreground/60',
    accentColor: 'text-foreground',
  },
  {
    key: 'plus',
    label: 'Plus',
    sublabel: '≥ 15% non-organic + 10 sales/mo',
    multiplier: 1,
    threshold: '15%',
    color: 'bg-foreground/5 border-foreground/30',
    barColor: 'bg-foreground/60',
    textColor: 'text-foreground/80',
    accentColor: 'text-foreground',
  },
  {
    key: 'premium',
    label: 'Premium',
    sublabel: '≥ 35% non-organic + 10 sales/mo',
    multiplier: 1.08,
    threshold: '35%',
    color: 'bg-foreground/5 border-foreground',
    barColor: 'bg-foreground',
    textColor: 'text-foreground',
    accentColor: 'text-foreground',
  },
];

export function RoyaltyCalculator() {
  const [price, setPrice] = useState(19.99);
  const [monthlySales, setMonthlySales] = useState(50);

  const maxEarnings = getRoyalty(price, 1.08) * monthlySales;

  return (
    <div className="not-prose my-10 border border-border bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 bg-muted/30 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Interactive</p>
          <p className="text-sm font-semibold mt-0.5">Royalty Tier Calculator</p>
        </div>
        <span className="text-[10px] uppercase tracking-widest border border-border px-2 py-1 text-muted-foreground">
          US Store · June 2026
        </span>
      </div>

      {/* Sliders */}
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">List Price</label>
            <span className="text-base font-semibold tabular-nums">${price.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={0.5}
            value={price}
            onChange={e => setPrice(parseFloat(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>${PRICE_MIN}</span><span>${PRICE_MAX}</span>
          </div>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Monthly Sales</label>
            <span className="text-base font-semibold tabular-nums">{monthlySales} units</span>
          </div>
          <input
            type="range"
            min={SALES_MIN}
            max={SALES_MAX}
            step={5}
            value={monthlySales}
            onChange={e => setMonthlySales(parseInt(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>{SALES_MIN}</span><span>{SALES_MAX}</span>
          </div>
        </div>
      </div>

      {/* Tier comparison */}
      <div className="divide-y divide-border border-t border-border">
        {tiers.map(tier => {
          const perSale = getRoyalty(price, tier.multiplier);
          const monthly = perSale * monthlySales;
          const barWidth = maxEarnings > 0 ? (monthly / maxEarnings) * 100 : 0;

          return (
            <div key={tier.key} className="px-6 py-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest">{tier.label}</span>
                    <span className="text-[10px] border border-border px-1.5 py-0.5 text-muted-foreground uppercase tracking-widest">
                      {tier.threshold} external
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{tier.sublabel}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-semibold tabular-nums">${monthly.toFixed(0)}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                  <p className="text-[11px] text-muted-foreground">${perSale} per sale</p>
                </div>
              </div>
              {/* Bar */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${tier.barColor} rounded-full transition-all duration-300`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight footer */}
      <div className="border-t border-border px-6 py-4 bg-muted/20">
        <p className="text-xs text-muted-foreground leading-relaxed">
          To stay in <strong className="text-foreground">Plus</strong> you need at least{' '}
          <strong className="text-foreground">{Math.ceil(monthlySales * 0.15)} of your {monthlySales} monthly sales</strong>{' '}
          from non-organic sources. For{' '}
          <strong className="text-foreground">Premium</strong>,{' '}
          <strong className="text-foreground">{Math.ceil(monthlySales * 0.35)} sales</strong>.{' '}
          <span className="italic">Royalty estimates are approximate — actual rates vary by product type.</span>
        </p>
      </div>
    </div>
  );
}
