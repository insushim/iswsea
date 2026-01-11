"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Bell,
  Gift,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  ChevronRight,
  Home,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAdminStore, NoticeItem, EventItem } from "@/stores/adminStore";
import Link from "next/link";

type TabType = "notices" | "events" | "settings";

export default function AdminPage() {
  const {
    isAuthenticated,
    login,
    logout,
    notices,
    events,
    popupEnabled,
    setPopupEnabled,
    addNotice,
    updateNotice,
    deleteNotice,
    addEvent,
    updateEvent,
    deleteEvent,
    adminPassword,
    setAdminPassword,
  } = useAdminStore();

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("notices");
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [newNotice, setNewNotice] = useState<Omit<NoticeItem, "id">>({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    important: false,
    active: true,
  });

  const [newEvent, setNewEvent] = useState<Omit<EventItem, "id">>({
    title: "",
    period: "",
    description: "",
    highlight: "",
    conditions: [],
    badge: "",
    color: "#F5B041",
    active: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
    setPassword("");
  };

  const handleSaveNotice = () => {
    if (editingNotice) {
      updateNotice(editingNotice.id, editingNotice);
      setEditingNotice(null);
      showSaveMessage("공지사항이 수정되었습니다.");
    }
  };

  const handleAddNotice = () => {
    if (newNotice.title && newNotice.content) {
      addNotice(newNotice);
      setNewNotice({
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
        important: false,
        active: true,
      });
      setIsAddingNotice(false);
      showSaveMessage("공지사항이 추가되었습니다.");
    }
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      updateEvent(editingEvent.id, editingEvent);
      setEditingEvent(null);
      showSaveMessage("이벤트가 수정되었습니다.");
    }
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description) {
      addEvent(newEvent);
      setNewEvent({
        title: "",
        period: "",
        description: "",
        highlight: "",
        conditions: [],
        badge: "",
        color: "#F5B041",
        active: true,
      });
      setIsAddingEvent(false);
      showSaveMessage("이벤트가 추가되었습니다.");
    }
  };

  const handleChangePassword = () => {
    if (newPassword.length >= 4) {
      setAdminPassword(newPassword);
      setNewPassword("");
      showSaveMessage("비밀번호가 변경되었습니다.");
    }
  };

  const showSaveMessage = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1a2332] to-[#0F1419] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#1a2332] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4A9F6D] to-[#2d5a3d] flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white text-center mb-2">관리자 로그인</h1>
              <p className="text-white/60 text-center mb-8">숲속의바다 펜션 관리 시스템</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="관리자 비밀번호"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D] transition-all ${
                      loginError ? "border-red-500 shake" : "border-white/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {loginError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      비밀번호가 올바르지 않습니다.
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#4A9F6D] to-[#3D8A5A] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4A9F6D]/20 transition-all"
                >
                  로그인
                </button>
              </form>
            </div>

            <div className="px-8 py-4 bg-black/20 border-t border-white/5">
              <Link href="/" className="flex items-center justify-center gap-2 text-white/50 hover:text-white/70 transition-colors text-sm">
                <Home className="w-4 h-4" />
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1a2332] to-[#0F1419]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a2332]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A9F6D] to-[#2d5a3d] flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">관리자 대시보드</h1>
                <p className="text-xs text-white/50">숲속의바다 펜션</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">사이트 보기</span>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/80 text-sm flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Message */}
      <AnimatePresence>
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-[#4A9F6D] text-white rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {saveMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "notices" as TabType, label: "공지사항", icon: Bell },
            { id: "events" as TabType, label: "이벤트/팝업", icon: Gift },
            { id: "settings" as TabType, label: "설정", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#4A9F6D] text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notices Tab */}
        {activeTab === "notices" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">공지사항 관리</h2>
              <button
                onClick={() => setIsAddingNotice(true)}
                className="px-4 py-2 bg-[#4A9F6D] hover:bg-[#3D8A5A] text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                새 공지사항
              </button>
            </div>

            {/* Add Notice Form */}
            <AnimatePresence>
              {isAddingNotice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#1a2332] rounded-xl border border-white/10 p-6 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white">새 공지사항 작성</h3>
                  <input
                    type="text"
                    placeholder="제목"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                  />
                  <textarea
                    placeholder="내용"
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D] resize-none"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newNotice.important}
                        onChange={(e) => setNewNotice({ ...newNotice, important: e.target.checked })}
                        className="w-4 h-4 rounded bg-white/10 border-white/20"
                      />
                      중요 공지
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddNotice}
                      className="px-6 py-2 bg-[#4A9F6D] text-white rounded-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      저장
                    </button>
                    <button
                      onClick={() => setIsAddingNotice(false)}
                      className="px-6 py-2 bg-white/10 text-white rounded-lg"
                    >
                      취소
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notice List */}
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-[#1a2332] rounded-xl border border-white/10 overflow-hidden">
                  {editingNotice?.id === notice.id ? (
                    <div className="p-6 space-y-4">
                      <input
                        type="text"
                        value={editingNotice.title}
                        onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                      />
                      <textarea
                        value={editingNotice.content}
                        onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9F6D] resize-none"
                      />
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingNotice.important}
                            onChange={(e) => setEditingNotice({ ...editingNotice, important: e.target.checked })}
                            className="w-4 h-4 rounded bg-white/10"
                          />
                          중요 공지
                        </label>
                        <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingNotice.active}
                            onChange={(e) => setEditingNotice({ ...editingNotice, active: e.target.checked })}
                            className="w-4 h-4 rounded bg-white/10"
                          />
                          활성화
                        </label>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleSaveNotice}
                          className="px-6 py-2 bg-[#4A9F6D] text-white rounded-lg flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          저장
                        </button>
                        <button
                          onClick={() => setEditingNotice(null)}
                          className="px-6 py-2 bg-white/10 text-white rounded-lg"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {notice.important && (
                            <span className="px-2 py-1 bg-[#F5B041]/20 text-[#F5B041] text-xs font-medium rounded">
                              중요
                            </span>
                          )}
                          {!notice.active && (
                            <span className="px-2 py-1 bg-white/10 text-white/40 text-xs font-medium rounded">
                              비활성
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-white">{notice.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingNotice(notice)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-white/60" />
                          </button>
                          <button
                            onClick={() => deleteNotice(notice.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm mb-2">{notice.date}</p>
                      <p className="text-white/70 text-sm whitespace-pre-wrap line-clamp-3">{notice.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            {/* Popup Toggle */}
            <div className="bg-[#1a2332] rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">이벤트 팝업</h3>
                  <p className="text-white/50 text-sm">사이트 방문 시 이벤트 팝업 표시 여부</p>
                </div>
                <button
                  onClick={() => setPopupEnabled(!popupEnabled)}
                  className={`p-2 rounded-lg transition-colors ${
                    popupEnabled ? "bg-[#4A9F6D] text-white" : "bg-white/10 text-white/60"
                  }`}
                >
                  {popupEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">이벤트 관리</h2>
              <button
                onClick={() => setIsAddingEvent(true)}
                className="px-4 py-2 bg-[#4A9F6D] hover:bg-[#3D8A5A] text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                새 이벤트
              </button>
            </div>

            {/* Add Event Form */}
            <AnimatePresence>
              {isAddingEvent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#1a2332] rounded-xl border border-white/10 p-6 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white">새 이벤트 작성</h3>
                  <input
                    type="text"
                    placeholder="제목"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="기간 (예: 11월 ~ 3월)"
                      value={newEvent.period}
                      onChange={(e) => setNewEvent({ ...newEvent, period: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                    />
                    <input
                      type="text"
                      placeholder="배지 (예: 동절기)"
                      value={newEvent.badge}
                      onChange={(e) => setNewEvent({ ...newEvent, badge: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="하이라이트 (예: 10% 할인)"
                    value={newEvent.highlight}
                    onChange={(e) => setNewEvent({ ...newEvent, highlight: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                  />
                  <textarea
                    placeholder="설명"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D] resize-none"
                  />
                  <div className="flex items-center gap-4">
                    <label className="text-white/70">테마 색상:</label>
                    <input
                      type="color"
                      value={newEvent.color}
                      onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddEvent}
                      className="px-6 py-2 bg-[#4A9F6D] text-white rounded-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      저장
                    </button>
                    <button
                      onClick={() => setIsAddingEvent(false)}
                      className="px-6 py-2 bg-white/10 text-white rounded-lg"
                    >
                      취소
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Event List */}
            <div className="grid gap-4">
              {events.map((event) => (
                <div key={event.id} className="bg-[#1a2332] rounded-xl border border-white/10 overflow-hidden">
                  {editingEvent?.id === event.id ? (
                    <div className="p-6 space-y-4">
                      <input
                        type="text"
                        value={editingEvent.title}
                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={editingEvent.period}
                          onChange={(e) => setEditingEvent({ ...editingEvent, period: e.target.value })}
                          placeholder="기간"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                        />
                        <input
                          type="text"
                          value={editingEvent.badge || ""}
                          onChange={(e) => setEditingEvent({ ...editingEvent, badge: e.target.value })}
                          placeholder="배지"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                        />
                      </div>
                      <input
                        type="text"
                        value={editingEvent.highlight || ""}
                        onChange={(e) => setEditingEvent({ ...editingEvent, highlight: e.target.value })}
                        placeholder="하이라이트"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                      />
                      <textarea
                        value={editingEvent.description}
                        onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9F6D] resize-none"
                      />
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <label className="text-white/70">색상:</label>
                          <input
                            type="color"
                            value={editingEvent.color}
                            onChange={(e) => setEditingEvent({ ...editingEvent, color: e.target.value })}
                            className="w-10 h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                        <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingEvent.active}
                            onChange={(e) => setEditingEvent({ ...editingEvent, active: e.target.checked })}
                            className="w-4 h-4 rounded bg-white/10"
                          />
                          활성화
                        </label>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleSaveEvent}
                          className="px-6 py-2 bg-[#4A9F6D] text-white rounded-lg flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          저장
                        </button>
                        <button
                          onClick={() => setEditingEvent(null)}
                          className="px-6 py-2 bg-white/10 text-white rounded-lg"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {event.badge && (
                            <span
                              className="px-2 py-1 text-xs font-medium rounded text-white"
                              style={{ backgroundColor: event.color }}
                            >
                              {event.badge}
                            </span>
                          )}
                          {!event.active && (
                            <span className="px-2 py-1 bg-white/10 text-white/40 text-xs font-medium rounded">
                              비활성
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingEvent(event)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-white/60" />
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm mb-2">{event.period}</p>
                      {event.highlight && (
                        <span
                          className="inline-block px-3 py-1 rounded text-sm font-medium mb-2"
                          style={{ backgroundColor: `${event.color}20`, color: event.color }}
                        >
                          {event.highlight}
                        </span>
                      )}
                      <p className="text-white/70 text-sm">{event.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">설정</h2>

            {/* Password Change */}
            <div className="bg-[#1a2332] rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">비밀번호 변경</h3>
              <div className="flex gap-4">
                <input
                  type="password"
                  placeholder="새 비밀번호 (4자 이상)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4A9F6D]"
                />
                <button
                  onClick={handleChangePassword}
                  disabled={newPassword.length < 4}
                  className="px-6 py-3 bg-[#4A9F6D] hover:bg-[#3D8A5A] disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  변경
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-[#1a2332] rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">시스템 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">공지사항 수</span>
                  <span className="text-white">{notices.length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">활성 공지사항</span>
                  <span className="text-white">{notices.filter(n => n.active).length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">이벤트 수</span>
                  <span className="text-white">{events.length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">활성 이벤트</span>
                  <span className="text-white">{events.filter(e => e.active).length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">팝업 상태</span>
                  <span className={popupEnabled ? "text-[#4A9F6D]" : "text-white/40"}>
                    {popupEnabled ? "활성화" : "비활성화"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
