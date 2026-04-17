export function RoyaltyCover() {
  const tiers = [
    {
      label: 'Creator',
      badge: 'Default',
      requirement: 'No traffic required',
      perSale: '$2.44',
      change: '−50%',
      changeLabel: 'vs today',
      icon: '↓',
      iconColor: 'text-red-500',
      borderColor: 'border-foreground/20',
      bg: 'bg-muted/30',
    },
    {
      label: 'Plus',
      badge: '15% External',
      requirement: '+ 10 sales / month',
      perSale: '$4.88',
      change: 'Same',
      changeLabel: 'as today',
      icon: '→',
      iconColor: 'text-foreground/60',
      borderColor: 'border-foreground/40',
      bg: 'bg-background',
    },
    {
      label: 'Premium',
      badge: '35% External',
      requirement: '+ 10 sales / month',
      perSale: '$5.27',
      change: '+8%',
      changeLabel: 'vs today',
      icon: '↑',
      iconColor: 'text-green-500',
      borderColor: 'border-foreground',
      bg: 'bg-background',
    },
  ];

  return (
    <div className="not-prose my-10 border border-border bg-muted/20 p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">Effective June 1, 2026 · US Store Only</p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">The New Royalty Tiers at a Glance</h2>
        <p className="text-sm text-muted-foreground">Standard t-shirt at $19.99 list price</p>
      </div>

      {/* Tier cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {tiers.map(tier => (
          <div key={tier.label} className={`border ${tier.borderColor} ${tier.bg} p-5 flex flex-col gap-4`}>
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold">{tier.label}</p>
                <span className="text-[10px] uppercase tracking-widest border border-border px-1.5 py-0.5 text-muted-foreground mt-1 inline-block">
                  {tier.badge}
                </span>
              </div>
              <span className={`text-3xl font-light ${tier.iconColor}`}>{tier.icon}</span>
            </div>

            {/* Royalty */}
            <div>
              <p className="text-3xl font-semibold tabular-nums">{tier.perSale}</p>
              <p className="text-xs text-muted-foreground mt-0.5">per sale</p>
            </div>

            {/* Change badge */}
            <div className={`text-xs font-semibold uppercase tracking-widest ${tier.iconColor}`}>
              {tier.change} <span className="text-muted-foreground font-normal normal-case">{tier.changeLabel}</span>
            </div>

            {/* Requirement */}
            <div className="border-t border-border pt-3 mt-auto">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Requirement</p>
              <p className="text-xs mt-1 text-foreground/80">{tier.requirement}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-[11px] text-muted-foreground mt-4 text-center">
        Group placement updated monthly based on trailing 60-day average · International stores unchanged
      </p>
    </div>
  );
}
