document.addEventListener("DOMContentLoaded", function () {
  const tds = document.querySelectorAll("td");

  // Load stored IDs when the page is loaded
  const storedIds = JSON.parse(localStorage.getItem("selected")) || [];

  tds.forEach((td) => {
    td.addEventListener("click", function () {
      const currentContent = this.innerHTML;
      // Check if td has the 'done' class
      const hasDoneClass = this.classList.contains("done");

      // Check if the clicked td's id is already stored
      const clickedId = this.id;
      const index = storedIds.indexOf(clickedId);

      // Add or remove the clicked td's id from the storedIds array
      if (!hasDoneClass && index === -1) {
        storedIds.push(clickedId);
      } else if (hasDoneClass && index > -1) {
        storedIds.splice(index, 1);
      }

      // Store the updated storedIds array in localStorage
      localStorage.setItem("selected", JSON.stringify(storedIds));

      // Toggle the 'done' class on the clicked TD
      this.classList.toggle("done");
    });
  });
});
