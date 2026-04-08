<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Responsive Breakpoints

| Name    | Range           | Tailwind prefix |
|---------|-----------------|-----------------|
| Mobile  | < 768px         | default         |
| Tablet  | 768px – 1023px  | `md:`           |
| Desktop | >= 1024px       | `lg:`           |

Mobile navigation activates below the `lg` breakpoint (1024px).

## DOM Mutation Policy

- **Never mutate `document.body` or `document.documentElement` directly** (e.g. `document.body.style.overflow = "hidden"`). Direct DOM mutations leak across navigations and break bfcache.
- For scroll locking, use `react-remove-scroll` — wrap the overlay content with `<RemoveScroll>`. It handles iOS, cleanup, and nested locks automatically.

## Styling Conventions

- All clickable elements (buttons, links, interactive controls) must have `cursor-pointer`.
