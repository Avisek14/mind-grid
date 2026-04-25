import { motion } from 'framer-motion'

const Footer = () => {
  const socials = [
    {
      label: 'GitHub',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/Avisek14',
      color: '#a855f7',
      glow: 'rgba(168,85,247,0.4)',
    },
    {
      label: 'LinkedIn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://www.linkedin.com/in/avisek-sahoo-907186341/',
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.4)',
    },
    {
      label: 'Instagram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
      url: 'https://www.instagram.com/ram_devotee_avi?igsh=dG94NGUxd3NuaGw2',
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.4)',
    },
    {
      label: 'Email',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        </svg>
      ),
      url: 'mailto:sahoo143avisek@gmail.com',
      color: '#22c55e',
      glow: 'rgba(34,197,94,0.4)',
    },
    {
      label: 'Portfolio',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      url: 'https://avisek14.github.io/Avisek-portfolio/',
      color: '#06b6d4',
      glow: 'rgba(6,182,212,0.4)',
    },
  ]

  return (
    // ✅ FIX 1 — width: 100% add kiya
    <footer style={{
      position: 'relative',
      width: '100%',
      background: 'rgba(5, 5, 10, 0.95)',
      borderTop: '1px solid rgba(124,58,237,0.3)',
      padding: '48px 20px 32px',
      overflow: 'hidden',
    }}>

      {/* Background grid */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: `
          linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Glowing top border line */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%',
        width: '80%', height: '1px',
        background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, #06b6d4, transparent)',
        filter: 'blur(1px)',
      }} />

      {/* ✅ FIX 2 — maxWidth: 100% kiya */}
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Top section — Name + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          <div style={{
            fontFamily: 'var(--font-game)',
            fontSize: 'clamp(18px, 4vw, 26px)',
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '4px',
            marginBottom: '8px',
            filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.5))',
          }}>
            🧠 MINDGRID
          </div>
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '8px',
            color: 'rgba(180,180,220,0.8)',
            letterSpacing: '3px',
          }}>
            MEMORY & LOGIC CHALLENGE
          </p>
        </motion.div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)',
          marginBottom: '36px',
        }} />

        {/* Developer section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '8px',
            color: 'rgba(180,180,220,0.8)',
            letterSpacing: '3px',
            marginBottom: '12px',
          }}>
            — DEVELOPER —
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '50px',
            padding: '10px 24px',
          }}>
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}>
              👨‍💻
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-game)',
                fontSize: '12px',
                color: '#e2e2ff',
                letterSpacing: '2px',
              }}>
                AVISEK SAHOO
              </div>
              <div style={{
                fontFamily: 'var(--font-game)',
                fontSize: '7px',
                color: 'var(--purple-secondary)',
                letterSpacing: '1px',
              }}>
                FULL STACK DEVELOPER
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          <motion.a
            href="https://avisek14.github.io/Avisek-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(6,182,212,0.5)',
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
              border: '1px solid rgba(6,182,212,0.5)',
              borderRadius: '10px',
              padding: '12px 28px',
              textDecoration: 'none',
              fontFamily: 'var(--font-game)',
              fontSize: '9px',
              color: 'var(--cyan-accent)',
              letterSpacing: '2px',
            }}
          >
            🌐 VIEW MY PORTFOLIO
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 3v2H7v14h14v-7h2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7zm7 0v6h-2V6.414l-8.293 8.293-1.414-1.414L17.586 5H15V3h6z"/>
            </svg>
          </motion.a>
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '7px',
            color: 'rgba(180,180,220,0.7)',
            marginTop: '8px',
            letterSpacing: '1px',
          }}>
            KNOW MORE ABOUT THE DEVELOPER
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.15,
                y: -4,
                boxShadow: `0 0 20px ${social.glow}`,
              }}
              whileTap={{ scale: 0.95 }}
              title={social.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '14px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: social.color,
                minWidth: '70px',
              }}
            >
              {social.icon}
              <span style={{
                fontFamily: 'var(--font-game)',
                fontSize: '6px',
                letterSpacing: '1px',
                color: 'rgba(200,200,230,0.8)',
              }}>
                {social.label.toUpperCase()}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)',
          marginBottom: '24px',
        }} />

        {/* Bottom — Made with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <motion.p
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-game)',
              fontSize: '8px',
              color: 'rgba(180,180,220,0.9)',
              letterSpacing: '2px',
              lineHeight: 2,
            }}
          >
            MADE WITH{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ display: 'inline-block', color: '#ef4444' }}
            >
              ❤️
            </motion.span>
            {' '}BY{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              AVISEK SAHOO
            </span>
            {' '}© 2026
          </motion.p>
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '7px',
            color: 'rgba(150,150,180,0.6)',
            letterSpacing: '2px',
            marginTop: '4px',
          }}>
            ALL RIGHTS RESERVED
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer