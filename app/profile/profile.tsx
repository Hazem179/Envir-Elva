"use client"

import { motion } from "framer-motion"
import { Edit, Award, Flame, ShieldCheck, Leaf, LogOut } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="character-hero"
        >
          <div className="character-hero-content">
            <div className="character-avatar-wrapper">
              <div className="character-avatar animate-float">
                <img src="/Envir.png" alt="Avatar" />
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="character-speech-bubble">
                <p className="character-speech-text">Hi Eco-Hero! Let’s keep your profile shiny and strong! ✨</p>
              </div>

              <div className="character-stats">
                <div className="stat-badge stat-badge--green">
                  <Award className="stat-icon" />
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>Badges</div>
                    <div className="stat-value">12</div>
                  </div>
                </div>
                <div className="stat-badge stat-badge--teal">
                  <Flame className="stat-icon" />
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>Streak</div>
                    <div className="stat-value">7 days</div>
                  </div>
                </div>
                <div className="stat-badge stat-badge--rust">
                  <ShieldCheck className="stat-icon" />
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>Level</div>
                    <div className="stat-value">5</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="#edit"
                className="adventure-start-btn"
                style={{ backgroundColor: "#03aabd", textDecoration: "none", display: "inline-block", width: "auto" }}
              >
                <Edit size={18} style={{ marginRight: 8 }} /> Edit Profile
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="quest-card">
            <div className="quest-header">
              <div className="quest-icon-wrapper"><Leaf /></div>
              <div>
                <div className="quest-title">Your Goals</div>
                <div className="quest-description">Pick fun eco-goals you want to achieve!</div>
              </div>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#334155", fontWeight: 600 }}>
              <li>Plant 3 seeds this week</li>
              <li>Recycle 5 items</li>
              <li>Save 2 liters of water</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="quest-card">
            <div className="quest-header">
              <div className="quest-icon-wrapper" style={{ background: "#3ab308" }}><Award /></div>
              <div>
                <div className="quest-title">Recent Badges</div>
                <div className="quest-description">You’re collecting sparkly wins! ⭐</div>
              </div>
            </div>
            <div className="badges-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="badge-item unlocked" style={{ color: i % 2 ? "#03aabd" : "#3ab308" }}>
                  <div className="badge-icon-wrapper"><Award className="badge-icon" /></div>
                  <div className="badge-name">Eco Star</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="quest-card">
            <div className="quest-header">
              <div className="quest-icon-wrapper" style={{ background: "#a54438" }}><LogOut /></div>
              <div>
                <div className="quest-title">Account</div>
                <div className="quest-description">Manage your account and safety</div>
              </div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Link href="/" className="adventure-start-btn" style={{ backgroundColor: "#a54438", textAlign: "center", textDecoration: "none" }}>Sign Out</Link>
              <Link href="#delete" className="adventure-start-btn" style={{ backgroundColor: "#ef4444", textAlign: "center", textDecoration: "none" }}>Delete Account</Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}





