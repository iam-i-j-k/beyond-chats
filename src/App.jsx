import React, { useState } from 'react'
import Inbox from './components/Inbox'
import Chatbox from './components/Chatbox'
import FinAI, { ChatboxInputContext } from './components/FinAI'
import ThemeToggle from './components/ThemeToggle'
import { motion } from "framer-motion";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [readChats, setReadChats] = useState([])
  const [finAiOpen, setFinAiOpen] = useState(true)
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
      <div className="relative transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row w-full h-screen bg-gray-50 dark:bg-gray-800">
          <Inbox
            open={sidebarOpen}
            setOpen={setSidebarOpen}
            selectedUser={selectedUser}
            setSelectedUser={handleSelectUser}
            readChats={readChats}
            finAiOpen={finAiOpen} // <-- add this line
          />
          <div
            className={`transition-all duration-300 ${
              sidebarOpen
                ? finAiOpen
                  ? 'md:ml-[22%] md:w-[60%] ml-0 w-full'
                  : 'md:ml-[22%] md:w-[78%] ml-0 w-full'
                : finAiOpen
                  ? 'md:ml-[4%] md:w-[81%] ml-0 w-full'
                  : 'md:ml-[4%] md:w-[96%] ml-0 w-full'
            }`}
          >
            <Chatbox
              user={selectedUser}
              sidebarOpen={sidebarOpen}
              onClose={() => setSelectedUser(null)}
            />
          </div>
          <div className={finAiOpen ? 'md:w-[33%] w-full' : 'md:w-[4%] w-12'}>
            <FinAI open={finAiOpen} setOpen={setFinAiOpen} sidebarOpen={sidebarOpen} />
          </div>
          <motion.div
            animate={{
              top: finAiOpen ? 8 : 64, // px values for top-2 and top-16
              right: finAiOpen ? 64 : 8, // px values for right-16 and right-2
              position: "fixed",
              zIndex: 50,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ position: "fixed" }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </ChatboxInputContext.Provider>
  )
}

export default App