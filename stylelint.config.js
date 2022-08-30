/** @type {import('stylelint').Config} */
module.exports = {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "no-missing-end-of-source-newline": null,
    "selector-pseudo-class-no-unknown": null,
    "no-invalid-position-at-import-rule": null,
    "font-family-no-missing-generic-family-keyword": [
      true,
      {
        ignoreFontFamilies: ["Roboto", "Ubuntu"],
      },
    ],
    "alpha-value-notation": null,
    "selector-class-pattern": null,
  },
  ignoreFiles: ["**/*.tsx", "**/*.jsx", "**/*.js", "**/*.ts"],
};
