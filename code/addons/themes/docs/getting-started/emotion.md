# 🏁 Getting started with `@emotion/styled`

## 📦 Install addon

**NOTE:** As of Storybook 7.2, `@storybook/addon-themes` ships in `@storybook/addon-essentials`. If you're using Storybook >= 7.2, skip to ["Provide your themes"](#🎨-provide-your-themes).

To get started, **install the package** as a dev dependency

yarn:

```zsh
yarn add -D @storybook/addon-themes
```

npm:

```zsh
npm install -D @storybook/addon-themes
```

pnpm:

```zsh
pnpm add -D @storybook/addon-themes
```

## 🧩 Register Addon

Now, **include the addon** in your `.storybook/main.js` file

```diff
module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
+   "@storybook/addon-themes"
  ],
};
```

## 🎨 Provide your theme(s)

Finally, provide your theme(s) and global styles component to your stories with our `withThemeFromJSXProvider` decorator.

Make the following changes to your `.storybook/preview.js`

```diff
-import { Preview } from "@storybook/your-framework";
+import { Preview, Renderer } from "@storybook/your-framework";
+import { withThemeFromJSXProvider } from "@storybook/addon-themes";
+import { ThemeProvider } from '@emotion/react';
+import { GlobalStyles, lightTheme, darkTheme } from "../src/themes"; // import your custom theme configs


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

+export const decorators = [
+  withThemeFromJSXProvider({
+    themes: {
+      light: lightTheme,
+      dark: darkTheme,
+    },
+    defaultTheme: "light",
+    Provider: ThemeProvider,
+    GlobalStyles: GlobalStyles,
+  }),
+];
```
