<script>
export default {
  name: "page-not-found",
  data() {
    return {
      unavailableRoute: null,
    }
  },
  created() {
    this.unavailableRoute = this.$route.path;
  }
}
</script>

<template>
  <section class="notfound-container">
    <h1 class="notfound-title">Oops! Page not found</h1>
    <p class="notfound-message">
      Sorry, the page <code>{{ unavailableRoute }}</code> does not exist.
    </p>
    <router-link to="/home" class="notfound-link">← Return to Home</router-link>
  </section>
</template>

<style scoped>
.notfound-container {
  max-width: 480px;
  margin: 5rem auto;
  padding: 2rem;
  text-align: center;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.notfound-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #d9534f; /* Bootstrap's danger red */
  margin-bottom: 1rem;
}

.notfound-message {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
}

.notfound-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #0275d8; /* Bootstrap's primary blue */
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.notfound-link:hover {
  background-color: #025aa5;
}
</style>