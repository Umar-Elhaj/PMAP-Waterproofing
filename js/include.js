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



  document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        // Prevent the default link behavior (optional, depending on your needs)
        // event.preventDefault();

        // Remove 'active' class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add 'active' class to the clicked link
        this.classList.add('active');
      });
    });
  });
