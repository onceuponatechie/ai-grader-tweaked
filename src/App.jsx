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

function CreateExam({ onBack }) {
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
              <button className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black transition">
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

/* ================================================================== APP === */
export default function App() {
  const [screen, setScreen] = useState('signup')

  return (
    <div className="font-sans text-neutral-900">
      {screen === 'signup' && <SignUp onCreate={() => setScreen('dashboard')} />}
      {screen === 'dashboard' && <Dashboard onBeginDrafting={() => setScreen('exam')} />}
      {screen === 'exam' && <CreateExam onBack={() => setScreen('dashboard')} />}
    </div>
  )
}
