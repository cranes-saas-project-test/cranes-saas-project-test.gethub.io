import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, AlertCircle, Wrench, Package, Users } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'error', title: 'عطل في الرافعة #1', description: 'انقطاع في السلسلة' },
    { id: 2, type: 'warning', title: 'صيانة مستحقة', description: 'الرافعة #3 بحاجة لصيانة' }
  ]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate('/');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏗️ لوحة التحكم</h1>
        </div>
        <div className="header-right">
          <span className="username">مرحباً: {username}</span>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            خروج
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon crane">🏗️</div>
            <h3>إدارة الرافعات</h3>
            <p className="stat-number">12</p>
            <p className="stat-label">رافعة نشطة</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon alert">⚠️</div>
            <h3>التنبيهات</h3>
            <p className="stat-number">{alerts.length}</p>
            <p className="stat-label">تنبيهات نشطة</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon maintenance">🔧</div>
            <h3>الصيانة</h3>
            <p className="stat-number">5</p>
            <p className="stat-label">مستحقة الفحص</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon inventory">📦</div>
            <h3>المخزون</h3>
            <p className="stat-number">248</p>
            <p className="stat-label">قطعة غيار</p>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="alerts-section">
          <h2>
            <AlertCircle size={20} />
            التنبيهات الحالية
          </h2>
          <div className="alerts-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                <div className="alert-icon">
                  {alert.type === 'error' ? '❌' : '⚠️'}
                </div>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>إجراءات سريعة</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <Wrench size={24} />
              <span>تسجيل عطل</span>
            </button>
            <button className="action-btn">
              <Package size={24} />
              <span>إدارة المخزون</span>
            </button>
            <button className="action-btn">
              <Users size={24} />
              <span>إدارة الموردين</span>
            </button>
            <button className="action-btn">
              <AlertCircle size={24} />
              <span>عرض التقارير</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2026 شركة المقاولات التخصصية - كرينز | جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
