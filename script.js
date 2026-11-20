
// =====================================
// CYBER INCIDENT TIMELINE GENERATOR
// =====================================

// Demo records from multiple organizations.
// These are sample records, not verified live incidents.

const sampleIncidents = [
  {
    id: 1,
    org: "Global Finance Group",
    name: "Phishing Attack",
    type: "Phishing",
    severity: "Critical",
    date: "2026-11-18",
    status: "Under Investigation"
  },
  {
    id: 2,
    org: "Healthcare Network",
    name: "Ransomware Detection",
    type: "Ransomware",
    severity: "High",
    date: "2026-11-17",
    status: "In Progress"
  },
  {
    id: 3,
    org: "Education Systems",
    name: "Unauthorized Login",
    type: "Unauthorized Access",
    severity: "Medium",
    date: "2026-11-16",
    status: "Monitoring"
  },
  {
    id: 4,
    org: "Retail Technology",
    name: "Malware Alert",
    type: "Malware",
    severity: "High",
    date: "2026-11-15",
    status: "Resolved"
  },
  {
    id: 5,
    org: "Cloud Services",
    name: "Data Exposure",
    type: "Data Breach",
    severity: "Critical",
    date: "2026-11-14",
    status: "Under Investigation"
  }
];

let incidents = JSON.parse(
  localStorage.getItem("cyberIncidents")
) || sampleIncidents;

let evidence = JSON.parse(
  localStorage.getItem("cyberEvidence")
) || [];


// =====================================
// SAVE DATA
// =====================================

function saveData() {
  localStorage.setItem(
    "cyberIncidents",
    JSON.stringify(incidents)
  );

  localStorage.setItem(
    "cyberEvidence",
    JSON.stringify(evidence)
  );
}


// =====================================
// SAFE TEXT DISPLAY
// =====================================

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}


// =====================================
// PAGE NAVIGATION
// =====================================

const pageTitles = {
  dashboard: "Security Dashboard",
  incidents: "Incident Management",
  timeline: "Timeline Generator",
  global: "Global Incident Monitoring",
  threats: "Threat Classification",
  investigation: "Investigation Workspace",
  evidence: "Evidence Management",
  response: "Response Management",
  audit: "Historical Audit",
  reports: "Reports & Analytics"
};

function showPage(page, link) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active-page");
  });

  const selectedPage = document.getElementById(page);

  if (selectedPage) {
    selectedPage.classList.add("active-page");
  }

  document.querySelectorAll(".sidebar nav a").forEach(item => {
    item.classList.remove("active");
  });

  if (link) {
    link.classList.add("active");
  }

  document.getElementById("pageTitle").textContent =
    pageTitles[page] || "CyberWatch";

  document.getElementById("pageName").textContent =
    page.toUpperCase();

  renderAll();
}


// =====================================
// INCIDENT ROW DESIGN
// =====================================

function incidentRow(item) {
  return `
    <div class="incident-row">
      <div>
        <strong>${escapeHTML(item.name)}</strong>
        <p>
          ${escapeHTML(item.org)}
          · ${escapeHTML(item.date)}
        </p>
      </div>

      <span class="severity ${item.severity.toLowerCase()}">
        ${escapeHTML(item.severity)}
      </span>

      <span>${escapeHTML(item.status)}</span>
    </div>
  `;
}


// =====================================
// UPDATE ALL MODULES
// =====================================

function renderAll() {
  renderDashboard();
  renderIncidents();
  renderTimeline();
  renderGlobal();
  renderThreats();
  renderInvestigation();
  renderEvidence();
  renderResponse();
  renderAudit();
  renderReports();
}


// =====================================
// DASHBOARD
// =====================================

function renderDashboard() {
  const total = incidents.length;

  const critical = incidents.filter(
    item => item.severity === "Critical"
  ).length;

  const high = incidents.filter(
    item => item.severity === "High"
  ).length;

  const medium = incidents.filter(
    item => item.severity === "Medium"
  ).length;

  const low = incidents.filter(
    item => item.severity === "Low"
  ).length;

  document.getElementById("total").textContent = total;
  document.getElementById("criticalCount").textContent = critical;
  document.getElementById("highCount").textContent = high;
  document.getElementById("mediumCount").textContent = medium;
  document.getElementById("lowCount").textContent = low;

  const recent = document.getElementById("recentIncidents");

  recent.innerHTML = incidents
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(incidentRow)
    .join("") || "<p>No incidents recorded.</p>";
}


// =====================================
// INCIDENT MANAGEMENT
// =====================================

function renderIncidents() {
  const list = document.getElementById("incidentList");

  list.innerHTML = incidents.map(incidentRow).join("") ||
    "<p>No incidents available.</p>";
}

function saveIncident(event) {
  event.preventDefault();

  const org = document.getElementById("org").value.trim();
  const name = document.getElementById("incident").value.trim();
  const type = document.getElementById("type").value;
  const severity = document.getElementById("severity").value;
  const date = document.getElementById("date").value;

  if (!org || !name || !date) {
    alert("Please complete all required fields.");
    return;
  }

  incidents.push({
    id: Date.now(),
    org,
    name,
    type,
    severity,
    date,
    status: "New"
  });

  saveData();

  document.getElementById("incidentForm").reset();

  renderAll();

  alert("New incident added successfully!");
}


// =====================================
// TIMELINE GENERATOR
// =====================================

function renderTimeline() {
  const result = document.getElementById("timelineResult");

  if (!result) return;

  result.innerHTML = incidents
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(incidentRow)
    .join("") || "<p>No timeline records.</p>";
}

function generateTimeline() {
  renderTimeline();

  document.getElementById("timelineResult").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}


// =====================================
// GLOBAL INCIDENT MONITORING
// =====================================

function renderGlobal() {
  const list = document.getElementById("globalList");

  const organizations = [...new Set(
    incidents.map(item => item.org)
  )];

  list.innerHTML = `
    <div class="notice">
      Demo records only. No live worldwide threat feed is connected.
    </div>

    <div class="incident-row">
      <strong>Total Organizations</strong>
      <strong>${organizations.length}</strong>
    </div>

    <div class="incident-row">
      <strong>Total Recorded Incidents</strong>
      <strong>${incidents.length}</strong>
    </div>

    ${organizations.map(org => `
      <div class="incident-row">
        <strong>${escapeHTML(org)}</strong>
        <span>
          ${incidents.filter(item => item.org === org).length}
          incident(s)
        </span>
      </div>
    `).join("")}
  `;
}


// =====================================
// THREAT CLASSIFICATION
// =====================================

function renderThreats() {
  const list = document.getElementById("threatList");

  const types = [...new Set(
    incidents.map(item => item.type)
  )];

  list.innerHTML = types.map(type => `
    <div class="incident-row">
      <strong>${escapeHTML(type)}</strong>
      <span>
        ${incidents.filter(item => item.type === type).length}
        incident(s)
      </span>
    </div>
  `).join("") || "<p>No threat categories.</p>";
}


// =====================================
// INVESTIGATION
// =====================================

function renderInvestigation() {
  const list = document.getElementById("investigationList");

  const active = incidents.filter(
    item => item.status !== "Resolved"
  );

  list.innerHTML = active.map(incidentRow).join("") ||
    "<p>No active investigations.</p>";
}


// =====================================
// EVIDENCE MANAGEMENT
// =====================================

function addEvidence() {
  const input = document.getElementById("evidenceName");
  const name = input.value.trim();

  if (!name) {
    alert("Enter an evidence reference.");
    return;
  }

  evidence.push({
    id: Date.now(),
    name,
    date: new Date().toLocaleDateString()
  });

  saveData();

  input.value = "";

  renderEvidence();

  alert("Evidence reference added.");
}

function renderEvidence() {
  const list = document.getElementById("evidenceList");

  list.innerHTML = evidence.map(item => `
    <div class="incident-row">
      <strong>${escapeHTML(item.name)}</strong>
      <span>${escapeHTML(item.date)}</span>
    </div>
  `).join("") || "<p>No evidence records.</p>";
}


// =====================================
// RESPONSE MANAGEMENT
// =====================================

function renderResponse() {
  const list = document.getElementById("responseList");

  list.innerHTML = incidents.map(item => `
    <div class="incident-row">
      <div>
        <strong>${escapeHTML(item.name)}</strong>
        <p>${escapeHTML(item.org)}</p>
      </div>

      <select onchange="updateStatus(${item.id}, this.value)">
        ${[
          "New",
          "Under Investigation",
          "In Progress",
          "Monitoring",
          "Resolved"
        ].map(status => `
          <option
            value="${status}"
            ${item.status === status ? "selected" : ""}
          >
            ${status}
          </option>
        `).join("")}
      </select>
    </div>
  `).join("") || "<p>No response records.</p>";
}

function updateStatus(id, status) {
  const item = incidents.find(
    incident => incident.id === id
  );

  if (!item) return;

  item.status = status;

  saveData();
  renderAll();
}


// =====================================
// HISTORICAL AUDIT
// =====================================

function renderAudit() {
  const list = document.getElementById("auditList");

  list.innerHTML = incidents.map(item => `
    <div class="incident-row">
      <div>
        <strong>${escapeHTML(item.name)}</strong>
        <p>${escapeHTML(item.org)} · ${escapeHTML(item.date)}</p>
      </div>
      <span>${escapeHTML(item.status)}</span>
    </div>
  `).join("") || "<p>No historical records.</p>";
}


// =====================================
// REPORTS & ANALYTICS
// =====================================

function renderReports() {
  const list = document.getElementById("reportList");

  const count = severity => incidents.filter(
    item => item.severity === severity
  ).length;

  list.innerHTML = `
    <div class="incident-row">
      <strong>Total Incidents</strong>
      <strong>${incidents.length}</strong>
    </div>

    <div class="incident-row">
      <strong>Critical</strong>
      <span>${count("Critical")}</span>
    </div>

    <div class="incident-row">
      <strong>High</strong>
      <span>${count("High")}</span>
    </div>

    <div class="incident-row">
      <strong>Medium</strong>
      <span>${count("Medium")}</span>
    </div>

    <div class="incident-row">
      <strong>Low</strong>
      <span>${count("Low")}</span>
    </div>

    <button class="primary-btn" onclick="downloadReport()">
      Download CSV Report
    </button>
  `;
}


// =====================================
// DOWNLOAD CSV
// =====================================

function downloadReport() {
  const headings = [
    "Organization",
    "Incident",
    "Threat Type",
    "Severity",
    "Date",
    "Status"
  ];

  const rows = incidents.map(item => [
    item.org,
    item.name,
    item.type,
    item.severity,
    item.date,
    item.status
  ]);

  const csv = [headings, ...rows]
    .map(row => row.map(value =>
      `"${String(value).replace(/"/g, '""')}"`
    ).join(","))
    .join("\n");

  const file = new Blob(
    [csv],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Cyber_Incident_Report.csv";
  link.click();

  URL.revokeObjectURL(url);
}


// =====================================
// START APPLICATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("incidentForm");

  form.addEventListener("submit", saveIncident);

  const firstLink = document.querySelector(".sidebar nav a");

  showPage("dashboard", firstLink);
});
