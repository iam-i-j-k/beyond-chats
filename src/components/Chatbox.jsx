import { Ellipsis, BellOff, SquareX, Phone, Star, Video } from 'lucide-react'
import React, { useState, useContext } from 'react'
import Chat from './Chat'
import { ChatboxInputContext } from './FinAI' // or your context file
import { convertToRaw } from 'draft-js';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const Chatbox = ({ user, sidebarOpen, onClose }) => {
  const { chatboxInput, setChatboxInput } = useContext(ChatboxInputContext)
  const [messages, setMessages] = useState([])
  const [showHeaderOptions, setShowHeaderOptions] = useState(false)

  return (
    <div className="transition-colors h-screen w-full flex flex-col bg-white dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between h-auto sm:h-[8%] p-2 border-b-1 border-gray-300 dark:border-gray-700">
        <h1 className="text-base sm:text-lg md:text-2xl font-medium tracking-tight text-center sm:text-left w-full sm:w-auto">
          {user ? user.name ? user.name : user.title : "Select a chat"}
        </h1>
        {user && (
          <div className="flex relative items-center gap-2 mt-2 sm:mt-0 self-center sm:self-auto">
            <button
              className="p-1 sm:p-2 rounded cursor-pointer transition"
              title="Options"
              onClick={() => setShowHeaderOptions((prev) => !prev)}
            >
              <Ellipsis className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {showHeaderOptions && (
              <div className="absolute text-gray-800 right-0 top-10 w-40 bg-white rounded shadow-lg z-50">
                <button
                  className="flex items-center w-full text-xs text-left px-4 py-2"
                  type="button"
                  onClick={() => setShowHeaderOptions(false)}
                >
                  <Phone className="w-4 h-4 mr-2" /> Call
                </button>
                <button
                  className="flex items-center w-full text-xs text-left px-4 py-2 hover:bg-gray-100"
                  type="button"
                  onClick={() => setShowHeaderOptions(false)}
                >
                  <Star className="w-4 h-4 mr-2" /> Star
                </button>
                <button
                  className="flex items-center w-full text-xs text-left px-4 py-2 hover:bg-gray-100"
                  type="button"
                  onClick={() => setShowHeaderOptions(false)}
                >
                  <Video className="w-4 h-4 mr-2" /> Video Call
                </button>
                <button
                  className="flex items-center w-full text-xs text-left px-4 py-2 hover:bg-gray-100"
                  type="button"
                  onClick={() => setShowHeaderOptions(false)}
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              className="p-1 sm:p-2 rounded cursor-pointer transition"
              title="Snooze"
            >
              <BellOff className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              className="p-1 sm:p-2 rounded cursor-pointer flex space-x-2 bg-black text-white transition"
              title="Close"
              onClick={onClose}
            >
              <SquareX className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs font-medium">
                Close
              </span>
            </button>
          </div>
        )}
      </div>
      {/* Chat messages */}
      {user && (
        <div className="flex-1 overflow-y-auto max-h-[calc(100%-56px)] p-2 md:p-4">
          <div className="max-w-[80%]">
            <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
              <p className="text-xs text-gray-800 dark:text-gray-100 leading-5">
                I bought a product from your store in November as a Christmas gift for a member of my family. However,
                it turns out they have something very similar already. I was hoping you'd be able to refund me, as it
                is un-opened.
              </p>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
              <span>Seen · 1min</span>
            </div>
          </div>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`px-4 py-2 text-xs rounded-lg max-w-[80%] ${
                msg.fromUser
                  ? 'bg-blue-300 dark:bg-blue-700 text-black dark:text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
              }`}>
                {msg.file ? (
                  <div>
                    <a
                      href={URL.createObjectURL(msg.file)}
                      download={msg.fileName}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {msg.fileName}
                    </a>
                  </div>
                ) : msg.rawContent ? (
                  <Editor
                    editorState={EditorState.createWithContent(convertFromRaw(msg.rawContent))}
                    readOnly
                  />
                ) : (
                  <div>{msg.text}</div>
                )}
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                  {msg.seen && (
                    <span>
                      Seen {formatTime(msg.time)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input area at the bottom */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 w-full md:static md:w-auto z-30">
          <Chat messages={messages} setMessages={setMessages} input={chatboxInput} setInput={setChatboxInput} />
        </div>
      )}
    </div>
  )
}

export default Chatbox