module.exports = function generateAgents({ distDir, canvas, ansi, fs, path, ensureDir }) {
/* =========================================================================
   1. AI Coding Agents
   ========================================================================= */

// 1.1 Oh My Pi & Vanilla Pi (JSON)
const ompJson = {
  "$schema": "https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/theme-schema.json",
  "name": "kami",
  "vars": {
    "parchment": canvas.background,
    "ivory": canvas.surface,
    "sand": canvas.selection,
    "sandBorder": canvas.border,
    "sandBorderSoft": canvas.borderSoft,
    "nearBlack": canvas.foreground,
    "darkWarm": canvas.darkWarm,
    "olive": canvas.olive,
    "stone": canvas.muted,
    "dimStone": canvas.dim,
    "inkBlue": ansi.normal.blue,
    "inkLight": ansi.bright.blue,
    "pineGreen": ansi.normal.green,
    "bambooGreen": ansi.bright.green,
    "ochre": ansi.normal.yellow,
    "amber": ansi.bright.yellow,
    "rust": ansi.bright.red,
    "terracotta": ansi.normal.red,
    "slateSlate": ansi.normal.magenta,
    "slateCyan": ansi.normal.cyan,
    "selectedBg": canvas.selection,
    "userMsgBg": canvas.surface,
    "toolPendingBg": "#E5EBF2",
    "toolSuccessBg": "#E4EBE5",
    "toolErrorBg": "#F2E4E4",
    "customMsgBg": "#EDEAE2"
  },
  "colors": {
    "accent": "inkBlue",
    "border": "sandBorder",
    "borderAccent": "inkBlue",
    "borderMuted": "sandBorderSoft",
    "success": "pineGreen",
    "error": "terracotta",
    "warning": "ochre",
    "muted": "olive",
    "dim": "dimStone",
    "text": "",
    "thinkingText": "stone",
    "selectedBg": "selectedBg",
    "userMessageBg": "userMsgBg",
    "userMessageText": "",
    "customMessageBg": "customMsgBg",
    "customMessageText": "",
    "customMessageLabel": "inkBlue",
    "toolPendingBg": "toolPendingBg",
    "toolSuccessBg": "toolSuccessBg",
    "toolErrorBg": "toolErrorBg",
    "toolTitle": "inkBlue",
    "toolOutput": "olive",
    "mdHeading": "inkBlue",
    "mdLink": "inkLight",
    "mdLinkUrl": "dimStone",
    "mdCode": "rust",
    "mdCodeBlock": "nearBlack",
    "mdCodeBlockBorder": "sandBorder",
    "mdQuote": "olive",
    "mdQuoteBorder": "inkBlue",
    "mdHr": "sandBorder",
    "mdListBullet": "pineGreen",
    "toolDiffAdded": "pineGreen",
    "toolDiffRemoved": "terracotta",
    "toolDiffContext": "stone",
    "syntaxComment": "dimStone",
    "syntaxKeyword": "inkBlue",
    "syntaxFunction": "pineGreen",
    "syntaxVariable": "nearBlack",
    "syntaxString": "ochre",
    "syntaxNumber": "rust",
    "syntaxType": "slateCyan",
    "syntaxOperator": "olive",
    "syntaxPunctuation": "stone",
    "thinkingOff": "sandBorder",
    "thinkingMinimal": "dimStone",
    "thinkingLow": "inkLight",
    "thinkingMedium": "slateCyan",
    "thinkingHigh": "slateSlate",
    "thinkingXhigh": "rust",
    "bashMode": "pineGreen",
    "pythonMode": "ochre",
    "statusLineBg": "#E2DFD8",
    "statusLineSep": "#C0BDB4",
    "statusLineModel": "inkBlue",
    "statusLinePath": "slateCyan",
    "statusLineGitClean": "pineGreen",
    "statusLineGitDirty": "ochre",
    "statusLineContext": "inkLight",
    "statusLineSpend": "slateSlate",
    "statusLineStaged": "pineGreen",
    "statusLineDirty": "ochre",
    "statusLineUntracked": "inkLight",
    "statusLineOutput": "sandBorder",
    "statusLineCost": "rust",
    "statusLineSubagents": "inkBlue"
  },
  "export": {
    "pageBg": "parchment",
    "cardBg": "ivory",
    "infoBg": "sand"
  }
};

const ompDir = path.join(distDir, 'omp');
ensureDir(ompDir);
fs.writeFileSync(path.join(ompDir, 'kami.json'), JSON.stringify(ompJson, null, 2));

const piDir = path.join(distDir, 'pi');
ensureDir(piDir);
const piJson = {
  ...ompJson,
  "$schema": "https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json",
  colors: Object.fromEntries(
    Object.entries(ompJson.colors).filter(([token]) => !token.startsWith("statusLine") && token !== "pythonMode")
  )
};
fs.writeFileSync(path.join(piDir, 'kami.json'), JSON.stringify(piJson, null, 2));

// 1.2 OpenCode (JSON)
const opencodeDir = path.join(distDir, 'opencode');
ensureDir(opencodeDir);
const opencodeJson = {
  defs: {
    parchment: canvas.background,
    ivory: canvas.surface,
    sand: canvas.selection,
    border: canvas.border,
    ink: canvas.foreground,
    muted: canvas.muted,
    dim: canvas.dim,
    blue: ansi.normal.blue,
    blueLight: ansi.bright.blue,
    green: ansi.normal.green,
    yellow: ansi.normal.yellow,
    red: ansi.normal.red,
    rust: ansi.bright.red,
    cyan: ansi.normal.cyan,
    slate: ansi.normal.magenta
  },
  theme: {
    primary: "blue",
    secondary: "blueLight",
    accent: "blue",
    error: "red",
    warning: "yellow",
    success: "green",
    info: "cyan",
    text: "ink",
    textMuted: "muted",
    selectedListItemText: "ink",
    background: "parchment",
    backgroundPanel: "#E2DFD8",
    backgroundElement: "ivory",
    backgroundMenu: "ivory",
    border: "border",
    borderActive: "blue",
    borderSubtle: "#DDD9CE",
    diffAdded: "green",
    diffRemoved: "red",
    diffContext: "muted",
    diffHunkHeader: "cyan",
    diffHighlightAdded: "green",
    diffHighlightRemoved: "red",
    diffAddedBg: "#E4EBE5",
    diffRemovedBg: "#F2E4E4",
    diffContextBg: "parchment",
    diffLineNumber: "dim",
    diffAddedLineNumberBg: "#E4EBE5",
    diffRemovedLineNumberBg: "#F2E4E4",
    markdownText: "ink",
    markdownHeading: "blue",
    markdownLink: "blueLight",
    markdownLinkText: "blueLight",
    markdownCode: "rust",
    markdownBlockQuote: "muted",
    markdownEmph: "slate",
    markdownStrong: "ink",
    markdownHorizontalRule: "border",
    markdownListItem: "green",
    markdownListEnumeration: "green",
    markdownImage: "cyan",
    markdownImageText: "muted",
    markdownCodeBlock: "ink",
    syntaxComment: "dim",
    syntaxKeyword: "blue",
    syntaxFunction: "green",
    syntaxVariable: "ink",
    syntaxString: "yellow",
    syntaxNumber: "rust",
    syntaxType: "cyan",
    syntaxOperator: "muted",
    syntaxPunctuation: "muted",
    thinkingOpacity: 0.6
  }
};
fs.writeFileSync(path.join(opencodeDir, 'kami.json'), JSON.stringify(opencodeJson, null, 2));

};
