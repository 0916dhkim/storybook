### Development scripts

Make sure to use `pnpm`.

- `pnpm run start` runs tsup in watch mode and starts Storybook
- `pnpm run build` build and package your addon code
- `pnpm run storybook:watch` runs nodemon in watch mode so it reruns Storybook on changes. This is useful when testing the actual addon (as we cannot have HMR for addon changes) rather than just stories in Storybook

### How to test the addon

To trigger this addon locally, do the following:
1. run `pnpm install && pnpm run build`
2. run `pnpm run storybook`
3. Go to http://localhost:6006/?path=/onboarding
4. You should now see the onboarding appearing. Have fun 👻

## Release Management

### Setup

This project is configured to use [auto](https://github.com/intuit/auto) for release management. It generates a changelog and pushes it to both GitHub and npm. Therefore, you need to configure access to both:

- [`NPM_TOKEN`](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-access-tokens) Create a token with both _Read and Publish_ permissions.
- [`GH_TOKEN`](https://github.com/settings/tokens) Create a token with the `repo` scope.

Then open your `package.json` and edit the following fields:

- `name`
- `author`
- `repository`

#### Local

To use `auto` locally create a `.env` file at the root of your project and add your tokens to it:

```bash
GH_TOKEN=<value you just got from GitHub>
NPM_TOKEN=<value you just got from npm>
```

If you check on GitHub, you’ll now see a set of labels that `auto` would like you to use. Use these to tag future pull requests.

### Creating a release

To create a release locally you can run the following command, otherwise the GitHub action will make the release for you.

```sh
pnpm run release
```

That will:

- Build and package the addon code
- Bump the version
- Push a release to GitHub and npm
- Push a changelog to GitHub
