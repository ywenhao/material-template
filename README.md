# material-template

This template should help get you started developing with material in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
pnpm build
```

The workspace uses `typescript-native-bridge`: the TypeScript 6-compatible JavaScript API is backed by the TypeScript 7.0.2 Go checker. Keep the `typescript` entries in `catalog` and `overrides` in `pnpm-workspace.yaml` aligned when upgrading the bridge.

### Compile and Hot-Reload for Development

Build the library once before starting the playground, which imports the local `dist` output:

```sh
pnpm dev:play
```

To rebuild the library on source changes, run this in a second terminal:

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
pnpm -C playground build
pnpm docs:build
```

The build runs JavaScript, styles, declaration generation, package assembly, and build plugins in sequence. Package assembly runs as TypeScript directly on Node 24 using built-in file APIs. It copies package metadata in parallel with declaration preparation, then rewrites aliases and removes temporary build info in sequence.

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### TODO:

- docs
- test
- build
