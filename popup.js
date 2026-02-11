document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["logs"], (result) => {
    const logs = result.logs || [];
    const tbody = document.getElementById("logsTableBody");
    
    // Reverse so most recent events show first
    logs.reverse().forEach(log => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${new Date(log.timestamp).toLocaleTimeString()}</td>
        <td>${log.domain}</td>
        <td>${log.eventType}</td>
        <td>${log.actionTaken || "-"}</td>
      `;
      tbody.appendChild(row);
    });

    // Optional: simple risk score = number of logs
    const riskScore = logs.length;
    document.getElementById("riskScore").textContent = `Risk Score: ${riskScore}`;
  });
});
