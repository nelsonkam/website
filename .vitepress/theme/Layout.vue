<script setup lang="ts">
import { useData } from 'vitepress'
import Header from './header.vue';

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
function formatDate(date: Date) {
  return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
}
</script>

<template>
  <Header></Header>
  <div v-if="frontmatter.custom">
    <Content />
  </div>
  <div v-else>
    <main class="max-w-2xl w-full p-4 mx-auto py-16">
      <h1 class="text-4xl font-semibold tracking-tight">{{ frontmatter.title }}</h1>
      <p class="text-gray-500 mt-2" v-if="frontmatter.date">{{ formatDate(new Date(frontmatter.date)) }}</p>
      <section class="content">
        <Content />
      </section>
    </main>

  </div>
</template>
