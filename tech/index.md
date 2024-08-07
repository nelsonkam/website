---
custom: true
---

<script setup lang="ts">
import { data as posts } from "./posts.data"
function formatDate(date: Date) {
  return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
}
</script>

<main class="max-w-2xl w-full p-4 mx-auto py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Tinkering</h1>
  <p class="text-lg text-gray-500 mt-2">Things I've built and how I built them.</p>
  <div class="flex flex-col divide-y mt-6 *:py-4 *:space-y-4">
    <a v-for="post in posts" :href="post.url" class="group">
      <div class="space-y-1">
        <h2 class="text-xl font-semibold tracking-tight md:text-2xl group-hover:underline">
          {{ post.frontmatter.title }}
        </h2>
        <p class="text-sm text-gray-500">{{ formatDate(new Date(post.frontmatter.date)) }}</p>
      </div>
      <p class="text-base" v-html="post.excerpt || post.frontmatter.excerpt"></p>
    </a>
  </div>
</main>

