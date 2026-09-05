# Codebase Guide

This skill organizes the directory structure, dependencies, main flows, and design trends of a specified directory to generate a Markdown report for codebase understanding.

The purpose of this skill is not for quality auditing, but to quickly gather information necessary for catch-up before reviews or for onboarding new participants.

## Structure

- `SKILL.md` - The skill itself. Defines the analysis target, execution procedures, output requirements, and constraints.
- `README.md` - Overview, configuration, and usage of this skill.
- `assets/` - Auxiliary materials referenced during report generation.
    - `template.md` - Template for the output report.
    - `repo-context.md` - Destination for generated GitHub repository information.
- `scripts/` - Auxiliary scripts for pre-execution.
    - `init-repo-info.js` - Extracts `OWNER` / `REPO_NAME` / `BRANCH` from the `origin` and current branch.

## Analysis Flow

1. Execute `scripts/init-repo-info.js` to output repository information required for GitHub URL construction to `assets/repo-context.md`.
2. Read the structure of the target directory and classify it as Layered, Feature-based, Utility-based, or Hybrid.
3. Extract up to 10 files important for understanding and present them with reading priority, roles, and dependency characteristics.
4. Explain dependency directions, circular dependencies, cross-cutting dependencies, and trends in abstract vs. concrete dependencies based on import relationships.
5. Select two representative processing flows for the codebase and track the starting point, call chain, core logic, and results with code snippets.
6. Organize design philosophy, good design points, and improvement points with structural evidence.
7. Assign reference scores from the perspective of SOLID and ease of understanding, and save the report in Markdown.

## Output

- Output filename is `review-codebase-{directory_name}.md`.
- File links use GitHub `/blob/` URLs.
- Function, method, and class references use code snippet links with `#Lstart-Lend`.
- The directory structure section uses `/tree/` links only and does not enumerate files.
- Detailed output format follows `assets/template.md`.

## Core Rules

- Always provide confidence levels and evidence for estimations.
- Include at least one code snippet link for each good design point and improvement point.
- Improvement suggestions should include perspectives on increasing development speed as well as maintainability.
- Avoid subjective criticism; describe based on structural evidence.
- All file references from the "📁 Directory Structure" section onwards must be unified as GitHub URLs.

## Generated Artifacts

- `assets/repo-context.md` - Repository information at runtime.
- `review-codebase-{directory_name}.md` - Generated codebase understanding report.

## When To Use

- When you want to quickly grasp the big picture before reading a large directory.
- When you want to understand responsibility separation and dependency directions before a review.
- When you want to summarize the reading order and representative flows for new participants.
- When you want to overview design strengths and areas for improvement before refactoring.