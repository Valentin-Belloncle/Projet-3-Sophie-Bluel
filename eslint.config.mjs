import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node
      } 
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
      "indent": ["error", "tab"],
      quotes: ["error", "double"],
      "linebreak-style": ["error", "unix"]
    }
  }
  
];