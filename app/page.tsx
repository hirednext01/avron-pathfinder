'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            Avron Career Intelligence
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9 }}>
            Your AI-powered career development platform
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <FeatureCard
            title="Job Matching"
            description="Find jobs that match your skills and experience"
            href="/jobs"
            icon="💼"
          />
          <FeatureCard
            title="ROI Calculator"
            description="Calculate the return on your career investments"
            href="/roi"
            icon="📊"
          />
          <FeatureCard
            title="Skills Assessment"
            description="Evaluate and track your professional skills"
            href="/skills"
            icon="🎯"
          />
          <FeatureCard
            title="Find Mentors"
            description="Connect with experienced professionals"
            href="/mentors"
            icon="👥"
          />
          <FeatureCard
            title="Course Recommendations"
            description="Discover courses to advance your career"
            href="/courses"
            icon="📚"
          />
          <FeatureCard
            title="Dashboard"
            description="View your career development progress"
            href="/dashboard"
            icon="📈"
          />
        </div>

        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '32px',
          marginTop: '40px'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
            Ready to accelerate your career?
          </h2>
          <Link 
            href="/login"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#667eea',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none',
              transition: 'transform 0.2s'
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, href, icon }: {
  title: string
  description: string
  href: string
  icon: string
}) {
  return (
    <Link 
      href={href}
      style={{
        display: 'block',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '12px',
        padding: '24px',
        textDecoration: 'none',
        color: 'white',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', opacity: 0.9 }}>
        {description}
      </p>
    </Link>
  )
}