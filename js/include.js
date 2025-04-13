document.addEventListener("DOMContentLoaded", function () {
    // Charger la navigation
    fetch("nav.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("nav-placeholder").innerHTML = data;
      })
      .catch(error => console.error("Erreur lors du chargement de la nav :", error));
  
    // Charger le footer
    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
      })
      .catch(error => console.error("Erreur lors du chargement du footer :", error));

    // Charger le head
    fetch("head.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("head-placeholder").innerHTML = data;
      })
      .catch(error => console.error("Erreur lors du chargement du footer :", error));
  });