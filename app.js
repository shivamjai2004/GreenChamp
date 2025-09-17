// Application Data
const appData = {
  "schools": [
    {"id": 1, "name": "Government Senior Secondary School, Ludhiana", "points": 15420, "students": 245},
    {"id": 2, "name": "Punjab School Education Board, Chandigarh", "points": 14890, "students": 189},
    {"id": 3, "name": "Government High School, Amritsar", "points": 13675, "students": 298},
    {"id": 4, "name": "Khalsa College Public School, Patiala", "points": 12980, "students": 167},
    {"id": 5, "name": "Government Senior Secondary School, Jalandhar", "points": 11540, "students": 234}
  ],
  "challenges": [
    {
      "id": 1,
      "title": "Turn Off Unnecessary Lights",
      "category": "Energy Conservation",
      "description": "Switch off lights in unused rooms for one week and document energy savings",
      "points": 25,
      "difficulty": "Easy",
      "icon": "💡",
      "instructions": "Take before/after photos of rooms with lights off, note electricity meter readings"
    },
    {
      "id": 2,
      "title": "Waste Segregation Champion",
      "category": "Waste Management", 
      "description": "Properly segregate household waste into wet, dry, and hazardous categories for 2 weeks",
      "points": 50,
      "difficulty": "Medium",
      "icon": "♻️",
      "instructions": "Photo document properly segregated waste bins with labels"
    },
    {
      "id": 3,
      "title": "Plant a Native Tree",
      "category": "Biodiversity",
      "description": "Plant and care for a native Punjab tree species like Neem, Banyan, or Mango",
      "points": 100,
      "difficulty": "Hard",
      "icon": "🌳",
      "instructions": "Document planting process, location, species, and commit to 30-day care routine"
    },
    {
      "id": 4,
      "title": "Water Conservation Audit",
      "category": "Water Conservation",
      "description": "Identify and fix water leaks in your home/school, measure water saved",
      "points": 75,
      "difficulty": "Medium",
      "icon": "💧",
      "instructions": "Photo document leaks found, repairs made, and water meter difference"
    },
    {
      "id": 5,
      "title": "Stubble Burning Awareness",
      "category": "Punjab-Specific",
      "description": "Create awareness campaign about alternatives to stubble burning in rural areas",
      "points": 80,
      "difficulty": "Hard",
      "icon": "🔥",
      "instructions": "Design posters/videos about composting, biogas, or other alternatives"
    },
    {
      "id": 6,
      "title": "Plastic-Free Day Challenge",
      "category": "Waste Management",
      "description": "Avoid single-use plastics for 7 consecutive days, use alternatives",
      "points": 40,
      "difficulty": "Medium",
      "icon": "🚫",
      "instructions": "Daily photos of plastic-free alternatives used (cloth bags, steel bottles, etc.)"
    }
  ],
  "badges": [
    {
      "id": 1,
      "name": "First Steps",
      "description": "Completed your first environmental challenge",
      "icon": "🎯",
      "condition": "Complete 1 challenge"
    },
    {
      "id": 2,
      "name": "Waste Warrior",
      "description": "Completed 5 waste management challenges",
      "icon": "♻️",
      "condition": "Complete 5 waste challenges"
    },
    {
      "id": 3,
      "name": "Energy Saver",
      "description": "Master of energy conservation challenges",
      "icon": "⚡",
      "condition": "Complete 3 energy challenges"
    },
    {
      "id": 4,
      "name": "Tree Friend",
      "description": "Planted and cared for trees",
      "icon": "🌳",
      "condition": "Complete tree planting challenges"
    },
    {
      "id": 5,
      "name": "Punjab Guardian", 
      "description": "Champion of Punjab-specific environmental issues",
      "icon": "🏆",
      "condition": "Complete 3 Punjab-specific challenges"
    }
  ],
  "levels": [
    {"name": "Eco-Explorer", "minPoints": 0, "maxPoints": 250, "color": "#90EE90"},
    {"name": "Green Guardian", "minPoints": 251, "maxPoints": 500, "color": "#32CD32"},
    {"name": "Climate Champion", "minPoints": 501, "maxPoints": 1000, "color": "#228B22"},
    {"name": "Earth Protector", "minPoints": 1001, "maxPoints": 9999, "color": "#006400"}
  ],
  "sampleStudents": [
    {"name": "Arjun Singh", "school": "Government Senior Secondary School, Ludhiana", "points": 425, "level": "Green Guardian", "badges": 3},
    {"name": "Priya Kaur", "school": "Punjab School Education Board, Chandigarh", "points": 680, "level": "Climate Champion", "badges": 5},
    {"name": "Rohit Kumar", "school": "Government High School, Amritsar", "points": 290, "level": "Green Guardian", "badges": 2}
  ]
};

// Application State
let currentUser = null;
let currentView = 'landing-page';
let currentChallenge = null;
let selectedPhoto = null;
let userProgress = {
  points: 0,
  completedChallenges: [],
  earnedBadges: [],
  level: 'Eco-Explorer'
};

// DOM Elements - Safe element selection
function getElement(id) {
  return document.getElementById(id);
}

// MODAL FUNCTIONALITY - FIXED IMPLEMENTATION
function openModal(modalId) {
  const modal = getElement(modalId);
  if (modal) {
    modal.classList.add('modal--open');
    console.log(`Modal opened: ${modalId}`);
  }
}

function closeModal(modalId) {
  const modal = getElement(modalId);
  if (modal) {
    modal.classList.remove('modal--open');
    console.log(`Modal closed: ${modalId}`);
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.remove('modal--open');
  });
  console.log('All modals closed');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('EcoLearn App Initializing...');
  
  // Initialize app state
  loadUserFromStorage();
  
  // Populate school dropdown
  populateSchoolOptions();
  
  // Setup all event listeners
  setupEventListeners();
  
  // Show appropriate initial view
  if (currentUser) {
    showDashboard();
  } else {
    showView('landing-page');
  }
  
  console.log('EcoLearn App Initialized');
});

function loadUserFromStorage() {
  // Not using localStorage per instructions, just reset to defaults
  currentUser = null;
  userProgress = {
    points: 0,
    completedChallenges: [],
    earnedBadges: [],
    level: 'Eco-Explorer'
  };
}

function populateSchoolOptions() {
  const schoolSelect = getElement('school');
  if (!schoolSelect) return;
  
  // Clear existing options except the first one
  while (schoolSelect.children.length > 1) {
    schoolSelect.removeChild(schoolSelect.lastChild);
  }
  
  appData.schools.forEach(school => {
    const option = document.createElement('option');
    option.value = school.name;
    option.textContent = school.name;
    schoolSelect.appendChild(option);
  });
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Login buttons - FIXED with proper event prevention
  const studentLoginBtn = getElement('student-login-btn');
  const teacherLoginBtn = getElement('teacher-login-btn');
  const heroStudentBtn = getElement('hero-student-btn');
  const heroTeacherBtn = getElement('hero-teacher-btn');
  
  if (studentLoginBtn) {
    studentLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Student login clicked');
      openLoginModal('student');
    });
  }
  
  if (teacherLoginBtn) {
    teacherLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Teacher login clicked');
      openLoginModal('teacher');
    });
  }
  
  if (heroStudentBtn) {
    heroStudentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Hero student button clicked');
      openLoginModal('student');
    });
  }
  
  if (heroTeacherBtn) {
    heroTeacherBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Hero teacher button clicked');
      openLoginModal('teacher');
    });
  }
  
  // Logout button
  const logoutBtn = getElement('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      logout();
    });
  }
  
  // MODAL CLOSE BUTTONS - FIXED IMPLEMENTATION
  setupModalCloseListeners();
  
  // Login form
  const loginForm = getElement('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Photo upload functionality
  setupPhotoUploadListeners();
  
  // Complete challenge button
  const completeChallengeBtn = getElement('complete-challenge-btn');
  if (completeChallengeBtn) {
    completeChallengeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      completeChallenge();
    });
  }
  
  // Mobile navigation
  const mobileNavItems = document.querySelectorAll('.mobile-nav__item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const view = e.currentTarget.dataset.view;
      if (view) {
        showView(view);
        updateMobileNavState(e.currentTarget);
      }
    });
  });
  
  // Leaderboard tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const tab = e.target.dataset.tab;
      if (tab) {
        switchLeaderboardTab(tab);
      }
    });
  });
  
  // Challenge filters
  const categoryFilter = getElement('category-filter');
  const difficultyFilter = getElement('difficulty-filter');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      e.preventDefault();
      filterChallenges();
    });
  }
  
  if (difficultyFilter) {
    difficultyFilter.addEventListener('change', (e) => {
      e.preventDefault();
      filterChallenges();
    });
  }
  
  // KEYBOARD EVENTS - FIXED ESC KEY FUNCTIONALITY
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  console.log('Event listeners setup complete');
}

// SETUP MODAL CLOSE LISTENERS - ENHANCED FUNCTION
function setupModalCloseListeners() {
  console.log('Setting up modal close listeners...');
  
  // Close buttons for each modal
  const closeLoginModalBtn = getElement('close-login-modal');
  const closeChallengeModalBtn = getElement('close-challenge-modal');
  const closePhotoModalBtn = getElement('close-photo-modal');
  const closeBadgeModalBtn = getElement('close-badge-modal');
  const closeAchievementModalBtn = getElement('close-achievement-modal');
  
  if (closeLoginModalBtn) {
    closeLoginModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal('login-modal');
    });
  }
  
  if (closeChallengeModalBtn) {
    closeChallengeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal('challenge-modal');
    });
  }
  
  if (closePhotoModalBtn) {
    closePhotoModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal('photo-upload-modal');
    });
  }
  
  if (closeBadgeModalBtn) {
    closeBadgeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal('badge-detail-modal');
    });
  }
  
  if (closeAchievementModalBtn) {
    closeAchievementModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal('achievement-notification');
    });
  }
  
  // CLICK-OUTSIDE-TO-CLOSE FUNCTIONALITY
  const modals = ['login-modal', 'challenge-modal', 'photo-upload-modal', 'badge-detail-modal', 'achievement-notification'];
  
  modals.forEach(modalId => {
    const modal = getElement(modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__backdrop')) {
          closeModal(modalId);
        }
      });
    }
  });
  
  console.log('Modal close listeners setup complete');
}

// PHOTO UPLOAD LISTENERS - ENHANCED FUNCTION
function setupPhotoUploadListeners() {
  const openPhotoModalBtn = getElement('open-photo-modal');
  const photoInput = getElement('photo-input');
  const cancelPhotoBtn = getElement('cancel-photo');
  const confirmPhotoBtn = getElement('confirm-photo');
  
  if (openPhotoModalBtn) {
    openPhotoModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal('photo-upload-modal');
    });
  }
  
  if (photoInput) {
    photoInput.addEventListener('change', handlePhotoSelection);
  }
  
  if (cancelPhotoBtn) {
    cancelPhotoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      resetPhotoUpload();
      closeModal('photo-upload-modal');
    });
  }
  
  if (confirmPhotoBtn) {
    confirmPhotoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      confirmPhoto();
    });
  }
}

// Authentication Functions
function openLoginModal(userType) {
  console.log(`Opening login modal for: ${userType}`);
  
  const userTypeSelect = getElement('user-type');
  const modalTitle = getElement('modal-title');
  
  if (userTypeSelect) userTypeSelect.value = userType;
  if (modalTitle) modalTitle.textContent = userType === 'student' ? 'Student Login' : 'Teacher Login';
  
  openModal('login-modal');
  
  // Focus on first input
  setTimeout(() => {
    const usernameInput = getElement('username');
    if (usernameInput) usernameInput.focus();
  }, 100);
}

function handleLogin(e) {
  e.preventDefault();
  e.stopPropagation();
  
  console.log('Handling login...');
  
  const usernameInput = getElement('username');
  const schoolSelect = getElement('school');
  const userTypeSelect = getElement('user-type');
  
  if (!usernameInput || !schoolSelect || !userTypeSelect) return;
  
  const username = usernameInput.value.trim();
  const school = schoolSelect.value;
  const userType = userTypeSelect.value;
  
  if (!username || !school || !userType) {
    alert('Please fill in all fields');
    return;
  }
  
  currentUser = {
    name: username,
    school: school,
    type: userType
  };
  
  console.log('User logged in:', currentUser);
  
  showUserNav();
  closeModal('login-modal');
  
  // Clear form
  const loginForm = getElement('login-form');
  if (loginForm) loginForm.reset();
  
  showDashboard();
}

function logout() {
  console.log('Logging out user...');
  
  currentUser = null;
  userProgress = {
    points: 0,
    completedChallenges: [],
    earnedBadges: [],
    level: 'Eco-Explorer'
  };
  
  showAuthNav();
  showView('landing-page');
}

function showUserNav() {
  const navAuth = getElement('nav-auth');
  const navUser = getElement('nav-user');
  const userInfo = getElement('user-info');
  
  if (navAuth) navAuth.classList.add('hidden');
  if (navUser) navUser.classList.remove('hidden');
  if (userInfo && currentUser) {
    userInfo.textContent = `${currentUser.name} (${currentUser.type})`;
  }
}

function showAuthNav() {
  const navAuth = getElement('nav-auth');
  const navUser = getElement('nav-user');
  
  if (navAuth) navAuth.classList.remove('hidden');
  if (navUser) navUser.classList.add('hidden');
}

// Navigation Functions - FIXED
function showView(viewId) {
  console.log(`Showing view: ${viewId}`);
  
  // Hide all main sections
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  
  // Show selected view
  const targetView = getElement(viewId);
  if (targetView) {
    targetView.classList.remove('hidden');
    currentView = viewId;
  } else {
    console.error(`View not found: ${viewId}`);
    return;
  }
  
  // Handle mobile navigation visibility
  const mobileNav = getElement('mobile-nav');
  if (mobileNav) {
    if (viewId === 'landing-page' || !currentUser) {
      mobileNav.style.display = 'none';
    } else if (currentUser && currentUser.type === 'student') {
      mobileNav.style.display = 'flex';
    }
  }
  
  // Load content based on view
  switch(viewId) {
    case 'student-dashboard':
      updateDashboard();
      break;
    case 'teacher-dashboard':
      updateTeacherDashboard();
      break;
    case 'challenges-page':
      loadChallenges();
      break;
    case 'leaderboard-page':
      loadLeaderboard();
      break;
    case 'profile-page':
      updateProfile();
      break;
  }
}

function showDashboard() {
  if (!currentUser) {
    showView('landing-page');
    return;
  }
  
  if (currentUser.type === 'student') {
    showView('student-dashboard');
  } else {
    showView('teacher-dashboard');
  }
}

function updateMobileNavState(activeItem) {
  const mobileNavItems = document.querySelectorAll('.mobile-nav__item');
  mobileNavItems.forEach(item => item.classList.remove('active'));
  if (activeItem) {
    activeItem.classList.add('active');
  }
}

// Dashboard Functions
function updateDashboard() {
  if (!currentUser || currentUser.type !== 'student') return;
  
  console.log('Updating dashboard...');
  
  // Update welcome message and level
  const level = getCurrentLevel();
  const welcomeEl = getElement('student-welcome');
  const levelEl = getElement('current-level');
  const pointsEl = getElement('user-points');
  
  if (welcomeEl) welcomeEl.textContent = `Welcome back, ${currentUser.name}!`;
  if (levelEl) levelEl.textContent = level.name;
  if (pointsEl) pointsEl.textContent = `${userProgress.points} points`;
  
  // Update progress bar
  const progressPercent = getProgressToNextLevel();
  const progressFill = getElement('progress-fill');
  if (progressFill) {
    progressFill.style.width = `${progressPercent}%`;
  }
  
  // Update stats
  const challengesCompletedEl = getElement('challenges-completed');
  const schoolRankEl = getElement('school-rank');
  const envImpactEl = getElement('env-impact');
  
  if (challengesCompletedEl) challengesCompletedEl.textContent = userProgress.completedChallenges.length;
  if (schoolRankEl) schoolRankEl.textContent = `#${getSchoolRank()}`;
  if (envImpactEl) envImpactEl.textContent = `${calculateEnvironmentalImpact()}kg`;
  
  // Update recent badges
  updateRecentBadges();
}

function updateTeacherDashboard() {
  console.log('Updating teacher dashboard...');
  
  // Mock data for teacher dashboard
  const classStudentsEl = getElement('class-students');
  const assignedChallengesEl = getElement('assigned-challenges');
  const completionRateEl = getElement('completion-rate');
  
  if (classStudentsEl) classStudentsEl.textContent = '45';
  if (assignedChallengesEl) assignedChallengesEl.textContent = '12';
  if (completionRateEl) completionRateEl.textContent = '78%';
}

function getCurrentLevel() {
  for (const level of appData.levels) {
    if (userProgress.points >= level.minPoints && userProgress.points <= level.maxPoints) {
      return level;
    }
  }
  return appData.levels[appData.levels.length - 1];
}

function getProgressToNextLevel() {
  const currentLevel = getCurrentLevel();
  const nextLevel = appData.levels.find(level => level.minPoints > userProgress.points);
  
  if (!nextLevel) return 100;
  
  const currentLevelProgress = userProgress.points - currentLevel.minPoints;
  const levelRange = nextLevel.minPoints - currentLevel.minPoints;
  
  return Math.min(100, (currentLevelProgress / levelRange) * 100);
}

function getSchoolRank() {
  return Math.floor(Math.random() * 50) + 1;
}

function calculateEnvironmentalImpact() {
  return Math.round(userProgress.completedChallenges.length * 2.5 * 10) / 10;
}

function updateRecentBadges() {
  const recentBadgesContainer = getElement('recent-badges');
  if (!recentBadgesContainer) return;
  
  recentBadgesContainer.innerHTML = '';
  
  if (userProgress.earnedBadges.length === 0) {
    recentBadgesContainer.innerHTML = '<p style="color: var(--color-text-secondary);">Complete challenges to earn badges!</p>';
    return;
  }
  
  userProgress.earnedBadges.slice(-3).forEach(badgeId => {
    const badge = appData.badges.find(b => b.id === badgeId);
    if (badge) {
      const badgeElement = createBadgeElement(badge);
      recentBadgesContainer.appendChild(badgeElement);
    }
  });
}

function createBadgeElement(badge) {
  const div = document.createElement('div');
  div.className = 'badge-item';
  div.innerHTML = `
    <div class="badge-item__icon">${badge.icon}</div>
    <div class="badge-item__name">${badge.name}</div>
    <div class="badge-item__desc">${badge.description}</div>
  `;
  
  // Add click listener to show badge details
  div.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showBadgeDetails(badge);
  });
  
  return div;
}

// BADGE DETAIL MODAL - ENHANCED FUNCTION
function showBadgeDetails(badge) {
  console.log('Showing badge details:', badge.name);
  
  const badgeDetailTitle = getElement('badge-detail-title');
  const badgeDetailIcon = getElement('badge-detail-icon');
  const badgeDetailName = getElement('badge-detail-name');
  const badgeDetailDescription = getElement('badge-detail-description');
  const badgeDetailCondition = getElement('badge-detail-condition');
  
  if (badgeDetailTitle) badgeDetailTitle.textContent = badge.name;
  if (badgeDetailIcon) badgeDetailIcon.textContent = badge.icon;
  if (badgeDetailName) badgeDetailName.textContent = badge.name;
  if (badgeDetailDescription) badgeDetailDescription.textContent = badge.description;
  if (badgeDetailCondition) badgeDetailCondition.textContent = badge.condition;
  
  openModal('badge-detail-modal');
}

// Challenge Functions - ENHANCED
function loadChallenges() {
  console.log('Loading challenges...');
  
  const challengesGrid = getElement('challenges-grid');
  if (!challengesGrid) return;
  
  challengesGrid.innerHTML = '';
  
  let challenges = [...appData.challenges];
  
  // Apply filters
  const categoryFilter = getElement('category-filter');
  const difficultyFilter = getElement('difficulty-filter');
  
  if (categoryFilter && categoryFilter.value) {
    challenges = challenges.filter(c => c.category === categoryFilter.value);
  }
  
  if (difficultyFilter && difficultyFilter.value) {
    challenges = challenges.filter(c => c.difficulty === difficultyFilter.value);
  }
  
  challenges.forEach(challenge => {
    const challengeElement = createChallengeCard(challenge);
    challengesGrid.appendChild(challengeElement);
  });
  
  console.log(`Loaded ${challenges.length} challenges`);
}

function createChallengeCard(challenge) {
  const isCompleted = userProgress.completedChallenges.includes(challenge.id);
  
  const div = document.createElement('div');
  div.className = `challenge-card ${isCompleted ? 'challenge-card--completed' : ''}`;
  div.style.position = 'relative';
  
  div.innerHTML = `
    <div class="challenge-card__header">
      <div class="challenge-card__meta">
        <div class="challenge-card__icon">${challenge.icon}</div>
        <div class="challenge-card__category">${challenge.category}</div>
      </div>
      <h3 class="challenge-card__title">${challenge.title}</h3>
    </div>
    <div class="challenge-card__body">
      <p class="challenge-card__desc">${challenge.description}</p>
      <div class="challenge-card__footer">
        <span class="challenge-card__difficulty challenge-card__difficulty--${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
        <span class="challenge-card__points">${challenge.points} pts</span>
      </div>
    </div>
  `;
  
  if (!isCompleted) {
    div.style.cursor = 'pointer';
    div.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openChallengeModal(challenge);
    });
  }
  
  return div;
}

function filterChallenges() {
  console.log('Filtering challenges...');
  loadChallenges();
}

function openChallengeModal(challenge) {
  console.log('Opening challenge modal:', challenge.title);
  
  currentChallenge = challenge;
  
  const challengeTitle = getElement('challenge-title');
  const challengeCategory = getElement('challenge-category');
  const challengeDifficulty = getElement('challenge-difficulty');
  const challengePoints = getElement('challenge-points');
  const challengeDescription = getElement('challenge-description');
  const challengeInstructions = getElement('challenge-instructions');
  const photoPreview = getElement('photo-preview');
  const completeChallengeBtn = getElement('complete-challenge-btn');
  
  if (challengeTitle) challengeTitle.textContent = challenge.title;
  if (challengeCategory) challengeCategory.textContent = challenge.category;
  if (challengeDifficulty) challengeDifficulty.textContent = challenge.difficulty;
  if (challengePoints) challengePoints.textContent = `${challenge.points} pts`;
  if (challengeDescription) challengeDescription.textContent = challenge.description;
  if (challengeInstructions) challengeInstructions.textContent = challenge.instructions;
  
  // Reset photo upload
  if (photoPreview) photoPreview.classList.add('hidden');
  if (completeChallengeBtn) completeChallengeBtn.disabled = true;
  
  selectedPhoto = null;
  
  // Reset photo upload button
  const openPhotoModalBtn = getElement('open-photo-modal');
  if (openPhotoModalBtn) {
    openPhotoModalBtn.textContent = '📷 Add Photo';
    openPhotoModalBtn.classList.remove('btn--primary');
    openPhotoModalBtn.classList.add('btn--outline');
  }
  
  openModal('challenge-modal');
}

// PHOTO UPLOAD FUNCTIONS - ENHANCED
function handlePhotoSelection(e) {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  
  console.log('Photo selected:', file.name);
  
  const reader = new FileReader();
  reader.onload = function(e) {
    selectedPhoto = e.target.result;
    
    // Update confirm button
    const confirmPhotoBtn = getElement('confirm-photo');
    if (confirmPhotoBtn) {
      confirmPhotoBtn.disabled = false;
    }
    
    // Show preview in the photo upload modal
    const photoUploadLabel = document.querySelector('.photo-upload-label');
    if (photoUploadLabel) {
      photoUploadLabel.innerHTML = `
        <img src="${selectedPhoto}" alt="Selected photo" style="max-width: 100%; max-height: 200px; border-radius: var(--radius-lg);">
        <span>Photo selected successfully!</span>
      `;
    }
  };
  reader.readAsDataURL(file);
}

function confirmPhoto() {
  if (!selectedPhoto) return;
  
  console.log('Photo confirmed');
  
  // Update the challenge modal with photo preview
  const photoPreview = getElement('photo-preview');
  const previewImage = getElement('preview-image');
  const completeChallengeBtn = getElement('complete-challenge-btn');
  
  if (previewImage) previewImage.src = selectedPhoto;
  if (photoPreview) photoPreview.classList.remove('hidden');
  if (completeChallengeBtn) completeChallengeBtn.disabled = false;
  
  // Update the photo upload button in challenge modal
  const openPhotoModalBtn = getElement('open-photo-modal');
  if (openPhotoModalBtn) {
    openPhotoModalBtn.textContent = '✅ Photo Uploaded';
    openPhotoModalBtn.classList.add('btn--primary');
    openPhotoModalBtn.classList.remove('btn--outline');
  }
  
  closeModal('photo-upload-modal');
  resetPhotoUpload();
}

function resetPhotoUpload() {
  selectedPhoto = null;
  
  const photoInput = getElement('photo-input');
  const confirmPhotoBtn = getElement('confirm-photo');
  const photoUploadLabel = document.querySelector('.photo-upload-label');
  
  if (photoInput) photoInput.value = '';
  if (confirmPhotoBtn) confirmPhotoBtn.disabled = true;
  if (photoUploadLabel) {
    photoUploadLabel.innerHTML = `
      <span class="photo-upload-icon">📷</span>
      <span>Click to select photo</span>
    `;
  }
}

function completeChallenge() {
  if (!currentChallenge) return;
  
  console.log('Completing challenge:', currentChallenge.title);
  
  // Add to completed challenges
  userProgress.completedChallenges.push(currentChallenge.id);
  userProgress.points += currentChallenge.points;
  
  // Check for new badges
  checkAndAwardBadges();
  
  // Update level
  userProgress.level = getCurrentLevel().name;
  
  // Show achievement notification
  showAchievementNotification('Challenge Complete!', `You earned ${currentChallenge.points} points!`);
  
  // Update dashboard
  if (currentUser && currentUser.type === 'student') {
    updateDashboard();
  }
  
  // Close modal and refresh challenges
  closeModal('challenge-modal');
  if (currentView === 'challenges-page') {
    loadChallenges();
  }
  
  // Reset photo upload button
  const openPhotoModalBtn = getElement('open-photo-modal');
  if (openPhotoModalBtn) {
    openPhotoModalBtn.textContent = '📷 Add Photo';
    openPhotoModalBtn.classList.remove('btn--primary');
    openPhotoModalBtn.classList.add('btn--outline');
  }
}

function checkAndAwardBadges() {
  const newBadges = [];
  
  appData.badges.forEach(badge => {
    if (!userProgress.earnedBadges.includes(badge.id)) {
      let shouldAward = false;
      
      switch(badge.id) {
        case 1: // First Steps
          shouldAward = userProgress.completedChallenges.length >= 1;
          break;
        case 2: // Waste Warrior
          shouldAward = getCompletedChallengesByCategory('Waste Management').length >= 1;
          break;
        case 3: // Energy Saver
          shouldAward = getCompletedChallengesByCategory('Energy Conservation').length >= 1;
          break;
        case 4: // Tree Friend
          shouldAward = getCompletedChallengesByCategory('Biodiversity').length >= 1;
          break;
        case 5: // Punjab Guardian
          shouldAward = getCompletedChallengesByCategory('Punjab-Specific').length >= 1;
          break;
      }
      
      if (shouldAward) {
        userProgress.earnedBadges.push(badge.id);
        newBadges.push(badge);
      }
    }
  });
  
  // Show badge notifications
  newBadges.forEach((badge, index) => {
    setTimeout(() => {
      showAchievementNotification('Badge Earned!', `${badge.icon} ${badge.name}`);
    }, (index + 1) * 2000);
  });
}

function getCompletedChallengesByCategory(category) {
  return userProgress.completedChallenges.filter(challengeId => {
    const challenge = appData.challenges.find(c => c.id === challengeId);
    return challenge && challenge.category === category;
  });
}

// ACHIEVEMENT NOTIFICATION - ENHANCED
function showAchievementNotification(title, description) {
  console.log('Showing achievement:', title);
  
  const achievementTitle = getElement('achievement-title');
  const achievementDesc = getElement('achievement-desc');
  
  if (achievementTitle) achievementTitle.textContent = title;
  if (achievementDesc) achievementDesc.textContent = description;
  
  openModal('achievement-notification');
  
  // Auto-close after 3 seconds
  setTimeout(() => {
    closeModal('achievement-notification');
  }, 3000);
}

// Leaderboard Functions
function loadLeaderboard() {
  console.log('Loading leaderboard...');
  loadSchoolsLeaderboard();
  loadStudentsLeaderboard();
}

function loadSchoolsLeaderboard() {
  const schoolsList = getElement('schools-list');
  if (!schoolsList) return;
  
  schoolsList.innerHTML = '';
  
  const sortedSchools = [...appData.schools].sort((a, b) => b.points - a.points);
  
  sortedSchools.forEach((school, index) => {
    const div = document.createElement('div');
    div.className = 'leaderboard-item';
    div.innerHTML = `
      <div class="leaderboard-rank">#${index + 1}</div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${school.name}</div>
        <div class="leaderboard-school">${school.students} students</div>
      </div>
      <div class="leaderboard-points">${school.points.toLocaleString()}</div>
    `;
    schoolsList.appendChild(div);
  });
}

function loadStudentsLeaderboard() {
  const studentsList = getElement('students-list');
  if (!studentsList) return;
  
  studentsList.innerHTML = '';
  
  let sortedStudents = [...appData.sampleStudents];
  
  // Add current user if logged in as student
  if (currentUser && currentUser.type === 'student') {
    sortedStudents.push({
      name: currentUser.name,
      school: currentUser.school,
      points: userProgress.points,
      level: userProgress.level,
      badges: userProgress.earnedBadges.length
    });
  }
  
  sortedStudents.sort((a, b) => b.points - a.points);
  
  sortedStudents.forEach((student, index) => {
    const div = document.createElement('div');
    div.className = 'leaderboard-item';
    if (currentUser && student.name === currentUser.name) {
      div.style.background = 'var(--color-bg-1)';
      div.style.borderColor = 'var(--color-primary)';
    }
    div.innerHTML = `
      <div class="leaderboard-rank">#${index + 1}</div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${student.name}</div>
        <div class="leaderboard-school">${student.school}</div>
      </div>
      <div class="leaderboard-points">${student.points}</div>
    `;
    studentsList.appendChild(div);
  });
}

function switchLeaderboardTab(tabName) {
  console.log('Switching to tab:', tabName);
  
  // Update tab buttons
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  
  const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeTab) activeTab.classList.add('active');
  
  // Show/hide tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.classList.remove('active'));
  
  const activeContent = getElement(`${tabName}-leaderboard`);
  if (activeContent) activeContent.classList.add('active');
}

// Profile Functions
function updateProfile() {
  if (!currentUser || currentUser.type !== 'student') return;
  
  console.log('Updating profile...');
  
  const level = getCurrentLevel();
  
  const profileName = getElement('profile-name');
  const profileLevel = getElement('profile-level');
  const profilePoints = getElement('profile-points');
  
  if (profileName) profileName.textContent = currentUser.name;
  if (profileLevel) profileLevel.textContent = level.name;
  if (profilePoints) profilePoints.textContent = `${userProgress.points} points`;
  
  updateProfileBadges();
  updateProfileImpact();
}

function updateProfileBadges() {
  const badgesGallery = getElement('profile-badges');
  if (!badgesGallery) return;
  
  badgesGallery.innerHTML = '';
  
  if (userProgress.earnedBadges.length === 0) {
    badgesGallery.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center;">Complete challenges to earn badges!</p>';
    return;
  }
  
  userProgress.earnedBadges.forEach(badgeId => {
    const badge = appData.badges.find(b => b.id === badgeId);
    if (badge) {
      const badgeElement = createBadgeElement(badge);
      badgesGallery.appendChild(badgeElement);
    }
  });
}

function updateProfileImpact() {
  const impactContainer = getElement('profile-impact');
  if (!impactContainer) return;
  
  impactContainer.innerHTML = '';
  
  const impacts = [
    { value: `${calculateEnvironmentalImpact()}kg`, label: 'Waste Reduced' },
    { value: `${userProgress.completedChallenges.length * 5}kWh`, label: 'Energy Saved' },
    { value: `${Math.round(userProgress.completedChallenges.length * 0.1 * 10) / 10}`, label: 'CO₂ Tonnes Saved' },
    { value: `${Math.floor(userProgress.completedChallenges.length / 3)}`, label: 'Trees Planted' }
  ];
  
  impacts.forEach(impact => {
    const div = document.createElement('div');
    div.className = 'impact-item';
    div.innerHTML = `
      <div class="impact-item__value">${impact.value}</div>
      <div class="impact-item__label">${impact.label}</div>
    `;
    impactContainer.appendChild(div);
  });
}