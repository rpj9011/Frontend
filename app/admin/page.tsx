'use client'

import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Mail, Phone, DollarSign, Target, Calendar } from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check both localStorage and sessionStorage
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-off-white">
        <div className="text-luxury-charcoal">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        // Store token based on remember me preference
        if (rememberMe) {
          localStorage.setItem('adminToken', data.token)
        } else {
          sessionStorage.setItem('adminToken', data.token)
        }
        onLogin()
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Connection error. Please ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-off-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-luxury-gold/10">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-display font-light text-luxury-charcoal mb-2">
              Agency K
            </h1>
            <div className="w-12 h-[1px] bg-luxury-gold mx-auto mb-4"></div>
            <p className="text-xs sm:text-sm text-luxury-mid-gray uppercase tracking-ultra-wide">
              Admin Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-light text-luxury-charcoal mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 sm:py-3 bg-luxury-off-white border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors text-luxury-charcoal text-sm sm:text-base"
                placeholder="admin@agencyk.in"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-luxury-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 sm:py-3 bg-luxury-off-white border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors text-luxury-charcoal text-sm sm:text-base"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-luxury-gold border-luxury-gold/20 rounded focus:ring-luxury-gold"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-luxury-charcoal">
                Remember me
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-luxury-gold text-white py-2.5 sm:py-3 px-6 rounded-lg hover:bg-luxury-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-light tracking-wide text-sm sm:text-base"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center text-xs text-luxury-mid-gray">
            Default: admin@agencyk.in / admin123
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<any>(null)
  const [leads, setLeads] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    loadStats()
    loadLeads()
    setupWebSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    loadLeads()
  }, [currentPage, statusFilter])

  const setupWebSocket = () => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
    
    const socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    })

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket')
      socket.emit('authenticate', token)
    })

    socket.on('new-lead', (lead) => {
      console.log('📢 New lead received:', lead)
      
      // Add notification
      const notification = {
        id: Date.now(),
        lead,
        timestamp: new Date(),
        read: false
      }
      
      setNotifications(prev => [notification, ...prev])
      setUnreadCount(prev => prev + 1)
      
      // Show browser notification if permitted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Lead Received!', {
          body: `${lead.company} - ${lead.name}`,
          icon: '/favicon.ico'
        })
      }
      
      // Refresh stats and leads
      loadStats()
      if (statusFilter === 'all' || statusFilter === 'new') {
        loadLeads()
      }
    })

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket')
    })

    socketRef.current = socket
  }

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.status === 401) {
        handleLogout()
        return
      }

      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const loadLeads = async () => {
    try {
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery })
      })

      const response = await fetch(`http://localhost:5000/api/admin/leads?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.status === 401) {
        handleLogout()
        return
      }

      const data = await response.json()
      if (data.success) {
        setLeads(data.leads)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to load leads:', error)
    }
  }

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
      await fetch(`http://localhost:5000/api/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })
      loadStats()
      loadLeads()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    sessionStorage.removeItem('adminToken')
    if (socketRef.current) {
      socketRef.current.disconnect()
    }
    onLogout()
  }

  const handleSearch = () => {
    setCurrentPage(1)
    loadLeads()
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-purple-100 text-purple-800',
      'converted': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || ''
  }

  return (
    <div className="min-h-screen bg-luxury-off-white">
      {/* Mobile-Friendly Header */}
      <header className="bg-white border-b border-luxury-gold/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-lg sm:text-2xl font-display font-light text-luxury-charcoal">
                Agency K
              </h1>
              <p className="text-xs sm:text-sm text-luxury-mid-gray mt-0.5 hidden sm:block">Lead Management</p>
            </div>
            
            {/* Notification Bell */}
            <div className="relative mr-2 sm:mr-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-luxury-charcoal hover:bg-luxury-gold/10 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg animate-bounce">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-[420px] bg-white rounded-xl shadow-2xl border border-luxury-gold/20 max-h-[500px] overflow-hidden z-50">
                  <div className="p-4 border-b border-luxury-gold/10 flex justify-between items-center sticky top-0 bg-gradient-to-r from-luxury-gold/5 to-luxury-off-white backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <h3 className="font-medium text-luxury-charcoal">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-luxury-gold hover:text-luxury-gold/80 font-medium transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  {notifications.length === 0 ? (
                    <div className="p-12 text-center">
                      <svg className="w-16 h-16 mx-auto text-luxury-mid-gray/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-luxury-mid-gray text-sm">No notifications yet</p>
                      <p className="text-luxury-mid-gray/60 text-xs mt-1">New leads will appear here</p>
                    </div>
                  ) : (
                    <div className="overflow-y-auto max-h-[440px]">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-luxury-gold/5 hover:bg-luxury-off-white transition-all cursor-pointer group ${
                            !notif.read ? 'bg-gradient-to-r from-blue-50/50 to-transparent border-l-4 border-l-luxury-gold' : 'border-l-4 border-l-transparent'
                          }`}
                          onClick={() => markNotificationAsRead(notif.id)}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              !notif.read ? 'bg-luxury-gold/10' : 'bg-luxury-off-white'
                            }`}>
                              <svg className={`w-5 h-5 ${!notif.read ? 'text-luxury-gold' : 'text-luxury-mid-gray'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm font-semibold text-luxury-charcoal group-hover:text-luxury-gold transition-colors">
                                  {notif.lead.company}
                                </h4>
                                {!notif.read && (
                                  <span className="flex-shrink-0 w-2 h-2 bg-luxury-gold rounded-full mt-1.5 animate-pulse"></span>
                                )}
                              </div>
                              
                              <p className="text-xs text-luxury-charcoal font-medium mb-2">
                                {notif.lead.name}
                              </p>
                              
                              <div className="space-y-1.5 mb-2">
                                <div className="flex items-center gap-2 text-xs text-luxury-mid-gray">
                                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <span className="truncate">{notif.lead.email}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-luxury-mid-gray">
                                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  <span>{notif.lead.phone}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-luxury-mid-gray">
                                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="font-medium text-luxury-gold">₹{notif.lead.budget}</span>
                                </div>
                              </div>
                              
                              {/* Services */}
                              <div className="flex flex-wrap gap-1 mb-2">
                                {notif.lead.services.slice(0, 2).map((service: string, idx: number) => (
                                  <span key={idx} className="text-xs bg-luxury-gold/10 text-luxury-charcoal px-2 py-0.5 rounded-full">
                                    {service}
                                  </span>
                                ))}
                                {notif.lead.services.length > 2 && (
                                  <span className="text-xs bg-luxury-mid-gray/10 text-luxury-mid-gray px-2 py-0.5 rounded-full">
                                    +{notif.lead.services.length - 2} more
                                  </span>
                                )}
                              </div>
                              
                              {/* Message Preview */}
                              {notif.lead.message && (
                                <div className="bg-luxury-off-white rounded-lg p-2 mb-2">
                                  <p className="text-xs text-luxury-mid-gray line-clamp-2">
                                    "{notif.lead.message}"
                                  </p>
                                </div>
                              )}
                              
                              {/* Timestamp */}
                              <div className="flex items-center gap-1 text-xs text-luxury-mid-gray/70">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{new Date(notif.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-luxury-charcoal text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-luxury-charcoal/90 transition-colors text-xs sm:text-sm font-light"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Grid - Mobile Optimized */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
            <StatCard label="Total Leads" value={stats.totalLeads} color="text-luxury-charcoal" />
            <StatCard label="Today" value={stats.todayLeads} color="text-luxury-gold" />
            <StatCard label="This Week" value={stats.weekLeads} color="text-blue-600" />
            <StatCard label="This Month" value={stats.monthLeads} color="text-green-600" />
          </div>
        )}

        {/* Filters - Mobile Optimized */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-luxury-gold/10 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 sm:px-4 py-2 bg-luxury-off-white border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-charcoal text-sm"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="flex-1 px-3 sm:px-4 py-2 bg-luxury-off-white border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold text-luxury-charcoal text-sm"
            />

            <button
              onClick={handleSearch}
              className="bg-luxury-gold text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-luxury-gold/90 transition-colors text-sm whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>

        {/* Leads Table - Mobile Optimized */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-luxury-gold/10 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-luxury-gold/10">
            <h2 className="text-base sm:text-lg font-light text-luxury-charcoal">Recent Leads</h2>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-luxury-gold/10">
            {leads.map((lead) => (
              <div key={lead._id} className="p-4 hover:bg-luxury-off-white transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-luxury-charcoal">{lead.name}</div>
                    <div className="text-xs text-luxury-mid-gray">{lead.company}</div>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(lead.status)}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="text-xs text-luxury-mid-gray space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span className="font-medium">₹{lead.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span className="truncate">{lead.services.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-luxury-gold/10">
              <thead className="bg-luxury-off-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-light text-luxury-mid-gray uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-luxury-mid-gray uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-luxury-mid-gray uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-luxury-mid-gray uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-luxury-mid-gray uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-light text-luxury-mid-gray uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-luxury-gold/10">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-luxury-off-white transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-light text-luxury-charcoal">{lead.name}</div>
                      <div className="text-xs text-luxury-mid-gray">{lead.email}</div>
                      <div className="text-xs text-luxury-mid-gray">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-charcoal">
                      {lead.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-charcoal">
                      ₹{lead.budget}
                    </td>
                    <td className="px-6 py-4 text-sm text-luxury-charcoal">
                      {lead.services.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                        className={`text-xs px-3 py-1 rounded-full border-0 ${getStatusColor(lead.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-mid-gray">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination - Mobile Optimized */}
          {pagination && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-luxury-gold/10 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-xs sm:text-sm text-luxury-mid-gray text-center sm:text-left">
                Showing {((pagination.current - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.current * pagination.limit, pagination.total)} of{' '}
                {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-2 border border-luxury-gold/20 rounded-lg hover:bg-luxury-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                  className="px-3 sm:px-4 py-2 border border-luxury-gold/20 rounded-lg hover:bg-luxury-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-luxury-gold/10 p-4 sm:p-6">
      <h3 className="text-xs sm:text-sm font-light text-luxury-mid-gray mb-1 sm:mb-2">{label}</h3>
      <p className={`text-xl sm:text-3xl font-display font-light ${color}`}>{value}</p>
    </div>
  )
}
