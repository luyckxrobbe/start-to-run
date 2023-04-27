document.addEventListener("DOMContentLoaded", function () {
  const tds = document.querySelectorAll("td");

  // Load the previously selected TDs from the cookies
  const selectedRuns = JSON.parse(getCookie("selectedRuns")) || [];
  selectedRuns.forEach((run) => {
    const cell = document.querySelector(
      `td[data-week="${run.week}"][data-run="${run.run}"]`
    );
    cell.classList.add("done");
  });

  tds.forEach((td) => {
    td.addEventListener("click", function () {
      const week = this.dataset.week;
      const run = this.dataset.run;
      const clickedId = { week, run };
      const selectedRuns = JSON.parse(getCookie("selectedRuns")) || [];
      const index = selectedRuns.findIndex(
        (r) => r.week === clickedId.week && r.run === clickedId.run
      );

      if (index > -1) {
        selectedRuns.splice(index, 1);
      } else {
        selectedRuns.push(clickedId);
      }

      setCookie("selectedRuns", JSON.stringify(selectedRuns));

      // Toggle the 'done' class on the clicked TD
      this.classList.toggle("done");
    });
  });

  // Helper functions to set and get cookies
  function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
  }
});
