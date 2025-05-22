import { useState } from "react"
import { MoreHorizontal, X, ChevronDown, ArrowDown, MessageSquare, Zap, Bookmark, Smile, Clock, Star,
  Mail,
  Phone,
  ChevronUp,
  Plus,
  ExternalLink,
  Users,
} from "lucide-react"
export default function App() {
  const [activeTab, setActiveTab] = useState("copilot")
    const [expandedSections, setExpandedSections] = useState({
    links: true,
    userData: false,
    conversationAttributes: false,
    companyDetails: false,
    salesforce: false,
    stripe: false,
    jiraForTickets: false,
  })

  return (
    <div className="flex h-screen max-h-[700px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      {/* Left sidebar - Inbox */}
      <div className="w-1/4 border-r border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-base font-medium">Your inbox</h2>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">5 Open</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium">Waiting longest</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>

        <div className="overflow-y-auto">
          {/* Conversation list */}
          <div className="border-l-4 border-blue-500 bg-gray-50 px-4 py-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span>L</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Luis - Github</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 truncate">Hey! I have a questio...</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">45m</span>
            </div>
          </div>

          <div className="border-l-4 border-transparent px-4 py-3 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                  <span>I</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Ivan - Nike</span>
                    <span className="ml-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-medium">2 min</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 truncate">Hi there, I have a qu...</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">30m</span>
            </div>
          </div>

          <div className="border-l-4 border-transparent px-4 py-3 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
                  <span>L</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Lead from New York</span>
                    <span className="ml-2 rounded-full bg-black px-1 py-0.5 text-xs text-white">?</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 truncate">Good morning, let me...</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">45m</span>
            </div>
          </div>

          <div className="border-l-4 border-transparent px-4 py-3 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
                  <span>B</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Booking API problems</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 truncate">Bug report</p>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs text-gray-500">Luis - Small Crafts</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">45m</span>
            </div>
          </div>

          <div className="border-l-4 border-transparent px-4 py-3 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  <span>M</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Miracle - Exemplary Bank</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 truncate">Hey there, I'm here to...</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">45m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle section - Chat */}
      <div className="flex w-1/2 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-base font-medium">Luis Easton</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-md p-1 text-gray-500 hover:bg-gray-100">
              <MoreHorizontal size={18} />
            </button>
            <button className="rounded-md p-1 text-gray-500 hover:bg-gray-100">
              <Clock size={18} />
            </button>
            <button className="flex items-center gap-1 rounded-md bg-black px-3 py-1 text-white hover:bg-gray-800">
              <X size={16} />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Customer message */}
          <div className="mb-4 flex gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              <span>L</span>
            </div>
            <div className="max-w-[80%]">
              <div className="rounded-lg bg-gray-100 p-3">
                <p className="text-sm text-gray-800">
                  I bought a product from your store in November as a Christmas gift for a member of my family. However,
                  it turns out they have something very similar already. I was hoping you'd be able to refund me, as it
                  is un-opened.
                </p>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <span>Seen · 1min</span>
              </div>
            </div>
          </div>

          {/* Agent message */}
          <div className="mb-4 flex justify-end">
            <div className="max-w-[80%] rounded-lg bg-blue-100 p-3">
              <p className="text-sm text-gray-800">Let me just look into this for you, Luis.</p>
              <div className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-500">
                <span>Seen · 1min</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
                  <img src="/profile.jpeg" alt="Agent" className="h-6 w-6 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Chat input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200">
                <MessageSquare size={16} />
                <span>Chat</span>
                <ChevronDown size={16} />
              </button>
              <span className="ml-3 text-xs text-gray-500">Use ⌘K for shortcuts</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md p-1 text-gray-500 hover:bg-gray-100">
                <Zap size={18} />
              </button>
              <button className="rounded-md p-1 text-gray-500 hover:bg-gray-100">
                <Bookmark size={18} />
              </button>
              <button className="rounded-md p-1 text-gray-500 hover:bg-gray-100">
                <Smile size={18} />
              </button>
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200">
                  <span>Send</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar - Details */}
      <div className="w-1/4 overflow-y-auto bg-white">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button className="flex-1 px-4 py-3 text-gray-500 hover:bg-gray-50">
            <div className="flex items-center justify-center gap-1">
              <span>Copilot</span>
            </div>
          </button>
          <button className="flex-1 border-b-2 border-indigo-600 px-4 py-3 text-indigo-600">
            <div className="flex items-center justify-center gap-1">
              <span>Details</span>
            </div>
          </button>
        </div>

        {/* Details content */}
        <div className="p-4">
          {/* Assignee */}
          <div className="mb-4">
            <div className="mb-1 text-sm font-medium text-gray-500">Assignee</div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
                <span className="text-xs">B</span>
              </div>
              <span className="text-sm">Brian Byrne</span>
            </div>
          </div>

          {/* Team */}
          <div className="mb-4">
            <div className="mb-1 text-sm font-medium text-gray-500">Team</div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              <span className="text-sm">Unassigned</span>
            </div>
          </div>

          {/* Links section */}
          <div className="mb-2 border-t border-gray-100 pt-4">
            <button
              className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700"
              onClick={() => toggleSection("links")}
            >
              <span>LINKS</span>
              {expandedSections.links ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedSections.links && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ExternalLink size={16} className="text-gray-500" />
                    <span className="text-sm">Tracker ticket</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm">Back-office tickets</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-gray-500" />
                    <span className="text-sm">Side conversations</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Collapsible sections */}
          {[
            { id: "userData", label: "USER DATA" },
            { id: "conversationAttributes", label: "CONVERSATION ATTRIBUTES" },
            { id: "companyDetails", label: "COMPANY DETAILS" },
            { id: "salesforce", label: "SALESFORCE" },
            { id: "stripe", label: "STRIPE" },
            { id: "jiraForTickets", label: "JIRA FOR TICKETS" },
          ].map((section) => (
            <div key={section.id} className="border-t border-gray-100 py-2">
              <button
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700"
                onClick={() => toggleSection(section.id)}
              >
                <span>{section.label}</span>
                {expandedSections[section.id] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
