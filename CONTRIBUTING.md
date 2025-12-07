# Contributing to Courier

Thank you for your interest in contributing to Courier! This document provides guidelines for contributing to the project.

## Development Setup

1. **Install Deno**: Follow the [Deno installation guide](https://deno.land/manual/getting_started/installation)

2. **Clone the repository**:
   ```bash
   git clone https://github.com/rivescloud/courier.git
   cd courier
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your iCloud SMTP credentials
   ```

## Development Workflow

### Running Examples

```bash
deno task example
```

### Linting

```bash
deno lint
```

### Formatting

```bash
deno fmt
```

### Type Checking

```bash
deno check mod.ts
```

## Making Changes

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following these guidelines:
   - Write clear, concise commit messages
   - Keep changes focused and atomic
   - Add tests if applicable
   - Update documentation as needed

3. **Test your changes**:
   - Run the linter: `deno lint`
   - Run the formatter: `deno fmt`
   - Test with the example: `deno task example`

4. **Submit a pull request**:
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all checks pass

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use meaningful variable names

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 72 characters
- Reference issues and PRs when applicable

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the version number following [Semantic Versioning](https://semver.org/)
3. The PR will be merged once you have approval from a maintainer

## Questions?

Feel free to open an issue for any questions or concerns!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
