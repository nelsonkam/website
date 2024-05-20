import { createContentLoader } from "vitepress";

export default createContentLoader("thoughts/*.md", {
  excerpt: true,
  transform: (data) => {
    const raw = data
      .filter((page) => page.url !== "/thoughts/")
      .sort((a, b) => {
        return (
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
        );
      });
    return raw;
  },
});
