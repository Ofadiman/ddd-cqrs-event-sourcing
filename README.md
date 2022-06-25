# Code generation tools comparison

This project aims to compare popular code generation tools in order to choose the tool that will be most optimal to reduce the amount of manual work needed during project development to create necessary files.

# What to expect from a code generation tool?

1. The tool should allow to generate code from a template file.
2. The tool should allow to generate multiple files in one run (e.g., `users.controller.ts`, `users.service.ts`, `users.repository.ts`).
3. The tool should allow to configure the output file names (e.g., `users.controller.ts`, `UsersController.ts`).
4. The tool should allow to configure the output file paths (e.g., `src/users/<filename>`, `src/users/<filename>`, `src/core/<filename>`).
5. The tool should allow to modify existing files. Often a project requires that when creating code we need to, for example, export a function from an `index.ts` file, or add a class to a module's dependency table.
6. The tool should allow to run interactive prompts in the terminal to get user input. Interactive prompts are especially helpful for people new to a project or in cases where we've mainly worked on code maintenance for a long time and now need to start adding new code.
7. The tool should allow to configure user input validation (e.g., require input to be `kebab-case`).
8. The tool should allow to transform user input (e.g., convert input to `PascalCase`).
9. The tool should allow to run arbitrary actions before or after the code generation (e.g., update a license header to the generated files, lint files).
