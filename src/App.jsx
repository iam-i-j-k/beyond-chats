import React, { useState } from 'react'
import Inbox from './components/Inbox'
import Chatbox from './components/Chatbox'
import FinAI, { ChatboxInputContext } from './components/FinAI'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [readChats, setReadChats] = useState([])
  const [finAiOpen, setFinAiOpen] = useState(true) // Track FinAI sidebar open/close
  const [chatboxInput, setChatboxInput] = useState('')

  // When a user is selected, mark as read
  const handleSelectUser = (user) => {
    setSelectedUser(user)
    setReadChats((prev) =>
      prev.includes(user.id) ? prev : [...prev, user.id]
    )
  }

  return (
    <ChatboxInputContext.Provider value={{ chatboxInput, setChatboxInput }}>
      <div className=''>
        <div className="flex w-full h-screen">
          <Inbox
            open={sidebarOpen}
            setOpen={setSidebarOpen}
            selectedUser={selectedUser}
            setSelectedUser={handleSelectUser}
            readChats={readChats}
          />
          <div
            className={`transition-all duration-300 ${
              sidebarOpen
                ? finAiOpen
                  ? 'ml-[22%] w-[60%]' // Inbox 22% + Chatbox 43% + FinAI 35% = 100%
                  : 'ml-[22%] w-[78%]' // Inbox 22% + Chatbox 78% (FinAI closed)
                : finAiOpen
                  ? 'ml-0 w-[85%]'    // No Inbox, Chatbox 65%, FinAI 35%
                  : 'ml-0 w-full'     // No Inbox, Chatbox 100% (FinAI closed)
            }`}
          >
            <Chatbox
              user={selectedUser}
              sidebarOpen={sidebarOpen}
              onClose={() => setSelectedUser(null)}
            />
          </div>
          <div className={finAiOpen ? 'w-[33%]' : 'w-0'}>
            <FinAI open={finAiOpen} setOpen={setFinAiOpen} />
          </div>
        </div>
      </div>
    </ChatboxInputContext.Provider>
  )
}

export default App