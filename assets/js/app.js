const STORAGE_KEY = 'nebulachat-studio-state';
const dom = {
  app: document.querySelector('.app'),
  conversationList: document.getElementById('conversation-list'),
  messageStream: document.getElementById('message-stream'),
  promptSuggestions: document.getElementById('prompt-suggestions'),
  chatTitle: document.getElementById('chat-title'),
  chatTimeline: document.getElementById('session-timeline'),
  timelineEvents: document.getElementById('session-events'),
  metrics: document.getElementById('session-metrics'),
  assistantTraits: document.getElementById('assistant-traits'),
  focusModes: document.getElementById('focus-modes'),
  knowledgeList: document.getElementById('knowledge-list'),
  footerSync: document.getElementById('footer-sync'),
  sessionSearch: document.getElementById('session-search'),
  playbookGrid: document.getElementById('playbook-grid'),
  sessionTimeline: document.getElementById('session-timeline'),
  composer: document.getElementById('composer'),
  messageInput: document.getElementById('message-input'),
  pinButton: document.getElementById('pin-session'),
  exportButton: document.getElementById('export-session'),
  clearButton: document.getElementById('clear-session'),
  toggleTheme: document.getElementById('toggle-theme'),
  toggleCompact: document.getElementById('toggle-compact'),
  newSession: document.getElementById('new-session'),
  attachNote: document.getElementById('attach-note'),
  insertSnippet: document.getElementById('insert-snippet'),
  insertEmoji: document.getElementById('insert-emoji'),
  refreshOverview: document.getElementById('refresh-overview'),
  dialogs: {
    settings: document.getElementById('settings-dialog'),
    playbooks: document.getElementById('playbooks-dialog'),
    knowledge: document.getElementById('knowledge-dialog'),
    changelog: document.getElementById('changelog-dialog'),
  },
  buttons: {
    openSettings: document.getElementById('open-settings'),
    openPlaybooks: document.getElementById('open-playbooks'),
    openKnowledge: document.getElementById('open-knowledge'),
    openChangelog: document.getElementById('open-changelog'),
  },
  timeline: document.getElementById('session-timeline'),
};

const defaultConversations = () => [
  {
    id: crypto.randomUUID(),
    title: 'Research log: Ocean plastics',
    summary: 'Navigator curates impact data for NGO briefing',
    lastInteraction: '2 minutes ago',
    pinned: true,
    unread: 0,
    tags: ['environment', 'briefing'],
    messages: [
      {
        role: 'assistant',
        author: 'Nebula Navigator',
        time: '09:10',
        content: [
          'Ready when you are. I have briefs on ocean plastics impacts, policy measures, and NGO-led pilot programs. Where shall we dive in?',
        ],
        cues: ['📎 3 curated briefs attached'],
      },
      {
        role: 'user',
        author: 'You',
        time: '09:12',
        content: [
          'Summarize community-level actions that reduced shoreline waste in the last five years. Focus on metrics we can cite.',
        ],
        cues: [],
      },
      {
        role: 'assistant',
        author: 'Nebula Navigator',
        time: '09:13',
        content: [
          'Here are the programs with measurable shoreline impact:',
          {
            type: 'list',
            items: [
              'Baltic Blue Network: volunteer cleanup + deposit incentives → 27% litter reduction in 18 months (source: Riga civic report, 2023).',
              'Queensland Tidal Guardians: smart bins + school partnerships → 14 tonnes removed, 82% student participation (source: state audit, 2024).',
              'Pacific Floating Barriers Trial: fishing cooperative-led → trapped 3.1 tonnes microplastics quarterly (source: PFB coalition log, 2024).',
            ],
          },
          'Need visuals or deeper interviews? I can surface them next.',
        ],
        cues: ['Last refreshed 6 days ago'],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Product narrative rehearsal',
    summary: 'Story arc building for launch keynote',
    lastInteraction: 'Yesterday',
    pinned: false,
    unread: 2,
    tags: ['product', 'keynote'],
    messages: [
      {
        role: 'assistant',
        author: 'Nebula Navigator',
        time: '19:44',
        content: [
          'Rehearsal is staged. What angle do you want highlighted first—customer wins, technical breakthroughs, or roadmap signals?',
        ],
        cues: ['Storyboard v5 in thread'],
      },
      {
        role: 'user',
        author: 'You',
        time: '19:46',
        content: ['Start with the support metrics shift after the pilot cohort.'],
        cues: [],
      },
      {
        role: 'assistant',
        author: 'Nebula Navigator',
        time: '19:47',
        content: [
          'Highlighting the change curve:',
          {
            type: 'list',
            items: [
              'Ticket resolution time dropped from 18h → 3.4h after workflow automation.',
              'Net promoter score climbed from 14 → 46 within 2 quarters.',
              '92% of pilot accounts adopted the contextual help center in week one.',
            ],
          },
          'I can pair each with customer quotes for the keynote slides.',
        ],
        cues: ['📌 Clip pinned to slide 3'],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Policy desk: Urban mobility',
    summary: 'Navigator tracking municipal hearings and deadlines',
    lastInteraction: '3 days ago',
    pinned: false,
    unread: 0,
    tags: ['policy', 'mobility'],
    messages: [
      {
        role: 'assistant',
        author: 'Nebula Navigator',
        time: '08:05',
        content: [
          'Standing by with your city-by-city tracker. Berlin hearing moved up to May 28, and Toronto just published draft ordinance notes.',
        ],
        cues: ['2 reminders armed'],
      },
    ],
  },
];

const defaultState = () => ({
  theme: 'dark',
  density: 'standard',
  conversations: defaultConversations(),
  activeConversationId: null,
  quickPrompts: [
    'Draft a follow-up summary based on our latest exchange',
    'List three questions to deepen understanding',
    'Show my open action items for this topic',
    'Compare this with last quarter\'s briefing',
  ],
  focusModes: [
    'Evidence-first briefs',
    'Interview prep partner',
    'Policy window tracking',
    'Narrative rehearsal',
  ],
  traits: [
    'Prefers cited, human-authored research',
    'Surfaces gaps and next-step prompts',
    'Never hallucinates—only verified material',
    'Tracks commitments and deadlines you set',
  ],
  metrics: {
    totalMessages: 48,
    curatedSources: 17,
    decisionsLogged: 9,
    remindersArmed: 4,
  },
  events: [
    { time: '08:12', detail: 'Navigator summarized Baltic pilot interview notes' },
    { time: '09:02', detail: 'Reminder armed: Berlin mobility hearing' },
    { time: '09:40', detail: 'Checklist created: launch keynote rehearsal' },
  ],
  knowledge: [
    {
      title: 'Ocean plastics data vault',
      description: 'Benchmarks from civic audits, NGO reports, and port authority inspections across 17 coastal regions.',
      updated: 'Updated 6 days ago',
    },
    {
      title: 'Customer advocacy narratives',
      description: 'First-person quotes and support metrics ready for keynotes and stakeholder briefings.',
      updated: 'Updated yesterday',
    },
    {
      title: 'Mobility policy tracker',
      description: 'Hearings, deadlines, and bill summaries for 12 municipalities piloting adaptive transit.',
      updated: 'Updated 3 hours ago',
    },
  ],
  playbooks: [
    {
      title: 'Rapid research brief',
      description: 'Compile multi-source summary with verified citations in under 10 minutes.',
      duration: '6 steps',
    },
    {
      title: 'Stakeholder prep',
      description: 'Map motivations, prior commitments, and unanswered questions before a meeting.',
      duration: '8 steps',
    },
    {
      title: 'Post-mortem catalyst',
      description: 'Guide teams through reflective analysis without AI-generated filler.',
      duration: '5 prompts',
    },
  ],
  timeline: [
    'Opened research workspace',
    'Captured field interview findings',
    'Navigator summarized highlights',
    'Outlined action items for follow-up',
  ],
  changelog: [
    {
      version: '2.7.18',
      date: 'May 14, 2024',
      notes: [
        'Added quick prompt dock and refreshed composer actions.',
        'Knowledge vault browsing now supports keyword filters.',
        'Improved export formatting with human-authored annotations.',
      ],
    },
    {
      version: '2.6.90',
      date: 'April 30, 2024',
      notes: [
        'New compact density toggle for tight work sessions.',
        'Timeline now tracks Navigator actions with timestamps.',
      ],
    },
  ],
});

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState();
    const parsed = JSON.parse(stored);
    return {
      ...defaultState(),
      ...parsed,
    };
  } catch (error) {
    console.warn('Failed to parse state, using defaults', error);
    return defaultState();
  }
}

let state = loadState();

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to persist state', error);
  }
}

function ensureActiveConversation() {
  if (!state.conversations.length) {
    state.conversations = defaultConversations();
  }
  if (!state.activeConversationId) {
    state.activeConversationId = state.conversations[0]?.id ?? null;
  }
}

ensureActiveConversation();

function formatList(items) {
  const list = document.createElement('ul');
  list.className = 'bullet-list';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  return list;
}

function renderMessages(conversation) {
  dom.messageStream.innerHTML = '';

  if (!conversation || !conversation.messages.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <h3>No messages yet</h3>
      <p>Guide Nebula Navigator with a clear instruction or import a playbook to get started.</p>
    `;
    dom.messageStream.appendChild(empty);
    return;
  }

  conversation.messages.forEach((message) => {
    const container = document.createElement('article');
    container.className = `message ${message.role === 'user' ? 'is-user' : 'is-assistant'}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = message.role === 'user' ? 'YOU' : 'NN';

    const bubble = document.createElement('div');
    bubble.className = 'message__bubble';

    const header = document.createElement('header');
    const name = document.createElement('h4');
    name.textContent = message.author;
    const time = document.createElement('time');
    time.textContent = message.time;

    header.appendChild(name);
    header.appendChild(time);
    bubble.appendChild(header);

    const body = document.createElement('div');
    body.className = 'message__body';

    message.content.forEach((chunk) => {
      if (typeof chunk === 'string') {
        const paragraph = document.createElement('p');
        paragraph.textContent = chunk;
        body.appendChild(paragraph);
      } else if (chunk.type === 'list') {
        body.appendChild(formatList(chunk.items));
      }
    });

    bubble.appendChild(body);

    const footer = document.createElement('footer');
    footer.className = 'message__footer';
    const cues = document.createElement('span');
    cues.textContent = message.cues?.join(' • ') || '';
    const actions = document.createElement('div');
    actions.className = 'actions';

    if (message.role === 'assistant') {
      ['Copy', 'Quote', 'Save'].forEach((label) => {
        const btn = document.createElement('button');
        btn.className = 'ghost';
        btn.type = 'button';
        btn.textContent = label;
        actions.appendChild(btn);
      });
    } else {
      const btn = document.createElement('button');
      btn.className = 'ghost';
      btn.type = 'button';
      btn.textContent = 'Edit';
      actions.appendChild(btn);
    }

    footer.appendChild(cues);
    footer.appendChild(actions);
    bubble.appendChild(footer);

    container.appendChild(avatar);
    container.appendChild(bubble);
    dom.messageStream.appendChild(container);
  });

  dom.messageStream.scrollTop = dom.messageStream.scrollHeight;
}

function renderConversationList(filter = '') {
  dom.conversationList.innerHTML = '';

  const conversations = state.conversations
    .filter((conversation) => {
      if (!filter) return true;
      const text = `${conversation.title} ${conversation.summary}`.toLowerCase();
      return text.includes(filter.toLowerCase());
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  conversations.forEach((conversation) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'conversation-card';
    if (conversation.id === state.activeConversationId) {
      card.classList.add('is-active');
    }

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = conversation.title
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const body = document.createElement('div');
    const heading = document.createElement('h4');
    heading.textContent = conversation.title;
    const summary = document.createElement('p');
    summary.textContent = conversation.summary;

    body.appendChild(heading);
    body.appendChild(summary);

    const meta = document.createElement('div');
    meta.className = 'tag-list';
    conversation.tags?.forEach((tag) => {
      const chip = document.createElement('span');
      chip.className = 'tag';
      chip.textContent = tag;
      meta.appendChild(chip);
    });

    body.appendChild(meta);
    card.appendChild(avatar);
    card.appendChild(body);

    card.addEventListener('click', () => {
      state.activeConversationId = conversation.id;
      persistState();
      hydrateUI();
    });

    dom.conversationList.appendChild(card);
  });

  if (!conversations.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <h3>No sessions found</h3>
      <p>Try a different phrase or start a new NebulaChat session.</p>
    `;
    dom.conversationList.appendChild(empty);
  }
}

function renderQuickPrompts() {
  dom.promptSuggestions.innerHTML = '';
  state.quickPrompts.forEach((prompt) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'suggestion';
    chip.textContent = prompt;
    chip.addEventListener('click', () => {
      dom.messageInput.value = prompt;
      dom.messageInput.focus();
    });
    dom.promptSuggestions.appendChild(chip);
  });
}

function renderFocusModes() {
  dom.focusModes.innerHTML = '';
  state.focusModes.forEach((mode) => {
    const pill = document.createElement('span');
    pill.className = 'tag';
    pill.textContent = mode;
    dom.focusModes.appendChild(pill);
  });
}

function renderTraits() {
  dom.assistantTraits.innerHTML = '';
  state.traits.forEach((trait) => {
    const li = document.createElement('li');
    li.textContent = trait;
    dom.assistantTraits.appendChild(li);
  });
}

function renderMetrics() {
  dom.metrics.innerHTML = '';
  const metrics = [
    { label: 'Messages exchanged', value: state.metrics.totalMessages },
    { label: 'Curated sources', value: state.metrics.curatedSources },
    { label: 'Decisions logged', value: state.metrics.decisionsLogged },
    { label: 'Reminders armed', value: state.metrics.remindersArmed },
  ];

  metrics.forEach((metric) => {
    const container = document.createElement('div');
    container.className = 'metric';
    container.innerHTML = `<strong>${metric.value}</strong><span>${metric.label}</span>`;
    dom.metrics.appendChild(container);
  });
}

function renderEvents() {
  dom.timelineEvents.innerHTML = '';
  state.events.forEach((event) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `<span class="time">${event.time}</span><span class="detail">${event.detail}</span>`;
    dom.timelineEvents.appendChild(item);
  });
}

function renderKnowledge() {
  dom.knowledgeList.innerHTML = '';
  state.knowledge.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'knowledge-card';
    card.innerHTML = `
      <h4>${entry.title}</h4>
      <p>${entry.description}</p>
      <span class="tag">${entry.updated}</span>
    `;
    dom.knowledgeList.appendChild(card);
  });
}

function renderPlaybooks() {
  dom.playbookGrid.innerHTML = '';
  state.playbooks.forEach((playbook) => {
    const card = document.createElement('div');
    card.className = 'playbook-card';
    card.innerHTML = `
      <h4>${playbook.title}</h4>
      <p>${playbook.description}</p>
      <span class="tag">${playbook.duration}</span>
    `;
    dom.playbookGrid.appendChild(card);
  });
}

function renderTimelinePills() {
  dom.sessionTimeline.innerHTML = '';
  state.timeline.forEach((item) => {
    const pill = document.createElement('span');
    pill.className = 'timeline-pill';
    pill.textContent = item;
    dom.sessionTimeline.appendChild(pill);
  });
}

function renderDialogs() {
  const playbookLibrary = document.getElementById('playbook-library');
  playbookLibrary.innerHTML = '';
  state.playbooks.forEach((playbook) => {
    const card = document.createElement('div');
    card.className = 'dialog-card';
    card.innerHTML = `
      <h4>${playbook.title}</h4>
      <p>${playbook.description}</p>
      <div class="meta"><span>${playbook.duration}</span><span>Verified by Navigator</span></div>
    `;
    playbookLibrary.appendChild(card);
  });

  const knowledgeLibrary = document.getElementById('knowledge-library');
  knowledgeLibrary.innerHTML = '';
  state.knowledge.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'dialog-card';
    card.innerHTML = `
      <h4>${entry.title}</h4>
      <p>${entry.description}</p>
      <div class="meta"><span>${entry.updated}</span><span>Navigator curated</span></div>
    `;
    knowledgeLibrary.appendChild(card);
  });

  const changelogContent = document.getElementById('changelog-content');
  changelogContent.innerHTML = '';
  state.changelog.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'dialog-card';
    const notes = entry.notes.map((note) => `<li>${note}</li>`).join('');
    card.innerHTML = `
      <h4>Version ${entry.version}</h4>
      <div class="meta"><span>${entry.date}</span><span>Studio release</span></div>
      <ul>${notes}</ul>
    `;
    changelogContent.appendChild(card);
  });
}

function hydrateUI() {
  ensureActiveConversation();
  const conversation = state.conversations.find((c) => c.id === state.activeConversationId);

  dom.app.dataset.theme = state.theme;
  dom.toggleTheme.setAttribute('aria-pressed', state.theme === 'dark');
  dom.app.dataset.density = state.density === 'compact' ? 'compact' : 'standard';
  dom.toggleCompact.setAttribute('aria-pressed', state.density === 'compact');

  dom.chatTitle.textContent = conversation?.title ?? 'Nebula Navigator';
  renderConversationList(dom.sessionSearch.value || '');
  renderMessages(conversation);
  renderQuickPrompts();
  renderFocusModes();
  renderTraits();
  renderMetrics();
  renderEvents();
  renderKnowledge();
  renderPlaybooks();
  renderTimelinePills();
  renderDialogs();

  dom.pinButton.setAttribute('aria-pressed', conversation?.pinned || false);
  dom.pinButton.textContent = conversation?.pinned ? '📌 Pinned' : '📌 Pin';
  dom.footerSync.textContent = 'just now';
}

function composeUserMessage(content) {
  return {
    role: 'user',
    author: 'You',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    content: [content],
    cues: [],
  };
}

function composeBotReply(userMessage) {
  const responses = [
    {
      match: /summary|summarize/i,
      reply: [
        'Here is a human-curated summary referencing material we already filed:',
        {
          type: 'list',
          items: [
            'Key findings distilled into three focus areas with cited sources.',
            'Gaps Navigator spotted that might need manual confirmation.',
            'Suggested follow-up steps and who owns them.',
          ],
        },
        'Need me to open the source notes? I have them indexed.',
      ],
    },
    {
      match: /compare|difference|versus/i,
      reply: [
        'Let’s compare based on the datasets we track. I will list deltas and highlight where numbers shifted beyond the agreed threshold.',
        {
          type: 'list',
          items: [
            'Metric deltas with citations and measurement dates.',
            'Context describing why the shift occurred.',
            'Signals Navigator recommends monitoring next.',
          ],
        },
      ],
    },
    {
      match: /action|todo|task/i,
      reply: [
        'Pulling from the action tracker. You currently have 4 outstanding commitments:',
        {
          type: 'list',
          items: [
            'Send NGO briefing draft for review (due tomorrow).',
            'Confirm keynote run-through with Ava (pending reply).',
            'Share municipal policy digest with exec team (scheduled Friday).',
            'Upload annotated interview notes to workspace (requested by Priya).',
          ],
        },
        'Want me to nudge any of these or reprioritize?',
      ],
    },
  ];

  const matched = responses.find((entry) => entry.match.test(userMessage));
  if (matched) return matched.reply;

  return [
    'Understood. I will work within our verified notes and respond with grounded material.',
    'If you need citations or supporting evidence, just say “Show references”.',
  ];
}

function handleSendMessage(event) {
  event.preventDefault();
  const content = dom.messageInput.value.trim();
  if (!content) return;

  const conversation = state.conversations.find((c) => c.id === state.activeConversationId);
  if (!conversation) return;

  const userMessage = composeUserMessage(content);
  conversation.messages.push(userMessage);
  state.metrics.totalMessages += 1;
  dom.messageInput.value = '';
  renderMessages(conversation);
  persistState();

  setTimeout(() => {
    const reply = composeBotReply(content);
    conversation.messages.push({
      role: 'assistant',
      author: 'Nebula Navigator',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: reply,
      cues: ['Manual review queued'],
    });
    state.metrics.totalMessages += 1;
    renderMessages(conversation);
    persistState();
  }, 600);
}

function handleNewSession() {
  const id = crypto.randomUUID();
  const conversation = {
    id,
    title: 'Untitled session',
    summary: 'No summary yet—Navigator waiting for direction.',
    lastInteraction: 'moments ago',
    pinned: false,
    unread: 0,
    tags: ['draft'],
    messages: [
      {
        role: 'assistant',
        author: 'Nebula Navigator',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: [
          'Welcome back. Ready to track a new thread? Share what we are exploring and I will set up the workspace.',
        ],
        cues: ['No external sources attached'],
      },
    ],
  };
  state.conversations.unshift(conversation);
  state.activeConversationId = id;
  persistState();
  hydrateUI();
}

function handleSearch(event) {
  renderConversationList(event.target.value);
}

function handlePin() {
  const conversation = state.conversations.find((c) => c.id === state.activeConversationId);
  if (!conversation) return;
  conversation.pinned = !conversation.pinned;
  persistState();
  hydrateUI();
}

function handleExport() {
  const conversation = state.conversations.find((c) => c.id === state.activeConversationId);
  if (!conversation) return;
  const transcript = conversation.messages
    .map((message) => `${message.author} (${message.time})\n${message.content
      .map((chunk) => (typeof chunk === 'string' ? chunk : `• ${chunk.items.join('\n• ')}`))
      .join('\n')}\n`)
    .join('\n');

  const blob = new Blob([transcript], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${conversation.title.replace(/\s+/g, '-')}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function handleClear() {
  const conversation = state.conversations.find((c) => c.id === state.activeConversationId);
  if (!conversation) return;
  conversation.messages = [
    {
      role: 'assistant',
      author: 'Nebula Navigator',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: [
        'Cleared the slate. Share your goal and I will prepare the right briefings or checklists.',
      ],
      cues: ['Workspace refreshed'],
    },
  ];
  persistState();
  hydrateUI();
}

function handleToggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  persistState();
  hydrateUI();
}

function handleToggleDensity() {
  state.density = state.density === 'compact' ? 'standard' : 'compact';
  persistState();
  hydrateUI();
}

function autoResizeTextarea() {
  dom.messageInput.style.height = 'auto';
  dom.messageInput.style.height = `${dom.messageInput.scrollHeight}px`;
}

dom.messageInput.addEventListener('input', autoResizeTextarea);

dom.composer.addEventListener('submit', handleSendMessage);

dom.sessionSearch.addEventListener('input', handleSearch);

dom.newSession.addEventListener('click', handleNewSession);

dom.pinButton.addEventListener('click', handlePin);

dom.exportButton.addEventListener('click', handleExport);

dom.clearButton.addEventListener('click', handleClear);

dom.toggleTheme.addEventListener('click', handleToggleTheme);

dom.toggleCompact.addEventListener('click', handleToggleDensity);

dom.buttons.openSettings.addEventListener('click', () => dom.dialogs.settings.showModal());
dom.buttons.openPlaybooks.addEventListener('click', () => dom.dialogs.playbooks.showModal());
dom.buttons.openKnowledge.addEventListener('click', () => dom.dialogs.knowledge.showModal());
dom.buttons.openChangelog.addEventListener('click', () => dom.dialogs.changelog.showModal());

['settings', 'playbooks', 'knowledge', 'changelog'].forEach((key) => {
  dom.dialogs[key].addEventListener('cancel', (event) => event.preventDefault());
});

document.getElementById('settings-dark').addEventListener('change', handleToggleTheme);
document.getElementById('settings-compact').addEventListener('change', handleToggleDensity);

document.getElementById('refresh-overview').addEventListener('click', () => {
  const now = new Date();
  dom.footerSync.textContent = 'just refreshed';
  state.events.unshift({
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    detail: 'Navigator refreshed metrics snapshot.',
  });
  if (state.events.length > 8) {
    state.events.pop();
  }
  state.metrics.curatedSources += 1;
  persistState();
  hydrateUI();
});

document.getElementById('attach-note').addEventListener('click', () => {
  const conversation = state.conversations.find((c) => c.id === state.activeConversationId);
  if (!conversation) return;
  const note = {
    role: 'assistant',
    author: 'Nebula Navigator',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    content: [
      'Attached your latest field note set. Flagging that it was updated 12 minutes ago and still awaiting verification.',
    ],
    cues: ['Attachment queued'],
  };
  conversation.messages.push(note);
  renderMessages(conversation);
  persistState();
});

document.getElementById('insert-snippet').addEventListener('click', () => {
  const snippet = 'Checklist: confirm sources → summarize insights → log follow-ups.';
  dom.messageInput.value = `${dom.messageInput.value} ${snippet}`.trim();
  dom.messageInput.focus();
  autoResizeTextarea();
});

document.getElementById('insert-emoji').addEventListener('click', () => {
  dom.messageInput.value = `${dom.messageInput.value} 🙂`.trim();
  dom.messageInput.focus();
  autoResizeTextarea();
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== dom.sessionSearch) {
    dom.sessionSearch.focus();
    event.preventDefault();
  }
  if (event.key === 'Escape') {
    Object.values(dom.dialogs).forEach((dialog) => dialog.open && dialog.close());
  }
});

hydrateUI();

setInterval(() => {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  dom.footerSync.textContent = `updated ${timestamp}`;
}, 30000);

