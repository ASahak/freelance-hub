import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "next-env.d.ts",
      'dist/',
      'dest/',
      'build/',
      '**/*spec.ts',
      '**/*test.ts',
      '**/*.spec.ts',
      '**/*.test.ts',
    ],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react/display-name": "off",
      "@typescript-eslint/no-explicit-any": "off",
    }
  },
];

export default eslintConfig;
