import React, { useState } from 'react'

/**
 * Proctex — simplified clickable prototype.
 * Three navigable screens kept in one file:
 *   Sign up  →  Dashboard  →  Create Exam
 * Visual language matches the existing product: light background, white cards,
 * black primary buttons, sans-serif type, small uppercase labels.
 */

const USER_NAME = 'Ayo'

/* ----------------------------------------------------------------- icons -- */
const Icon = ({ path, className = 'w-4 h-4', stroke = 1.6 }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
)

const icons = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
  exams: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  questions: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7" /><path d="M12 17h.01" /></>,
  students: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></>,
  results: <><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 5-6" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 9l5-5 5 5" /><path d="M12 4v12" /></>,
  bank: <><path d="M4 10h16" /><path d="M4 10 12 4l8 6" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" /><path d="M4 18h16" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  headset: <><path d="M3 12a9 9 0 0 1 18 0" /><path d="M21 12v3a2 2 0 0 1-2 2h-1v-5h3ZM3 12v3a2 2 0 0 0 2 2h1v-5H3Z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  trash: <><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1Z" /><path d="M4 22V4" /></>,
  arrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
  arrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>,
  shuffle: <><path d="M16 3h5v5" /><path d="M4 20 21 3" /><path d="M21 16v5h-5" /><path d="m15 15 6 6" /><path d="M4 4l5 5" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></>,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  loader: <path d="M21 12a9 9 0 1 1-6.2-8.6" />,
  alert: <><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  cloud: <><path d="M16 16l-4-4-4 4" /><path d="M12 12v9" /><path d="M20.4 17.6A5 5 0 0 0 18 8h-1.3A8 8 0 1 0 4 15.3" /></>,
}

const GripDots = ({ className = 'w-3.5 h-3.5 text-neutral-400' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="6" r="1.4" /><circle cx="15" cy="6" r="1.4" />
    <circle cx="9" cy="12" r="1.4" /><circle cx="15" cy="12" r="1.4" />
    <circle cx="9" cy="18" r="1.4" /><circle cx="15" cy="18" r="1.4" />
  </svg>
)

const MoreDots = ({ className = 'w-4 h-4 text-neutral-400' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </svg>
)

const EXAM_NAME = 'SS3 Chemistry Mid-Term'

/* Shared flow state: in-app navigation + the publish timer/step counter. */
const FlowCtx = React.createContext(null)
const useFlow = () => React.useContext(FlowCtx)

const NAV_TARGET = {
  Dashboard: 'dashboard',
  Exams: 'exams',
  Questions: 'banks',
  Students: 'invite',
  Results: 'results',
}
// reverse map: screen -> sidebar label to highlight
const SCREEN_LABEL = {
  dashboard: 'Dashboard',
  exams: 'Exams',
  exam: 'Exams',
  editor: 'Exams',
  preview: 'Exams',
  published: 'Exams',
  banks: 'Questions',
  bankView: 'Questions',
  bulk: 'Exams',
  invite: 'Students',
  results: 'Results',
}

const GoogleMark = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
  </svg>
)

const MicrosoftMark = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
    <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
    <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
  </svg>
)

/* ------------------------------------------------------------- primitives -- */
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neutral-700 to-black" />
    <span className="font-semibold tracking-tight text-neutral-900">Proctex</span>
  </div>
)

const Field = ({ label, children, required }) => (
  <label className="block">
    {label && (
      <span className="block text-[11px] font-medium uppercase tracking-wide text-neutral-500 mb-1.5">
        {label}
        {required && <span className="text-neutral-900"> *</span>}
      </span>
    )}
    {children}
  </label>
)

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition'

/* ============================================================== SIGN UP === */
function SignUp({ onCreate }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-sm border border-neutral-200/70 overflow-hidden grid md:grid-cols-2">
        {/* Left panel — image space + onboarding line */}
        <div className="relative hidden md:flex flex-col justify-end p-8 bg-gradient-to-br from-[#efece5] via-[#e8e4da] to-[#dcd6c8]">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-40 h-40 rounded-2xl bg-white/40 border border-white/60 backdrop-blur flex items-center justify-center text-neutral-400">
              <Icon path={icons.image} className="w-10 h-10" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-semibold leading-snug text-neutral-900">
              Grade a full class in minutes.
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Set up your exam once, let Proctex handle the grading, and spend
              your time teaching instead.
            </p>
          </div>
        </div>

        {/* Right panel — single-step sign up */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6 md:hidden"><Logo /></div>
          <div className="hidden md:flex mb-6"><Logo /></div>

          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Start grading smarter in a couple of minutes.
          </p>

          <div className="mt-6 space-y-2.5">
            <button className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition">
              <GoogleMark /> Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition">
              <MicrosoftMark /> Sign up with Microsoft
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wide text-neutral-400">
            <div className="h-px flex-1 bg-neutral-200" />
            or
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="space-y-3">
            <Field label="Full name">
              <input className={inputCls} placeholder="Ada Lovelace" />
            </Field>
            <Field label="Email">
              <input className={inputCls} placeholder="you@university.edu" type="email" />
            </Field>
            <Field label="Password">
              <input className={inputCls} placeholder="••••••••" type="password" />
            </Field>
          </div>

          <label className="mt-4 flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-300"
            />
            <span className="text-sm text-neutral-600">
              I agree to the{' '}
              <a className="underline underline-offset-2 hover:text-neutral-900" href="#">
                Terms and Privacy Policy
              </a>
            </span>
          </label>

          <button
            onClick={onCreate}
            disabled={!agreed}
            className="mt-5 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Create account
          </button>

          <p className="mt-4 text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <a className="font-medium text-neutral-900 underline underline-offset-2" href="#">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============================================================ APP SHELL === */
function Sidebar({ active = 'Dashboard' }) {
  const flow = useFlow()
  const nav = [
    ['Dashboard', icons.dashboard],
    ['Exams', icons.exams],
    ['Questions', icons.questions],
    ['Students', icons.students],
    ['Results', icons.results],
  ]
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-neutral-200 flex flex-col">
      <div className="px-5 py-4 border-b border-neutral-100">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
          Platform
        </p>
        {nav.map(([label, path]) => (
          <button
            key={label}
            onClick={() => flow?.go(NAV_TARGET[label])}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
              active === label
                ? 'bg-neutral-100 text-neutral-900 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <Icon path={path} className="w-[18px] h-[18px]" />
            {label}
          </button>
        ))}
      </nav>

      {/* Usage card */}
      <div className="px-3 pb-3">
        <div className="rounded-xl border border-neutral-200 p-3.5">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <span>Usage</span>
            <span className="text-neutral-900 font-medium">500 / 1000 credits</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-neutral-900" />
          </div>
          <p className="mt-3 text-sm font-medium text-neutral-900">Trial plan</p>
          <p className="text-xs text-neutral-500">Renews when you upgrade.</p>
          <button className="mt-3 w-full rounded-lg bg-neutral-900 py-2 text-xs font-medium text-white hover:bg-black transition">
            Buy credits
          </button>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-t border-neutral-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-400" />
        <div className="leading-tight">
          <p className="text-sm font-medium text-neutral-900">{USER_NAME} Bello</p>
          <p className="text-xs text-neutral-400">ayo@university.edu</p>
        </div>
      </div>
    </aside>
  )
}

function Topbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-200 bg-white/60">
      <span className="text-sm text-neutral-500">System Dashboard</span>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Icon path={icons.search} className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="w-64 rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 outline-none focus:border-neutral-400"
            placeholder="Search resources…"
          />
        </div>
        <button className="w-9 h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
          <Icon path={icons.headset} className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/* ============================================================ DASHBOARD === */
function Dashboard({ onBeginDrafting, onBulkUpload, onQuestionBanks }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar active="Dashboard" />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 px-8 py-10 max-w-5xl mx-auto w-full">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Welcome, {USER_NAME} 👋
          </h1>
          <p className="mt-2 text-neutral-500">
            Create an exam, let AI grade it, and get your time back.
          </p>

          {/* All three options on one horizontal line; hierarchy via emphasis */}
          <div className="mt-8 grid gap-5 lg:grid-cols-3 items-stretch">
            {/* PRIMARY — emphasised: black icon tile + black button + ring */}
            <div className="rounded-2xl border border-neutral-900/10 bg-white p-6 flex flex-col shadow-sm ring-1 ring-neutral-900/5">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                <Icon path={icons.pen} className="w-5 h-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-neutral-900">Manual Input</h2>
              <p className="mt-1.5 text-sm text-neutral-500">
                Write and organize exam questions directly.
              </p>
              <div className="mt-auto pt-5">
                <button
                  onClick={onBeginDrafting}
                  className="w-full rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black transition"
                >
                  Begin drafting
                </button>
              </div>
            </div>

            {/* SECONDARY — muted, outline button */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center">
                <Icon path={icons.upload} className="w-[18px] h-[18px]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-800">Bulk Upload</h3>
              <p className="mt-1.5 text-sm text-neutral-500">
                Import questions from Excel, CSV, or JSON.
              </p>
              <div className="mt-auto pt-5">
                <button
                  onClick={onBulkUpload}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Upload file
                </button>
              </div>
            </div>

            {/* TERTIARY — Question Banks, now enabled */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center">
                <Icon path={icons.bank} className="w-[18px] h-[18px]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-800">Question Banks</h3>
              <p className="mt-1.5 text-sm text-neutral-500">
                Reuse saved questions anytime.
              </p>
              <div className="mt-auto pt-5">
                <button
                  onClick={onQuestionBanks}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/* =========================================================== CREATE EXAM === */
function DurationButtons() {
  const [val, setVal] = useState(60) // 60 min selected by default
  return (
    <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-1">
      {[30, 60, 90].map((m) => (
        <button
          key={m}
          onClick={() => setVal(m)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
            val === m ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          {m} Min
        </button>
      ))}
    </div>
  )
}

function CreateExam({ onContinue }) {
  const flow = useFlow()
  const [title, setTitle] = useState('')
  const [optionalOpen, setOptionalOpen] = useState(false) // collapsed by default

  React.useEffect(() => {
    flow?.setStep('Step 1 of 5: Exam setup')
  }, [])

  return (
    <div className="min-h-screen flex">
      <Sidebar active="Exams" />
      <main className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex-1 relative">
          <div className="px-8 py-8 max-w-3xl mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-neutral-400">
              <button onClick={() => flow?.go('dashboard')} className="hover:text-neutral-700">Home</button>
              <span>›</span>
              <button onClick={() => flow?.go('exams')} className="hover:text-neutral-700">Exams</button>
              <span>›</span>
              <span className="text-neutral-700">New Exam</span>
            </nav>

            {/* Title */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Examination…"
              className="mt-5 w-full bg-transparent text-3xl font-semibold tracking-tight text-neutral-900 placeholder:text-neutral-300 outline-none"
            />

            {/* Required fields */}
            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-900">Required details</h2>
                <span className="text-[11px] uppercase tracking-wide text-neutral-400">
                  All fields required
                </span>
              </div>

              <Field label="Course identification" required>
                <input className={inputCls} placeholder="Enter course name or code" />
              </Field>

              <Field label="Institution" required>
                <input className={inputCls} placeholder="e.g. University of Lagos" />
              </Field>

              <Field label="Examination duration" required>
                <DurationButtons />
              </Field>
            </div>

            {/* Optional settings — collapsed by default */}
            <div className="mt-5 rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <button
                onClick={() => setOptionalOpen((o) => !o)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Optional settings</p>
                  <p className="text-xs text-neutral-400">
                    Scheduling, late join, instructions, and cover image.
                  </p>
                </div>
                <Icon
                  path={icons.chevron}
                  className={`w-5 h-5 text-neutral-400 transition-transform ${
                    optionalOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {optionalOpen && (
                <div className="px-6 pb-6 pt-1 space-y-5 border-t border-neutral-100">
                  <div className="grid sm:grid-cols-2 gap-4 pt-5">
                    <Field label="Start date">
                      <input className={inputCls} type="date" />
                    </Field>
                    <Field label="Time">
                      <input className={inputCls} type="time" defaultValue="10:30" />
                    </Field>
                  </div>

                  <Field label="Late join window">
                    <input className={inputCls} defaultValue="10 minutes" />
                  </Field>

                  <Field label="Instructions for students">
                    <textarea
                      rows={3}
                      className={inputCls + ' resize-none'}
                      placeholder="Tell students what to bring and how the exam works…"
                    />
                  </Field>

                  <Field label="Cover image">
                    <button className="w-full flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-neutral-50/60 px-4 py-4 text-left hover:bg-neutral-50 transition">
                      <span className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-400">
                        <Icon path={icons.image} className="w-[18px] h-[18px]" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-neutral-700">Add cover image</span>
                        <span className="block text-xs text-neutral-400">Optional branding or department image</span>
                      </span>
                    </button>
                  </Field>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
                Draft
              </button>
              <button
                onClick={onContinue}
                className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black transition"
              >
                Continue to questions
              </button>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              You just need a title, course, and duration to continue.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ============================================================= ICON RAIL === */
function IconRail({ active = 'exams' }) {
  const flow = useFlow()
  const items = [
    ['dashboard', icons.dashboard, 'dashboard'],
    ['exams', icons.exams, 'exams'],
    ['questions', icons.questions, 'banks'],
    ['students', icons.students, 'invite'],
    ['results', icons.results, 'results'],
  ]
  return (
    <aside className="w-14 shrink-0 bg-white border-r border-neutral-200 flex flex-col items-center py-4">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-700 to-black mb-6" />
      <nav className="flex-1 flex flex-col items-center gap-1.5">
        {items.map(([key, path, target]) => (
          <button
            key={key}
            onClick={() => flow?.go(target)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
              active === key
                ? 'bg-neutral-100 text-neutral-900'
                : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600'
            }`}
          >
            <Icon path={path} className="w-[18px] h-[18px]" />
          </button>
        ))}
      </nav>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-400" />
    </aside>
  )
}

const Tooltip = ({ text, children }) => (
  <span className="relative group inline-flex">
    {children}
    <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] font-normal text-white opacity-0 shadow-lg transition group-hover:opacity-100">
      {text}
    </span>
  </span>
)

/* ========================================================= QUESTION EDITOR === */
const RESPONSE_TYPES = [
  ['mc', 'Multiple Choice', icons.questions, true],
  ['text', 'Text', icons.exams, true],
  ['handwritten', 'Handwritten', icons.pen, false],
  ['diagram', 'Diagram', icons.image, false],
]

const firstWords = (text, n = 4) => {
  const t = (text || '').trim()
  if (!t) return 'Untitled'
  const words = t.replace(/[?.!,]$/, '').split(/\s+/).slice(0, n).join(' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

function QuestionEditor({ onPreview }) {
  const flow = useFlow()
  // Committed questions live in the left rail; the draft is the one being built.
  const [committed, setCommitted] = useState([])
  const [questionText, setQuestionText] = useState('')
  const [responseType, setResponseType] = useState('mc')
  const [shuffle, setShuffle] = useState(false)
  const [compulsory, setCompulsory] = useState(false)
  const [marks, setMarks] = useState(5)
  const [showBankModal, setShowBankModal] = useState(false)
  const [markingGuide, setMarkingGuide] = useState('')
  const [options, setOptions] = useState([
    { id: 11, text: '', correct: false },
    { id: 12, text: '', correct: false },
  ])

  const nextId = React.useRef(100)
  const newId = () => nextId.current++
  const questionRef = React.useRef(null)
  const optionRefs = React.useRef({})
  const [focusOpt, setFocusOpt] = useState(null)

  // The timer starts when the question editor opens (start of question 1).
  React.useEffect(() => {
    flow?.startTimer()
    flow?.setStep('Step 2 of 5: Adding questions')
  }, [])

  React.useEffect(() => {
    if (focusOpt != null && optionRefs.current[focusOpt]) {
      optionRefs.current[focusOpt].focus()
      setFocusOpt(null)
    }
  }, [focusOpt, options])

  // Count real questions (committed with text + the draft if it has text).
  const committedReal = committed.filter((q) => q.text.trim()).length
  const liveCount = committedReal + (questionText.trim() ? 1 : 0)
  React.useEffect(() => {
    flow?.setQuestionCount(liveCount)
  }, [liveCount])

  // Live list = committed questions + the in-progress draft (always last, active).
  const liveList = [
    ...committed.map((q, i) => ({ ...q, qno: i + 1, active: false })),
    { id: 'draft', text: questionText, qno: committed.length + 1, active: true },
  ]

  const setCorrect = (id) =>
    setOptions((o) => o.map((opt) => ({ ...opt, correct: opt.id === id })))
  const removeOption = (id) => setOptions((o) => o.filter((opt) => opt.id !== id))
  const addOption = (afterIdx) => {
    const id = newId()
    setOptions((o) => {
      const copy = [...o]
      copy.splice(afterIdx == null ? copy.length : afterIdx + 1, 0, {
        id,
        text: '',
        correct: false,
      })
      return copy
    })
    setFocusOpt(id)
  }
  const updateOption = (id, text) =>
    setOptions((o) => o.map((opt) => (opt.id === id ? { ...opt, text } : opt)))

  // Enter inside the options area adds a new option row (fast entry) — never
  // advances the question, so question/marking-guide fields keep line breaks.
  const onOptionKeyDown = (e, idx) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addOption(idx)
    }
  }

  // Commit the current draft to the list and clear the editor for a fresh one.
  const saveAndAddNext = () => {
    setCommitted((c) => [...c, { id: newId(), text: questionText, type: responseType }])
    setQuestionText('')
    setResponseType('mc')
    setOptions([
      { id: newId(), text: '', correct: false },
      { id: newId(), text: '', correct: false },
    ])
    setMarkingGuide('')
    setShuffle(false)
    setCompulsory(false)
    setMarks(5)
    setTimeout(() => questionRef.current?.focus(), 0)
  }

  return (
    <div className="min-h-screen flex">
      <IconRail active="exams" />

      <div className="flex-1 flex flex-col">
        {/* Top bar — Preview is the only forward action; no Publish here. */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-white">
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <button onClick={() => flow?.go('dashboard')} className="hover:text-neutral-700">Home</button>
            <span>›</span>
            <button onClick={() => flow?.go('exams')} className="hover:text-neutral-700">Exams</button>
            <span>›</span>
            <span className="text-neutral-700">{EXAM_NAME}</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Icon path={icons.search} className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                className="w-56 rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 outline-none focus:border-neutral-400"
                placeholder="Search resources…"
              />
            </div>
            <button
              onClick={onPreview}
              className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              <Icon path={icons.eye} className="w-4 h-4" /> Preview
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Manual Editor panel */}
          <div className="w-60 shrink-0 border-r border-neutral-200 bg-white p-4 flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Manual Editor
            </p>
            <p className="mt-3 text-xs text-neutral-400">
              Drafting · <span className="text-neutral-700 font-medium">{EXAM_NAME}</span>
            </p>

            {/* Source tabs */}
            <div className="mt-4 grid grid-cols-3 rounded-lg border border-neutral-200 p-0.5 text-xs">
              {['Manual', 'From bank', 'Upload'].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-md py-1.5 font-medium transition ${
                    i === 0 ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Questions list — populates live as the teacher builds */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Questions
              </span>
              <span className="text-[11px] text-neutral-400">{liveList.length} total</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {liveList.map((q) => (
                <div
                  key={q.id}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm ${
                    q.active
                      ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                      : 'border-neutral-200 text-neutral-500'
                  }`}
                >
                  <GripDots />
                  <span className="font-medium text-xs text-neutral-400">Q{q.qno}</span>
                  <span className="truncate">{firstWords(q.text)}</span>
                </div>
              ))}
            </div>

            {/* Secondary way to start a new question */}
            <button
              onClick={saveAndAddNext}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-50 transition"
            >
              <Icon path={icons.plus} className="w-3.5 h-3.5" /> Add new block
            </button>

            {/* The single save concept: saves the whole exam draft */}
            <button className="mt-auto rounded-lg border border-neutral-300 bg-white py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition">
              Save exam draft
            </button>
          </div>

          {/* Center editing area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-8 py-6 overflow-y-auto">
              {/* Formatting toolbar */}
              <div className="flex items-center gap-1 text-neutral-500">
                {[icons.image, icons.list].map((p, i) => (
                  <button key={i} className="w-8 h-8 rounded-md hover:bg-neutral-100 flex items-center justify-center">
                    <Icon path={p} className="w-4 h-4" />
                  </button>
                ))}
                <button className="w-8 h-8 rounded-md hover:bg-neutral-100 flex items-center justify-center text-sm font-semibold">
                  Aa
                </button>
              </div>

              {/* Question text — Enter inserts a line break (no advancing) */}
              <textarea
                ref={questionRef}
                rows={2}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type your question here…"
                className="mt-3 w-full resize-none bg-transparent text-xl font-medium text-neutral-900 placeholder:text-neutral-300 outline-none"
              />

              {/* Response type tabs */}
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Response type
              </p>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RESPONSE_TYPES.map(([key, label, path, enabled]) => {
                  const activeTab = responseType === key
                  return (
                    <button
                      key={key}
                      disabled={!enabled}
                      onClick={() => enabled && setResponseType(key)}
                      className={`relative flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                        !enabled
                          ? 'border-neutral-200 bg-neutral-50 text-neutral-300 cursor-not-allowed'
                          : activeTab
                          ? 'border-neutral-900 bg-white text-neutral-900 shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <Icon path={path} className="w-4 h-4" />
                      {label}
                      {!enabled && (
                        <span className="absolute -top-2 right-1.5 rounded-full bg-neutral-200 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-neutral-500">
                          Coming soon
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* MULTIPLE CHOICE */}
              {responseType === 'mc' && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                      Options
                    </p>
                    <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
                      <Icon path={icons.shuffle} className="w-3.5 h-3.5 text-neutral-400" />
                      Shuffle
                      <button
                        type="button"
                        onClick={() => setShuffle((s) => !s)}
                        className={`relative h-5 w-9 rounded-full transition ${
                          shuffle ? 'bg-neutral-900' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                            shuffle ? 'left-[18px]' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </label>
                  </div>

                  <div className="mt-3 space-y-2">
                    {options.map((opt, idx) => (
                      <div
                        key={opt.id}
                        className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2.5"
                      >
                        <GripDots />
                        <input
                          ref={(el) => (optionRefs.current[opt.id] = el)}
                          value={opt.text}
                          onChange={(e) => updateOption(opt.id, e.target.value)}
                          onKeyDown={(e) => onOptionKeyDown(e, idx)}
                          placeholder="Option text"
                          className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
                        />
                        <label className="flex items-center gap-2 text-xs text-neutral-500">
                          Correct answer
                          <button
                            type="button"
                            onClick={() => setCorrect(opt.id)}
                            className={`relative h-5 w-9 rounded-full transition ${
                              opt.correct ? 'bg-emerald-500' : 'bg-neutral-200'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                                opt.correct ? 'left-[18px]' : 'left-0.5'
                              }`}
                            />
                          </button>
                        </label>
                        <button
                          onClick={() => removeOption(opt.id)}
                          className="text-neutral-300 hover:text-red-500 transition"
                        >
                          <Icon path={icons.trash} className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addOption()}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-2.5 text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition"
                  >
                    <Icon path={icons.plus} className="w-4 h-4" /> Add option
                  </button>
                  <p className="mt-2 text-xs text-neutral-400">
                    Tip: press Enter inside an option to add the next one.
                  </p>
                </div>
              )}

              {/* TEXT */}
              {responseType === 'text' && (
                <div className="mt-6 space-y-5">
                  <Field label="Marking guide">
                    <textarea
                      rows={5}
                      value={markingGuide}
                      onChange={(e) => setMarkingGuide(e.target.value)}
                      placeholder="e.g. Award 2 marks for stating barium sulphate is insoluble; 2 marks for explaining the formation of an insoluble precipitate; 1 mark for a correct ionic equation."
                      className={inputCls + ' resize-none'}
                    />
                    <p className="mt-1.5 text-xs text-neutral-400">
                      Describe what a correct answer should include and how marks are
                      awarded. The AI grades strictly against this.
                    </p>
                  </Field>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Field label="Min characters">
                      <input className={inputCls} defaultValue="50" />
                    </Field>
                    <Field label="Max characters">
                      <input className={inputCls} defaultValue="500" />
                    </Field>
                    <Field label="Response length">
                      <select className={inputCls + ' appearance-none'} defaultValue="short">
                        <option value="short">Short answer</option>
                        <option value="long">Long answer</option>
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {/* PRIMARY action — right under the answer area, where focus is */}
              <div className="mt-8 border-t border-neutral-100 pt-5">
                <button
                  onClick={saveAndAddNext}
                  className="flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition"
                >
                  <Icon path={icons.plus} className="w-4 h-4" /> Save &amp; add next question
                </button>
                <p className="mt-2 text-xs text-neutral-400">
                  Adds this question to the list and opens a fresh one. Questions
                  auto-save into the list as you build them.
                </p>
              </div>
            </div>
          </div>

          {/* Right settings panel */}
          <div className="w-72 shrink-0 border-l border-neutral-200 bg-white p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Question settings
              </p>
              <button className="text-[11px] text-neutral-400 hover:text-neutral-700">Reset</button>
            </div>

            <div className="mt-5">
              <Field label="Marks">
                <input className={inputCls} defaultValue="5" type="number" />
              </Field>
            </div>

            <label className="mt-5 flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={compulsory}
                onChange={(e) => setCompulsory(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-300"
              />
              <span className="text-sm text-neutral-600">Mark question as compulsory</span>
            </label>

            <button
              onClick={() => setShowBankModal(true)}
              className="mt-6 flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              <Icon path={icons.plus} className="w-4 h-4" /> Save to my question bank
            </button>
          </div>
        </div>
      </div>

      {showBankModal && (
        <SaveToBankModal banks={QUESTION_BANKS} onClose={() => setShowBankModal(false)} />
      )}
    </div>
  )
}

/* ================================================================ PREVIEW === */
function useTimer(start = 132) {
  const [secs, setSecs] = useState(start)
  React.useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return `00:${mm}:${ss}`
}

const PREVIEW_Q = {
  text: 'Which gas is evolved when dilute hydrochloric acid reacts with calcium trioxocarbonate(IV), CaCO₃?',
  points: 5,
  options: [
    { id: 'a', text: 'Hydrogen' },
    { id: 'b', text: 'Oxygen' },
    { id: 'c', text: 'Carbon(IV) oxide', correct: true },
    { id: 'd', text: 'Chlorine' },
  ],
}

function Preview({ onExit, onPublished }) {
  const flow = useFlow()
  const [view, setView] = useState('teacher')
  const [confirm, setConfirm] = useState(false)

  React.useEffect(() => {
    flow?.setStep('Step 3 of 5: Preview')
  }, [])

  const doPublish = () => {
    flow?.freezeTimer()
    flow?.setStep('Step 4 of 5: Published')
    onPublished()
  }

  const PreviewTopbar = (
    <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-white">
      <nav className="flex items-center gap-2 text-sm text-neutral-400">
        <button onClick={() => flow?.go('dashboard')} className="hover:text-neutral-700">Home</button>
        <span>›</span>
        <button onClick={() => flow?.go('exams')} className="hover:text-neutral-700">Exams</button>
        <span>›</span>
        <span className="text-neutral-700">
          {view === 'teacher' ? "Teacher's View" : 'Student Preview'}
        </span>
      </nav>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Icon path={icons.search} className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="w-56 rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 outline-none focus:border-neutral-400"
            placeholder="Search resources…"
          />
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
        >
          <Icon path={icons.eye} className="w-4 h-4" /> Exit preview
        </button>
        <button
          onClick={() => setConfirm(true)}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition"
        >
          Publish exam
        </button>
      </div>
    </div>
  )

  const ViewToggle = (
    <div className="grid grid-cols-2 rounded-lg border border-neutral-200 p-0.5 text-sm">
      {[
        ['teacher', "Teacher's View"],
        ['student', "Student's View"],
      ].map(([key, label]) => (
        <button
          key={key}
          onClick={() => setView(key)}
          className={`rounded-md py-1.5 font-medium transition ${
            view === key ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex">
      <IconRail active="exams" />
      <div className="flex-1 flex flex-col">
        {PreviewTopbar}
        <div className="flex-1 flex">
          {view === 'teacher' ? (
            <TeacherView toggle={ViewToggle} />
          ) : (
            <StudentView toggle={ViewToggle} />
          )}
        </div>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6">
            <h2 className="text-base font-semibold text-neutral-900">Publish this exam?</h2>
            <p className="mt-1.5 text-sm text-neutral-500">
              Students will be able to join.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirm(false)}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={doPublish}
                className="rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black transition"
              >
                Publish exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TeacherView({ toggle }) {
  const [aiHint, setAiHint] = useState(true)
  const [pointValues, setPointValues] = useState(true)
  const [showAnswers, setShowAnswers] = useState(true)

  const toggles = [
    ['AI Grading Hint', 'Show how the AI will grade this question', aiHint, setAiHint],
    ['Point Values', 'Show marks for each question', pointValues, setPointValues],
    ['Show Answers', 'Reveal correct answers in this preview', showAnswers, setShowAnswers],
  ]

  return (
    <>
      <div className="w-64 shrink-0 border-r border-neutral-200 bg-white p-4">
        {toggle}
        <div className="mt-5 space-y-1">
          {toggles.map(([label, tip, val, set]) => (
            <div key={label} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-neutral-50">
              <Tooltip text={tip}>
                <span className="flex items-center gap-1.5 text-sm text-neutral-700">
                  {label}
                  <Icon path={icons.info} className="w-3.5 h-3.5 text-neutral-300" />
                </span>
              </Tooltip>
              <button
                onClick={() => set((v) => !v)}
                className={`relative h-5 w-9 rounded-full transition ${val ? 'bg-emerald-500' : 'bg-neutral-200'}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${val ? 'left-[18px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-neutral-200 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Drafted exam</p>
          <p className="mt-1 text-sm font-medium text-neutral-800">{EXAM_NAME}</p>
          <p className="mt-1 text-xs text-neutral-500">12 questions · approx. 45 mins</p>
        </div>
      </div>

      <div className="flex-1 px-8 py-7 max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">{EXAM_NAME}</h1>
        <div className="mt-1 flex items-center gap-4 text-xs uppercase tracking-wide text-neutral-400">
          <span>Section A · Inorganic Chemistry</span>
          {pointValues && <span>Max score: 100</span>}
        </div>

        <div className="mt-7 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-neutral-400">Question 05</span>
            {pointValues && <span className="text-xs font-medium text-neutral-500">{PREVIEW_Q.points} points</span>}
          </div>
          <p className="mt-3 text-lg text-neutral-900">{PREVIEW_Q.text}</p>

          <div className="mt-5 space-y-2">
            {PREVIEW_Q.options.map((o) => (
              <div
                key={o.id}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                  showAnswers && o.correct
                    ? 'border-emerald-300 bg-emerald-50 text-neutral-900'
                    : 'border-neutral-200 text-neutral-700'
                }`}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  showAnswers && o.correct ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-neutral-300'
                }`}>
                  {showAnswers && o.correct && <Icon path={icons.check} className="w-2.5 h-2.5" stroke={3} />}
                </span>
                {o.text}
                {showAnswers && o.correct && (
                  <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-emerald-600">Correct</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {aiHint && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
              <Icon path={icons.info} className="w-3.5 h-3.5" /> Teacher's note (preview)
            </p>
            <p className="mt-1.5 text-sm text-neutral-600">
              Full marks are awarded only for Carbon(IV) oxide. The AI accepts
              "carbon dioxide" and "CO₂" as equivalent, and gives no marks for any
              other gas.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

function StudentView({ toggle }) {
  const time = useTimer()
  const [selected, setSelected] = useState('c')
  const [current, setCurrent] = useState(5)
  const map = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <>
      <div className="w-64 shrink-0 border-r border-neutral-200 bg-white p-4">
        {toggle}

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Question map</p>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {map.map((n) => (
            <button
              key={n}
              onClick={() => setCurrent(n)}
              className={`h-8 rounded-md text-xs font-medium transition ${
                n === current
                  ? 'bg-neutral-900 text-white'
                  : 'border border-neutral-200 text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              {String(n).padStart(2, '0')}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-neutral-200 p-3">
          <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
            Ongoing
          </span>
          <p className="mt-2 text-sm font-medium text-neutral-800">{EXAM_NAME}</p>
          <p className="mt-3 text-[11px] uppercase tracking-wide text-neutral-400">Time used</p>
          <p className="text-2xl font-semibold tabular-nums text-neutral-900">{time}</p>
        </div>
      </div>

      <div className="flex-1 px-8 py-7 max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">{EXAM_NAME}</h1>
        <div className="mt-1 flex items-center gap-4 text-xs uppercase tracking-wide text-neutral-400">
          <span>Section A · Inorganic Chemistry</span>
          <span>Max score: 100</span>
        </div>

        <div className="mt-7 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-neutral-400">
              Question {String(current).padStart(2, '0')}
            </span>
            <span className="text-xs font-medium text-neutral-500">{PREVIEW_Q.points} points</span>
          </div>
          <p className="mt-3 text-lg text-neutral-900">{PREVIEW_Q.text}</p>

          <div className="mt-5 space-y-2">
            {PREVIEW_Q.options.map((o) => {
              const isSel = selected === o.id
              return (
                <button
                  key={o.id}
                  onClick={() => setSelected(o.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                    isSel ? 'border-neutral-900 bg-neutral-50 text-neutral-900' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    isSel ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'
                  }`}>
                    {isSel && <Icon path={icons.check} className="w-2.5 h-2.5" stroke={3} />}
                  </span>
                  {o.text}
                  {isSel && <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-neutral-500">Selected</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(1, c - 1))}
            className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
          >
            <Icon path={icons.arrowLeft} className="w-4 h-4" /> Back
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
            <Icon path={icons.flag} className="w-4 h-4" /> Flag question for review
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(12, c + 1))}
            className="ml-auto flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-black transition"
          >
            Next <Icon path={icons.arrowRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )
}

/* ============================================================ BULK IMPORT === */
const BULK_TOTAL = 125

const SAMPLE_FILES = [
  { name: 'SS3_Chemistry_Questions.xlsx', fail: false },
  { name: 'SS3_Chemistry_Questions_draft.xlsx', fail: true },
]

function BulkBreadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm text-neutral-400">
      <span className="hover:text-neutral-700 cursor-pointer">Home</span>
      <span>›</span>
      <span className="hover:text-neutral-700 cursor-pointer">Exams</span>
      <span>›</span>
      <span className="hover:text-neutral-700 cursor-pointer">{EXAM_NAME}</span>
      <span>›</span>
      <span className="text-neutral-700">Bulk import</span>
    </nav>
  )
}

function CrumbTopbar({ children }) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-200 bg-white/60">
      {children}
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Icon path={icons.search} className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="w-56 rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 outline-none focus:border-neutral-400"
            placeholder="ID or keyword…"
          />
        </div>
        <button className="w-9 h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
          <Icon path={icons.headset} className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function BulkTopbar() {
  return (
    <CrumbTopbar>
      <BulkBreadcrumb />
    </CrumbTopbar>
  )
}

function DownloadTemplates() {
  const rows = [
    ['Standardized CSV', icons.file],
    ['Excel schema (.xlsx)', icons.file],
    ['JSON structure', icons.file],
  ]
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
        Download templates
      </p>
      <div className="mt-3 space-y-1">
        {rows.map(([label, path]) => (
          <button
            key={label}
            className="w-full flex items-center justify-between rounded-lg px-2 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            <span className="flex items-center gap-2.5">
              <Icon path={path} className="w-4 h-4 text-neutral-400" />
              {label}
            </span>
            <Icon path={icons.download} className="w-4 h-4 text-neutral-400" />
          </button>
        ))}
      </div>
    </div>
  )
}

function FormattingGuide() {
  const lines = [
    'Questions must be in column B',
    'S/N must be unique integers',
    'Max 4 answers per multiple choice',
    "JSON must follow the nested 'quiz' root",
  ]
  return (
    <div className="rounded-2xl bg-neutral-900 p-5 text-neutral-300">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
        Formatting guide
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <button className="mt-4 w-full rounded-lg border border-neutral-700 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition">
        Open full documentation
      </button>
    </div>
  )
}

function PreviewPlaceholders({ loading }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: 6 }).map((_, r) => (
        <div key={r} className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, c) => (
            <div
              key={c}
              className={`h-4 rounded bg-neutral-100 ${loading ? 'animate-pulse' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ---- State 1: Upload ---- */
function BulkUploadState({ file, onSelect, onImport, onCancel }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8">
          <div className="rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/40 px-6 py-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-400">
              <Icon path={icons.cloud} className="w-6 h-6" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-neutral-900">
              Upload your questions
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Drag and drop, or browse your files.
            </p>
            <p className="mt-0.5 text-xs text-neutral-400">Supported: CSV, XLSX, JSON</p>

            {file ? (
              <div className="mt-5 inline-flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm">
                <Icon path={icons.file} className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-800">{file.name}</span>
                <button onClick={() => onSelect(null)} className="text-neutral-300 hover:text-red-500">
                  <Icon path={icons.x} className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative mt-5 inline-block">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black transition"
                >
                  Select file
                </button>
                {menuOpen && (
                  <div className="absolute left-1/2 top-full z-10 mt-2 w-72 -translate-x-1/2 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
                    {SAMPLE_FILES.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => {
                          onSelect(f)
                          setMenuOpen(false)
                        }}
                        className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        <Icon path={icons.file} className="w-4 h-4 text-neutral-400" />
                        <span className="truncate">{f.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Data preview */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
              Data preview
            </p>
            <span className="text-[11px] uppercase tracking-wide text-neutral-400">
              Awaiting file upload…
            </span>
          </div>
          <div className="mt-4">
            <PreviewPlaceholders loading={false} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onImport}
            disabled={!file}
            className="flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Icon path={icons.upload} className="w-4 h-4" /> Import questions
          </button>
          <button
            onClick={onCancel}
            className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <DownloadTemplates />
        <FormattingGuide />
      </div>
    </div>
  )
}

/* ---- State 2: Processing ---- */
function BulkProcessingState({ file, progress, onCancel }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-500">
            <Icon path={icons.loader} className="w-6 h-6 animate-spin" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-neutral-900">Importing your questions…</h2>
          <p className="mt-1 text-sm text-neutral-500">{file?.name}</p>

          <div className="mx-auto mt-5 max-w-sm">
            <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-neutral-900 transition-all"
                style={{ width: `${(progress / BULK_TOTAL) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-medium text-neutral-700">
              {progress} / {BULK_TOTAL} questions
            </p>
          </div>

          <button
            onClick={onCancel}
            className="mt-6 rounded-lg border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
          >
            Cancel import
          </button>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Data preview</p>
          <div className="mt-4">
            <PreviewPlaceholders loading />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <DownloadTemplates />
        <FormattingGuide />
      </div>
    </div>
  )
}

/* ---- State 3: Success ---- */
const IMPORTED_SAMPLE = {
  text: 'Which of the following is the major product formed when ethanol is dehydrated with concentrated tetraoxosulphate(VI) acid at 170 °C?',
  points: 5,
  options: [
    { id: 'a', text: 'Ethene', correct: true },
    { id: 'b', text: 'Ethanoic acid', correct: false },
    { id: 'c', text: 'Ethoxyethane', correct: false },
    { id: 'd', text: 'Ethyl ethanoate', correct: false },
  ],
}

function BulkSuccessState({ onAddToExam, onSaveToBank, onUploadMore }) {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Icon path={icons.check} className="w-6 h-6" stroke={2.5} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-neutral-900">Import successful</h2>
          <p className="mt-1 text-sm text-neutral-500">Your questions are ready.</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={onAddToExam}
              className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black transition"
            >
              Add to this exam
            </button>
            <button
              onClick={onSaveToBank}
              className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              Save to question bank
            </button>
          </div>
        </div>

        {/* Upload more */}
        <button
          onClick={onUploadMore}
          className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/40 p-8 text-center hover:bg-neutral-50 transition"
        >
          <div className="mx-auto w-11 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-400">
            <Icon path={icons.file} className="w-5 h-5" />
          </div>
          <p className="mt-3 text-sm font-semibold text-neutral-700">Upload more</p>
          <p className="mt-1 text-xs text-neutral-400">
            Append more questions to this session.
          </p>
          <p className="mt-0.5 text-xs text-neutral-400">Supported: CSV, XLSX, JSON</p>
        </button>
      </div>

      {/* Imported questions preview */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-neutral-900">
            Here are your {BULK_TOTAL} questions
          </p>
          <div className="flex items-center gap-1 text-neutral-400">
            <button className="w-8 h-8 rounded-md hover:bg-neutral-100 flex items-center justify-center">
              <Icon path={icons.shuffle} className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-neutral-100 flex items-center justify-center">
              <Icon path={icons.trash} className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto pr-1 space-y-3">
          <div className="rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wide text-neutral-400">
                Question 01 · MCQ
              </span>
              <span className="text-xs font-medium text-neutral-500">{IMPORTED_SAMPLE.points} points</span>
            </div>
            <p className="mt-3 text-base text-neutral-900">{IMPORTED_SAMPLE.text}</p>
            <div className="mt-4 space-y-2">
              {IMPORTED_SAMPLE.options.map((o) => (
                <div
                  key={o.id}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm ${
                    o.correct ? 'border-emerald-300 bg-emerald-50 text-neutral-900' : 'border-neutral-200 text-neutral-700'
                  }`}
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    o.correct ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-neutral-300'
                  }`}>
                    {o.correct && <Icon path={icons.check} className="w-2.5 h-2.5" stroke={3} />}
                  </span>
                  {o.text}
                  {o.correct && (
                    <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-emerald-600">
                      Correct answer
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* trailing rows to suggest a long, scrollable list */}
          {['Question 02 · MCQ', 'Question 03 · Text', 'Question 04 · MCQ'].map((q) => (
            <div key={q} className="rounded-xl border border-neutral-200 p-5">
              <span className="text-[11px] uppercase tracking-wide text-neutral-400">{q}</span>
              <div className="mt-3 h-3 w-2/3 rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- State 4: Failed ---- */
const BULK_ERRORS = [
  ['Row 4: Missing correct answer mapping', "The field 'correct_ans' cannot be null."],
  ['Row 12: Question exceeds 500 character limit', 'Character count: 742 / 500.'],
  ['Row 25: Invalid format in image column', 'Supported: jpg, png, webp. Found: tiff.'],
]
const BULK_ROWS = [
  [1, 'MISSING_ID', 'What is the basicity of trioxonitrate(V) acid?', '—', 'CRITICAL'],
  [4, 'Q_342', 'Identify the components of…', '—', 'CRITICAL'],
  [12, 'Q_981', '[Content exceeds 500 character limit…]', 'Option B', 'WARNING'],
  [25, 'Q_112', 'Select the correct apparatus…', 'Option A', 'CRITICAL'],
]

function BulkFailedState({ onReupload }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <Icon path={icons.x} className="w-6 h-6" stroke={2.5} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-neutral-900">Import failed</h2>
          <p className="mt-1 text-sm text-neutral-500">14 errors found.</p>
          <button
            onClick={onReupload}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black transition"
          >
            <Icon path={icons.upload} className="w-4 h-4" /> Re-upload corrected file
          </button>
        </div>

        {/* Data preview with statuses */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Data preview</p>
            <span className="text-[11px] uppercase tracking-wide text-red-500">Validation complete · errors found</span>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="pb-2 font-medium">S/N</th>
                <th className="pb-2 font-medium">Question ID</th>
                <th className="pb-2 font-medium">Question text</th>
                <th className="pb-2 font-medium">Correct answer</th>
                <th className="pb-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {BULK_ROWS.map(([sn, id, text, ans, status]) => (
                <tr key={sn} className="text-neutral-700">
                  <td className="py-2.5">{sn}</td>
                  <td className="py-2.5">
                    <span className={`rounded px-1.5 py-0.5 text-xs ${
                      id === 'MISSING_ID' ? 'bg-red-50 text-red-600' : 'text-neutral-500'
                    }`}>
                      {id}
                    </span>
                  </td>
                  <td className="py-2.5 max-w-xs truncate text-neutral-600">{text}</td>
                  <td className="py-2.5">
                    <span className={ans === '—' ? 'rounded bg-red-50 px-1.5 py-0.5 text-red-600' : ''}>{ans}</span>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className={`text-[11px] font-semibold uppercase tracking-wide ${
                      status === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'
                    }`}>
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        {/* Error report */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-red-500">
            <Icon path={icons.alert} className="w-3.5 h-3.5" /> Error report
          </p>
          <div className="mt-3 space-y-3">
            {BULK_ERRORS.map(([title, detail]) => (
              <div key={title}>
                <p className="text-sm font-medium text-neutral-800">{title}</p>
                <p className="text-xs text-neutral-400">{detail}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition">
            <Icon path={icons.download} className="w-3.5 h-3.5" /> Download error log
          </button>
        </div>

        <DownloadTemplates />
        <FormattingGuide />
      </div>
    </div>
  )
}

function BulkImport({ onExit, onAddToExam }) {
  const [step, setStep] = useState('upload')
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  React.useEffect(() => {
    if (step !== 'processing') return
    setProgress(28)
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= BULK_TOTAL) {
          clearInterval(id)
          setStep(file?.fail ? 'failed' : 'success')
          return BULK_TOTAL
        }
        return Math.min(BULK_TOTAL, p + 7)
      })
    }, 110)
    return () => clearInterval(id)
  }, [step, file])

  return (
    <div className="min-h-screen flex">
      <Sidebar active="Exams" />
      <main className="flex-1 flex flex-col">
        <BulkTopbar />
        <div className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
          {step === 'upload' && (
            <BulkUploadState
              file={file}
              onSelect={setFile}
              onImport={() => setStep('processing')}
              onCancel={onExit}
            />
          )}
          {step === 'processing' && (
            <BulkProcessingState file={file} progress={progress} onCancel={() => setStep('upload')} />
          )}
          {step === 'success' && (
            <BulkSuccessState
              onAddToExam={onAddToExam}
              onSaveToBank={onAddToExam}
              onUploadMore={() => {
                setFile(null)
                setStep('upload')
              }}
            />
          )}
          {step === 'failed' && <BulkFailedState onReupload={() => { setFile(null); setStep('upload') }} />}
        </div>
      </main>
    </div>
  )
}

/* =========================================================== QUESTION BANKS === */
const QUESTION_BANKS = [
  {
    id: 1,
    name: 'SS3 Chemistry Mid-Term',
    desc: 'Acids, bases, salts and qualitative analysis.',
    questions: 45,
    edited: 'Edited 2 days ago',
    inUse: true,
  },
  {
    id: 2,
    name: 'ECO 201 Microeconomics',
    desc: 'Demand, supply and elasticity.',
    questions: 32,
    edited: 'Edited 6 days ago',
  },
  {
    id: 3,
    name: 'JSS Mathematics',
    desc: 'Fractions, algebra and mensuration.',
    questions: 60,
    edited: 'Edited today',
  },
  {
    id: 4,
    name: 'SS2 Biology',
    desc: 'Cell structure, ecology and genetics.',
    questions: 28,
    edited: 'Edited 18 Oct',
  },
  {
    id: 5,
    name: 'ECO 101 Intro to Economics',
    desc: 'Basic economic problems and systems.',
    questions: 21,
    edited: 'Edited 12 Sept',
  },
]

const BANK_QUESTIONS = [
  { n: 1, text: 'State and explain the differences between strong and weak acids, with examples.', type: 'Short answer', points: 10 },
  { n: 2, text: 'Which of the following salts is insoluble in water?', type: 'MCQ', points: 5 },
  { n: 3, text: 'Define the term "water of crystallisation" and give one example of a hydrated salt.', type: 'Short answer', points: 8 },
  { n: 4, text: 'Which gas is evolved when dilute hydrochloric acid reacts with calcium trioxocarbonate(IV)?', type: 'MCQ', points: 5 },
  { n: 5, text: 'Explain, with an equation, what happens when sodium hydroxide reacts with ammonium chloride.', type: 'Short answer', points: 10 },
  { n: 6, text: 'A salt that turns blue litmus red in solution is best described as…', type: 'MCQ', points: 5 },
]

/* ---- Screen 1: Save to question bank (modal) ---- */
function SaveToBankModal({ banks, onClose }) {
  const [name, setName] = useState('')
  const [query, setQuery] = useState('')
  const isEmpty = banks.length === 0
  const filtered = banks.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900">Save to question bank</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700">
            <Icon path={icons.x} className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Create new bank */}
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
            Create new bank
          </p>
          <div className="mt-2 flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter bank name…"
              className={inputCls}
            />
            <button className="shrink-0 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black transition">
              Create &amp; add
            </button>
          </div>

          {isEmpty ? (
            <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50/60 p-5 text-center">
              <p className="text-sm text-neutral-600">
                You don't have any question banks yet. Create one to save and reuse
                questions.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Add to existing
              </p>
              <div className="relative mt-2">
                <Icon path={icons.search} className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search banks…"
                  className={inputCls + ' pl-9'}
                />
              </div>

              <div className="mt-3 max-h-56 overflow-y-auto pr-1 space-y-1.5">
                {filtered.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center gap-3 rounded-lg border border-neutral-200 px-3 py-2.5"
                  >
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-500 flex items-center justify-center">
                      <Icon path={icons.bank} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-neutral-800">{b.name}</p>
                      <p className="text-xs text-neutral-400">
                        {b.questions} questions · {b.edited.toLowerCase()}
                      </p>
                    </div>
                    <button className="shrink-0 rounded-lg border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end px-5 py-4 border-t border-neutral-100">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- Screen 2: Question Banks (library) ---- */
function QuestionBanks({ onOpenBank, onExit }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar active="Questions" />
      <main className="flex-1 flex flex-col">
        <CrumbTopbar>
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <button onClick={onExit} className="hover:text-neutral-700">Home</button>
            <span>›</span>
            <span className="text-neutral-700">Question Banks</span>
          </nav>
        </CrumbTopbar>
        <div className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Question Banks
              </h1>
              <p className="mt-1 text-sm text-neutral-500">Your saved question banks.</p>
            </div>
            <button className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black transition">
              Create question bank
            </button>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUESTION_BANKS.map((b) => (
              <div key={b.id} className="rounded-2xl border border-neutral-200 bg-white p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-500 flex items-center justify-center">
                    <Icon path={icons.bank} className="w-5 h-5" />
                  </span>
                  {b.inUse && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                      In use
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-base font-semibold text-neutral-900">{b.name}</h3>
                <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{b.desc}</p>

                <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                  <span>Questions: {b.questions}</span>
                  <span>Last edited: {b.edited.replace('Edited ', '')}</span>
                </div>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() => onOpenBank(b)}
                    className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black transition"
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

/* ---- Screen 3: Inside a bank (its questions) — view / select toggle ---- */
function BankQuestions({ bank, onBack, onAddToExam }) {
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected] = useState({})
  const selectedCount = Object.values(selected).filter(Boolean).length
  const total = BANK_QUESTIONS.reduce((s, q) => s + q.points, 0)

  const toggle = (n) => setSelected((s) => ({ ...s, [n]: !s[n] }))
  const startSelect = () => {
    setSelecting(true)
    setSelected({})
  }
  const cancelSelect = () => {
    setSelecting(false)
    setSelected({})
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar active="Questions" />
      <main className="flex-1 flex flex-col">
        <CrumbTopbar>
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <button onClick={onBack} className="hover:text-neutral-700">Home</button>
            <span>›</span>
            <button onClick={onBack} className="hover:text-neutral-700">Question Banks</button>
            <span>›</span>
            <span className="text-neutral-700">{bank.name}</span>
          </nav>
        </CrumbTopbar>
        <div className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">{bank.name}</h1>
              <p className="mt-1 text-sm text-neutral-500">
                {BANK_QUESTIONS.length} questions · {total} points
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
                <Icon path={icons.plus} className="w-4 h-4" /> Add questions
              </button>
              {selecting ? (
                <button
                  onClick={cancelSelect}
                  className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={startSelect}
                  className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  <Icon path={icons.check} className="w-4 h-4" /> Select
                </button>
              )}
            </div>
          </div>

          <div className="mt-7 grid lg:grid-cols-3 gap-6">
            {/* Question list */}
            <div className="lg:col-span-2 space-y-2.5">
              {BANK_QUESTIONS.map((q) => (
                <div
                  key={q.n}
                  className={`flex items-start gap-3 rounded-xl border bg-white px-4 py-3.5 transition ${
                    selecting && selected[q.n] ? 'border-neutral-900' : 'border-neutral-200'
                  }`}
                >
                  {selecting && (
                    <input
                      type="checkbox"
                      checked={!!selected[q.n]}
                      onChange={() => toggle(q.n)}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-300"
                    />
                  )}
                  <span className="mt-0.5 text-xs font-medium text-neutral-400 w-6">
                    {String(q.n).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-neutral-900">{q.text}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-wide text-neutral-400">
                      <span className="rounded border border-neutral-200 px-1.5 py-0.5">{q.type}</span>
                      <span>{q.points} points</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-400">
                    <button className="w-8 h-8 rounded-md hover:bg-neutral-100 flex items-center justify-center">
                      <Icon path={icons.pen} className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-md hover:bg-neutral-100 flex items-center justify-center">
                      <MoreDots />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add from repository (optional, simple) */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 h-fit">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Quick add from repository
              </p>
              <div className="mt-3 space-y-3">
                {[
                  ['Properties of Group 1 metals', 'CHM-204 · used in 4 banks'],
                  ['Balancing redox equations', 'CHM-181 · used in 9 banks'],
                  ['Periodic trends across Period 3', 'CHM-205 · used in 2 banks'],
                ].map(([t, meta]) => (
                  <button key={t} className="block w-full text-left rounded-lg px-2 py-1.5 hover:bg-neutral-50">
                    <p className="text-sm text-neutral-800">{t}</p>
                    <p className="text-xs text-neutral-400">{meta}</p>
                  </button>
                ))}
              </div>
              <button className="mt-4 w-full rounded-lg border border-neutral-300 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition">
                View all repository
              </button>
            </div>
          </div>
        </div>

        {/* Selection action bar */}
        {selecting && (
          <div className="sticky bottom-0 border-t border-neutral-200 bg-white px-8 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">
                {selectedCount} selected
              </span>
              <button
                onClick={onAddToExam}
                disabled={selectedCount === 0}
                className="rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Add to exam
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

/* ============================================================ TIMER WIDGET === */
function TimerWidget({ elapsedMs, step, frozen, questionCount }) {
  const fmt = (ms) => {
    const s = Math.floor(ms / 1000)
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  }
  return (
    <div className="fixed bottom-5 right-5 z-40 w-64 rounded-xl border border-neutral-200 bg-white shadow-lg shadow-neutral-300/30 p-4">
      {frozen ? (
        <>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
            <Icon path={icons.check} className="w-3.5 h-3.5" stroke={3} /> Published
          </p>
          <p className="mt-1.5 text-sm text-neutral-700">
            Published in <span className="font-semibold text-neutral-900">{fmt(elapsedMs)}</span>
          </p>
          <p className="text-xs text-neutral-400">{questionCount} questions · 5 steps</p>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
              Creation timer
            </span>
            <span className="text-lg font-semibold tabular-nums text-neutral-900">{fmt(elapsedMs)}</span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">{step}</p>
        </>
      )}
    </div>
  )
}

/* ============================================================== MY EXAMS === */
const MY_EXAMS = [
  { id: 1, name: 'SS3 Chemistry Mid-Term', course: 'Chemistry · SS3', questions: 12, status: 'Draft' },
  { id: 2, name: 'ECO 201 Test', course: 'Economics · 200 level', questions: 20, status: 'Published' },
  { id: 3, name: 'JSS Mathematics Quiz', course: 'Mathematics · JSS2', questions: 15, status: 'Draft' },
]

function MyExams({ onCreate }) {
  const flow = useFlow()
  return (
    <div className="min-h-screen flex">
      <Sidebar active="Exams" />
      <main className="flex-1 flex flex-col">
        <CrumbTopbar>
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <button onClick={() => flow?.go('dashboard')} className="hover:text-neutral-700">Home</button>
            <span>›</span>
            <span className="text-neutral-700">Exams</span>
          </nav>
        </CrumbTopbar>
        <div className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">My Exams</h1>
              <p className="mt-1 text-sm text-neutral-500">Create, draft and publish your exams.</p>
            </div>
            <button
              onClick={onCreate}
              className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black transition"
            >
              Create exam
            </button>
          </div>

          <div className="mt-7 space-y-2.5">
            {MY_EXAMS.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4"
              >
                <span className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-500 flex items-center justify-center">
                  <Icon path={icons.exams} className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-900">{e.name}</p>
                  <p className="text-xs text-neutral-400">{e.course} · {e.questions} questions</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                    e.status === 'Published'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {e.status}
                </span>
                <button
                  onClick={() => flow?.go('editor')}
                  className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

/* ============================================================== PUBLISHED === */
function Published({ elapsedMs, questionCount, onInvite }) {
  const flow = useFlow()
  const fmt = (ms) => {
    const s = Math.floor(ms / 1000)
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  }
  return (
    <div className="min-h-screen flex">
      <Sidebar active="Exams" />
      <main className="flex-1 flex flex-col">
        <CrumbTopbar>
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <button onClick={() => flow?.go('dashboard')} className="hover:text-neutral-700">Home</button>
            <span>›</span>
            <button onClick={() => flow?.go('exams')} className="hover:text-neutral-700">Exams</button>
            <span>›</span>
            <span className="text-neutral-700">{EXAM_NAME}</span>
          </nav>
        </CrumbTopbar>
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              <Icon path={icons.check} className="w-7 h-7" stroke={2.5} />
            </div>
            <h1 className="mt-5 text-xl font-semibold text-neutral-900">Exam published</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {EXAM_NAME} is live. Students can now join.
            </p>

            <div className="mt-5 rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm text-neutral-600">
              Published in <span className="font-semibold text-neutral-900">{fmt(elapsedMs)}</span>
              {' · '}{questionCount} questions · 5 steps
            </div>

            <button
              onClick={onInvite}
              className="mt-6 w-full rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black transition"
            >
              Invite students
            </button>
            <button
              onClick={() => flow?.go('exams')}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              Back to my exams
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

/* =========================================================== INVITE STUDENTS === */
const PENDING_INVITES = [
  ['Chiamaka Okafor', 'chiamaka.okafor@student.edu', 'Oct 24, 2023'],
  ['Tunde Adeyemi', 'tunde.adeyemi@student.edu', 'Oct 24, 2023'],
  ['Ngozi Eze', 'ngozi.eze@student.edu', 'Oct 23, 2023'],
]

function InviteStudents() {
  const flow = useFlow()
  const [copied, setCopied] = useState(false)
  const link = 'proctex.app/join/ss3-chem-7k9x2'

  React.useEffect(() => {
    flow?.setStep('Step 5 of 5: Invite students')
  }, [])

  return (
    <div className="min-h-screen flex">
      <Sidebar active="Students" />
      <main className="flex-1 flex flex-col">
        <CrumbTopbar>
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <button onClick={() => flow?.go('dashboard')} className="hover:text-neutral-700">Home</button>
            <span>›</span>
            <button onClick={() => flow?.go('exams')} className="hover:text-neutral-700">Exams</button>
            <span>›</span>
            <span className="text-neutral-700">Invite students</span>
          </nav>
        </CrumbTopbar>

        <div className="flex-1 px-8 py-8 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Invite students</h1>
          <p className="mt-1 text-sm text-neutral-500">{EXAM_NAME}</p>

          {/* HERO — magic link */}
          <div className="mt-6 rounded-2xl border border-neutral-900/10 bg-white p-6 shadow-sm ring-1 ring-neutral-900/5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
              Share link
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-700">
                {link}
              </div>
              <button
                onClick={() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}
                className="shrink-0 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black transition"
              >
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">Link expiry</span>
              <select className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-neutral-400" defaultValue="24">
                <option value="24">24 hours</option>
                <option value="72">72 hours</option>
                <option value="168">7 days</option>
                <option value="0">No expiry</option>
              </select>
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              Share this link with your students. They join by clicking it — no account
              needed.
            </p>
          </div>

          {/* SECONDARY — email */}
          <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="text-sm font-semibold text-neutral-800">Or send the link by email</p>
            <textarea
              rows={3}
              placeholder="Enter student emails, comma-separated or one per line…"
              className={inputCls + ' mt-3 resize-none'}
            />
            <div className="mt-3 flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">
                <Icon path={icons.upload} className="w-4 h-4" /> Bulk upload CSV
              </button>
              <button className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
                Send invitations
              </button>
            </div>
          </div>

          {/* Pending invitations */}
          <div className="mt-7 flex items-center justify-between">
            <h2 className="text-base font-semibold text-neutral-900">Pending invitations</h2>
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
              {PENDING_INVITES.length} pending
            </span>
          </div>
          <div className="mt-3 rounded-2xl border border-neutral-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-neutral-400 border-b border-neutral-100">
                  <th className="px-5 py-3 font-medium">Student name / email</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Sent date</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {PENDING_INVITES.map(([name, email, date]) => (
                  <tr key={email}>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-neutral-900">{name}</p>
                      <p className="text-xs text-neutral-400">{email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600">
                        Awaiting join
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-500">{date}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="text-sm font-medium text-neutral-700 hover:text-neutral-900">Resend</button>
                      <button className="ml-4 text-sm font-medium text-red-500 hover:text-red-600">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ============================================================ RESULTS (stub) === */
function ResultsPlaceholder() {
  const flow = useFlow()
  return (
    <div className="min-h-screen flex">
      <Sidebar active="Results" />
      <main className="flex-1 flex flex-col">
        <CrumbTopbar>
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <button onClick={() => flow?.go('dashboard')} className="hover:text-neutral-700">Home</button>
            <span>›</span>
            <span className="text-neutral-700">Results</span>
          </nav>
        </CrumbTopbar>
        <div className="flex-1 flex items-center justify-center text-center px-8">
          <div>
            <div className="mx-auto w-12 h-12 rounded-xl bg-neutral-100 text-neutral-400 flex items-center justify-center">
              <Icon path={icons.results} className="w-6 h-6" />
            </div>
            <h1 className="mt-4 text-lg font-semibold text-neutral-900">Results</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Graded results will appear here once students submit.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ================================================================== APP === */
export default function App() {
  const [screen, setScreen] = useState('signup')
  const [openBank, setOpenBank] = useState(QUESTION_BANKS[0])

  // Timer / step counter shared across the publish flow.
  const [startTs, setStartTs] = useState(null)
  const [running, setRunning] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [frozen, setFrozen] = useState(false)
  const [step, setStep] = useState('Step 1 of 5: Exam setup')
  const [questionCount, setQuestionCount] = useState(0)

  React.useEffect(() => {
    if (!running || startTs == null) return
    const id = setInterval(() => setElapsedMs(Date.now() - startTs), 250)
    return () => clearInterval(id)
  }, [running, startTs])

  const flow = {
    screen,
    go: (s) => s && setScreen(s),
    setStep,
    questionCount,
    setQuestionCount,
    startTimer: () => {
      if (startTs == null && !frozen) {
        setStartTs(Date.now())
        setRunning(true)
      }
    },
    freezeTimer: () => {
      setRunning(false)
      setFrozen(true)
    },
  }

  const showTimer = ['exam', 'editor', 'preview', 'published', 'invite'].includes(screen)

  return (
    <FlowCtx.Provider value={flow}>
      <div className="font-sans text-neutral-900">
        {screen === 'signup' && <SignUp onCreate={() => setScreen('dashboard')} />}
        {screen === 'dashboard' && (
          <Dashboard
            onBeginDrafting={() => setScreen('exam')}
            onBulkUpload={() => setScreen('bulk')}
            onQuestionBanks={() => setScreen('banks')}
          />
        )}
        {screen === 'exams' && <MyExams onCreate={() => setScreen('exam')} />}
        {screen === 'bulk' && (
          <BulkImport onExit={() => setScreen('dashboard')} onAddToExam={() => setScreen('editor')} />
        )}
        {screen === 'exam' && <CreateExam onContinue={() => setScreen('editor')} />}
        {screen === 'editor' && <QuestionEditor onPreview={() => setScreen('preview')} />}
        {screen === 'preview' && (
          <Preview onExit={() => setScreen('editor')} onPublished={() => setScreen('published')} />
        )}
        {screen === 'published' && (
          <Published
            elapsedMs={elapsedMs}
            questionCount={questionCount}
            onInvite={() => setScreen('invite')}
          />
        )}
        {screen === 'invite' && <InviteStudents />}
        {screen === 'banks' && (
          <QuestionBanks
            onExit={() => setScreen('dashboard')}
            onOpenBank={(b) => {
              setOpenBank(b)
              setScreen('bankView')
            }}
          />
        )}
        {screen === 'bankView' && (
          <BankQuestions
            bank={openBank}
            onBack={() => setScreen('banks')}
            onAddToExam={() => setScreen('editor')}
          />
        )}
        {screen === 'results' && <ResultsPlaceholder />}

        {showTimer && (
          <TimerWidget
            elapsedMs={elapsedMs}
            step={step}
            frozen={frozen}
            questionCount={questionCount}
          />
        )}
      </div>
    </FlowCtx.Provider>
  )
}
