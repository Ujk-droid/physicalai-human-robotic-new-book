// src\theme\Navbar\UserProfileButton.tsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { AuthContext } from '@site/src/components/AuthContext';
import styles from './UserProfileButton.module.css';

interface BackgroundFormData {
  programming_experience: string;
  robotics_experience: string;
  preferred_languages: string[];
  hardware_access: string[];
}

export default function UserProfileButton(): JSX.Element {
  const { user, isAuthenticated, login, signup, logout, updateBackground } = useContext(AuthContext);
  const { colorMode, setColorMode } = useColorMode();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [background, setBackground] = useState<BackgroundFormData>({
    programming_experience: 'intermediate',
    robotics_experience: 'none',
    preferred_languages: [],
    hardware_access: [],
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load user background when editing
  useEffect(() => {
    if (user?.background) {
      setBackground({
        programming_experience: user.background.programming_experience || 'intermediate',
        robotics_experience: user.background.robotics_experience || 'none',
        preferred_languages: user.background.preferred_languages || [],
        hardware_access: user.background.hardware_access || [],
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    // Name validation (for signup)
    if (isSignup && !name.trim()) {
      errors.name = 'Name is required';
    } else if (isSignup && name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (isSignup && !/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      errors.password = 'Password must contain uppercase and lowercase letters';
    }
    
    // Programming languages validation (for signup)
    if (isSignup && background.preferred_languages.length === 0) {
      errors.languages = 'Please select at least one programming language';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isSignup) {
        await signup(email, password, name, background);
      } else {
        await login(email, password);
      }
      setShowAuthModal(false);
      resetForm();
    } catch (err) {
      // Better error message parsing
      let errorMessage = 'Authentication failed';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        errorMessage = JSON.stringify(err);
      }
      setError(errorMessage);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBackground(background);
    setShowEditModal(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setValidationErrors({});
    setBackground({
      programming_experience: 'intermediate',
      robotics_experience: 'none',
      preferred_languages: [],
      hardware_access: [],
    });
  };

  const toggleLanguage = (lang: string) => {
    setBackground(prev => ({
      ...prev,
      preferred_languages: prev.preferred_languages.includes(lang)
        ? prev.preferred_languages.filter(l => l !== lang)
        : [...prev.preferred_languages, lang],
    }));
  };

  const toggleHardware = (hw: string) => {
    setBackground(prev => ({
      ...prev,
      hardware_access: prev.hardware_access.includes(hw)
        ? prev.hardware_access.filter(h => h !== hw)
        : [...prev.hardware_access, hw],
    }));
  };

  const toggleTheme = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.profileButton}
        onClick={() => isAuthenticated ? setShowDropdown(!showDropdown) : setShowAuthModal(true)}
        aria-label="User menu"
      >
        {isAuthenticated && user ? (
          <span className={styles.avatar}>{getInitials(user.name)}</span>
        ) : (
          <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && isAuthenticated && user && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownAvatar}>{getInitials(user.name)}</span>
            <div className={styles.dropdownUserInfo}>
              <span className={styles.dropdownName}>{user.name}</span>
              <span className={styles.dropdownEmail}>{user.email}</span>
            </div>
          </div>
          
          <div className={styles.dropdownDivider} />
          
          <button className={styles.dropdownItem} onClick={toggleTheme}>
            {colorMode === 'dark' ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                Dark Mode
              </>
            )}
          </button>
          
          <button className={styles.dropdownItem} onClick={() => { setShowEditModal(true); setShowDropdown(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </button>
          
          <a 
            href="https://github.com/BismaYousuf" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.dropdownItem}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          
          <div className={styles.dropdownDivider} />
          
          <button className={styles.dropdownItem} onClick={() => { logout(); setShowDropdown(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowAuthModal(false)}>×</button>
            <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
            
            <form onSubmit={handleAuthSubmit}>
              {isSignup && (
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => { setName(e.target.value); setValidationErrors(prev => ({...prev, name: ''})); }} 
                    className={validationErrors.name ? styles.inputError : ''}
                    placeholder="Your name" 
                  />
                  {validationErrors.name && <span className={styles.fieldError}>{validationErrors.name}</span>}
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => { setEmail(e.target.value); setValidationErrors(prev => ({...prev, email: ''})); }} 
                  className={validationErrors.email ? styles.inputError : ''}
                  placeholder="your@email.com" 
                />
                {validationErrors.email && <span className={styles.fieldError}>{validationErrors.email}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Password {isSignup && <span className={styles.hint}>(min 6 chars, uppercase & lowercase)</span>}</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => { setPassword(e.target.value); setValidationErrors(prev => ({...prev, password: ''})); }} 
                  className={validationErrors.password ? styles.inputError : ''}
                  placeholder="••••••••" 
                />
                {validationErrors.password && <span className={styles.fieldError}>{validationErrors.password}</span>}
              </div>

              {isSignup && (
                <>
                  <h3>Your Background</h3>
                  <p className={styles.hint}>Help us personalize your learning experience</p>
                  
                  <div className={styles.formGroup}>
                    <label>Programming Experience</label>
                    <select value={background.programming_experience} onChange={e => setBackground(prev => ({ ...prev, programming_experience: e.target.value }))}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Robotics Experience</label>
                    <select value={background.robotics_experience} onChange={e => setBackground(prev => ({ ...prev, robotics_experience: e.target.value }))}>
                      <option value="none">None</option>
                      <option value="hobbyist">Hobbyist</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Programming Languages <span className={styles.required}>*</span></label>
                    <div className={styles.checkboxGroup}>
                      {['Python', 'C++', 'JavaScript', 'Rust', 'Java'].map(lang => (
                        <label key={lang} className={styles.checkbox}>
                          <input 
                            type="checkbox" 
                            checked={background.preferred_languages.includes(lang)} 
                            onChange={() => { toggleLanguage(lang); setValidationErrors(prev => ({...prev, languages: ''})); }} 
                          />
                          {lang}
                        </label>
                      ))}
                    </div>
                    {validationErrors.languages && <span className={styles.fieldError}>{validationErrors.languages}</span>}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Hardware Access</label>
                    <div className={styles.checkboxGroup}>
                      {['Jetson Nano', 'Raspberry Pi', 'Arduino', 'RealSense Camera', 'LIDAR'].map(hw => (
                        <label key={hw} className={styles.checkbox}>
                          <input type="checkbox" checked={background.hardware_access.includes(hw)} onChange={() => toggleHardware(hw)} />
                          {hw}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {error && <div className={styles.error}>{error}</div>}
              <button type="submit" className={styles.submitButton}>{isSignup ? 'Create Account' : 'Sign In'}</button>
            </form>
            
            <div className={styles.switchMode}>
              {isSignup ? (
                <>Already have an account? <button onClick={() => setIsSignup(false)}>Sign In</button></>
              ) : (
                <>Don't have an account? <button onClick={() => setIsSignup(true)}>Sign Up</button></>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowEditModal(false)}>×</button>
            <h2>Edit Profile</h2>
            
            <form onSubmit={handleEditSubmit}>
              <div className={styles.formGroup}>
                <label>Programming Experience</label>
                <select value={background.programming_experience} onChange={e => setBackground(prev => ({ ...prev, programming_experience: e.target.value }))}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Robotics Experience</label>
                <select value={background.robotics_experience} onChange={e => setBackground(prev => ({ ...prev, robotics_experience: e.target.value }))}>
                  <option value="none">None</option>
                  <option value="hobbyist">Hobbyist</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Programming Languages</label>
                <div className={styles.checkboxGroup}>
                  {['Python', 'C++', 'JavaScript', 'Rust', 'Java'].map(lang => (
                    <label key={lang} className={styles.checkbox}>
                      <input type="checkbox" checked={background.preferred_languages.includes(lang)} onChange={() => toggleLanguage(lang)} />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Hardware Access</label>
                <div className={styles.checkboxGroup}>
                  {['Jetson Nano', 'Raspberry Pi', 'Arduino', 'RealSense Camera', 'LIDAR'].map(hw => (
                    <label key={hw} className={styles.checkbox}>
                      <input type="checkbox" checked={background.hardware_access.includes(hw)} onChange={() => toggleHardware(hw)} />
                      {hw}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
