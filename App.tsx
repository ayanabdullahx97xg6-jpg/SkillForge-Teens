import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <div className="min-h-screen bg-[#0b0d14] text-white">
      <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <div className="text-xl font-bold tracking-widest text-cyan-400">
          SKILLFORGE <span className="text-white">&lt;TEENS/&gt;</span>
        </div>
        <div>
          <Show when="signed-out">
            <div className="flex gap-4 items-center">
              {/* Clerk ka asal SignInButton */}
              <SignInButton mode="modal">
                <button className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer hover:bg-cyan-500/20 transition">
                  Sign In
                </button>
              </SignInButton>

              {/* Clerk ka asal SignUpButton */}
              <SignUpButton mode="modal">
                <button className="bg-cyan-400 text-black px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer hover:bg-cyan-300 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </Show>
          
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>
      
      <main className="p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SkillForge Teens</h1>
        <p className="text-gray-400">Sign in above to manage your courses and track your progress!</p>
      </main>
    </div>
  )
}

export default App
