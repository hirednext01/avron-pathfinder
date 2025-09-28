export default function Home() {
  return (
    <div style={{ padding: '50px', background: 'linear-gradient(to right, blue, purple)', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '48px' }}>Avron Career Intelligence Platform</h1>
      <p style={{ fontSize: '24px' }}>Welcome! Your app is working.</p>
      <div style={{ marginTop: '40px' }}>
        <a href="/jobs" style={{ marginRight: '20px', color: 'white' }}>Jobs</a>
        <a href="/roi" style={{ marginRight: '20px', color: 'white' }}>ROI Calculator</a>
        <a href="/skills" style={{ marginRight: '20px', color: 'white' }}>Skills</a>
        <a href="/mentors" style={{ marginRight: '20px', color: 'white' }}>Mentors</a>
        <a href="/courses" style={{ color: 'white' }}>Courses</a>
      </div>
    </div>
  )
}