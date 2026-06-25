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
}

const GripDots = ({ className = 'w-3.5 h-3.5 text-neutral-400' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="6" r="1.4" /><circle cx="15" cy="6" r="1.4" />
    <circle cx="9" cy="12" r="1.4" /><circle cx="15" cy="12" r="1.4" />
    <circle cx="9" cy="18" r="1.4" /><circle cx="15" cy="18" r="1.4" />
  </svg>
)

const EXAM_NAME = 'SS3 Chemistry Mid-Term'

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
function Dashboard({ onBeginDrafting }) {
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

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {/* PRIMARY — largest, black button */}
            <div className="lg:col-span-2 lg:row-span-1 rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                <Icon path={icons.pen} className="w-5 h-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-neutral-900">Manual Input</h2>
              <p className="mt-1.5 text-sm text-neutral-500 max-w-md">
                Write and organize exam questions directly. The fastest way to get
                your first exam ready.
              </p>
              <div className="mt-6">
                <button
                  onClick={onBeginDrafting}
                  className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black transition"
                >
                  Begin drafting
                </button>
              </div>
            </div>

            {/* SECONDARY — smaller, muted, outline button */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 flex flex-col">
              <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center">
                <Icon path={icons.upload} className="w-[18px] h-[18px]" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-800">Bulk Upload</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Import questions from Excel, CSV, or JSON.
              </p>
              <div className="mt-auto pt-5">
                <button className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
                  Upload file
                </button>
              </div>
            </div>

            {/* DISABLED — greyed out with helper text below */}
            <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/40 p-6 flex flex-col opacity-70">
              <div className="w-9 h-9 rounded-lg bg-neutral-100 text-neutral-400 flex items-center justify-center">
                <Icon path={icons.bank} className="w-[18px] h-[18px]" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-400">My Question Bank</h3>
              <p className="mt-1 text-sm text-neutral-400">
                Reuse saved questions anytime.
              </p>
              <div className="mt-auto pt-5">
                <button
                  disabled
                  className="rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-400 cursor-not-allowed"
                >
                  View questions
                </button>
                <p className="mt-2 text-xs text-neutral-400">
                  Your saved questions will appear here once you create some.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/* =========================================================== CREATE EXAM === */
function GettingStarted() {
  const items = [
    ['Create your first exam', true],
    ['Add questions', false],
    ['Invite students', false],
    ['Publish exam', false],
  ]
  return (
    <div className="w-72 rounded-2xl border border-neutral-200 bg-white shadow-lg shadow-neutral-200/50 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-900">Getting started</p>
        <span className="text-xs text-neutral-400">25% complete</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
        <div className="h-full w-1/4 rounded-full bg-neutral-900" />
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map(([label, done]) => (
          <li key={label} className="flex items-center gap-2.5 text-sm">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                done ? 'bg-neutral-900 border-neutral-900 text-white' : 'border-neutral-300'
              }`}
            >
              {done && <Icon path={icons.check} className="w-2.5 h-2.5" stroke={3} />}
            </span>
            <span className={done ? 'text-neutral-400 line-through' : 'text-neutral-700'}>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

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

function CreateExam({ onBack, onContinue }) {
  const [title, setTitle] = useState('')
  const [optionalOpen, setOptionalOpen] = useState(false) // collapsed by default

  return (
    <div className="min-h-screen flex">
      <Sidebar active="Exams" />
      <main className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex-1 relative">
          <div className="px-8 py-8 max-w-3xl mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-neutral-400">
              <button onClick={onBack} className="hover:text-neutral-700">Home</button>
              <span>›</span>
              <button onClick={onBack} className="hover:text-neutral-700">Exams</button>
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

          {/* Floating Getting Started card */}
          <div className="hidden xl:block absolute right-8 top-8">
            <GettingStarted />
          </div>
        </div>
      </main>
    </div>
  )
}

/* ============================================================= ICON RAIL === */
function IconRail({ active = 'exams' }) {
  const items = [
    ['dashboard', icons.dashboard],
    ['exams', icons.exams],
    ['questions', icons.questions],
    ['students', icons.students],
    ['results', icons.results],
  ]
  return (
    <aside className="w-14 shrink-0 bg-white border-r border-neutral-200 flex flex-col items-center py-4">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-700 to-black mb-6" />
      <nav className="flex-1 flex flex-col items-center gap-1.5">
        {items.map(([key, path]) => (
          <button
            key={key}
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

function QuestionEditor({ onPreview, onPublish }) {
  const [responseType, setResponseType] = useState('mc')
  const [shuffle, setShuffle] = useState(false)
  const [compulsory, setCompulsory] = useState(false)
  const [options, setOptions] = useState([
    { id: 1, text: 'Sodium chloride', correct: false },
    { id: 2, text: 'Barium sulphate', correct: true },
    { id: 3, text: 'Potassium trioxonitrate(V)', correct: false },
    { id: 4, text: 'Ammonium chloride', correct: false },
  ])

  const setCorrect = (id) =>
    setOptions((o) => o.map((opt) => ({ ...opt, correct: opt.id === id })))
  const removeOption = (id) => setOptions((o) => o.filter((opt) => opt.id !== id))
  const addOption = () =>
    setOptions((o) => [...o, { id: Date.now(), text: '', correct: false }])

  return (
    <div className="min-h-screen flex">
      <IconRail active="exams" />

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-white">
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <span className="hover:text-neutral-700 cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-neutral-700 cursor-pointer">Exams</span>
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
            <button
              onClick={onPublish}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition"
            >
              Publish
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

            {/* Questions list */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Questions
              </span>
              <span className="text-[11px] text-neutral-400">3 total</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                ['Q1', 'Soluble salts', true],
                ['Q2', 'Untitled', false],
                ['Q3', 'Untitled', false],
              ].map(([q, label, active]) => (
                <div
                  key={q}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm ${
                    active
                      ? 'border-neutral-300 bg-neutral-50 text-neutral-900'
                      : 'border-neutral-200 text-neutral-500'
                  }`}
                >
                  <GripDots />
                  <span className="font-medium text-xs text-neutral-400">{q}</span>
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>

            <button className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-50 transition">
              <Icon path={icons.plus} className="w-3.5 h-3.5" /> Add new block
            </button>

            {/* Secondary, exam-level save */}
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

              {/* Question text */}
              <textarea
                rows={2}
                defaultValue="Which of the following salts is insoluble in water?"
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
                    {options.map((opt) => (
                      <div
                        key={opt.id}
                        className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2.5"
                      >
                        <GripDots />
                        <input
                          defaultValue={opt.text}
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
                    onClick={addOption}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-2.5 text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition"
                  >
                    <Icon path={icons.plus} className="w-4 h-4" /> Add option
                  </button>
                </div>
              )}

              {/* TEXT */}
              {responseType === 'text' && (
                <div className="mt-6 space-y-5">
                  <Field label="Marking guide">
                    <textarea
                      rows={5}
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
            </div>

            {/* Primary, question-level save */}
            <div className="border-t border-neutral-200 bg-white px-8 py-4 flex justify-end">
              <button className="rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black transition">
                Save question to draft
              </button>
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

            <button className="mt-6 flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
              <Icon path={icons.plus} className="w-4 h-4" /> Save to my question bank
            </button>
          </div>
        </div>
      </div>
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

function Preview({ onExit, onPublish }) {
  const [view, setView] = useState('teacher')

  const PreviewTopbar = (
    <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-white">
      <nav className="flex items-center gap-2 text-sm text-neutral-400">
        <span className="hover:text-neutral-700 cursor-pointer">Home</span>
        <span>›</span>
        <span className="hover:text-neutral-700 cursor-pointer">Exams</span>
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
          onClick={onPublish}
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

/* ================================================================== APP === */
export default function App() {
  const [screen, setScreen] = useState('signup')

  return (
    <div className="font-sans text-neutral-900">
      {screen === 'signup' && <SignUp onCreate={() => setScreen('dashboard')} />}
      {screen === 'dashboard' && <Dashboard onBeginDrafting={() => setScreen('exam')} />}
      {screen === 'exam' && (
        <CreateExam onBack={() => setScreen('dashboard')} onContinue={() => setScreen('editor')} />
      )}
      {screen === 'editor' && (
        <QuestionEditor onPreview={() => setScreen('preview')} onPublish={() => setScreen('preview')} />
      )}
      {screen === 'preview' && (
        <Preview onExit={() => setScreen('editor')} onPublish={() => setScreen('editor')} />
      )}
    </div>
  )
}
