import React, { useState, useRef, useEffect, useContext } from 'react'
import { ArrowUp, CircleChevronLeft, CircleChevronRight, MoveUp, PanelLeftClose, PanelRight, PanelRightClose } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Details from './Details'

// Create a context to communicate with Chatbox (if not already present)
export const ChatboxInputContext = React.createContext({
  setChatboxInput: () => {},
})

const sidebarVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } }
}

const FinAI = ({ open = true, setOpen, inputFromChatbox }) => {
  const [selectedTab, setSelectedTab] = useState('copilot')
  const [messages, setMessages] = useState([]) // <-- No initial message!
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggested, setShowSuggested] = useState(true)
  const messagesEndRef = useRef(null)

  // Get the setChatboxInput function from context
  const { setChatboxInput } = useContext(ChatboxInputContext)

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  // Replace this with your real backend or OpenAI API call
  const fetchBotReply = async (userMessage) => {
    // Example: Call OpenAI API or your backend here
    // For demo, just echo the message with a prefix
    // You can use fetch or axios to call your backend
    // Example:
    // const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: userMessage }) })
    // const data = await response.json()
    // return data.reply

    // Simulate delay and response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a sample AI response. (Integrate with OpenAI or your backend here.)")
      }, 1200)
    })
  }

  const sendMessage = async (e, overrideInput) => {
    if (e) e.preventDefault();
    const messageToSend = overrideInput !== undefined ? overrideInput : input;
    if (!messageToSend.trim()) return;
    const userMsg = { text: messageToSend, fromUser: true, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const botReply = await fetchBotReply(messageToSend);
    setMessages(prev => [
      ...prev,
      {
        text: botReply,
        fromUser: false,
        time: new Date()
      }
    ]);
    setLoading(false);
  };

  const handleSuggestedClick = async () => {
    const suggested = "How do i get a refund?";
    setInput(suggested);
    setShowSuggested(false);
    await sendMessage(null, suggested);
  };

  useEffect(() => {
    if (inputFromChatbox) {
      setInput(inputFromChatbox);
      // Optionally clear the prop in parent after use
    }
  }, [inputFromChatbox]);

  return (
    <>
      {/* Floating button at bottom-right */}
    {!open && (
      <div className="fixed top-2 right-1 z-50">
        <button
          className="cursor-pointer rounded-full p-3 transition"
          title={open ? "Close AI Copilot" : "Open AI Copilot"}
          onClick={() => setOpen(!open)}
        >
            <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>
    )}

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="finai-sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="fixed right-0 top-0 h-screen w-full md:w-[28%] min-w-[260px] bg-gray-100 dark:bg-gray-900 z-40 flex flex-col"
          >
            <div className="relative flex w-full border-b-1 border-gray-300 dark:border-gray-700 space-x-5 h-[8%] p-2 items-center justify-start">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedTab('copilot')}
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className='w-4 h-4'>
                    <rect width="100" height="100" rx="15" fill="rgba(98, 98, 198, 1)" />
                    <g fill="white">
                      <rect x="30" y="25" width="5" height="30" rx="2.5" />
                      <rect x="46" y="18" width="5" height="45" rx="2.5" />
                      <rect x="62" y="25" width="5" height="30" rx="2.5" />
                      <path d="M25,65c15,15 35,15 50,0" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
                    </g>
                  </svg>
                  <h2 className='bg-clip-text text-transparent text-sm font-medium bg-gradient-to-r from-blue-600 to-rose-400'>AI Copilot</h2>
                </div>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedTab('details')}
              >
                <div className="flex items-center space-x-2">
                  <h2 className={`text-sm ${selectedTab === 'details' ? 'font-medium' : 'text-gray-400'}`}>Details</h2>
                </div>
              </div>
              <span
                className={`absolute bottom-0 transition-all duration-200 h-[3px] rounded bg-[rgba(98,98,198,1)]`}
                style={{
                  left: selectedTab === 'copilot' ? '0%' : '120px',
                  width: selectedTab === 'copilot' ? '110px' : '45px',
                }}
              ></span>
              <div className="absolute right-2 top-2">
                <button
                    className="cursor-pointer p-2 transition"
                    title="Close AI Copilot"
                    onClick={() => setOpen(false)}
                >
                    <PanelRightClose className="w-5 h-5" />
                </button>
                </div>

              {/* Close button */}
                {!open && (
                <div className="fixed bottom-6 right-2 z-50 p-2">
                    <button
                    className="bg-white cursor-pointer shadow-lg rounded-full hover:bg-gray-200 transition"
                    title="Open AI Copilot"
                    onClick={() => setOpen(true)}
                    >
                    <PanelLeftClose className="w-3 h-3" />
                    </button>
                </div>
                )}

            </div>
            {/* Tab content */}
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 p-2 overflow-y-auto bg-gradient-to-t from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {selectedTab === 'copilot' && (
                <div className="flex flex-col h-full w-full">
                  <div className={`flex-1 overflow-y-auto mb-2 flex flex-col ${
                    messages.length === 0 && !loading
                      ? "items-center justify-center"
                      : "items-stretch justify-start"
                  }`}>
                    {messages.length === 0 && !loading ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">Hey, I'm FinAI Copilot</h2>
                        <p className="text-sm text-gray-500 text-center">Ask me anything about this conversation</p>
                      </div>
                    ) : (
                      <>
                        {messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`mb-2 w-full flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`px-4 py-2 text-xs rounded-lg max-w-[80%] ${
                              msg.fromUser
                                ? 'bg-blue-300 dark:bg-blue-700 text-black dark:text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                            }`}>
                              <div className="flex flex-col gap-2">
                                <span>{msg.text}</span>
                                {/* Show "Add to composer" button for AI responses only */}
                                {!msg.fromUser && idx === messages.length - 1 && (
                                  <button
                                    className="mt-2 cursor-pointer px-2 py-1 text-xs bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-400 rounded transition"
                                    onClick={() => setChatboxInput(msg.text)}
                                  >
                                    Add to composer
                                  </button>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 dark:text-gray-300">
                                <span>{msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {loading && (
                      <div className="mb-2 flex justify-start">
                        <div className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-400 dark:text-gray-600 max-w-[80%]">
                          Fin AI is typing...
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <AnimatePresence>
                    {showSuggested && (
                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center w-fit p-2 hover:text-indigo-500 transition-all hover:cursor-pointer hover:bg-gradient-to-tr from-indigo-300 to-white bg-white justify-between mb-2 rounded-xl"
                      >
                        <button
                          className='cursor-pointer dark:text-gray-700 dark:hover:text-indigo-500 text-xs font-medium'
                          type="button"
                          onClick={handleSuggestedClick}
                          disabled={loading}
                        >
                          Suggested 💸 
                          <span className='dark:hover:text-indigo-500 dark:text-gray-700'>How do i get a refund?</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <form onSubmit={sendMessage} className="flex rounded-xl bg-white items-center gap-2 mt-auto">
                    <input
                      type="text"
                      className="flex-1 rounded text-sm dark:text-gray-900 px-2 outline-none"
                      placeholder="Ask a question..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={`cursor-pointer transition rounded-xl m-2
                        ${input.trim() 
                        ? "bg-black text-gray-300 p-2 rounded-xl" 
                        : "text-gray-500 p-2"}`}
                      disabled={!input.trim()}
                    >
                      <ArrowUp className='w-4 h-4' />
                    </button>
                  </form>
                </div>
              )}
              {selectedTab === 'details' && (
                <div>
                  <Details />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FinAI