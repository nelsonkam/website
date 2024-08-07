import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "Nelson's blog",
    description:
      "Hey there! I’m Nelson, and I love computers. I’m currently studying Computer Science at the University of Montreal.",
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],
    mermaid: {
      // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    vite: {
      optimizeDeps: { include: ["@braintree/sanitize-url"] },
      resolve: {
        alias: {
          dayjs: "dayjs/",
        },
      },
    },
  })
);
