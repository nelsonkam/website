/**
 * Custom shiki theme matching the terminal theme's duotone syntax highlighting.
 *
 * Dark mode: white accent (#ffffff)
 * - Keywords: accent at 70% → #b3b3b3
 * - Names / functions / numbers: accent → #ffffff
 * - Strings / operators: foreground → #eceae5
 * - Comments: foreground at 50% → #767369
 */
export const terminalTheme = {
  name: "terminal-duotone",
  type: "dark" as const,
  colors: {
    "editor.background": "transparent",
    "editor.foreground": "#eceae5",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#767369" },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.expression",
        "storage",
        "storage.type",
        "storage.modifier",
        "entity.name.tag",
        "support.type",
        "constant.language",
      ],
      settings: { foreground: "#b3b3b3" },
    },
    {
      scope: [
        "variable",
        "variable.other",
        "entity.name.function",
        "entity.name.type",
        "entity.other.attribute-name",
        "support.function",
        "support.variable",
        "meta.definition.variable",
        "constant.numeric",
        "constant.other",
        "entity.name",
        "markup.heading",
      ],
      settings: { foreground: "#ffffff" },
    },
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "punctuation",
        "meta.brace",
        "keyword.operator",
      ],
      settings: { foreground: "#eceae5" },
    },
  ],
};
