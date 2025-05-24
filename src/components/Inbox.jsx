import React, { useState } from 'react'
import { ChevronDown, ClockFading, CircleChevronLeft, CircleChevronRight, Ticket, CornerUpLeft, ArrowDownNarrowWide, ArrowDownWideNarrow, PanelRightClose, PanelLeftClose } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable';

const Users = [
  {
    id: 1,
    name: "Luis Easton",
    title: "Luis•Github",
    logo: "L",
    description: "Hey! I have a questio...",
    time: "45m",
    notification: "",
    bg: "bg-blue-500",
    subtitle: "" // Added
  },
  {
    id: 2,
    title: "Ivan•Nike",
    description: "Hi there! I have a qu...",
    logo: "I",
    time: "30m",
    notification: "3min",
    bg: "bg-green-700",
    subtitle: "" // Added
  },
  {
    id: 3,
    title: "Lead from New York",
    logo: "L",
    description: "Good morning, let me...",
    time: "40m",
    notification: "",
    subtitle: "" // Added
  },
  {
    id: 4,
    title: "Booking API problems",
    subtitle: "Bug report",
    photo: <Ticket />,
    logo: "B",
    description: "Luis•Small Crafts",
    time: "45m",
    notification: "",
    bg: "bg-black",
  },
  {
    id: 5,
    title: "Miracle•Exemptary Bank",
    photo: <CornerUpLeft />,
    logo: "M",
    description: "Hey there, I'm here to...",
    time: "45m",
    notification: "",
    subtitle: "",
    bg: "bg-gray-400"
  }
]

const sidebarVariants = {
  hidden: { x: -400, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -400, opacity: 0 }
}

function parseTime(timeStr) {
  // Supports "45m", "3h", "2d", etc.
  if (!timeStr) return 0
  const match = timeStr.match(/^(\d+)([mhd])$/)
  if (!match) return 0
  const value = parseInt(match[1], 10)
  const unit = match[2]
  if (unit === 'm') return value
  if (unit === 'h') return value * 60
  if (unit === 'd') return value * 60 * 24
  return value
}

const Inbox = ({ open, setOpen, selectedUser, setSelectedUser, readChats }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [sortAsc, setSortAsc] = useState(true)

  // Sort users by time (ascending or descending)
  const sortedUsers = [...Users].sort((a, b) => {
    const tA = parseTime(a.time)
    const tB = parseTime(b.time)
    return sortAsc ? tA - tB : tB - tA
  })

  const handlers = useSwipeable({
    onSwipedLeft: () => open && setOpen(false),   // Swipe left to close
    onSwipedRight: () => !open && setOpen(true),  // Swipe right to open
    delta: 50, // Minimum distance(px) before a swipe is detected
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="inbox-sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`fixed left-0 top-0 z-40 h-screen flex flex-col
              bg-white dark:bg-gray-800
              transition-all duration-300
              w-full md:w-[22%] max-w-full
              overflow-y-auto
            `}
            {...handlers}
          >
            <div className='h-[8%] p-2 border-b-1 border-gray-300 dark:border-gray-700 flex items-center justify-between'>
              <h1 className='text-md sm:text-lg md:text-xl font-medium tracking-tight text-gray-900 dark:text-gray-100'>
                Your inbox
              </h1>
              <button
                className="cursor-pointer p-2 transition ml-2"
                title="Close Inbox"
                onClick={() => setOpen(false)}
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>
            <div className='flex items-center justify-between px-2'>
              <div>
                <button
                  className='flex cursor-pointer items-center pointer'
                  onClick={() => setCollapsed((prev) => !prev)}
                >
                  <h2 className='p-1 text-xs font-base tracking-tight'>
                    {Users.length} Open
                  </h2>
                  <ChevronDown className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div>
                <button
                  className='flex cursor-pointer items-center'
                  onClick={() => setSortAsc((prev) => !prev)}
                  title="Sort by waiting time"
                >
                  <h2 className='p-2 text-xs font-base tracking-tight'>
                    Waiting longest
                  </h2>
                  {sortAsc ? (
                    <ArrowDownNarrowWide className="w-4 h-4 transition-transform" />
                  ) : (
                    <ArrowDownWideNarrow className="w-4 h-4 transition-transform" />
                  )}
                </button>
              </div>
            </div>
            <div className='flex flex-col items-center justify-between'>
              <div className='flex flex-col items-center justify-between w-full'>
                <AnimatePresence>
                  {!collapsed && sortedUsers.map(user => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`flex cursor-pointer items-start justify-between w-full p-3 rounded
                        hover:bg-gray-300 dark:hover:bg-gray-700
                        ${selectedUser && selectedUser.id === user.id ? 'bg-blue-100 dark:bg-gray-700' : ''}
                      `}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-start">
                        <div
                          className={`mr-3 text-sm flex h-8 w-8 items-center justify-center rounded-full ${user.bg ? user.bg : "bg-blue-500"} text-white`}
                        >
                          {user.photo ? user.photo : <span>{user.logo}</span>}
                        </div>
                        <div>
                          <div className="flex flex-col items-start">
                            <span className={`text-xs ${user.notification && !readChats.includes(user.id) ? 'font-bold' : 'font-medium'} text-gray-900 dark:text-gray-100`}>
                              {user.title}
                            </span>
                            {user.subtitle && (
                              <span className="text-xs text-gray-600 dark:text-gray-300 py-0.5 rounded">
                                {user.subtitle}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300 truncate">{user.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end min-w-[60px]">
                        <span className="text-xs text-gray-500">{user.time}</span>
                        {user.notification && (
                          <span className="flex text-[10px] text-black bg-yellow-300 px-2 py-0.5 rounded-full">
                            <ClockFading className='w-3 h-3'/>{user.notification}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <div
          className={`fixed top-2 left-2 ${
            finAiOpen ? 'z-30 md:z-39' : 'z-39'
          }`}
        >
          <button
            className="cursor-pointer p-3 transition"
            title="Open Inbox"
            onClick={() => setOpen(true)}
          >
            <PanelRightClose className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  )
}

export default Inbox