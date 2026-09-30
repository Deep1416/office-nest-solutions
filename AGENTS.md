<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Development guidelines

- Always search the existing codebase before writing new code.
- Reuse existing functions, components, hooks, utilities, and services where possible.
- Extend existing code instead of creating duplicates.
- Put genuinely reusable code in common/shared locations.
- Keep feature-specific code inside the feature.
- Avoid hardcoded colors, spacing, URLs, routes, and repeated constants.
- Follow the existing project structure and patterns.
- Make minimal changes and avoid unrelated refactoring.
- Check all usages before modifying shared code.
- Reuse the existing design system when implementing UI.
- Run relevant checks/tests after changes.
