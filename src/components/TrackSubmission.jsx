import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function TrackSubmission({ onBackHome }) {
  const [trackingCode, setTrackingCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  
  // Messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  // Attachments
  const [attachments, setAttachments] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  // Voice Recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isUploadingVoice, setIsUploadingVoice] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const MAX_MESSAGES = 10;
  const MAX_IMAGES = 3;
  const MAX_VOICE_SECONDS = 300; // 5 minutes

  const categoryLabels = {
    "unfair-treatment": { label: "Unfair Treatment", icon: "⚖️" },
    "toxic-behaviour": { label: "Toxic Behaviour", icon: "😰" },
    "workload-issues": { label: "Workload Issues", icon: "📊" },
    "office-politics": { label: "Office Politics", icon: "🎭" },
    "mental-health": { label: "Mental Health", icon: "🧠" },
    "manager-feedback": { label: "Manager Feedback", icon: "💬" },
    "policy-violations": { label: "Policy Violations", icon: "🚫" },
    "suggestions": { label: "Suggestions", icon: "💡" },
  };

  const statusInfo = {
    new: {
      label: "New",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      description: "Your submission has been received and is waiting to be reviewed.",
    },
    "in-review": {
      label: "In Review",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      description: "Your submission is being actively reviewed by the team.",
    },
    resolved: {
      label: "Resolved",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      description: "Action has been taken on your submission.",
    },
    dismissed: {
      label: "Dismissed",
      color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
      description: "Your submission has been reviewed but no action will be taken.",
    },
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

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setMessages([]);
    setAttachments([]);

    const code = trackingCode.trim().toUpperCase();

    if (!code) {
      setError("Please enter a tracking code.");
      return;
    }

    setIsSearching(true);

    // Search in Supabase
    const { data, error: searchError } = await supabase
      .from("submissions")
      .select("*")
      .eq("tracking_code", code)
      .single();

    if (searchError || !data) {
      setError("No submission found with this tracking code. Please check and try again.");
      setIsSearching(false);
      return;
    }

    setResult(data);
    
    // Fetch messages
    const { data: messagesData } = await supabase
      .from("messages")
      .select("*")
      .eq("submission_id", data.id)
      .order("created_at", { ascending: true });
    
    setMessages(messagesData || []);

    // Fetch attachments
    const { data: attachmentsData } = await supabase
      .from("attachments")
      .select("*")
      .eq("submission_id", data.id)
      .order("created_at", { ascending: true });
    
    setAttachments(attachmentsData || []);
    setImageCount((attachmentsData || []).filter(a => a.file_type === "image").length);
    
    setIsSearching(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !result) return;
    if (result.conversation_closed) {
      setError("This conversation has been closed by the admin.");
      return;
    }
    if (messages.length >= MAX_MESSAGES) {
      setError(`Maximum ${MAX_MESSAGES} messages reached. Please submit a new report if you have more to share.`);
      return;
    }

    setIsSendingMessage(true);
    
    const { error: msgError } = await supabase
      .from("messages")
      .insert([{
        submission_id: result.id,
        sender_type: "employee",
        message: newMessage.trim(),
      }]);

    if (msgError) {
      setError("Failed to send message. Please try again.");
      setIsSendingMessage(false);
      return;
    }

    // Refresh messages
    const { data: messagesData } = await supabase
      .from("messages")
      .select("*")
      .eq("submission_id", result.id)
      .order("created_at", { ascending: true });
    
    setMessages(messagesData || []);
    setNewMessage("");
    setIsSendingMessage(false);
  };

  // Image Upload
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - imageCount;
    
    if (files.length > remainingSlots) {
      setError(`You can only upload ${remainingSlots} more image(s). Maximum ${MAX_IMAGES} images per case.`);
      return;
    }

    // Validate file types
    const validFiles = files.filter(f => f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      setError("Please select only image files.");
      return;
    }

    setSelectedImages(validFiles);
  };

  const uploadImages = async () => {
    if (selectedImages.length === 0 || !result) return;
    
    setIsUploadingImage(true);
    setError("");

    try {
      for (const file of selectedImages) {
        const fileName = `${result.id}/${Date.now()}_${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from("trustroom-attachments")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("trustroom-attachments")
          .getPublicUrl(fileName);

        await supabase.from("attachments").insert([{
          submission_id: result.id,
          file_url: urlData.publicUrl,
          file_type: "image",
          file_name: file.name,
        }]);
      }

      // Refresh attachments
      const { data: attachmentsData } = await supabase
        .from("attachments")
        .select("*")
        .eq("submission_id", result.id)
        .order("created_at", { ascending: true });
      
      setAttachments(attachmentsData || []);
      setImageCount((attachmentsData || []).filter(a => a.file_type === "image").length);
      setSelectedImages([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError("Failed to upload images. Please try again.");
    }
    
    setIsUploadingImage(false);
  };

  // Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_VOICE_SECONDS - 1) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      setError("Could not access microphone. Please allow microphone access and try again.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const cancelRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const uploadVoiceNote = async () => {
    if (!audioBlob || !result) return;
    
    setIsUploadingVoice(true);
    setError("");

    try {
      const fileName = `${result.id}/voice_${Date.now()}.webm`;
      
      const { error: uploadError } = await supabase.storage
        .from("trustroom-attachments")
        .upload(fileName, audioBlob);

      if (uploadError) {
        setError("Failed to upload voice note. Please try again.");
        setIsUploadingVoice(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("trustroom-attachments")
        .getPublicUrl(fileName);

      await supabase.from("attachments").insert([{
        submission_id: result.id,
        file_url: urlData.publicUrl,
        file_type: "voice",
        file_name: "Voice Note",
        duration_seconds: recordingTime,
      }]);

      // Refresh attachments
      const { data: attachmentsData } = await supabase
        .from("attachments")
        .select("*")
        .eq("submission_id", result.id)
        .order("created_at", { ascending: true });
      
      setAttachments(attachmentsData || []);
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
    } catch (err) {
      setError("Failed to upload voice note. Please try again.");
    }
    
    setIsUploadingVoice(false);
  };

  const employeeMessageCount = messages.filter(m => m.sender_type === "employee").length;
  const canSendMessage = !result?.conversation_closed && messages.length < MAX_MESSAGES;
  const canUploadImages = imageCount < MAX_IMAGES;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-6 py-4 md:px-12 lg:px-20 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-semibold text-white">TrustRoom</span>
          </div>
          <Button
            onClick={onBackHome}
            variant="outline"
            className="border-slate-700 text-slate-400 hover:bg-slate-800"
          >
            ← Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Track Your Submission
            </h1>
            <p className="text-slate-400">
              Enter your tracking code to check status and communicate with the review team.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                placeholder="Enter tracking code (e.g., TR-X7K9M2)"
                className="flex-1 px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-mono text-lg tracking-wider"
              />
              <Button
                type="submit"
                disabled={isSearching}
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl"
              >
                {isSearching ? "Searching..." : "Track"}
              </Button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Tracking Code</p>
                      <code className="text-xl font-mono font-bold text-teal-400">{result.tracking_code}</code>
                    </div>
                    <div className={`px-4 py-2 rounded-full border ${statusInfo[result.status]?.color || statusInfo.new.color}`}>
                      {statusInfo[result.status]?.label || "New"}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 bg-slate-800/30 rounded-xl p-4">
                    <svg className="w-5 h-5 text-teal-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-slate-300 text-sm">{statusInfo[result.status]?.description || statusInfo.new.description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Category</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{categoryLabels[result.category]?.icon || "📝"}</span>
                        <span className="text-white">{categoryLabels[result.category]?.label || result.category}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Submitted On</p>
                      <p className="text-white">{formatDate(result.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation Closed Banner */}
              {result.conversation_closed && (
                <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-slate-400 text-sm">This conversation has been closed. If you have new concerns, please submit a new report.</p>
                  </div>
                </div>
              )}

              {/* Attachments Section */}
              {(attachments.length > 0 || canUploadImages) && (
                <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Attachments
                  </h3>

                  {/* Existing Attachments */}
                  {attachments.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                      {attachments.map((att) => (
                        <div key={att.id} className="relative">
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
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <span className="text-slate-300 text-sm">Voice Note</span>
                              </div>
                              <audio controls className="w-full h-8" src={att.file_url} />
                              {att.duration_seconds && (
                                <p className="text-slate-500 text-xs mt-1">{formatTime(att.duration_seconds)}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Images */}
                  {canUploadImages && !result.conversation_closed && (
                    <div className="mb-4">
                      <p className="text-slate-400 text-sm mb-2">Upload Images ({imageCount}/{MAX_IMAGES})</p>
                      <div className="flex gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          multiple
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Select Images
                        </Button>
                        {selectedImages.length > 0 && (
                          <Button
                            onClick={uploadImages}
                            disabled={isUploadingImage}
                            className="bg-teal-500 hover:bg-teal-600"
                          >
                            {isUploadingImage ? "Uploading..." : `Upload ${selectedImages.length} image(s)`}
                          </Button>
                        )}
                      </div>
                      {selectedImages.length > 0 && (
                        <p className="text-slate-500 text-sm mt-2">
                          Selected: {selectedImages.map(f => f.name).join(", ")}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Voice Recording */}
                  {!result.conversation_closed && (
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Voice Note (max {MAX_VOICE_SECONDS / 60} min)</p>
                      
                      {!isRecording && !audioUrl && (
                        <Button
                          onClick={startRecording}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          <svg className="w-4 h-4 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          Start Recording
                        </Button>
                      )}

                      {isRecording && (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-red-400">
                            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="font-mono">{formatTime(recordingTime)}</span>
                          </div>
                          <Button
                            onClick={stopRecording}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Stop Recording
                          </Button>
                        </div>
                      )}

                      {audioUrl && !isRecording && (
                        <div className="space-y-3">
                          <audio controls src={audioUrl} className="w-full" />
                          <div className="flex gap-2">
                            <Button
                              onClick={uploadVoiceNote}
                              disabled={isUploadingVoice}
                              className="bg-teal-500 hover:bg-teal-600"
                            >
                              {isUploadingVoice ? "Uploading..." : "Send Voice Note"}
                            </Button>
                            <Button
                              onClick={cancelRecording}
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Messages Section */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Conversation
                    <span className="text-slate-500 text-sm font-normal">({messages.length}/{MAX_MESSAGES} messages)</span>
                  </h3>
                </div>

                {/* Messages List */}
                <div className="p-6 max-h-96 overflow-y-auto space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500">No messages yet. The admin will respond here.</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_type === "employee" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.sender_type === "employee"
                              ? "bg-teal-500/20 border border-teal-500/30 text-teal-100"
                              : "bg-slate-700/50 border border-slate-600 text-slate-200"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                          <p className={`text-xs mt-2 ${msg.sender_type === "employee" ? "text-teal-400/60" : "text-slate-500"}`}>
                            {msg.sender_type === "employee" ? "You" : "Admin"} • {formatDate(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                {canSendMessage && (
                  <div className="px-6 py-4 border-t border-slate-700">
                    <div className="flex gap-3">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                        rows={2}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={isSendingMessage || !newMessage.trim()}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-6"
                      >
                        {isSendingMessage ? "..." : "Send"}
                      </Button>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">
                      {MAX_MESSAGES - messages.length} messages remaining
                    </p>
                  </div>
                )}
              </div>

              {/* Anonymity Reminder */}
              <div className="flex items-center gap-3 bg-slate-800/30 rounded-xl p-4">
                <span className="text-xl">🔒</span>
                <p className="text-slate-400 text-sm">
                  Your identity remains completely anonymous. This tracking code is the only link to your submission.
                </p>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!result && !error && (
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                You received a tracking code when you submitted your concern. Enter it above to see updates.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}