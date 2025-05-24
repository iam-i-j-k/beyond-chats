import { useState } from "react"

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState([])

  const toggleSection = (section) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const linkItems = [
    { id: "tracker", label: "Tracker ticket" },
    { id: "backoffice", label: "Back-office tickets" },
    { id: "conversations", label: "Side conversations" },
  ]

  const dataSections = [
    "USER DATA",
    "CONVERSATION ATTRIBUTES",
    "COMPANY DETAILS",
    "SALESFORCE",
    "STRIPE",
    "JIRA FOR TICKETS",
  ]

  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Assignee Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Assignee</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">B</span>
              </div>
              <span className="text-sm text-gray-900 dark:text-gray-300">Brian Byrne</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Team</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Unassigned</span>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">LINKS</span>
            <svg className="w-4 h-4 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="space-y-2">
            {linkItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span className="text-sm text-gray-500">{item.label}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sections */}
        <div className="space-y-1">
          {dataSections.map((section) => (
            <div key={section} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{section}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.includes(section) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedSections.includes(section) && (
                <div className="pb-3 px-2">
                  <div className="text-sm text-gray-600">
                    {section === "USER DATA" && "User information and profile data"}
                    {section === "CONVERSATION ATTRIBUTES" && "Conversation metadata and tags"}
                    {section === "COMPANY DETAILS" && "Organization information"}
                    {section === "SALESFORCE" && "Salesforce integration data"}
                    {section === "STRIPE" && "Payment and billing information"}
                    {section === "JIRA FOR TICKETS" && "Connected Jira tickets"}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
