// Application data
const appData = {
  users: [
    {
      id: 1,
      name: "Aarav Sharma",
      role: "student",
      level: "Climate Champion",
      points: 2450,
      xp: 89,
      badges: ["Tree Hugger", "Water Saver", "Energy Guardian", "Waste Warrior"],
      completedChallenges: 15,
      school: "Delhi Public School",
      carbonSaved: 150.5
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "student",
      level: "Eco-Expert",
      points: 1950,
      xp: 65,
      badges: ["Green Commuter", "Recycling Hero", "Plant Parent"],
      completedChallenges: 12,
      school: "Kendriya Vidyalaya",
      carbonSaved: 120.8
    },
    {
      id: 3,
      name: "Rahul Verma",
      role: "student",
      level: "Eco-Explorer",
      points: 850,
      xp: 30,
      badges: ["First Steps", "Quiz Master"],
      completedChallenges: 6,
      school: "St. Xavier's School",
      carbonSaved: 45.2
    }
  ],
  challenges: [
    {
      id: 1,
      title: "Plant a Tree Challenge",
      description: "Plant a tree in your school or community and upload a photo",
      category: "Tree Planting",
      points: 200,
      difficulty: "Medium",
      timeRequired: "30 minutes",
      participants: 156,
      icon: "🌱"
    },
    {
      id: 2,
      title: "Waste Segregation Drive",
      description: "Organize a waste segregation activity in your locality",
      category: "Waste Management",
      points: 150,
      difficulty: "Easy",
      timeRequired: "45 minutes",
      participants: 203,
      icon: "♻️"
    },
    {
      id: 3,
      title: "Energy Conservation Week",
      description: "Monitor and reduce your home's energy consumption for a week",
      category: "Energy Conservation",
      points: 250,
      difficulty: "Hard",
      timeRequired: "7 days",
      participants: 89,
      icon: "⚡"
    },
    {
      id: 4,
      title: "Water Saving Campaign",
      description: "Implement water-saving techniques and measure impact",
      category: "Water Conservation",
      points: 180,
      difficulty: "Medium",
      timeRequired: "3 days",
      participants: 124,
      icon: "💧"
    }
  ],
  courses: [
    {
      id: 1,
      title: "Climate Change Basics",
      description: "Understanding the science behind climate change",
      modules: 8,
      duration: "4 hours",
      enrolled: 1250,
      rating: 4.8,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Renewable Energy Systems",
      description: "Explore solar, wind, and other renewable energy sources",
      modules: 12,
      duration: "6 hours",
      enrolled: 890,
      rating: 4.9,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Sustainable Living Practices",
      description: "Practical tips for eco-friendly daily life",
      modules: 10,
      duration: "5 hours",
      enrolled: 2100,
      rating: 4.7,
      difficulty: "Beginner"
    }
  ],
  leaderboard: [
    {
      rank: 1,
      name: "Aarav Sharma",
      school: "Delhi Public School",
      points: 2450,
      level: "Climate Champion",
      badges: 4
    },
    {
      rank: 2,
      name: "Priya Patel",
      school: "Kendriya Vidyalaya",
      points: 1950,
      level: "Eco-Expert",
      badges: 3
    },
    {
      rank: 3,
      name: "Arjun Singh",
      school: "Modern School",
      points: 1820,
      level: "Eco-Expert",
      badges: 3
    },
    {
      rank: 4,
      name: "Sneha Gupta",
      school: "DAV Public School",
      points: 1650,
      level: "Green Guardian",
      badges: 2
    },
    {
      rank: 5,
      name: "Vikash Kumar",
      school: "Bloom Public School",
      points: 1420,
      level: "Green Guardian",
      badges: 2
    }
  ],
  badges: [
    {
      name: "Tree Hugger",
      description: "Planted 10+ trees",
      icon: "🌳",
      rarity: "Common"
    },
    {
      name: "Water Saver",
      description: "Saved 1000+ liters of water",
      icon: "💧",
      rarity: "Uncommon"
    },
    {
      name: "Energy Guardian",
      description: "Reduced energy consumption by 20%",
      icon: "⚡",
      rarity: "Rare"
    },
    {
      name: "Waste Warrior",
      description: "Organized 5+ waste management drives",
      icon: "♻️",
      rarity: "Epic"
    },
    {
      name: "Green Commuter",
      description: "Used eco-friendly transport for 30 days",
      icon: "🚲",
      rarity: "Common"
    },
    {
      name: "Recycling Hero",
      description: "Recycled 100+ items",
      icon: "🔄",
      rarity: "Uncommon"
    },
    {
      name: "Plant Parent",
      description: "Maintained a garden for 3 months",
      icon: "🪴",
      rarity: "Common"
    },
    {
      name: "First Steps",
      description: "Completed your first challenge",
      icon: "👶",
      rarity: "Common"
    },
    {
      name: "Quiz Master",
      description: "Scored 100% on 5 quizzes",
      icon: "🧠",
      rarity: "Uncommon"
    }
  ],
  chatbotResponses: [
    {
      keyword: "climate change",
      response: "Climate change refers to long-term shifts in temperatures and weather patterns. Human activities have been the main driver since the 1800s. Would you like to learn about specific impacts or solutions?"
    },
    {
      keyword: "renewable energy",
      response: "Renewable energy comes from natural sources that replenish themselves, like solar, wind, and hydro power. These are crucial for reducing carbon emissions. Which type interests you most?"
    },
    {
      keyword: "career",
      response: "There are many exciting green careers! Environmental engineering, renewable energy technology, sustainability consulting, and climate research are growing fields. What's your main interest area?"
    },
    {
      keyword: "challenges",
      response: "Great question! You can participate in tree planting, waste segregation, energy conservation, and water saving challenges. Each one earns you points and badges. Which challenge would you like to start with?"
    }
  ]
};

// Application state
let currentUser = appData.users[0]; // Default to Aarav Sharma
let currentRole = 'student';
let selectedChallenge = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('GreenChamp app initializing...');
  initializeEventListeners();
  renderChallenges();
  renderLeaderboard();
  renderCourses();
  updateStudentDashboard();
  showLanding();
  console.log('GreenChamp app initialized successfully');
});

function initializeEventListeners() {
  console.log('Setting up event listeners...');
  
  // Tab navigation
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const tabId = this.getAttribute('data-tab');
      console.log('Tab clicked:', tabId);
      switchTab(tabId);
    });
  });

  // Role selector
  const roleSelector = document.getElementById('roleSelector');
  if (roleSelector) {
    roleSelector.addEventListener('change', function(e) {
      currentRole = this.value;
      console.log('Role changed to:', currentRole);
      showDashboard(currentRole);
    });
  }

  // Role cards - using event delegation
  document.addEventListener('click', function(e) {
    if (e.target.closest('.role-card')) {
      e.preventDefault();
      e.stopPropagation();
      const roleCard = e.target.closest('.role-card');
      const role = roleCard.getAttribute('data-role');
      console.log('Role card clicked:', role);
      currentRole = role;
      const roleSelector = document.getElementById('roleSelector');
      if (roleSelector) {
        roleSelector.value = role;
      }
      showDashboard(role);
    }
  });

  // Quick actions
  document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const actionBtn = e.target.closest('.action-btn');
      const action = actionBtn.getAttribute('data-action');
      console.log('Quick action clicked:', action);
      handleQuickAction(action);
    }
  });

  // Challenge cards
  document.addEventListener('click', function(e) {
    if (e.target.closest('.challenge-card')) {
      e.preventDefault();
      e.stopPropagation();
      const challengeCard = e.target.closest('.challenge-card');
      const challengeIndex = Array.from(challengeCard.parentNode.children).indexOf(challengeCard);
      const challenge = appData.challenges[challengeIndex];
      console.log('Challenge card clicked:', challenge);
      openChallengeModal(challenge);
    }
  });

  // Modal functionality
  const modal = document.getElementById('challengeModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const modalComplete = document.getElementById('modalComplete');

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  if (modalCancel) {
    modalCancel.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  if (modalComplete) {
    modalComplete.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      completeChallenge();
    });
  }

  // Chat functionality
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendMessage');

  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendChatMessage();
      }
    });
  }

  if (sendButton) {
    sendButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      sendChatMessage();
    });
  }

  console.log('Event listeners set up successfully');
}

function switchTab(tabId) {
  console.log('Switching to tab:', tabId);
  
  // Update navigation
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    }
  });

  // Update tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
    if (content.id === tabId) {
      content.classList.add('active');
    }
  });

  // Hide dashboards when switching tabs
  if (tabId !== 'home') {
    const landing = document.getElementById('landing');
    const studentDashboard = document.getElementById('studentDashboard');
    const teacherDashboard = document.getElementById('teacherDashboard');
    const adminDashboard = document.getElementById('adminDashboard');
    
    if (landing) landing.classList.add('hidden');
    if (studentDashboard) studentDashboard.classList.add('hidden');
    if (teacherDashboard) teacherDashboard.classList.add('hidden');
    if (adminDashboard) adminDashboard.classList.add('hidden');
  }
  
  console.log('Tab switched successfully to:', tabId);
}

function showLanding() {
  console.log('Showing landing page');
  const landing = document.getElementById('landing');
  const studentDashboard = document.getElementById('studentDashboard');
  const teacherDashboard = document.getElementById('teacherDashboard');
  const adminDashboard = document.getElementById('adminDashboard');
  
  if (landing) landing.classList.remove('hidden');
  if (studentDashboard) studentDashboard.classList.add('hidden');
  if (teacherDashboard) teacherDashboard.classList.add('hidden');
  if (adminDashboard) adminDashboard.classList.add('hidden');
}

function showDashboard(role) {
  console.log('Showing dashboard for role:', role);
  
  const landing = document.getElementById('landing');
  const studentDashboard = document.getElementById('studentDashboard');
  const teacherDashboard = document.getElementById('teacherDashboard');
  const adminDashboard = document.getElementById('adminDashboard');
  
  // Hide landing
  if (landing) landing.classList.add('hidden');
  
  // Hide all dashboards first
  if (studentDashboard) studentDashboard.classList.add('hidden');
  if (teacherDashboard) teacherDashboard.classList.add('hidden');
  if (adminDashboard) adminDashboard.classList.add('hidden');

  // Show appropriate dashboard
  switch(role) {
    case 'student':
      if (studentDashboard) {
        studentDashboard.classList.remove('hidden');
        updateStudentDashboard();
      }
      break;
    case 'teacher':
      if (teacherDashboard) {
        teacherDashboard.classList.remove('hidden');
      }
      break;
    case 'admin':
      if (adminDashboard) {
        adminDashboard.classList.remove('hidden');
      }
      break;
  }
  
  console.log('Dashboard shown for role:', role);
}

function updateStudentDashboard() {
  console.log('Updating student dashboard');
  
  const studentName = document.getElementById('studentName');
  const userPoints = document.getElementById('userPoints');
  const userLevel = document.getElementById('userLevel');
  const completedChallengesEl = document.getElementById('completedChallenges');
  
  if (studentName) studentName.textContent = currentUser.name;
  if (userPoints) userPoints.textContent = currentUser.points;
  if (userLevel) userLevel.textContent = currentUser.level;
  if (completedChallengesEl) completedChallengesEl.textContent = currentUser.completedChallenges;
  
  // Update progress bar
  const progressBar = document.querySelector('.progress-bar__fill');
  if (progressBar) {
    progressBar.style.width = `${currentUser.xp}%`;
  }
  
  // Update badges
  renderUserBadges();
}

function renderUserBadges() {
  const badgesContainer = document.getElementById('userBadges');
  if (!badgesContainer) return;
  
  badgesContainer.innerHTML = '';

  currentUser.badges.forEach(badgeName => {
    const badge = appData.badges.find(b => b.name === badgeName);
    if (badge) {
      const badgeElement = document.createElement('div');
      badgeElement.className = 'badge';
      badgeElement.innerHTML = `
        <div class="badge__icon">${badge.icon}</div>
        <div class="badge__name">${badge.name}</div>
        <div class="badge__description">${badge.description}</div>
      `;
      badgesContainer.appendChild(badgeElement);
    }
  });
}

function renderChallenges() {
  const challengesGrid = document.getElementById('challengesGrid');
  if (!challengesGrid) return;
  
  challengesGrid.innerHTML = '';

  appData.challenges.forEach(challenge => {
    const challengeCard = document.createElement('div');
    challengeCard.className = 'challenge-card';
    challengeCard.innerHTML = `
      <div class="challenge-card__header">
        <div class="challenge-card__icon">${challenge.icon}</div>
        <div class="challenge-card__title">${challenge.title}</div>
      </div>
      <div class="challenge-card__description">${challenge.description}</div>
      <div class="challenge-card__meta">
        <div class="meta-item">
          <span>📊</span>
          <span>${challenge.difficulty}</span>
        </div>
        <div class="meta-item">
          <span>⏱️</span>
          <span>${challenge.timeRequired}</span>
        </div>
        <div class="meta-item">
          <span>📁</span>
          <span>${challenge.category}</span>
        </div>
      </div>
      <div class="challenge-card__footer">
        <div class="points-badge">${challenge.points} points</div>
        <div class="participants">${challenge.participants} participants</div>
      </div>
    `;
    challengesGrid.appendChild(challengeCard);
  });
}

function renderLeaderboard() {
  const leaderboardTable = document.getElementById('leaderboardTable');
  if (!leaderboardTable) return;
  
  leaderboardTable.innerHTML = '';

  appData.leaderboard.forEach(user => {
    const leaderboardItem = document.createElement('div');
    leaderboardItem.className = 'leaderboard-item';
    
    const rankClass = user.rank <= 3 ? 'rank top-3' : 'rank';
    
    leaderboardItem.innerHTML = `
      <div class="${rankClass}">#${user.rank}</div>
      <div class="user-info">
        <h4>${user.name}</h4>
        <p>${user.school}</p>
      </div>
      <div class="points">${user.points}</div>
      <div class="level">${user.level}</div>
      <div class="badge-count">${user.badges} badges</div>
    `;

    leaderboardTable.appendChild(leaderboardItem);
  });
}

function renderCourses() {
  const coursesGrid = document.getElementById('coursesGrid');
  if (!coursesGrid) return;
  
  coursesGrid.innerHTML = '';

  appData.courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
      <div class="course-card__header">
        <div class="course-card__icon">📚</div>
        <div class="course-card__title">${course.title}</div>
      </div>
      <div class="course-card__description">${course.description}</div>
      <div class="course-card__meta">
        <div class="meta-item">
          <span>📊</span>
          <span>${course.difficulty}</span>
        </div>
        <div class="meta-item">
          <span>⏱️</span>
          <span>${course.duration}</span>
        </div>
        <div class="meta-item">
          <span>📖</span>
          <span>${course.modules} modules</span>
        </div>
        <div class="meta-item">
          <span>⭐</span>
          <span>${course.rating}/5.0</span>
        </div>
      </div>
      <div class="course-card__footer">
        <div class="participants">${course.enrolled} enrolled</div>
        <button class="btn btn--primary btn--sm">Start Course</button>
      </div>
    `;
    coursesGrid.appendChild(courseCard);
  });
}

function handleQuickAction(action) {
  console.log('Handling quick action:', action);
  switch(action) {
    case 'new-challenge':
      switchTab('challenges');
      break;
    case 'view-courses':
      switchTab('learning');
      break;
    case 'check-leaderboard':
      switchTab('leaderboard');
      break;
  }
}

function openChallengeModal(challenge) {
  console.log('Opening challenge modal for:', challenge);
  selectedChallenge = challenge;
  const modal = document.getElementById('challengeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modalTitle) modalTitle.textContent = challenge.title;
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="challenge-details">
        <div class="challenge-icon" style="font-size: 3rem; text-align: center; margin-bottom: 16px;">
          ${challenge.icon}
        </div>
        <p><strong>Description:</strong> ${challenge.description}</p>
        <p><strong>Category:</strong> ${challenge.category}</p>
        <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
        <p><strong>Time Required:</strong> ${challenge.timeRequired}</p>
        <p><strong>Points Reward:</strong> ${challenge.points} points</p>
        <p><strong>Current Participants:</strong> ${challenge.participants}</p>
        
        <div style="margin-top: 20px; padding: 16px; background: var(--color-bg-3); border-radius: 8px;">
          <h4>How to Complete:</h4>
          <ol>
            <li>Read the challenge description carefully</li>
            <li>Complete the required activity</li>
            <li>Take photos or gather evidence of completion</li>
            <li>Click "Complete Challenge" to earn your points</li>
          </ol>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.remove('hidden');
}

function closeModal() {
  console.log('Closing modal');
  const modal = document.getElementById('challengeModal');
  if (modal) modal.classList.add('hidden');
  selectedChallenge = null;
}

function completeChallenge() {
  console.log('Completing challenge:', selectedChallenge);
  if (selectedChallenge) {
    // Update user stats
    currentUser.points += selectedChallenge.points;
    currentUser.completedChallenges += 1;
    currentUser.xp = Math.min(100, currentUser.xp + 10); // Add 10 XP, max 100

    // Update dashboard
    updateStudentDashboard();

    // Show success message
    alert(`🎉 Congratulations! You've completed "${selectedChallenge.title}" and earned ${selectedChallenge.points} points!`);
    
    closeModal();
  }
}

function sendChatMessage() {
  console.log('Sending chat message');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  
  if (!chatInput || !chatMessages) return;
  
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.innerHTML = `
    <div class="message__avatar">👤</div>
    <div class="message__content">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(userMessage);

  // Clear input
  chatInput.value = '';

  // Generate bot response
  setTimeout(() => {
    const botResponse = generateBotResponse(message);
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerHTML = `
      <div class="message__avatar">🤖</div>
      <div class="message__content">
        <p>${botResponse}</p>
      </div>
    `;
    chatMessages.appendChild(botMessage);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Find matching response
  for (const response of appData.chatbotResponses) {
    if (lowerMessage.includes(response.keyword)) {
      return response.response;
    }
  }

  // Default responses for common queries
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm here to help you learn about environmental topics and guide you through your eco-journey. What would you like to know?";
  }

  if (lowerMessage.includes('help')) {
    return "I can help you with information about climate change, renewable energy, environmental careers, and challenges you can participate in. Just ask me anything!";
  }

  if (lowerMessage.includes('points') || lowerMessage.includes('score')) {
    return "You can earn points by completing environmental challenges! Each challenge has different point values based on difficulty. Check out the Challenges tab to see what's available.";
  }

  if (lowerMessage.includes('badge') || lowerMessage.includes('achievement')) {
    return "Badges are earned by completing specific activities repeatedly. For example, plant 10 trees to get the 'Tree Hugger' badge! Check your profile to see your current badges.";
  }

  // Generic fallback
  return "That's an interesting question! While I don't have specific information about that topic, I'd recommend checking our learning modules or speaking with your teacher for more detailed guidance.";
}
