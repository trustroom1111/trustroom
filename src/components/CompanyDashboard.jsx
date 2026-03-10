import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function CompanyDashboard({ companyAdmin, onLogout, onLogoClick }) {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const company = companyAdmin.companies;
  const submissionLink = `trustroom.vercel.app/submit/${company.code}`;

  useEffect(() => {
    fetchSubmissions();
  }, []);

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

  const saveResponse = async () => {
    if (!selectedSubmission || !adminResponse.trim()) return;

    const { error } = await supabase
      .from("submissions")
      .update({ 
        admin_response: adminResponse, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", selectedSubmission.id);

    if (!error) {
      alert("Response saved!");
      fetchSubmissions();
      setSelectedSubmission({ ...selectedSubmission, admin_response: adminResponse });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
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

  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    inReview: submissions.filter((s) => s.status === "in-review").length,
    resolved: submissions.filter((s) => s.status === "resolved").length,
  };

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
              <div className="space-y-3">
                {filteredSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubmission(sub);
                      setAdminResponse(sub.admin_response || "");
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedSubmission?.id === sub.id
                        ? "bg-slate-800/50 border-teal-500/50"
                        : "bg-slate-800/20 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-teal-400 font-mono text-sm">{sub.tracking_code}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[sub.status]}`}>
                        {sub.status === "in-review" ? "In Review" : sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </div>
                    <h4 className="font-medium text-white mb-1">
                      {categoryLabels[sub.category] || sub.category}
                    </h4>
                    <p className="text-slate-400 text-sm line-clamp-2">{sub.description}</p>
                    <p className="text-slate-600 text-xs mt-2">
                      {new Date(sub.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>

              {/* Detail Panel */}
              {selectedSubmission && (
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 h-fit sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-teal-400 font-mono">{selectedSubmission.tracking_code}</span>
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="text-slate-500 hover:text-slate-300"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {categoryLabels[selectedSubmission.category] || selectedSubmission.category}
                  </h3>

                  <div className="flex gap-2 mb-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[selectedSubmission.status]}`}>
                      {selectedSubmission.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-300">
                      {selectedSubmission.severity}
                    </span>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                    <p className="text-slate-300 whitespace-pre-wrap">{selectedSubmission.description}</p>
                  </div>

                  <p className="text-slate-500 text-sm mb-6">
                    Submitted: {new Date(selectedSubmission.created_at).toLocaleString("en-IN")}
                  </p>

                  {/* Status Update */}
                  <div className="mb-6">
                    <label className="block text-sm text-slate-400 mb-2">Update Status</label>
                    <div className="flex gap-2">
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

                  {/* Admin Response */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Your Response</label>
                    <textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder="Write a response to the employee..."
                      className="w-full h-24 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none text-sm"
                    />
                    <Button
                      onClick={saveResponse}
                      className="mt-2 bg-teal-500 hover:bg-teal-600 text-white w-full"
                    >
                      Save Response
                    </Button>
                    <p className="text-slate-500 text-xs mt-2">
                      The employee can see this response when they track their submission.
                    </p>
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