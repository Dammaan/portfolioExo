export function postAuthentification() {
      const btnConnexion = document.querySelector('input[value="Se connecter"]');
  
      if(btnConnexion) {
        btnConnexion.addEventListener("click", async (event) => {
                event.preventDefault();
                // récuperation des données formulaires
                const email = document.getElementById("email")?.value.trim();
                const password = document.getElementById("password")?.value.trim();
          
                await login(email, password);
              });
      }

      
    }
  
  async function login(email, password) {
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        alert(
          "L’authentification a échoué. Veuillez vérifier votre identifiant et votre mot de passe et réessayer."
        );
      }
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem("token", data.token); // Stocker le token
        window.location.href = "./index.html"; // Rediriger l'utilisateur
      } 
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
    }
  }
