<template>
  <layout>
    <!-- <navbar /> -->

    <!-- Block start here -->
    <block01 />

    <inputExample label="name" />
  </layout>
</template>

<script setup>
import layout from "./components/layout/app.vue";
// navbar
import navbar from "./components/global/navbar.vue";

// Blocks
import block01 from "./components/Block01.vue";
import genericBlock from "./components/global/GenericBlock.vue";

// Examples
import inputExample from "./components/examples/inputs.vue";

// Update the page tittle
document.title = "Mario Tarosso | Projects";
</script>
