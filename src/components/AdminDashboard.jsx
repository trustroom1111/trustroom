import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function AdminDashboard({ onLogout }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [adminResponse, setAdminResponse] = useState("");

  const categoryLabels = {
    "unfair-treatment": { label: "Unfair Treatment", icon: "⚖️" },
    "toxic-behaviour": { label: "Toxic Behaviour", icon: "😰" },
    "workload": { label: "Workload Issues", icon: "📊" },
    "politics": { label: "Office Politics", icon: "🎭" },
    "mental-health": { label: "Mental Health", icon: "🧠" },
    "manager": { label: "Manager Feedback", icon: "💬" },
    "policy": { label: "Policy Violations", icon: "🚫" },
    "suggestion": { label: "Suggestions", icon: "💡" },
  };

  const statusColors = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-review": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
    dismissed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };

  const severityColors = {
    low: "bg-slate-500/20 text-slate-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-orange-500/20 text-orange-400",
    critical: "bg-red-500/20 text-red-400",
  };

  // Fetch submissions from Supabase
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('submissions')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      return;
    }

    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status: newStatus });
    }
  };

  const saveAdminResponse = async () => {
    if (!selectedSubmission || !adminResponse.trim()) return;

    const { error } = await supabase
      .from('submissions')
      .update({ 
        admin_response: adminResponse,
        updated_at: new Date().toISOString()
      })
      .eq('id', selectedSubmission.id);

    if (error) {
      console.error('Error saving response:', error);
      alert('Failed to save response');
      return;
    }

    setSubmissions(submissions.map(sub => 
      sub.id === selectedSubmission.id 
        ? { ...sub, admin_response: adminResponse } 
        : sub
    ));
    setSelectedSubmission({ ...selectedSubmission, admin_response: adminResponse });
    alert('Response saved!');
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filterStatus !== "all" && sub.status !== filterStatus) return false;
    if (filterSeverity !== "all" && sub.severity !== filterSeverity) return false;
    return true;
  });

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === "new").length,
    inReview: submissions.filter(s => s.status === "in-review").length,
    resolved: submissions.filter(s => s.status === "resolved").length,
    critical: submissions.filter(s => s.severity === "critical").length,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin w-10 h-10 text-teal-400 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-slate-400">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-6 py-4 md:px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-semibold text-white">TrustRoom</span>
          <span className="text-slate-500 text-sm ml-2">Admin Dashboard</span>
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
      </header>

      <div className="flex">
        {/* Sidebar / Stats */}
        <aside className="w-64 border-r border-slate-800 p-6 hidden lg:block">
          <h2 className="text-sm font-semibold text-slate-400 mb-4">Overview</h2>
          
          <div className="space-y-3">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-slate-400 text-sm">Total Submissions</p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-400">{stats.new}</p>
              <p className="text-slate-400 text-sm">New</p>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-2xl font-bold text-yellow-400">{stats.inReview}</p>
              <p className="text-slate-400 text-sm">In Review</p>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
              <p className="text-slate-400 text-sm">Resolved</p>
            </div>
            
            {stats.critical > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
                <p className="text-slate-400 text-sm">Critical Issues</p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="text-slate-400 text-sm block mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-review">In Review</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>
            
            <div>
              <label className="text-slate-400 text-sm block mb-2">Severity</label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Submissions List */}
          <div className="grid gap-4">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No submissions found.
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => {
                    setSelectedSubmission(submission);
                    setAdminResponse(submission.admin_response || "");
                  }}
                  className={`bg-slate-800/30 border rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800/50 ${
                    selectedSubmission?.id === submission.id
                      ? "border-teal-500"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {categoryLabels[submission.category]?.icon || "📝"}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-teal-400 font-mono text-sm">{submission.tracking_code}</code>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[submission.status] || statusColors.new}`}>
                            {submission.status === "in-review" ? "In Review" : (submission.status || "new").charAt(0).toUpperCase() + (submission.status || "new").slice(1)}
                          </span>
                          {submission.severity && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${severityColors[submission.severity]}`}>
                              {submission.severity.charAt(0).toUpperCase() + submission.severity.slice(1)}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-white">
                          {categoryLabels[submission.category]?.label || submission.category}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1 line-clamp-2">{submission.description}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs">{formatDate(submission.created_at)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Detail Panel */}
        {selectedSubmission && (
          <aside className="w-96 border-l border-slate-800 p-6 hidden xl:block">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Tracking Code */}
              <div>
                <p className="text-slate-400 text-sm mb-1">Tracking Code</p>
                <code className="text-xl font-mono font-bold text-teal-400">{selectedSubmission.tracking_code}</code>
              </div>

              {/* Category */}
              <div>
                <p className="text-slate-400 text-sm mb-1">Category</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{categoryLabels[selectedSubmission.category]?.icon || "📝"}</span>
                  <span className="text-white">{categoryLabels[selectedSubmission.category]?.label || selectedSubmission.category}</span>
                </div>
              </div>

              {/* Severity */}
              {selectedSubmission.severity && (
                <div>
                  <p className="text-slate-400 text-sm mb-1">Severity</p>
                  <span className={`text-sm px-3 py-1 rounded-full ${severityColors[selectedSubmission.severity]}`}>
                    {selectedSubmission.severity.charAt(0).toUpperCase() + selectedSubmission.severity.slice(1)}
                  </span>
                </div>
              )}

              {/* Status */}
              <div>
                <p className="text-slate-400 text-sm mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {["new", "in-review", "resolved", "dismissed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedSubmission.id, status)}
                      className={`text-sm px-3 py-1 rounded-full border transition-all ${
                        selectedSubmission.status === status
                          ? statusColors[status]
                          : "border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {status === "in-review" ? "In Review" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <p className="text-slate-400 text-sm mb-1">Submitted</p>
                <p className="text-white">{formatDate(selectedSubmission.created_at)}</p>
              </div>

              {/* Description */}
              <div>
                <p className="text-slate-400 text-sm mb-2">Description</p>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedSubmission.description}</p>
                </div>
              </div>

              {/* Admin Response */}
              <div>
                <p className="text-slate-400 text-sm mb-2">Response (visible to submitter)</p>
                <textarea
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  placeholder="Write a response that the anonymous submitter can see when they check their tracking code..."
                  className="w-full h-24 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none text-sm"
                />
                <Button
                  onClick={saveAdminResponse}
                  className="mt-2 w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Save Response
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}