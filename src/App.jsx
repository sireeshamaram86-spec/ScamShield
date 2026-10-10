import { useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Check,
  CircleAlert,
  Clock3,
  FileText,
  Globe2,
  LayoutDashboard,
  Link2,
  MessageSquareText,
  ScanLine,
  ScanSearch,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './App.css'

const activity = [
  { day: 'Mon', blocked: 18, scanned: 34 },
  { day: 'Tue', blocked: 25, scanned: 42 },
  { day: 'Wed', blocked: 20, scanned: 38 },
  { day: 'Thu', blocked: 36, scanned: 52 },
  { day: 'Fri', blocked: 28, scanned: 47 },
  { day: 'Sat', blocked: 44, scanned: 61 },
  { day: 'Sun', blocked: 32, scanned: 55 },
]

const recentChecks = [
  { icon: Link2, label: 'northstar-delivery.com/track', detail: 'Suspicious link', time: '2 min ago', state: 'danger' },
  { icon: MessageSquareText, label: '“Your account has been paused…”', detail: 'SMS message', time: '18 min ago', state: 'warning' },
  { icon: Globe2, label: 'harborandpine.com', detail: 'Website check', time: '42 min ago', state: 'clear' },
]

const alerts = [
  { label: 'Fake delivery fee', source: 'SMS · +1 (•••) •••-4821', time: '9:42 AM', severity: 'High risk', state: 'danger' },
  { label: 'Account verification lure', source: 'Email · billing@secure-notice.co', time: '8:17 AM', severity: 'Review', state: 'warning' },
]

function App() {
  const [scanOpen, setScanOpen] = useState(false)
  const [scanInput, setScanInput] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [scanError, setScanError] = useState('')
  const [scanLoading, setScanLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const visibleChecks = recentChecks.filter((item) =>
    `${item.label} ${item.detail}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )

  async function runScan(event) {
    event.preventDefault()
    const content = scanInput.trim()
    if (!content || scanLoading) return

    setScanResult(null)
    setScanError('')
    setScanLoading(true)
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Analysis could not be completed.')
      setScanResult(data)
    } catch (error) {
      setScanError(error.message || 'Could not reach the analysis service. Check that the server is running.')
    } finally {
      setScanLoading(false)
    }
  }

  function openScanner() {
    setScanResult(null)
    setScanError('')
    setScanOpen(true)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="ScamShield home">
          <span className="brand-mark"><ShieldCheck size={20} strokeWidth={2.4} /></span>
          <span>scam<span>shield</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="nav-item active" href="#overview"><LayoutDashboard size={18} />Overview</a>
          <button className="nav-item" type="button" onClick={openScanner}><ScanSearch size={18} />Link scanner<span className="nav-new">NEW</span></button>
          <a className="nav-item" href="#alerts"><Bell size={18} />Alerts<span className="nav-count">2</span></a>
          <a className="nav-item" href="#reports"><FileText size={18} />Reports</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="plan-card">
            <div className="plan-icon"><Sparkles size={16} /></div>
            <p>Protection is on</p>
            <span>Scans are looking good today.</span>
            <div className="plan-meter"><span /></div>
            <small>82 of 100 monthly scans</small>
          </div>
          <div className="profile-button">
            <span className="avatar">AM</span>
            <span className="profile-copy"><strong>Alex Morgan</strong><small>Personal account</small></span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>Overview</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Search size={16} /><input aria-label="Search scans" placeholder="Search scans" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} /><kbd>⌘ K</kbd></label>
            <a className="icon-button notification-button" href="#alerts" aria-label="View alerts"><Bell size={18} /><i /></a>
          </div>
        </header>

        <div className="page-wrap">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot" />YOUR SECURITY, AT A GLANCE</div>
              <h1>Stay one step ahead.</h1>
              <p className="page-subtitle">A clear view of what you’ve checked and what needs attention.</p>
            </div>
            <button className="primary-button" type="button" onClick={openScanner}><ScanLine size={17} />Run a scan</button>
          </section>

          <section className="metrics-grid" aria-label="Security summary">
            <article className="metric-card">
              <div className="metric-top"><span>Total scans</span><span className="metric-icon mint"><ScanSearch size={17} /></span></div>
              <div className="metric-value">1,284</div>
              <div className="metric-foot"><span className="trend positive"><ArrowUpRight size={14} />12.8%</span><span>vs. last week</span></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Threats blocked</span><span className="metric-icon coral"><ShieldAlert size={17} /></span></div>
              <div className="metric-value">36</div>
              <div className="metric-foot"><span className="trend positive"><ArrowUpRight size={14} />8.2%</span><span>vs. last week</span></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Safe checks</span><span className="metric-icon blue"><ShieldCheck size={17} /></span></div>
              <div className="metric-value">1,248</div>
              <div className="metric-foot"><span className="trend neutral"><Check size={13} />97.2%</span><span>of all scans</span></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Avg. response</span><span className="metric-icon amber"><Activity size={17} /></span></div>
              <div className="metric-value">0.8<span className="metric-unit"> sec</span></div>
              <div className="metric-foot"><span className="trend positive"><ArrowDownRight size={14} />0.3 sec</span><span>faster this week</span></div>
            </article>
          </section>

          <section className="overview-grid">
            <article className="panel activity-panel">
              <div className="panel-heading">
                <div><h2>Scan activity</h2><p>Threats caught across your checks</p></div>
                <span className="range-label">Last 7 days</span>
              </div>
              <div className="chart-legend"><span><i className="legend-swatch scanned" />Scans</span><span><i className="legend-swatch blocked" />Threats blocked</span></div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activity} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scannedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7fb8a5" stopOpacity={0.23} /><stop offset="95%" stopColor="#7fb8a5" stopOpacity={0} /></linearGradient>
                      <linearGradient id="blockedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#eb876f" stopOpacity={0.19} /><stop offset="95%" stopColor="#eb876f" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e9ece8" strokeDasharray="3 5" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8c9690', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8c9690', fontSize: 12 }} />
                    <Tooltip contentStyle={{ border: '1px solid #e6ebe7', borderRadius: 8, boxShadow: '0 8px 24px #17221b12', fontSize: 12 }} />
                    <Area type="monotone" dataKey="scanned" name="Scans" stroke="#77aa96" strokeWidth={2.5} fill="url(#scannedFill)" />
                    <Area type="monotone" dataKey="blocked" name="Threats blocked" stroke="#e18470" strokeWidth={2.5} fill="url(#blockedFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="panel protection-panel">
              <div className="panel-heading"><div><h2>Protection score</h2><p>Your security snapshot</p></div></div>
              <div className="score-area">
                <div className="score-ring"><div className="score-center"><strong>92</strong><span>Excellent</span></div></div>
                <p>Your habits are keeping you safer than <strong>most people</strong>.</p>
              </div>
              <div className="score-details">
                <div><span className="score-dot green" /><span>Safe browsing</span><strong>Strong</strong></div>
                <div><span className="score-dot orange" /><span>Link checks</span><strong>Review</strong></div>
                <div><span className="score-dot blue-dot" /><span>Alerts enabled</span><strong>On</strong></div>
              </div>
              <button className="text-button" type="button" onClick={openScanner}>Improve your score <ArrowUpRight size={15} /></button>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel recent-panel" id="reports">
              <div className="panel-heading"><div><h2>Recent checks</h2><p>Your latest link and message scans</p></div><button className="subtle-button" type="button" onClick={openScanner}>Scan something <ArrowUpRight size={14} /></button></div>
              <div className="check-list">
                {visibleChecks.map((item) => {
                  const Icon = item.icon
                  return <div className="check-row" key={item.label}>
                    <span className={`check-icon ${item.state}`}><Icon size={16} /></span>
                    <div className="check-copy"><strong>{item.label}</strong><span>{item.detail}</span></div>
                    <span className={`status-pill ${item.state}`}>{item.state === 'danger' ? 'Blocked' : item.state === 'warning' ? 'Review' : 'Safe'}</span>
                    <span className="check-time"><Clock3 size={13} />{item.time}</span>
                  </div>
                })}
                {visibleChecks.length === 0 && <p className="empty-search">No recent checks match “{searchQuery}”.</p>}
              </div>
            </article>

            <article className="panel alerts-panel" id="alerts">
              <div className="panel-heading"><div><h2>Needs attention <span className="heading-count">2</span></h2><p>Recent suspicious activity</p></div></div>
              <div className="alerts-list">
                {alerts.map((alert) => <div className="alert-row" key={alert.label}>
                  <span className={`alert-mark ${alert.state}`}><CircleAlert size={16} /></span>
                  <div className="alert-copy"><strong>{alert.label}</strong><span>{alert.source}</span></div>
                  <span className="alert-time">{alert.time}</span>
                </div>)}
              </div>
              <a className="all-alerts" href="#alerts">Review all alerts <ArrowUpRight size={14} /></a>
            </article>
          </section>

          <footer className="page-footer"><span><span className="footer-status" />All systems operational</span><span>ScamShield keeps watch, so you don’t have to.</span></footer>
        </div>
      </main>

      {scanOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setScanOpen(false) }}>
        <section className="scan-modal" role="dialog" aria-modal="true" aria-labelledby="scan-title">
          <div className="modal-top"><span className="modal-symbol"><ScanSearch size={20} /></span><button className="icon-button close-button" type="button" onClick={() => setScanOpen(false)} aria-label="Close scanner"><X size={18} /></button></div>
          <h2 id="scan-title">Check before you click.</h2>
          <p className="modal-description">Paste a link or message for an AI-assisted scam assessment. Don’t include passwords, OTPs, or account numbers.</p>
          <form className="scan-form" onSubmit={runScan}>
            <label htmlFor="scan-content">Link or message</label>
            <textarea id="scan-content" value={scanInput} onChange={(event) => setScanInput(event.target.value)} placeholder="Paste a suspicious link or message here..." rows={4} autoFocus />
            <button className="primary-button scan-submit" type="submit" disabled={scanLoading || !scanInput.trim()}>
              <ScanLine size={16} />{scanLoading ? 'Analyzing message...' : 'Analyze content'}
            </button>
          </form>
          {scanResult && <div className={`scan-result ${scanResult.risk}`} role="status">
            <div className="result-title">{scanResult.risk === 'high' ? <ShieldAlert size={18} /> : scanResult.risk === 'review' ? <CircleAlert size={18} /> : <ShieldCheck size={18} />}
              <strong>{scanResult.title}</strong>
            </div>
            <p>{scanResult.summary}</p>
            {scanResult.signals.length > 0 && <ul>{scanResult.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul>}
            {scanResult.advice.length > 0 && <div className="result-advice"><strong>What to do</strong><ul>{scanResult.advice.map((item) => <li key={item}>{item}</li>)}</ul></div>}
            <small>AI-assisted assessment · Not a guarantee of safety or fraud</small>
          </div>}
          {scanError && <div className="scan-error" role="alert"><CircleAlert size={17} /><span>{scanError}</span></div>}
          <div className="modal-foot"><ShieldCheck size={15} />Message is sent to the AI service for analysis.</div>
        </section>
      </div>}
    </div>
  )
}

export default App
