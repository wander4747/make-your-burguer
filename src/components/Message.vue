<template>
  <div class="message-container">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    text: String
  }
}
</script>

<style scoped>
  .message-container {
    color: #004085;
    background-color: #cce5ff;
    border: 2px solid #b8daff;
    border-radius: 5px;
    padding: 10px;
    max-width: 400px;
    margin: 30px auto;
  }
</style>