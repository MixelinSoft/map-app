<script></script>

<template>
  <main class="main">
    <slot />
  </main>
</template>

<style scoped>
.main {
  padding-top: 64px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
