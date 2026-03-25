import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function CompanyDashboard({ companyAdmin, onLogout, onLogoClick }) {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  // Attachments
  const [attachments, setAttachments] = useState([]);
  
  const messagesEndRef = useRef(null);
  const MAX_MESSAGES = 10;

  const company = companyAdmin.companies;
  const submissionLink = `trustroom.vercel.app/submit/${company.code}`;

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("company_id", company.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error);
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  const selectSubmission = async (sub) => {
    setSelectedSubmission(sub);
    setNewMessage("");
    
    // Fetch messages
    const { data: messagesData } = await supabase
      .from("messages")
      .select("*")
      .eq("submission_id", sub.id)
      .order("created_at", { ascending: true });
    
    setMessages(messagesData || []);

    // Fetch attachments
    const { data: attachmentsData } = await supabase
      .from("attachments")
      .select("*")
      .eq("submission_id", sub.id)
      .order("created_at", { ascending: true });
    
    setAttachments(attachmentsData || []);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("submissions")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      fetchSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status: newStatus });
      }
    }
  };

  const updateCredibility = async (id, credibility) => {
    const { error } = await supabase
      .from("submissions")
      .update({ credibility, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      fetchSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, credibility });
      }
    }
  };

  const toggleConversationClosed = async (id, currentState) => {
    const { error } = await supabase
      .from("submissions")
      .update({ conversation_closed: !currentState, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      fetchSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, conversation_closed: !currentState });
      }
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedSubmission) return;
    if (selectedSubmission.conversation_closed) return;
    if (messages.length >= MAX_MESSAGES) return;

    setIsSendingMessage(true);
    
    const { error: msgError } = await supabase
      .from("messages")
      .insert([{
        submission_id: selectedSubmission.id,
        sender_type: "admin",
        message: newMessage.trim(),
      }]);

    if (!msgError) {
      const { data: messagesData } = await supabase
        .from("messages")
        .select("*")
        .eq("submission_id", selectedSubmission.id)
        .order("created_at", { ascending: true });
      
      setMessages(messagesData || []);
      setNewMessage("");
    }
    
    setIsSendingMessage(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (filterStatus === "all") return true;
    return sub.status === filterStatus;
  });

  const categoryLabels = {
    "unfair-treatment": "Unfair Treatment",
    "toxic-behaviour": "Toxic Behaviour",
    "workload-issues": "Workload Issues",
    "office-politics": "Office Politics",
    "mental-health": "Mental Health",
    "manager-feedback": "Manager Feedback",
    "policy-violations": "Policy Violations",
    "suggestions": "Suggestions",
  };

  const statusColors = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-review": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
    dismissed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };

  const credibilityLabels = {
    pending: { label: "Pending Review", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
    substantiated: { label: "Substantiated", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    unsubstantiated: { label: "Unsubstantiated", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    "insufficient-info": { label: "Insufficient Info", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    "false-report": { label: "False Report", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  };

  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    inReview: submissions.filter((s) => s.status === "in-review").length,
    resolved: submissions.filter((s) => s.status === "resolved").length,
  };

  const canSendMessage = selectedSubmission && !selectedSubmission.conversation_closed && messages.length < MAX_MESSAGES;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-6 py-4 md:px-8 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-semibold text-white">TrustRoom</span>
            </button>
            <div className="hidden md:block h-6 w-px bg-slate-700"></div>
            <span className="hidden md:block text-slate-400">{company.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchSubmissions}
              variant="outline"
              className="border-slate-700 text-slate-400 hover:bg-slate-800"
            >
              ↻ Refresh
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-slate-700 text-slate-400 hover:bg-slate-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 min-h-[calc(100vh-65px)] p-4 hidden lg:block">
          {/* Company Info */}
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-white mb-2">{company.name}</h3>
            <p className="text-slate-400 text-sm mb-3">Code: <span className="text-teal-400 font-mono">{company.code}</span></p>
            <Button
              onClick={() => copyToClipboard(`https://${submissionLink}`)}
              variant="outline"
              size="sm"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
            >
              Copy Submission Link
            </Button>
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <h4 className="text-slate-500 text-xs uppercase tracking-wider mb-3">Overview</h4>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-slate-400 text-sm">Total Submissions</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">{stats.new}</div>
              <div className="text-slate-400 text-sm">New</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-400">{stats.inReview}</div>
              <div className="text-slate-400 text-sm">In Review</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">{stats.resolved}</div>
              <div className="text-slate-400 text-sm">Resolved</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Filter */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Submissions</h2>
            <div className="flex gap-2">
              {["all", "new", "in-review", "resolved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    filterStatus === status
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "bg-slate-800/30 text-slate-400 border border-slate-700 hover:border-slate-600"
                  }`}
                >
                  {status === "all" ? "All" : status === "in-review" ? "In Review" : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-slate-400">Loading submissions...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && submissions.length === 0 && (
            <div className="text-center py-12 bg-slate-800/20 border border-slate-800 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
              <p className="text-slate-400 mb-4">Share your submission link with employees to get started.</p>
              <Button
                onClick={() => copyToClipboard(`https://${submissionLink}`)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Copy Submission Link
              </Button>
            </div>
          )}

          {/* Submissions List */}
          {!isLoading && filteredSubmissions.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-4">
              {/* List */}
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {filteredSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => selectSubmission(sub)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedSubmission?.id === sub.id
                        ? "bg-slate-800/50 border-teal-500/50"
                        : "bg-slate-800/20 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-teal-400 font-mono text-sm">{sub.tracking_code}</span>
                        {sub.identity_shared && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            ID Shared
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[sub.status]}`}>
                        {sub.status === "in-review" ? "In Review" : sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </div>
                    <h4 className="font-medium text-white mb-1">
                      {categoryLabels[sub.category] || sub.category}
                    </h4>
                    <p className="text-slate-400 text-sm line-clamp-2">{sub.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-slate-600 text-xs">
                        {new Date(sub.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      {sub.conversation_closed && (
                        <span className="text-xs text-slate-500">🔒 Closed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Panel */}
              {selectedSubmission && (
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Header */}
                  <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 sticky top-0">
                    <div className="flex items-center justify-between">
                      <span className="text-teal-400 font-mono">{selectedSubmission.tracking_code}</span>
                      <button
                        onClick={() => setSelectedSubmission(null)}
                        className="text-slate-500 hover:text-slate-300"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Category & Status */}
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {categoryLabels[selectedSubmission.category] || selectedSubmission.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[selectedSubmission.status]}`}>
                          {selectedSubmission.status}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-300">
                          {selectedSubmission.severity}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${credibilityLabels[selectedSubmission.credibility || "pending"].color}`}>
                          {credibilityLabels[selectedSubmission.credibility || "pending"].label}
                        </span>
                      </div>
                    </div>

                    {/* Identity Info (if shared) */}
                    {selectedSubmission.identity_shared && (
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                        <h4 className="text-purple-400 font-medium text-sm mb-2">🔓 Identity Disclosed (Confidential)</h4>
                        <p className="text-white">{selectedSubmission.reporter_name}</p>
                        {selectedSubmission.reporter_contact && (
                          <p className="text-slate-400 text-sm">{selectedSubmission.reporter_contact}</p>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <h4 className="text-slate-400 text-sm mb-2">Description</h4>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="text-slate-300 whitespace-pre-wrap">{selectedSubmission.description}</p>
                      </div>
                    </div>

                    {/* Incident Details */}
                    {(selectedSubmission.incident_date || selectedSubmission.incident_location || selectedSubmission.names_involved || selectedSubmission.witnesses) && (
                      <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
                        <h4 className="text-slate-400 text-sm font-medium">Incident Details</h4>
                        {selectedSubmission.incident_date && (
                          <div>
                            <span className="text-slate-500 text-xs">When:</span>
                            <p className="text-white text-sm">{new Date(selectedSubmission.incident_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                          </div>
                        )}
                        {selectedSubmission.incident_location && (
                          <div>
                            <span className="text-slate-500 text-xs">Where:</span>
                            <p className="text-white text-sm">{selectedSubmission.incident_location}</p>
                          </div>
                        )}
                        {selectedSubmission.names_involved && (
                          <div>
                            <span className="text-slate-500 text-xs">Who was involved:</span>
                            <p className="text-white text-sm">{selectedSubmission.names_involved}</p>
                          </div>
                        )}
                        {selectedSubmission.witnesses && (
                          <div>
                            <span className="text-slate-500 text-xs">Witnesses:</span>
                            <p className="text-white text-sm">{selectedSubmission.witnesses}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-slate-500 text-sm">
                      Submitted: {formatDate(selectedSubmission.created_at)}
                    </p>

                    {/* Attachments */}
                    {attachments.length > 0 && (
                      <div>
                        <h4 className="text-slate-400 text-sm mb-3">Attachments ({attachments.length})</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {attachments.map((att) => (
                            <div key={att.id}>
                              {att.file_type === "image" ? (
                                <a href={att.file_url} target="_blank" rel="noopener noreferrer">
                                  <img
                                    src={att.file_url}
                                    alt="Attachment"
                                    className="w-full h-24 object-cover rounded-lg border border-slate-600 hover:border-teal-500 transition-colors"
                                  />
                                </a>
                              ) : (
                                <div className="bg-slate-800 rounded-lg border border-slate-600 p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                    <span className="text-slate-300 text-xs">Voice Note</span>
                                    {att.duration_seconds && (
                                      <span className="text-slate-500 text-xs">{formatTime(att.duration_seconds)}</span>
                                    )}
                                  </div>
                                  <audio controls className="w-full h-8" src={att.file_url} />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status Update */}
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Update Status</label>
                      <div className="flex flex-wrap gap-2">
                        {["new", "in-review", "resolved", "dismissed"].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(selectedSubmission.id, status)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                              selectedSubmission.status === status
                                ? statusColors[status]
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                            }`}
                          >
                            {status === "in-review" ? "In Review" : status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Credibility Marking */}
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Mark Credibility</label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(credibilityLabels).map(([key, { label }]) => (
                          <button
                            key={key}
                            onClick={() => updateCredibility(selectedSubmission.id, key)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                              (selectedSubmission.credibility || "pending") === key
                                ? credibilityLabels[key].color
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <p className="text-slate-500 text-xs mt-2">
                        This helps track investigation outcomes. The reporter cannot see this.
                      </p>
                    </div>

                    {/* Conversation Toggle */}
                    <div>
                      <Button
                        onClick={() => toggleConversationClosed(selectedSubmission.id, selectedSubmission.conversation_closed)}
                        variant="outline"
                        size="sm"
                        className={`border-slate-600 ${selectedSubmission.conversation_closed ? "text-green-400" : "text-red-400"}`}
                      >
                        {selectedSubmission.conversation_closed ? "🔓 Reopen Conversation" : "🔒 Close Conversation"}
                      </Button>
                      <p className="text-slate-500 text-xs mt-2">
                        {selectedSubmission.conversation_closed 
                          ? "Conversation is closed. Neither you nor the reporter can send new messages."
                          : "Closing prevents new messages from both sides."
                        }
                      </p>
                    </div>

                    {/* Messages */}
                    <div className="border-t border-slate-700 pt-6">
                      <h4 className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Conversation ({messages.length}/{MAX_MESSAGES} messages)
                      </h4>

                      {/* Messages List */}
                      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                        {messages.length === 0 ? (
                          <p className="text-slate-500 text-sm text-center py-4">No messages yet. Start the conversation.</p>
                        ) : (
                          messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender_type === "admin" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                  msg.sender_type === "admin"
                                    ? "bg-teal-500/20 border border-teal-500/30"
                                    : "bg-slate-700/50 border border-slate-600"
                                }`}
                              >
                                <p className="text-sm text-slate-200 whitespace-pre-wrap">{msg.message}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                  {msg.sender_type === "admin" ? "You" : "Reporter"} • {formatDate(msg.created_at)}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Send Message */}
                      {canSendMessage ? (
                        <div className="flex gap-2">
                          <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your response..."
                            className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none text-sm"
                            rows={2}
                          />
                          <Button
                            onClick={sendMessage}
                            disabled={isSendingMessage || !newMessage.trim()}
                            className="bg-teal-500 hover:bg-teal-600 text-white"
                          >
                            {isSendingMessage ? "..." : "Send"}
                          </Button>
                        </div>
                      ) : (
                        <p className="text-slate-500 text-sm text-center">
                          {selectedSubmission.conversation_closed 
                            ? "Conversation is closed."
                            : "Message limit reached."
                          }
                        </p>
                      )}
                    </div>

                    {/* Fair Investigation Note */}
                    <div className="bg-slate-800/30 border border-slate-600 rounded-xl p-4">
                      <p className="text-slate-400 text-xs">
                        ⚖️ <strong>Fair Investigation Reminder:</strong> This is an anonymous report. Please investigate fairly before taking action. 
                        The accused person also has the right to respond.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}