import { Editor, EditorState, RichUtils, Modifier, ContentState, convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Bookmark, ChevronDown, Smile, Zap } from 'lucide-react'
import React, { useState, useRef, useEffect, useContext } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { ChatboxInputContext } from './FinAI'; // adjust path as needed

const FORMAT_OPTIONS = [
  { label: 'B', style: 'font-bold', action: 'BOLD', title: 'Bold' },
  { label: 'I', style: 'italic', action: 'ITALIC', title: 'Italic' },
  { label: 'H1', style: 'text-lg font-bold', action: 'header-one', title: 'Heading 1', block: true },
  { label: 'H2', style: 'text-base font-bold', action: 'header-two', title: 'Heading 2', block: true },
  { label: '🔗', style: '', action: 'LINK', title: 'Link', custom: true },
  { label: '<>', style: '', action: 'HTML', title: 'HTML', custom: true },
  { label: 'AI', style: 'text-indigo-600 font-bold', action: 'AI', title: 'AI', custom: true },
]

const Chat = ({ messages, setMessages }) => {
  const { chatboxInput, setChatboxInput } = useContext(ChatboxInputContext);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [showOptions, setShowOptions] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selection, setSelection] = useState(null)
  const [bookmarkedMessages, setBookmarkedMessages] = useState([])
  const [bookmarkError, setBookmarkError] = useState('')
  const [showAIOptions, setShowAIOptions] = useState(false)
  const editorRef = useRef(null)
  const emojiPickerRef = useRef(null)

  // Focus editor on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  // Show toolbar when text is selected
  useEffect(() => {
    const selectionState = editorState.getSelection()
    setShowToolbar(!selectionState.isCollapsed())
    setSelection(selectionState)
  }, [editorState])

  // Close emoji picker when clicking outside
  useEffect(() => {
    if (!showEmojiPicker) return
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        event.target.getAttribute('title') !== 'Emoji'
      ) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showEmojiPicker])

  // When chatboxInput changes, update the editor
  useEffect(() => {
    if (chatboxInput) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(chatboxInput)));
      setChatboxInput(''); // clear after use if you want
    }
  }, [chatboxInput])

  // Custom formatting actions
  const handleCustomFormat = (action) => {
    if (action === 'LINK') {
      const url = prompt('Enter the URL:')
      if (!url) return
      const selection = editorState.getSelection()
      let contentState = editorState.getCurrentContent()
      contentState = contentState.createEntity('LINK', 'MUTABLE', { url })
      const entityKey = contentState.getLastCreatedEntityKey()
      let newEditorState = EditorState.set(editorState, { currentContent: contentState })
      newEditorState = RichUtils.toggleLink(newEditorState, selection, entityKey)
      setEditorState(newEditorState)
    } else if (action === 'HTML') {
      setEditorState(RichUtils.toggleBlockType(editorState, 'code-block'))
    } else if (action === 'AI') {
      setShowAIOptions((prev) => !prev)
    }
  }

  const handleFormat = (action, opt) => {
    if (opt?.block) {
      setEditorState(RichUtils.toggleBlockType(editorState, action));
    } else if (opt?.custom) {
      handleCustomFormat(action);
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, action));
    }
  };

  // Handle Enter to send, Shift+Enter for newline
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend(e);
    }
  }

  // Handle emoji select
  const handleEmojiClick = (emojiData) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const newContentState = Modifier.insertText(
      contentState,
      selectionState,
      emojiData.emoji
    )
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters')
    setEditorState(newEditorState)
    setShowEmojiPicker(false)
    setTimeout(() => {
      if (editorRef.current) editorRef.current.focus()
    }, 0)
  }

  // Bookmark the current input as a draft
  const handleBookmark = () => {
    const content = editorState.getCurrentContent()
    if (!content.hasText()) {
      setBookmarkError('Please enter some input to bookmark.')
      setTimeout(() => setBookmarkError(''), 2000)
      return
    }
    setBookmarkedMessages(prev => [...prev, content.getPlainText()])
    setBookmarkError('')
  }

  // Restore bookmark
  const handleRestoreBookmark = (msg) => {
    setEditorState(EditorState.createWithContent(ContentState.createFromText(msg)))
    if (editorRef.current) editorRef.current.focus()
  }

  // Example Zap functionality: Insert a canned quick reply
  const handleZap = () => {
    const quickReplies = [
      "Thank you for reaching out!",
      "I'll get back to you shortly.",
      "Can you please provide more details?",
      "Let me check that for you.",
      "👍"
    ];
    const reply = quickReplies[Math.floor(Math.random() * quickReplies.length)];
    let contentState = editorState.getCurrentContent();
    let selectionState = editorState.getSelection();

    // If editor is not focused or selection is collapsed at start, insert at end
    if (!editorRef.current || !selectionState || selectionState.getAnchorOffset() === 0) {
      const lastBlock = contentState.getLastBlock();
      const blockKey = lastBlock.getKey();
      const length = lastBlock.getLength();
      selectionState = selectionState.merge({
        anchorKey: blockKey,
        anchorOffset: length,
        focusKey: blockKey,
        focusOffset: length,
        isBackward: false,
      });
    }

    const newContentState = Modifier.insertText(
      contentState,
      selectionState,
      (contentState.hasText() ? " " : "") + reply
    );
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    setEditorState(EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter()));
    setTimeout(() => {
      if (editorRef.current) editorRef.current.focus();
    }, 0);
  }

  // Send message
  const handleSend = (e) => {
    e.preventDefault()
    const content = editorState.getCurrentContent()
    if (!content.hasText()) return
    setMessages([
      ...messages,
      {
        text: content.getPlainText(),
        rawContent: convertToRaw(content), // <-- ADD THIS LINE
        fromUser: true,
        seen: true,
        time: new Date(),
      },
    ])
    setEditorState(EditorState.createEmpty())
  }

  // Toolbar position (above selection)
  // For simplicity, we show it always above the editor
  // You can use a library like draft-js-toolbar-plugin for more advanced toolbars

  return (
    <form className="p-2 md:p-3 bg-white dark:bg-gray-900 flex flex-col items-start rounded-2xl w-full" onSubmit={handleSend}>
      <div className="flex flex-col items-start mb-2">
        <div className="flex items-center">
          <div className="flex h-5 w-5 items-center opacity-80 justify-center rounded bg-transparent">
            <img src="/comment.png" alt="chat" title="Chat" />
          </div>
          <span className="ml-2 text-sm font-medium">Chat</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
        <span className='text-[10px] text-gray-400'>Use ⌘ K for shortcuts</span>
      </div>

      <div className="relative w-full">
        {showToolbar && (
          <div className="absolute left-2 -top-8 z-10 flex gap-1 bg-white dark:bg-gray-800 border rounded shadow p-1">
            {FORMAT_OPTIONS.map(opt => (
              <div key={opt.action} style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={`px-1 py-0.5 rounded hover:bg-gray-200 ${opt.style}`}
                  title={opt.title}
                  onMouseDown={e => {
                    e.preventDefault();
                    handleFormat(opt.action, opt);
                  }}
                >
                  {opt.label}
                </button>
                {opt.action === 'AI' && showAIOptions && (
                  <div className="absolute left-0 bottom-full mb-1 bg-white border rounded shadow z-50 flex flex-col min-w-[140px]">
                    {["Summarize this", "Make it more formal", "", "Make it in my tone", "Correct grammar"].map((option, idx) => (
                      <button
                        key={option}
                        className="text-left px-3 py-1 hover:bg-indigo-100 text-xs"
                        type="button"
                        onMouseDown={e => {
                          e.preventDefault();
                          const contentState = editorState.getCurrentContent();
                          const selectionState = editorState.getSelection();
                          const newContentState = Modifier.insertText(
                            contentState,
                            selectionState,
                            `[AI: ${option}] `
                          );
                          setEditorState(EditorState.push(editorState, newContentState, 'insert-characters'));
                          setShowAIOptions(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div
          className="w-full rounded border border-gray-300 p-2 outline-none mb-2 min-h-[40px] text-xs bg-white dark:bg-gray-900 max-h-[160px] overflow-y-auto"
          style={{ cursor: 'text' }}
          onClick={() => editorRef.current && editorRef.current.focus()}
        >
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Type your message..."
            handleKeyCommand={(command, state) => {
              const newState = RichUtils.handleKeyCommand(state, command)
              if (newState) {
                setEditorState(newState)
                return 'handled'
              }
              return 'not-handled'
            }}
            handleReturn={(e) => {
              if (e.shiftKey) {
                // Allow new line with Shift+Enter
                return 'not-handled';
              }
              // Send message on Enter
              handleSend(e);
              return 'handled';
            }}
            keyBindingFn={e => {
              // Optionally handle tab for indentation or focus
            }}
            spellCheck={true}
            onFocus={() => setShowToolbar(false)}
            onBlur={() => setShowToolbar(false)}
          />
        </div>
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute left-0 bottom-full mb-1 bg-white border rounded shadow z-50 flex flex-col min-w-[140px]">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between space-y-2 w-full">
        <div className="flex items-center space-x-2">
          <button
            className="p-1 px-2 cursor-pointer border-r hover:bg-gray-100 dark:hover:bg-gray-800"
            type="button"
            title="Quick reply"
            onClick={handleZap}
          >
            <Zap className="h-4 w-4 text-gray-900 dark:text-gray-100" />
          </button>
          <button
            className="rounded p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            type="button"
            title="Bookmark this draft"
            onClick={handleBookmark}
          >
            <Bookmark className="h-4 w-4 text-gray-900 dark:text-gray-100" />
          </button>
          <button
            className="rounded p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            title="Emoji"
          >
            <Smile className="h-4 w-4 text-gray-900 dark:text-gray-100" />
          </button>
        </div>

        <div 
          disabled={!editorState.getCurrentContent().hasText()}
          className={`relative flex justify-between rounded-md items-center p-1 px-2 ${editorState.getCurrentContent().hasText() ? "bg-black" : "bg-white dark:bg-gray-900"}`}>
          <button
            type="submit"
            className="text-xs font-base text-gray-300 dark:text-gray-200 border-r-1 pr-2 border-gray-500 cursor-pointer transition"
            disabled={!editorState.getCurrentContent().hasText()}
          >
            Send
          </button>
          <button
            type="button"
            className="flex pl-2 items-center rounded cursor-pointer transition"
            onClick={() => setShowOptions((prev) => !prev)}
            title="More options"
          >
            <ChevronDown className="text-gray-300 dark:text-gray-200 w-4 h-4" />
          </button>
          {showOptions && (
            <div className="absolute right-0 bottom-10 w-40 bg-white text-gray-800 rounded shadow-lg z-50">
              <input
                className="block w-full text-xs text-left px-4 py-2 hover:bg-gray-100"
                type="file"
                onChange={e => {
                  setShowOptions(false);
                  const file = e.target.files[0];
                  if (file) {
                    // Example: Add file to messages or show preview
                    setMessages([
                      ...messages,
                      {
                        file,
                        fileName: file.name,
                        fromUser: true,
                        seen: true,
                        time: new Date(),
                      }
                    ]);
                  }
                }}
                placeholder='Upload file'
              />
              
              <button
                className="block cursor-pointer w-full text-xs text-left px-4 py-2 hover:bg-gray-100"
                type="button"
                onClick={() => setShowOptions(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {bookmarkError && (
        <div className="text-xs text-red-500 mt-1">{bookmarkError}</div>
      )}

      {/* Show bookmarked drafts below input */}
      {bookmarkedMessages.length > 0 && (
        <div className="w-full mt-2">
          <div className="text-xs text-gray-500 mb-1">Bookmarked drafts:</div>
          <ul className="space-y-1">
            {bookmarkedMessages.map((msg, idx) => (
              <li key={idx} className="flex items-center justify-between bg-gray-100 dark:bg-transparent rounded px-2 py-1">
                <span
                  className="truncate cursor-pointer hover:underline"
                  title="Click to restore"
                  onClick={() => handleRestoreBookmark(msg)}
                >
                  {msg}
                </span>
                <button
                  className="ml-2 cursor-pointer text-xs text-red-400 hover:text-red-600"
                  type="button"
                  onClick={() =>
                    setBookmarkedMessages(bookmarkedMessages.filter((_, i) => i !== idx))
                  }
                  title="Remove bookmark"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
}

export default Chat
