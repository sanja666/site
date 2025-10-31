const storageKey = 'nova-classroom-data-v1';

const defaultData = {
  students: [
    {
      id: 'stu-1',
      name: 'Anna Bērziņa',
      gradeLevel: '7A',
      focusAreas: ['STEM lead', 'Debate club'],
      tags: ['Celebrate'],
      parents: {
        guardian: 'Līga Bērziņa',
        contact: '+371 2244 5544',
        email: 'liga.berzina@example.com',
      },
      attendance: { present: 96, late: 2, absent: 2 },
      behaviour: 'Model learner with a passion for problem solving.',
      supportPlan: 'Offer advanced math challenges twice a week.',
      wellbeing: 'Reports high motivation; enjoys collaborative work.',
      marks: {
        Mathematics: [10, 9, 10, 9],
        Latvian: [9, 8, 10],
        Science: [10, 10, 9],
        History: [8, 9, 9],
      },
      upcomingAssessments: [
        { title: 'Geometry project showcase', dueDate: '2024-04-19' },
        { title: 'Science fair prototype', dueDate: '2024-04-26' },
      ],
      notes: [
        'Family would appreciate weekly update email.',
        'Prepare recommendation for robotics camp.',
      ],
    },
    {
      id: 'stu-2',
      name: 'Rihards Ozols',
      gradeLevel: '7A',
      focusAreas: ['Creative writing', 'Football team captain'],
      tags: ['Celebrate'],
      parents: {
        guardian: 'Māris Ozols',
        contact: '+371 2299 0011',
        email: 'maris.ozols@example.com',
      },
      attendance: { present: 92, late: 5, absent: 3 },
      behaviour: 'Energetic and collaborative, benefits from clear routines.',
      supportPlan: 'Provide visual planning templates for long-form writing.',
      wellbeing: 'Needs reminders to balance sports and rest.',
      marks: {
        Mathematics: [7, 8, 8, 9],
        Latvian: [9, 9, 10],
        Science: [8, 8, 9],
        History: [8, 7, 9],
      },
      upcomingAssessments: [
        { title: 'Narrative essay draft', dueDate: '2024-04-22' },
      ],
      notes: ['Invite to writing mentorship programme.'],
    },
    {
      id: 'stu-3',
      name: 'Lāsma Liepa',
      gradeLevel: '7A',
      focusAreas: ['STEM club', 'Choir'],
      tags: ['Support'],
      parents: {
        guardian: 'Agnese Liepa',
        contact: '+371 2667 4421',
        email: 'agnese.liepa@example.com',
      },
      attendance: { present: 88, late: 4, absent: 8 },
      behaviour: 'Quiet thinker. Benefits from check-ins and confidence boosts.',
      supportPlan: 'Schedule peer tutoring twice a week; chunk tasks.',
      wellbeing: 'Worries before assessments; enjoys art therapy sessions.',
      marks: {
        Mathematics: [6, 7, 7, 8],
        Latvian: [7, 8, 7],
        Science: [8, 7, 9],
        History: [7, 7, 8],
      },
      upcomingAssessments: [
        { title: 'Algebra mastery check', dueDate: '2024-04-17' },
        { title: 'Biology lab write-up', dueDate: '2024-04-23' },
      ],
      notes: [
        'Contact mother after biology lab to celebrate progress.',
        'Offer calming space before tests.',
      ],
    },
    {
      id: 'stu-4',
      name: 'Edgars Kalniņš',
      gradeLevel: '7A',
      focusAreas: ['Basketball', 'Media club'],
      tags: ['Support'],
      parents: {
        guardian: 'Ieva Kalniņa',
        contact: '+371 2933 8811',
        email: 'ieva.kalnina@example.com',
      },
      attendance: { present: 84, late: 8, absent: 8 },
      behaviour: 'Creative ideas; needs scaffolds for organisation.',
      supportPlan: 'Check planners every Monday and Thursday.',
      wellbeing: 'Responds well to positive calls home.',
      marks: {
        Mathematics: [6, 7, 8],
        Latvian: [7, 6, 7],
        Science: [8, 7, 7],
        History: [9, 8, 8],
      },
      upcomingAssessments: [
        { title: 'History museum reflection', dueDate: '2024-04-21' },
      ],
      notes: ['Coordinate with basketball coach around exam week.'],
    },
    {
      id: 'stu-5',
      name: 'Marta Jansone',
      gradeLevel: '7A',
      focusAreas: ['Community service', 'Art portfolio'],
      tags: ['Celebrate'],
      parents: {
        guardian: 'Janis Jansons',
        contact: '+371 2777 4410',
        email: 'janis.jansons@example.com',
      },
      attendance: { present: 98, late: 1, absent: 1 },
      behaviour: 'Empathetic leader who coaches peers generously.',
      supportPlan: 'Encourage leadership in service projects.',
      wellbeing: 'Thrives when trusted with responsibility.',
      marks: {
        Mathematics: [9, 10, 9],
        Latvian: [10, 10, 9],
        Science: [9, 9, 10],
        History: [9, 9, 9],
      },
      upcomingAssessments: [
        { title: 'Civics group presentation', dueDate: '2024-04-18' },
        { title: 'Art portfolio review', dueDate: '2024-04-25' },
      ],
      notes: ['Prepare reference letter for summer leadership institute.'],
    },
    {
      id: 'stu-6',
      name: 'Toms Siliņš',
      gradeLevel: '7A',
      focusAreas: ['Robotics', 'Esports club'],
      tags: ['Support'],
      parents: {
        guardian: 'Aldis Siliņš',
        contact: '+371 2300 7788',
        email: 'aldis.silins@example.com',
      },
      attendance: { present: 90, late: 6, absent: 4 },
      behaviour: 'Analytical thinker; needs encouragement to share ideas aloud.',
      supportPlan: 'Pair with presentation buddy and offer rehearsal time.',
      wellbeing: 'Responds well to gamified goals.',
      marks: {
        Mathematics: [8, 9, 8, 9],
        Latvian: [7, 8, 7],
        Science: [9, 9, 10],
        History: [8, 8, 9],
      },
      upcomingAssessments: [
        { title: 'Robotics sprint demo', dueDate: '2024-04-24' },
      ],
      notes: ['Send celebration note home after robotics demo.'],
    },
  ],
  assignments: [
    {
      id: 'as-1',
      title: 'Algebra mastery check',
      subject: 'Mathematics',
      dueDate: '2024-04-17',
      description: 'Short response questions covering algebraic reasoning.',
      status: 'Active',
    },
    {
      id: 'as-2',
      title: 'Narrative essay draft',
      subject: 'Latvian language',
      dueDate: '2024-04-22',
      description: 'First draft focused on character development.',
      status: 'Active',
    },
    {
      id: 'as-3',
      title: 'Science lab write-up',
      subject: 'Science',
      dueDate: '2024-04-23',
      description: 'Lab reflection analysing the controlled variables.',
      status: 'Active',
    },
  ],
  communications: [
    {
      id: 'com-1',
      recipient: 'Bērziņa family',
      channel: 'Email',
      message: 'Shared Anna’s progress in geometry and upcoming competition dates.',
      date: '2024-04-10 08:45',
    },
    {
      id: 'com-2',
      recipient: 'Liepa family',
      channel: 'Phone call',
      message: 'Discussed upcoming algebra assessment plan and support session.',
      date: '2024-04-09 16:20',
    },
    {
      id: 'com-3',
      recipient: 'Kalniņš family',
      channel: 'SMS',
      message: 'Celebrated Edgars’s history project success and shared study plan.',
      date: '2024-04-07 18:10',
    },
  ],
  agenda: [
    {
      time: '08:15',
      title: 'Morning greeting & advisory circle',
      details: 'Focus on gratitude and upcoming science fair milestones.',
    },
    {
      time: '09:00',
      title: '7A Mathematics',
      details: 'Stations: algebra puzzles, geometry VR, peer tutoring.',
    },
    {
      time: '10:30',
      title: 'Planning block',
      details: 'Co-plan cross-curricular civics project with Ms. Ozola.',
    },
    {
      time: '13:00',
      title: 'Family call window',
      details: 'Follow-up with Liepa family on support plan.',
    },
  ],
};

const state = {
  data: loadData(),
  activeView: 'dashboard',
  activeSubject: 'Mathematics',
};

function loadData() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Unable to read local data', error);
  }
  return structuredClone(defaultData);
}

function persistData() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state.data));
  } catch (error) {
    console.warn('Unable to save local data', error);
  }
}

function computeAverage(marks) {
  if (!marks || marks.length === 0) return 0;
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  return Math.round((total / marks.length) * 10) / 10;
}

function renderDashboard() {
  const attendanceMetric = document.querySelector('#metric-attendance .value');
  const performanceMetric = document.querySelector('#metric-performance .value');
  const completionMetric = document.querySelector('#metric-completion .value');

  const attendanceAvg = Math.round(
    state.data.students.reduce((sum, student) => sum + student.attendance.present, 0) /
      state.data.students.length
  );
  attendanceMetric.textContent = attendanceAvg;

  const subjectMarks = Object.values(state.data.students[0].marks).map((_, index) => index);
  const flattened = state.data.students.flatMap((student) =>
    Object.values(student.marks).flat()
  );
  const performanceAvg = computeAverage(flattened);
  performanceMetric.textContent = performanceAvg.toFixed(1);

  const completion = Math.round(
    (state.data.assignments.filter((a) => a.status === 'Completed').length /
      Math.max(state.data.assignments.length, 1)) *
      100
  );
  completionMetric.textContent = completion;

  renderAssessmentList();
  renderCommunicationTimeline();
  renderAgenda();
}

function renderAssessmentList() {
  const list = document.getElementById('assessment-list');
  list.innerHTML = '';
  const upcoming = state.data.students
    .flatMap((student) => student.upcomingAssessments.map((a) => ({ ...a, student: student.name })))
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  upcoming.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong><span class="meta">${new Date(
      item.dueDate
    ).toLocaleDateString()} · ${item.student}</span>`;
    list.appendChild(li);
  });
}

function renderCommunicationTimeline() {
  const timeline = document.getElementById('communication-timeline');
  timeline.innerHTML = '';
  const sorted = [...state.data.communications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  sorted.slice(0, 4).forEach((entry) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="timeline-point"></div>
      <div>
        <h4>${entry.recipient}</h4>
        <div class="meta">
          <span>${entry.channel}</span>
          <span>${new Date(entry.date).toLocaleString()}</span>
        </div>
        <p>${entry.message}</p>
      </div>`;
    timeline.appendChild(li);
  });
}

function renderAgenda() {
  const list = document.getElementById('agenda-list');
  list.innerHTML = '';
  state.data.agenda.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.time} · ${item.title}</strong><span>${item.details}</span>`;
    list.appendChild(li);
  });
}

function gradeLevel(grade) {
  if (grade >= 9) return 'high';
  if (grade >= 7) return 'medium';
  return 'low';
}

function renderGradebook() {
  const select = document.getElementById('subject-select');
  const subjects = Object.keys(state.data.students[0].marks);
  select.innerHTML = subjects
    .map((subject) => `<option value="${subject}">${subject}</option>`)
    .join('');
  if (!subjects.includes(state.activeSubject)) {
    state.activeSubject = subjects[0];
  }
  select.value = state.activeSubject;

  const tbody = document.getElementById('gradebook-body');
  tbody.innerHTML = '';
  state.data.students.forEach((student) => {
    const marks = student.marks[state.activeSubject] || [];
    const avg = computeAverage(marks);
    const latest = marks[marks.length - 1] ?? '–';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="student-cell">
          <strong>${student.name}</strong>
          <div class="meta">${student.gradeLevel}</div>
        </div>
      </td>
      <td class="align-center">
        ${marks
          .map(
            (mark, index) =>
              `<span class="grade-chip" data-index="${index}" data-student="${student.id}" data-level="${gradeLevel(
                mark
              )}">${mark}</span>`
          )
          .join('')}
        <button class="ghost" data-action="add-mark" data-student="${student.id}">+ Add</button>
      </td>
      <td class="align-center">${avg.toFixed(1)}</td>
      <td class="align-center">${latest}</td>`;
    tbody.appendChild(row);
  });
}

function renderStudentList(filter = 'all', searchTerm = '') {
  const list = document.getElementById('student-list');
  const template = document.getElementById('student-list-item-template');
  list.innerHTML = '';

  const filtered = state.data.students.filter((student) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'support' ? student.tags.includes('Support') : student.tags.includes('Celebrate');
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  filtered.forEach((student) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('[data-field="initials"]').textContent = student.name
      .split(' ')
      .map((part) => part[0])
      .join('');
    clone.querySelector('[data-field="name"]').textContent = student.name;
    clone.querySelector('[data-field="meta"]').textContent = `${student.gradeLevel} · ${student.focusAreas[0]}`;

    const badges = clone.querySelector('[data-field="badges"]');
    student.tags.forEach((tag) => {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = tag;
      badges.appendChild(badge);
    });

    const pill = clone.querySelector('.student-pill');
    pill.dataset.student = student.id;
    pill.addEventListener('click', () => selectStudent(student.id));
    list.appendChild(clone);
  });
}

function selectStudent(studentId) {
  const student = state.data.students.find((s) => s.id === studentId);
  if (!student) return;

  document.querySelectorAll('.student-pill').forEach((pill) => {
    pill.classList.toggle('active', pill.dataset.student === studentId);
  });

  const profile = document.getElementById('student-profile');
  profile.innerHTML = `
    <header>
      <div class="identity">
        <div class="avatar">${student.name
          .split(' ')
          .map((part) => part[0])
          .join('')}</div>
        <div>
          <h3>${student.name}</h3>
          <p>${student.gradeLevel}</p>
        </div>
      </div>
      <div>
        <button class="secondary" data-action="family-email">Email family</button>
      </div>
    </header>
    <section>
      <h4>Snapshot</h4>
      <div class="stat-blocks">
        <div class="stat-block"><span>Attendance</span><span>${student.attendance.present}%</span></div>
        <div class="stat-block"><span>Latest average</span><span>${computeAverage(
          Object.values(student.marks).flat()
        ).toFixed(1)}</span></div>
        <div class="stat-block"><span>Focus areas</span><span>${student.focusAreas.length}</span></div>
      </div>
    </section>
    <section>
      <h4>Learning narrative</h4>
      <p>${student.behaviour}</p>
      <p>${student.supportPlan}</p>
    </section>
    <section>
      <h4>Upcoming checkpoints</h4>
      <ul class="highlight-list">
        ${student.upcomingAssessments
          .map(
            (assessment) =>
              `<li><strong>${assessment.title}</strong><div class="meta">Due ${new Date(
                assessment.dueDate
              ).toLocaleDateString()}</div></li>`
          )
          .join('')}
      </ul>
    </section>
    <section>
      <h4>Family contact</h4>
      <p>${student.parents.guardian} · ${student.parents.contact}</p>
      <p>${student.parents.email}</p>
    </section>
    <section>
      <h4>Notes from you</h4>
      <ul class="highlight-list">
        ${student.notes.map((note) => `<li>${note}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderAssignments() {
  const list = document.getElementById('assignment-list');
  const count = document.getElementById('assignment-count');
  const template = document.getElementById('assignment-item-template');
  list.innerHTML = '';
  const activeAssignments = state.data.assignments.filter((assignment) => assignment.status !== 'Archived');
  count.textContent = activeAssignments.length;

  activeAssignments
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .forEach((assignment) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('[data-field="title"]').textContent = assignment.title;
      clone.querySelector('[data-field="subject"]').textContent = assignment.subject;
      clone.querySelector('[data-field="due"]').textContent = `Due ${new Date(
        assignment.dueDate
      ).toLocaleDateString()}`;
      clone.querySelector('[data-field="description"]').textContent = assignment.description;

      const container = clone.querySelector('.assignment-item');
      container.dataset.assignment = assignment.id;

      clone.querySelector('[data-action="complete"]').addEventListener('click', () => {
        updateAssignmentStatus(assignment.id, 'Completed');
      });

      clone.querySelector('[data-action="remove"]').addEventListener('click', () => {
        updateAssignmentStatus(assignment.id, 'Archived');
      });

      list.appendChild(clone);
    });
}

function updateAssignmentStatus(id, status) {
  const assignment = state.data.assignments.find((item) => item.id === id);
  if (!assignment) return;
  assignment.status = status;
  persistData();
  renderAssignments();
  renderDashboard();
  showSnackbar(status === 'Completed' ? 'Assignment marked complete' : 'Assignment archived');
}

function renderCommunications() {
  const list = document.getElementById('communication-list');
  const template = document.getElementById('communication-item-template');
  list.innerHTML = '';
  const sorted = [...state.data.communications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  sorted.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('[data-field="recipient"]').textContent = item.recipient;
    clone.querySelector('[data-field="channel"]').textContent = item.channel;
    clone.querySelector('[data-field="date"]').textContent = new Date(item.date).toLocaleString();
    clone.querySelector('[data-field="message"]').textContent = item.message;
    list.appendChild(clone);
  });
}

function renderInsights() {
  const subjectSelect = document.getElementById('reports-subject');
  const subjects = Object.keys(state.data.students[0].marks);
  subjectSelect.innerHTML = subjects
    .map((subject) => `<option value="${subject}">${subject}</option>`)
    .join('');
  subjectSelect.value = state.activeSubject;

  renderSubjectMastery(state.activeSubject);
  renderAttendanceSpotlight();
  renderCelebrations();
}

function renderSubjectMastery(subject) {
  const list = document.getElementById('subject-masteries');
  list.innerHTML = '';

  state.data.students
    .map((student) => ({
      name: student.name,
      average: computeAverage(student.marks[subject]),
    }))
    .sort((a, b) => b.average - a.average)
    .forEach((item) => {
      const li = document.createElement('li');
      const percent = Math.round((item.average / 10) * 100);
      li.innerHTML = `
        <div class="meta"><strong>${item.name}</strong><span>${item.average.toFixed(1)}</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${percent}%"></div></div>
      `;
      list.appendChild(li);
    });
}

function renderAttendanceSpotlight() {
  const list = document.getElementById('attendance-spotlight');
  list.innerHTML = '';

  const sorted = [...state.data.students].sort(
    (a, b) => a.attendance.present - b.attendance.present
  );

  sorted.forEach((student) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${student.name}</strong>
      <div class="meta">${student.attendance.present}% present · ${student.attendance.absent} absences</div>
    `;
    list.appendChild(li);
  });
}

function renderCelebrations() {
  const list = document.getElementById('celebrations');
  list.innerHTML = '';

  state.data.students.forEach((student) => {
    const li = document.createElement('li');
    const highestSubject = Object.entries(student.marks).sort(
      (a, b) => computeAverage(b[1]) - computeAverage(a[1])
    )[0];
    li.innerHTML = `
      <strong>${student.name}</strong>
      <div class="meta">${highestSubject[0]} · ${computeAverage(highestSubject[1]).toFixed(1)} avg</div>
      <p>${student.wellbeing}</p>
    `;
    list.appendChild(li);
  });
}

function showSnackbar(message) {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.classList.add('visible');
  setTimeout(() => snackbar.classList.remove('visible'), 2500);
}

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      state.activeView = target;
      document.querySelectorAll('[data-view]').forEach((section) => {
        section.classList.toggle('hidden', section.id !== target);
      });
      document.querySelectorAll('.nav-item').forEach((nav) => {
        nav.classList.toggle('active', nav === button);
      });

      if (target === 'gradebook') {
        renderGradebook();
      }
      if (target === 'students') {
        renderStudentList();
      }
      if (target === 'assignments') {
        renderAssignments();
      }
      if (target === 'communication') {
        renderCommunications();
      }
      if (target === 'reports') {
        renderInsights();
      }
    });
  });
}

function setupGlobalSearch() {
  const input = document.getElementById('global-search');
  input.addEventListener('input', (event) => {
    const term = event.target.value.toLowerCase();
    const suggestions = state.data.students
      .filter((student) => student.name.toLowerCase().includes(term))
      .slice(0, 3)
      .map((student) => student.name)
      .join(', ');
    input.setAttribute('title', suggestions);
  });
}

function setupGradebookInteractions() {
  document.getElementById('subject-select').addEventListener('change', (event) => {
    state.activeSubject = event.target.value;
    renderGradebook();
    renderInsights();
  });

  document.getElementById('gradebook').addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.grade-chip')) {
      const student = target.dataset.student;
      const index = Number(target.dataset.index);
      const mark = prompt('Update mark (1-10):', target.textContent);
      if (!mark) return;
      const numeric = Number(mark);
      if (Number.isNaN(numeric) || numeric < 1 || numeric > 10) {
        showSnackbar('Enter a number between 1 and 10');
        return;
      }
      const studentRecord = state.data.students.find((s) => s.id === student);
      studentRecord.marks[state.activeSubject][index] = numeric;
      persistData();
      renderGradebook();
      renderInsights();
      showSnackbar('Mark updated');
    }

    if (target.dataset.action === 'add-mark') {
      const student = target.dataset.student;
      const mark = prompt('Add new mark (1-10):');
      if (!mark) return;
      const numeric = Number(mark);
      if (Number.isNaN(numeric) || numeric < 1 || numeric > 10) {
        showSnackbar('Enter a number between 1 and 10');
        return;
      }
      const studentRecord = state.data.students.find((s) => s.id === student);
      studentRecord.marks[state.activeSubject].push(numeric);
      persistData();
      renderGradebook();
      renderInsights();
      showSnackbar('New mark added');
    }
  });

  document.getElementById('export-gradebook').addEventListener('click', () => {
    window.print();
  });
}

function setupStudentFilters() {
  const search = document.getElementById('student-search');
  const filters = document.querySelectorAll('.filters button');

  search.addEventListener('input', (event) => {
    renderStudentList(document.querySelector('.filters button.active')?.dataset.filter ?? 'all', event.target.value);
  });

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderStudentList(button.dataset.filter, search.value);
    });
  });

  filters[0].classList.add('active');
}

function setupAssignmentForm() {
  const form = document.getElementById('assignment-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const assignment = {
      id: `as-${Date.now()}`,
      title: formData.get('title'),
      subject: formData.get('subject'),
      dueDate: formData.get('dueDate'),
      description: formData.get('description'),
      status: 'Active',
    };
    state.data.assignments.push(assignment);
    persistData();
    form.reset();
    renderAssignments();
    renderDashboard();
    showSnackbar('Assignment added');
  });
}

function setupCommunicationForm() {
  const form = document.getElementById('communication-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const communication = {
      id: `com-${Date.now()}`,
      recipient: formData.get('recipient'),
      channel: formData.get('channel'),
      message: formData.get('message'),
      date: new Date().toISOString(),
    };
    state.data.communications.push(communication);
    persistData();
    form.reset();
    renderCommunications();
    renderDashboard();
    showSnackbar('Communication logged');
  });
}

function setupReportsSelect() {
  const select = document.getElementById('reports-subject');
  select.addEventListener('change', (event) => {
    state.activeSubject = event.target.value;
    renderSubjectMastery(state.activeSubject);
  });
}

function setupQuickActions() {
  document.querySelector('[data-action="jump-gradebook"]').addEventListener('click', () => {
    document.querySelector('[data-target="gradebook"]').click();
  });
  document.querySelector('[data-action="new-message"]').addEventListener('click', () => {
    document.querySelector('[data-target="communication"]').click();
    document.querySelector('#communication-form [name="recipient"]').focus();
  });
  document.querySelector('[data-action="add-assignment"]').addEventListener('click', () => {
    document.querySelector('[data-target="assignments"]').click();
    document.querySelector('#assignment-form [name="title"]').focus();
  });
}

function setupResetDemo() {
  document.getElementById('reset-demo').addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    state.data = structuredClone(defaultData);
    renderAll();
    showSnackbar('Demo data restored');
  });
}

function renderAll() {
  renderDashboard();
  if (state.activeView === 'gradebook') renderGradebook();
  if (state.activeView === 'students') renderStudentList();
  if (state.activeView === 'assignments') renderAssignments();
  if (state.activeView === 'communication') renderCommunications();
  if (state.activeView === 'reports') renderInsights();
}

function init() {
  renderDashboard();
  setupNavigation();
  setupGlobalSearch();
  setupGradebookInteractions();
  setupStudentFilters();
  setupAssignmentForm();
  setupCommunicationForm();
  setupReportsSelect();
  setupQuickActions();
  setupResetDemo();
  renderAssignments();
  renderCommunications();
}

document.addEventListener('DOMContentLoaded', init);
