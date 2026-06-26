'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const pp = (weight: 400 | 500 | 600 | 700): React.CSSProperties => ({
  fontFamily: 'var(--font-poppins), sans-serif',
  fontWeight: weight,
})

const hv = (weight: 400 | 500 | 700): React.CSSProperties => ({
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontWeight: weight,
})

const LEADERBOARD = [
  { rank: 1, name: 'CoinBlaster22',  city: 'Austin, TX',    amount: '$88.00', avatar: 'purple' },
  { rank: 2, name: 'PixelPanda88',   city: 'Miami, FL',     amount: '$79.00', avatar: 'yellow' },
  { rank: 3, name: 'StarChaser99',   city: 'Chicago, IL',   amount: '$78.00', avatar: 'blue'   },
  { rank: 4, name: 'LuckyRoller7',   city: 'Atlanta, GA',   amount: '$55.00', avatar: 'green'  },
  { rank: 5, name: 'GameHunter42',   city: 'Denver, CO',    amount: '$33.00', avatar: 'purple' },
]

type Goal = { title: string; cash: string; tickets?: string; timing: string }
const MAIN_GOALS: Goal[] = [
  { title: 'Reach Island 3',    cash: '$0.05',                   timing: 'Complete in 7 days to earn kash!'  },
  { title: 'Reach Island 12',   cash: '$0.25', tickets: '25',    timing: 'Complete in 7 days to earn kash!'  },
  { title: 'Reach Island 40',   cash: '$0.25', tickets: '25',    timing: 'Complete in 7 days to earn kash!'  },
  { title: 'Reach Island 65',   cash: '$0.50', tickets: '50',    timing: 'Complete in 7 days to earn kash!'  },
  { title: 'Reach Island 90',   cash: '$0.50', tickets: '50',    timing: 'Complete in 14 days to earn kash!' },
  { title: 'Reach Island 150',  cash: '$1.00',                   timing: 'Complete in 14 days to earn kash!' },
  { title: 'Reach Island 200',  cash: '$3.00', tickets: '300',   timing: 'Complete in 14 days to earn kash!' },
  { title: 'Reach Island 300',  cash: '$5.00', tickets: '500',   timing: 'Complete in 30 days to earn kash!' },
  { title: 'Reach Island 400',  cash: '$5.00', tickets: '500',   timing: 'Complete in 30 days to earn kash!' },
  { title: 'Reach Island 500',  cash: '$7.00', tickets: '700',   timing: 'Complete in 60 days to earn kash!' },
  { title: 'Reach Island 700',  cash: '$15',   tickets: '1,500', timing: 'Complete in 60 days to earn kash!' },
  { title: 'Reach Island 900',  cash: '$25',   tickets: '2,500', timing: 'Complete in 60 days to earn kash!' },
  { title: 'Reach Island 1200', cash: '$40',   tickets: '4,000', timing: 'Complete in 90 days to earn kash!' },
  { title: 'Reach Island 1500', cash: '$65',   tickets: '6,500', timing: 'Complete in 90 days to earn kash!' },
]
const TURBO_GOALS: Goal[] = [
  { title: 'TURBO EARNINGS: Reach Island 100 and make at least one in-app purchase', cash: '$25', tickets: '2,500', timing: 'Complete in 3 days to earn kash!'  },
  { title: 'TURBO EARNINGS: Reach Island 250 and make at least one in-app purchase', cash: '$50',                   timing: 'Complete in 7 days to earn kash!'  },
  { title: 'TURBO EARNINGS: Reach Island 550 and make at least $10 in-app purchase', cash: '$70', tickets: '7,000', timing: 'Complete in 25 days to earn kash!' },
]
const BONUS_GOALS: Goal[] = [
  { title: 'BONUS EARNINGS: Spend a total of $3',  cash: '$1.45', tickets: '145',   timing: 'Complete in 60 days to earn kash!' },
  { title: 'BONUS EARNINGS: Spend a total of $34', cash: '$6.00', tickets: '600',   timing: 'Complete in 60 days to earn kash!' },
  { title: 'BONUS EARNINGS: Spend a total of $98', cash: '$20',   tickets: '2,000', timing: 'Complete in 60 days to earn kash!' },
]

function GoalCard({ goal, isLast = false }: { goal: Goal; isLast?: boolean }) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col items-center w-8 shrink-0">
        <img src="/game-wall/icon-circle-arrow-late.svg" alt="" className="h-8 w-8 object-contain shrink-0" />
        {!isLast && <div className="flex-1" style={{ borderLeft: '2px dashed #67e58c', marginTop: 4, marginBottom: -8 }} />}
      </div>
      <div className="flex-1 flex flex-col gap-2 pb-2 pt-1.5 min-w-0">
        <p className="text-[16px] leading-[22px] text-[#484649]" style={hv(500)}>{goal.title}</p>
        <div className="flex gap-2">
          <div className="bg-[#e5ffef] border border-[#39d667] flex items-center gap-1 px-1 py-0.5 rounded-[4px] shrink-0">
            <img src="/game-wall/icon-money.svg" alt="" className="h-5 w-5 object-contain shrink-0" />
            <span className="text-[14px] leading-5 text-[#484649] whitespace-nowrap" style={hv(700)}>{goal.cash}</span>
          </div>
          {goal.tickets && (
            <div className="bg-[#fffbfe] border border-[#8bbfff] flex items-center gap-1 px-1 py-0.5 rounded-[4px] shrink-0">
              <img src="/game-wall/icon-tickets.svg" alt="" className="h-5 w-5 object-contain shrink-0" />
              <span className="text-[14px] leading-5 text-[#484649] whitespace-nowrap" style={hv(700)}>{goal.tickets}</span>
            </div>
          )}
        </div>
        <p className="text-[12px] leading-4 text-[#313033]" style={hv(400)}>{goal.timing}</p>
      </div>
    </div>
  )
}

export default function GameDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'dojo' | 'missions'>('dojo')
  const [innerTab, setInnerTab] = useState<'leaderboard' | 'activity'>('leaderboard')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('tab') === 'missions') setActiveTab('missions')
  }, [])

  return (
    <div className="flex flex-col w-full max-w-[390px] mx-auto bg-white min-h-screen">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-[#faf2fc] flex items-center justify-between px-4 h-14 shrink-0">
        <h1 className="text-[18px] leading-[27px] text-[#320b4d] whitespace-nowrap" style={pp(600)}>Animals &amp; Coins</h1>
        <div className="flex items-center gap-4">
          {/* Share button */}
          <button className="relative h-6 w-6 flex items-center justify-center">
            <span className="absolute -inset-2.5" />
            <img src="/game-wall/icon-share.svg" alt="Share" className="h-5 w-5 object-contain" />
          </button>
          {/* Close button */}
          <button onClick={() => router.push('/game-wall')} className="relative h-6 w-6 flex items-center justify-center active:opacity-75">
            <span className="absolute -inset-2.5" />
            <img src="/game-wall/icon-close.svg" alt="Close" className="h-5 w-5 object-contain" />
          </button>
        </div>
      </header>

      {/* ── Top tabs — Dojo / Missions ─────────────────────── */}
      <div className="border-y border-[#b86cd9] flex items-center justify-center px-4 py-2 gap-2 shrink-0" style={{ background: 'linear-gradient(to top, #5f1c8c, #430f66)' }}>
        <button
          onClick={() => setActiveTab('dojo')}
          className={`flex-1 flex items-center justify-center gap-2 h-12 min-w-[104px] p-2 rounded-[8px] overflow-hidden transition-colors active:opacity-75 ${activeTab === 'dojo' ? 'bg-[#7629a2] border border-white' : ''}`}
        >
          <img src="/game-wall/icon-dojo-tab.svg" alt="" className="h-4 w-4 object-contain shrink-0" />
          <span className={`text-[16px] leading-[22px] text-center whitespace-nowrap ${activeTab === 'dojo' ? 'text-[#faf2fc]' : 'text-[#f0dff7]'}`} style={hv(activeTab === 'dojo' ? 700 : 400)}>Dojo</span>
        </button>
        <button
          onClick={() => { setActiveTab('missions'); window.scrollTo(0, 0) }}
          className={`flex-1 flex items-center justify-center gap-2 h-12 min-w-[104px] p-2 rounded-[8px] overflow-hidden transition-colors active:opacity-75 ${activeTab === 'missions' ? 'bg-[#7629a2] border border-white' : ''}`}
        >
          <img src="/game-wall/icon-missions-tab.svg" alt="" className="h-3 w-5 object-contain shrink-0" />
          <span className={`text-[16px] leading-[22px] text-center whitespace-nowrap ${activeTab === 'missions' ? 'text-[#faf2fc]' : 'text-[#f0dff7]'}`} style={hv(activeTab === 'missions' ? 700 : 400)}>Missions</span>
        </button>
      </div>

      {/* ── Hero video (Dojo tab only) ─────────── */}
      {activeTab === 'dojo' && (
        <div className="w-full h-[220px] shrink-0 overflow-hidden bg-black">
          <video
            src="/game-wall/animals-coins-trailer.mp4"
            autoPlay muted playsInline loop
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Tab content ───────────────────────────────────── */}
      {activeTab === 'dojo' && (
        <>
          {/* Mission Available */}
          <div className="border-y border-[#b86cd9] px-4 py-6 flex flex-col gap-3" style={{ background: 'linear-gradient(to top, #430f66, #5f1c8c)' }}>

            {/* Title + Description */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                <img src="/game-wall/icon-circle-arrow.svg" alt="" className="h-6 w-6 shrink-0" />
                <h2 className="text-[20px] leading-7 text-white whitespace-nowrap" style={pp(600)}>Mission Available</h2>
              </div>
              <p className="text-[14px] leading-5 text-white whitespace-nowrap" style={hv(400)}>Review goals, rewards, and timing before you start.</p>
            </div>

            {/* Rewards card */}
            <div className="flex flex-col gap-2 items-center px-2 py-3 rounded-[8px] w-full" style={{ background: 'rgba(255,251,254,0.3)' }}>
              <p className="text-[11px] leading-[14px] text-white w-[116px] text-center" style={hv(700)}>MAX TOTAL REWARD</p>
              <div className="flex gap-2 w-full">
                {/* Cash pill */}
                <div className="flex-1 flex items-center justify-center gap-1 h-10 px-[6px] pt-[2px] rounded-[4px] bg-[#e5ffef] border border-[#39d667] min-w-0">
                  <img src="/game-wall/icon-money.svg" alt="" className="h-6 w-6 object-contain shrink-0" />
                  <span className="text-[18px] leading-[26px] text-[#484649] whitespace-nowrap" style={pp(600)}>$340.00</span>
                </div>
                {/* Tickets pill */}
                <div className="flex-1 flex items-center justify-center gap-1 h-10 px-[6px] pt-[2px] rounded-[4px] bg-[#fffbfe] border border-[#8bbfff] min-w-0">
                  <img src="/game-wall/icon-tickets.svg" alt="" className="h-6 w-6 object-contain shrink-0" />
                  <span className="text-[18px] leading-[26px] text-[#484649] whitespace-nowrap" style={pp(600)}>28,895</span>
                </div>
              </div>
            </div>

            {/* View Mission CTA */}
            <button onClick={() => { setActiveTab('missions'); window.scrollTo(0, 0) }} className="w-full bg-[#67e58c] rounded-[100px] flex items-center justify-center gap-2 pl-[13px] pr-[9px] py-3 overflow-hidden active:opacity-75">
              <span className="text-[16px] leading-6 text-[#320b4d]" style={pp(700)}>View Mission</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M7.46 22a1.5 1.5 0 01-1.02-.4C5.85 21.06 5.85 20.12 6.44 19.59L13.98 12 6.44 4.45C5.85 3.91 5.85 2.97 6.44 2.44a1.5 1.5 0 012.01 0l8.57 8.57c.58.54.58 1.48 0 2.02L8.45 21.6A1.5 1.5 0 017.46 22z" fill="#320b4d"/>
              </svg>
            </button>
          </div>

          {/* Dojo Community */}
          <div className="bg-white flex flex-col">

            {/* Section heading */}
            <div className="p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#7629a2] flex items-center justify-center shrink-0">
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M3.6 0C4.3 0 4.95 0.4375 5.325 1.09375C5.675 1.77734 5.675 2.625 5.325 3.28125C4.95 3.96484 4.3 4.375 3.6 4.375C2.875 4.375 2.225 3.96484 1.85 3.28125C1.5 2.625 1.5 1.77734 1.85 1.09375C2.225 0.4375 2.875 0 3.6 0ZM12.8 0C13.5 0 14.15 0.4375 14.525 1.09375C14.875 1.77734 14.875 2.625 14.525 3.28125C14.15 3.96484 13.5 4.375 12.8 4.375C12.075 4.375 11.425 3.96484 11.05 3.28125C10.7 2.625 10.7 1.77734 11.05 1.09375C11.425 0.4375 12.075 0 12.8 0ZM0 8.17578C0 6.5625 1.175 5.25 2.65 5.25H3.725C4.125 5.25 4.5 5.35938 4.85 5.52344C4.8 5.71484 4.8 5.93359 4.8 6.125C4.8 7.19141 5.2 8.12109 5.875 8.75C5.875 8.75 5.875 8.75 5.85 8.75H0.525C0.225 8.75 0 8.50391 0 8.17578ZM10.125 8.75H10.1C10.775 8.12109 11.175 7.19141 11.175 6.125C11.175 5.93359 11.175 5.71484 11.15 5.52344C11.475 5.35938 11.85 5.25 12.25 5.25H13.325C14.8 5.25 16 6.5625 16 8.17578C16 8.50391 15.75 8.75 15.45 8.75H10.125ZM5.6 6.125C5.6 5.19531 6.05 4.34766 6.8 3.85547C7.525 3.39062 8.45 3.39062 9.2 3.85547C9.925 4.34766 10.4 5.19531 10.4 6.125C10.4 7.08203 9.925 7.92969 9.2 8.42188C8.45 8.88672 7.525 8.88672 6.8 8.42188C6.05 7.92969 5.6 7.08203 5.6 6.125ZM3.2 13.2891C3.2 11.2656 4.675 9.625 6.525 9.625H9.45C11.3 9.625 12.8 11.2656 12.8 13.2891C12.8 13.6719 12.5 14 12.125 14H3.85C3.475 14 3.175 13.6992 3.175 13.2891H3.2Z" fill="white" />
                  </svg>
                </div>
                <h3 className="text-[20px] leading-7 text-[#320b4d]" style={pp(600)}>Dojo Community</h3>
              </div>
              <p className="text-[11px] leading-[14px] text-[#484649]">
                <span style={hv(700)}>7-Day Total:</span>
                <span style={hv(400)}> 341 members earned $1,032.80</span>
              </p>
            </div>

            {/* Inner tabs — Leaderboard / Activity */}
            <div className="border-y border-[#f0dff7] px-4 py-2 flex gap-2" style={{ boxShadow: '0 6px 8px -2px rgba(0,0,0,0.1)' }}>
              <button
                onClick={() => setInnerTab('leaderboard')}
                className={`flex-[1_0_0] flex flex-col items-center justify-center gap-2 h-14 min-w-[104px] rounded-[8px] overflow-hidden opacity-90 active:opacity-75 ${innerTab === 'leaderboard' ? 'bg-[#7629a2] p-2' : 'bg-white pl-[13px] pr-[9px] py-3'}`}
              >
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                  <path d="M5.5 0H12.5C13.3125 0 14 0.6875 13.9688 1.53125C13.9375 1.6875 13.9375 1.84375 13.9375 2H17.25C17.6562 2 18 2.34375 18 2.75C18 5.65625 16.9375 7.65625 15.5312 9.03125C14.1562 10.375 12.4688 11.0625 11.2188 11.4062C10.4688 11.5938 9.96875 12.2188 9.96875 12.8438C9.96875 13.4688 10.5 14 11.1562 14H11.9688C12.5312 14 12.9688 14.4688 12.9688 15C12.9688 15.5625 12.5312 16 11.9688 16H5.96875C5.4375 16 4.96875 15.5625 4.96875 15C4.96875 14.4688 5.4375 14 5.96875 14H6.8125C7.4375 14 7.96875 13.4688 7.96875 12.8438C7.96875 12.2188 7.5 11.5938 6.75 11.4062C5.5 11.0625 3.8125 10.375 2.4375 9.03125C1.03125 7.65625 0 5.65625 0 2.75C0 2.34375 0.3125 2 0.75 2H4.03125C4.03125 1.84375 4.03125 1.6875 4 1.53125C3.96875 0.6875 4.65625 0 5.5 0ZM4.15625 3.5H1.5C1.65625 5.59375 2.46875 7 3.46875 7.96875C4.1875 8.65625 5 9.125 5.78125 9.46875C5.0625 8.21875 4.4375 6.34375 4.15625 3.5ZM12.1875 9.46875C12.9688 9.125 13.7812 8.65625 14.5 7.96875C15.5 7 16.3125 5.59375 16.4688 3.5H13.8125C13.5312 6.34375 12.9062 8.21875 12.1875 9.46875ZM9.21875 2.71875C9.125 2.53125 8.84375 2.53125 8.75 2.71875L8.15625 3.9375C8.125 4 8.0625 4.0625 7.96875 4.0625L6.625 4.25C6.4375 4.28125 6.34375 4.53125 6.5 4.6875L7.46875 5.625C7.53125 5.6875 7.5625 5.78125 7.53125 5.84375L7.3125 7.1875C7.28125 7.40625 7.5 7.5625 7.65625 7.4375L8.875 6.8125C8.9375 6.78125 9.03125 6.78125 9.09375 6.8125L10.3125 7.46875C10.5 7.5625 10.6875 7.40625 10.6562 7.1875L10.4375 5.84375C10.4375 5.78125 10.4375 5.6875 10.5 5.625L11.4688 4.6875C11.625 4.5625 11.5312 4.28125 11.3438 4.28125L10 4.0625C9.90625 4.0625 9.84375 4 9.8125 3.9375L9.21875 2.71875Z" fill={innerTab === 'leaderboard' ? 'white' : '#7629a2'} />
                </svg>
                <span className="text-[12px] leading-[16px]" style={{ ...hv(700), color: innerTab === 'leaderboard' ? 'white' : '#7629a2' }}>Leaderboard</span>
              </button>
              <button
                className="flex-[1_0_0] flex flex-col items-center justify-center gap-2 h-14 min-w-[104px] rounded-[8px] overflow-hidden opacity-90 bg-white pl-[13px] pr-[9px] py-3"
              >
                <svg width="18" height="16" viewBox="0 0 16 13" fill="none">
                  <path d="M0.75 0H2.25C2.65625 0 3 0.34375 3 0.75V2.25C3 2.6875 2.65625 3 2.25 3H0.75C0.3125 3 0 2.6875 0 2.25V0.75C0 0.34375 0.3125 0 0.75 0ZM5.5 0.5H14.5C15.0312 0.5 15.5 0.96875 15.5 1.5C15.5 2.0625 15.0312 2.5 14.5 2.5H5.5C4.9375 2.5 4.5 2.0625 4.5 1.5C4.5 0.96875 4.9375 0.5 5.5 0.5ZM5.5 5.5H14.5C15.0312 5.5 15.5 5.96875 15.5 6.5C15.5 7.0625 15.0312 7.5 14.5 7.5H5.5C4.9375 7.5 4.5 7.0625 4.5 6.5C4.5 5.96875 4.9375 5.5 5.5 5.5ZM5.5 10.5H14.5C15.0312 10.5 15.5 10.9688 15.5 11.5C15.5 12.0625 15.0312 12.5 14.5 12.5H5.5C4.9375 12.5 4.5 12.0625 4.5 11.5C4.5 10.9688 4.9375 10.5 5.5 10.5ZM0 5.75C0 5.34375 0.3125 5 0.75 5H2.25C2.65625 5 3 5.34375 3 5.75V7.25C3 7.6875 2.65625 8 2.25 8H0.75C0.3125 8 0 7.6875 0 7.25V5.75ZM0.75 10H2.25C2.65625 10 3 10.3438 3 10.75V12.25C3 12.6875 2.65625 13 2.25 13H0.75C0.3125 13 0 12.6875 0 12.25V10.75C0 10.3438 0.3125 10 0.75 10Z" fill="#7629a2" />
                </svg>
                <span className="text-[12px] leading-[16px]" style={{ ...hv(700), color: '#7629a2' }}>Activity</span>
              </button>
            </div>

            {innerTab === 'leaderboard' && (
              <div className="flex flex-col px-0 pt-4 pb-10 gap-3">

                {/* "Your current rank" divider */}
                <div className="flex items-center gap-2 h-[25px] w-full px-2">
                  <div className="flex-1 h-px bg-[#e0e0e0]" />
                  <span className="text-[12px] leading-[16px] text-[#484649] whitespace-nowrap" style={hv(400)}>Your current rank</span>
                  <div className="flex-1 h-px bg-[#e0e0e0]" />
                </div>

                {/* sneekyninja923 row */}
                <div className="bg-[#e5ffef] flex items-center gap-2 h-16 px-2 rounded-[8px] w-full shrink-0">
                  <div className="h-12 w-12 flex items-center justify-center shrink-0">
                    <img src="/game-wall/avatar-ninja-purple.svg" alt="" className="h-9 w-9 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] leading-[22px] text-black" style={hv(400)}>sneekyninja923</p>
                    <p className="text-[12px] leading-[16px] text-[#7629a2] tracking-[0.4px]" style={hv(400)}>Start playing to see your rank!</p>
                  </div>
                  <button onClick={() => { setActiveTab('missions'); window.scrollTo(0, 0) }} className="bg-[#068823] h-[30px] px-4 rounded-[100px] shrink-0 flex items-center justify-center active:opacity-75">
                    <span className="text-[16px] leading-[22px] text-white" style={hv(500)}>Start</span>
                  </button>
                </div>

                {/* "Value" divider */}
                <div className="flex items-center gap-2 h-[25px] w-full px-2">
                  <div className="flex-1 h-px bg-[#e0e0e0]" />
                  <span className="text-[12px] leading-[16px] text-[#484649] whitespace-nowrap" style={hv(400)}>Top 5</span>
                  <div className="flex-1 h-px bg-[#e0e0e0]" />
                </div>

                {/* Ranked rows — bottom gradient sits in pb-3 padding below the last row */}
                <div className="flex flex-col relative pb-3">
                  {/* Bottom shadow */}
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 h-5 z-10"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.09), transparent)' }} />

                  {LEADERBOARD.map(({ rank, name, city, amount, avatar }) => (
                    <div key={rank} className="flex items-center gap-2 h-16 w-full px-2">
                      <div className="relative h-12 w-12 flex justify-center items-start shrink-0">
                        <img src={`/game-wall/avatar-ninja-${avatar}.svg`} alt="" className="h-9 w-9 object-contain" />
                        <div className="absolute bottom-0 w-full h-4 bg-white border border-[#704b99] rounded-[24px] flex items-center justify-center">
                          <span className="text-[10px] leading-[12px] text-[#320b4d]" style={hv(400)}>{rank}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[16px] leading-[22px] text-black" style={hv(400)}>{name}</p>
                        <p className="text-[12px] leading-[16px] text-[#787579] tracking-[0.4px] uppercase" style={hv(400)}>{city}</p>
                      </div>
                      <div className="bg-[#cafcdc] h-[30px] px-2 rounded-[4px] shrink-0 flex items-center justify-center">
                        <span className="text-[16px] leading-[22px] text-[#086616]" style={hv(500)}>{amount}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show 10 more */}
                <div className="flex justify-center pt-2 px-2">
                  <button className="bg-white border border-[#7629a2] rounded-[100px] opacity-90 w-[176px] py-3 flex items-center justify-center">
                    <span className="text-[16px] leading-[22px] text-[#7629a2]" style={pp(600)}>Show 10 more</span>
                  </button>
                </div>
              </div>
            )}

            {innerTab === 'activity' && (
              <div className="flex items-center justify-center py-12 px-4">
                <p className="text-[14px] text-[#6b7280]" style={hv(400)}>Activity coming soon</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'missions' && (
        <div className="flex flex-col bg-white">

          {/* Stats bar */}
          <div className="bg-white border-b border-[#dcdcdc] flex items-center gap-5 px-4 h-[60px] shrink-0">
            <div className="flex flex-col gap-1 shrink-0">
              <p className="text-[12px] leading-[normal] text-[#7629a2]" style={pp(500)}>Amount</p>
              <p className="text-[16px] leading-[normal] text-[#430f66]" style={pp(600)}>$340</p>
            </div>
            <div className="border-l border-[#f0dff7] flex items-center pl-4 h-[60px] shrink-0">
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[normal] text-[#7629a2]" style={pp(500)}>Category</p>
                <p className="text-[16px] leading-[normal] text-[#430f66]" style={pp(600)}>Adventure</p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-[#faf2fc] p-4 flex flex-col gap-3 shrink-0">
            <p className="text-[18px] leading-[30px] text-[#320b4d]" style={pp(600)}>Key Points</p>
            {([
              'Explore the animal island, steal coins, and build your kingdom to become the ultimate raid master! Start the coin run, unlock new characters, and discover the amazing animal world.',
              'In-app purchases are highly recommended to complete the Levels faster!',
              'You can earn on future challenges even if you miss an earlier challenge!',
            ] as const).map((text, i) => (
              <div key={i} className="flex items-start gap-2 w-full">
                <div className="h-6 w-6 rounded-full bg-[#f0dff7] flex items-center justify-center shrink-0 mt-px">
                  <img src="/game-wall/icon-checkmark.svg" alt="" className="w-[13px] h-[10px]" />
                </div>
                <p className="flex-1 text-[16px] leading-5 text-[#320b4d]" style={hv(400)}>{text}</p>
              </div>
            ))}
            <button onClick={() => router.push('/game-wall/game-detail/app-store')} className="w-full bg-[#0c7a20] rounded-[100px] flex items-center justify-center gap-2 pl-5 pr-[9px] py-3 overflow-hidden active:opacity-75">
              <span className="text-[16px] leading-6 text-white" style={pp(700)}>Start Mission</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="white" />
              </svg>
            </button>
          </div>

          {/* Section Title — purple banner */}
          <div className="bg-[#5f1c8c] p-4 shrink-0">
            <p className="text-[16px] leading-[22px] text-white w-full" style={hv(500)}>Your path to rewards starts here!</p>
          </div>

          {/* Timeline content */}
          <div className="bg-white px-4 pt-4 flex flex-col gap-6">

            {/* Ticket-Blurb */}
            <div className="bg-[#fffbfe] border border-[#8bbfff] rounded-[4px] px-4 py-2 flex flex-col gap-1 w-full">
              <div className="flex items-center gap-1">
                <img src="/game-wall/icon-tickets.svg" alt="" className="h-8 w-8 object-contain shrink-0" />
                <p className="text-[16px] leading-[22px] text-[#320b4d]" style={pp(600)}>Always Something to Win!</p>
              </div>
              <p className="text-[14px] leading-5 text-[#484649]" style={hv(400)}>Finish goals on time to earn kash. Running late? You&apos;ll still score tickets for today&apos;s giveaway. Either way, you win!</p>
            </div>

            {/* Main Mission */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src="/game-wall/icon-timeline.svg" alt="" className="h-6 w-6 object-contain shrink-0" />
                  <p className="text-[16px] leading-[26px] text-[#320b4d]" style={pp(600)}>Timeline</p>
                </div>
                <div className="h-px bg-[#e0e0e0] w-full" />
                <p className="text-[14px] leading-5 text-[#484649]" style={hv(400)}>Start your challenge and get going while tracking your goals in the main timeline.</p>
              </div>
              {/* First Step */}
              <div className="flex gap-2">
                <div className="flex flex-col items-center w-8 shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M26.8332 15.9743C26.8332 12.1201 24.7498 8.57845 21.4165 6.59928C18.0311 4.6722 13.9165 4.6722 10.5832 6.59928C7.19775 8.57845 5.1665 12.1201 5.1665 15.9743C5.1665 19.8805 7.19775 23.4222 10.5832 25.4014C13.9165 27.3284 18.0311 27.3284 21.4165 25.4014C24.7498 23.4222 26.8332 19.8805 26.8332 15.9743ZM2.6665 15.9743C2.6665 11.2347 5.1665 6.8597 9.33317 4.46387C13.4478 2.06803 18.4998 2.06803 22.6665 4.46387C26.7811 6.8597 29.3332 11.2347 29.3332 15.9743C29.3332 20.7659 26.7811 25.1409 22.6665 27.5368C18.4998 29.9326 13.4478 29.9326 9.33317 27.5368C5.1665 25.1409 2.6665 20.7659 2.6665 15.9743Z" fill="#67E58C"/>
                    <g transform="scale(1.3333)">
                      <path d="M13.2891 16.082C12.8984 16.4727 12.3125 16.4727 11.9609 16.082C11.5703 15.7305 11.5703 15.1445 11.9609 14.7539L13.7969 12.918H7.9375C7.39062 12.918 7 12.5273 7 11.9805C7 11.4727 7.39062 11.043 7.9375 11.043H13.7969L11.9609 9.20703C11.5703 8.85547 11.5703 8.26953 11.9609 7.91797C12.3125 7.52734 12.8984 7.52734 13.2891 7.91797L16.7266 11.3555C17.0781 11.707 17.0781 12.293 16.7266 12.6445L13.2891 16.082Z" fill="#67E58C"/>
                    </g>
                  </svg>
                  <div className="flex-1" style={{ borderLeft: '2px dashed #67e58c', marginTop: 4, marginBottom: -8 }} />
                </div>
                <div className="flex-1 pt-1.5 pb-5">
                  <p className="text-[16px] leading-[22px] text-[#484649]" style={hv(500)}>Get Started - Download the App!</p>
                </div>
              </div>
              {MAIN_GOALS.map((goal, i) => (
                <GoalCard key={i} goal={goal} isLast={i === MAIN_GOALS.length - 1} />
              ))}
            </div>

            {/* Turbo Earnings */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src="/game-wall/icon-turbo.svg" alt="" className="h-6 w-6 object-contain shrink-0" />
                  <p className="text-[16px] leading-[26px] text-[#320b4d]" style={pp(600)}>Turbo Earnings</p>
                </div>
                <div className="h-px bg-[#e0e0e0] w-full" />
                <p className="text-[14px] leading-5 text-[#484649]" style={hv(400)}>Conquer these advanced challenges for bigger, faster rewards!</p>
              </div>
              {TURBO_GOALS.map((goal, i) => (
                <GoalCard key={i} goal={goal} isLast={true} />
              ))}
            </div>

            {/* Bonus Goals */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src="/game-wall/icon-bonus.svg" alt="" className="h-6 w-6 object-contain shrink-0" />
                  <p className="text-[16px] leading-[26px] text-[#320b4d]" style={pp(600)}>Bonus Goals</p>
                </div>
                <div className="h-px bg-[#e0e0e0] w-full" />
                <p className="text-[14px] leading-5 text-[#484649]" style={hv(400)}>Complete bonus tasks to take your earnings to the next level!</p>
              </div>
              {BONUS_GOALS.map((goal, i) => (
                <GoalCard key={i} goal={goal} isLast={true} />
              ))}
            </div>

          </div>

          {/* Rewards */}
          <div className="border-b border-[#939094] flex flex-col items-center mt-6">
            <div className="bg-white flex flex-col gap-4 items-center px-4 w-full pb-0">
              <div className="bg-[#fffbfe] border border-[#e6e1e5] rounded-[8px] flex flex-col gap-2 items-center px-2 py-3 w-full">
                <p className="text-[11px] leading-[14px] text-[#320b4d] whitespace-nowrap" style={hv(700)}>MAX TOTAL REWARD</p>
                <div className="flex gap-2 w-full">
                  <div className="flex-1 flex items-center justify-center gap-1 h-10 px-[6px] pt-[2px] rounded-[4px] bg-[#e5ffef] border border-[#39d667] min-w-0">
                    <img src="/game-wall/icon-money.svg" alt="" className="h-6 w-6 object-contain shrink-0" />
                    <span className="text-[18px] leading-[26px] text-[#484649] whitespace-nowrap" style={pp(600)}>$350</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 h-10 px-[6px] pt-[2px] rounded-[4px] bg-[#fffbfe] border border-[#8bbfff] min-w-0">
                    <img src="/game-wall/icon-tickets.svg" alt="" className="h-6 w-6 object-contain shrink-0" />
                    <span className="text-[18px] leading-[26px] text-[#484649] whitespace-nowrap" style={pp(600)}>35,000</span>
                  </div>
                </div>
              </div>
              <button onClick={() => router.push('/game-wall/game-detail/app-store')} className="w-full bg-[#0c7a20] rounded-[100px] flex items-center justify-center gap-2 pl-5 pr-[9px] py-3 overflow-hidden active:opacity-75">
                <span className="text-[16px] leading-6 text-white" style={pp(700)}>Start Mission</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="white" />
                </svg>
              </button>
            </div>
            <img src="/game-wall/icon-coins.svg" alt="" className="w-full h-20 object-cover shrink-0" />
          </div>

          {/* Rules */}
          <div className="bg-white p-4 flex flex-col gap-4 pb-10">
            <p className="text-[18px] leading-[30px] text-[#320b4d]" style={pp(600)}>Details</p>
            <p className="text-[16px] leading-5 text-[#200433]" style={hv(400)}>Conquer exotic islands, steal coins from other players and prove yourself as the real coin master. Blend slot-style spinning with simple strategy and world building. With in-app purchases and game milestones, you&apos;ll unlock Turbo Earnings, hundreds of dollars in added rewards!</p>
          </div>

        </div>
      )}
    </div>
  )
}
