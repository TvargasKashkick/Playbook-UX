'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const pp = (weight: 400 | 500 | 600 | 700): React.CSSProperties => ({
  fontFamily: 'var(--font-poppins), sans-serif',
  fontWeight: weight,
})

const hv = (weight: 400 | 500 | 700): React.CSSProperties => ({
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontWeight: weight,
})

export default function GameplayPage() {
  const router = useRouter()
  const [buttonsVisible, setBtnsVisible] = useState(false)

  // Back/Continue appear after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setBtnsVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        width: 'min(100vw, 390px)',
        height: '100dvh',
        overflow: 'hidden',
        background: '#000',
      }}>
        <video
          src="/game-wall/animals-coins-gameplay.mp4"
          autoPlay muted playsInline loop
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* *Simulated Game Play — top-right */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: '#f0dff7', padding: 8, borderBottomLeftRadius: 4,
          borderBottom: '1px dashed #320b4d',
          borderLeft: '1px dashed #320b4d',
        }}>
          <span style={{ ...hv(700), fontSize: 11, lineHeight: '14px', color: '#320b4d', whiteSpace: 'nowrap' }}>
            *Simulated Game Play
          </span>
        </div>

        {/* Back — bottom-left */}
        <button
          onClick={() => router.push('/game-wall/game-detail/app-store')}
          className="active:opacity-75"
          style={{
            position: 'absolute', bottom: 0, left: 0,
            background: '#7629a2', padding: 8, borderTopRightRadius: 4,
            display: 'flex', alignItems: 'center', gap: 8,
            border: 'none', cursor: 'pointer',
            boxShadow: '0px 4px 2px rgba(0,0,0,0.25)',
            opacity: buttonsVisible ? 1 : 0, transition: 'opacity 0.4s ease',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ ...pp(600), fontSize: 16, lineHeight: '22px', color: 'white', whiteSpace: 'nowrap' }}>Back</span>
        </button>

        {/* Continue — bottom-right */}
        <button
          onClick={() => router.push('/game-wall?downloaded=true')}
          className="active:opacity-75"
          style={{
            position: 'absolute', bottom: 0, right: 0,
            background: '#7629a2', padding: 8, borderTopLeftRadius: 4,
            display: 'flex', alignItems: 'center', gap: 8,
            border: 'none', cursor: 'pointer',
            boxShadow: '0px 4px 2px rgba(0,0,0,0.25)',
            opacity: buttonsVisible ? 1 : 0, transition: 'opacity 0.4s ease',
          }}
        >
          <span style={{ ...pp(600), fontSize: 16, lineHeight: '22px', color: 'white', whiteSpace: 'nowrap' }}>Continue</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
