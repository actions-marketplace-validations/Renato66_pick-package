# Pick Package

The Pick Package action is an action for downloading only the necessary files during Continuous Integration (CI) workflows. It allows you to selectively grab dependencies that will be used in your workflow while ignoring other dependencies. This action helps optimize your CI process by reducing unnecessary downloads and improving build times.

## Usage

To use the Pick Package action, follow the steps below:

1. Add the Pick Package action to your workflow file, `ci-workflow.yml` or any name you prefer.

2. Define the necessary inputs in the workflow file. The inputs for this action are as follows:

- `dependencies`: Specify the dependencies you want to download. Each dependency should be listed on a separate line using [this](#examples) format.
- `clear-resolutions` (optional): Set this input to `true` if you want to clear any existing resolutions in your `package.json` file. Default is `false`.

3. Use the Pick Package action in your workflow:

```yaml
name: CI Workflow

on:
  push:
    branches:
      - main

jobs:
  pick-package:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Pick Package
        uses: Renato66/pick-package@v1
        with:
          clear-resolutions: true
          dependencies: |
            jest
            prettier
      [...]
```

In this example, the action is triggered on the `push` event to the `main` branch. The action uses the Pick Package action, specifying the dependencies to be downloaded.

In this example, running the action with the specified dependencies will download the versions of `@actions/core` and `@types/node` declared on your package.json

## Conclusion

The Pick Package action simplifies the process of downloading only the necessary files for your CI workflows. By allowing you to specify the desired dependencies, it reduces unnecessary downloads and improves build times. Feel free to use and customize this action to fit your CI.

If you have any feedback, suggestions, or issues related to this action, please don't hesitate to visit the [GitHub repository](https://github.com/Renato66/pick-package) and contribute. Happy CI building!
