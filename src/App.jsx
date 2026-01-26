import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      {/* основной контент */}
      <main style={{ flex: 1, padding: '20px' }}>
        <p>Основной контент страницы</p>
      </main>

      <Footer />
    </div>
  )
}

export default App
