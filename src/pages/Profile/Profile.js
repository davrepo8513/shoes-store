import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Heart,
  ShoppingBag,
  Settings,
  Bell,
  Shield,
  CreditCard
} from 'lucide-react';
import { useToast } from '../../components/Toast/Toast';
import './Profile.css';

const Profile = () => {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    avatar: null
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
    success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderProfileTab = () => (
    <div className="profile-content">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" />
            ) : (
              <User size={40} />
            )}
          </div>
          <div className="profile-info">
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>{profile.email}</p>
          </div>
        </div>
        <button 
          className={`edit-btn ${isEditing ? 'cancel' : ''}`}
          onClick={isEditing ? handleCancel : handleEdit}
        >
          {isEditing ? <X size={20} /> : <Edit3 size={20} />}
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-form">
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={isEditing ? editedProfile.firstName : profile.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={isEditing ? editedProfile.lastName : profile.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={isEditing ? editedProfile.email : profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={isEditing ? editedProfile.phone : profile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group full-width">
            <label>Address</label>
            <input
              type="text"
              value={isEditing ? editedProfile.address : profile.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={isEditing ? editedProfile.city : profile.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              value={isEditing ? editedProfile.state : profile.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              value={isEditing ? editedProfile.zipCode : profile.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={20} />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="orders-content">
      <div className="orders-header">
        <h3>Order History</h3>
        <p>Track and manage your orders</p>
      </div>
      <div className="orders-list">
        <div className="order-item">
          <div className="order-info">
            <div className="order-number">#ORD-2024-001</div>
            <div className="order-date">March 15, 2024</div>
          </div>
          <div className="order-status delivered">Delivered</div>
          <div className="order-total">$299.99</div>
        </div>
        <div className="order-item">
          <div className="order-info">
            <div className="order-number">#ORD-2024-002</div>
            <div className="order-date">March 10, 2024</div>
          </div>
          <div className="order-status shipped">Shipped</div>
          <div className="order-total">$189.99</div>
        </div>
        <div className="order-item">
          <div className="order-info">
            <div className="order-number">#ORD-2024-003</div>
            <div className="order-date">March 5, 2024</div>
          </div>
          <div className="order-status processing">Processing</div>
          <div className="order-total">$149.99</div>
        </div>
      </div>
    </div>
  );

  const renderWishlistTab = () => (
    <div className="wishlist-content">
      <div className="wishlist-header">
        <h3>My Wishlist</h3>
        <p>Items you've saved for later</p>
      </div>
      <div className="empty-state">
        <Heart size={64} className="empty-icon" />
        <h4>Your wishlist is empty</h4>
        <p>Start adding items to your wishlist by clicking the heart icon on products.</p>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h4>
          <Bell size={20} />
          Notifications
        </h4>
        <div className="setting-item">
          <div className="setting-info">
            <span>Email Notifications</span>
            <small>Receive updates about your orders and promotions</small>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>SMS Notifications</span>
            <small>Get text messages about order updates</small>
          </div>
          <label className="toggle">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h4>
          <Shield size={20} />
          Privacy & Security
        </h4>
        <div className="setting-item">
          <div className="setting-info">
            <span>Two-Factor Authentication</span>
            <small>Add an extra layer of security to your account</small>
          </div>
          <button className="btn btn-outline">Enable</button>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Data Privacy</span>
            <small>Manage how your data is used</small>
          </div>
          <button className="btn btn-outline">Manage</button>
        </div>
      </div>

      <div className="settings-section">
        <h4>
          <CreditCard size={20} />
          Payment Methods
        </h4>
        <div className="setting-item">
          <div className="setting-info">
            <span>Saved Cards</span>
            <small>Manage your saved payment methods</small>
          </div>
          <button className="btn btn-outline">Manage</button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'orders':
        return renderOrdersTab();
      case 'wishlist':
        return renderWishlistTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-container"
        >
          <div className="profile-sidebar">
            <div className="sidebar-header">
              <div className="user-avatar">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" />
                ) : (
                  <User size={32} />
                )}
              </div>
              <div className="user-info">
                <h3>{profile.firstName} {profile.lastName}</h3>
                <p>Member since 2024</p>
              </div>
            </div>
            <nav className="sidebar-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="profile-main">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;