/**
 * Handlebars-like template renderer — ported from cardixx-core/print/utils/template-renderer.ts
 *
 * Supports:
 * - {{{field}}} — raw HTML (unescaped)
 * - {{field}} — escaped value
 * - {{nested.path}} — nested object access
 * - {{#if field}}...{{/if}} — conditional blocks
 * - {{#if field}}...{{else}}...{{/if}} — conditional with else
 * - {{#if field}}...{{else if field2}}...{{else}}...{{/if}} — else-if chains
 */

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object") {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function valueToString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

/**
 * Process conditional blocks in template
 * Supports: {{#if field}}...{{else if field2}}...{{else}}...{{/if}}
 */
function processConditionals(
  template: string,
  data: Record<string, unknown>
): string {
  const conditionalRegex =
    /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g;

  return template.replace(conditionalRegex, (_, condition, content) => {
    const parts = content.split(/\{\{else(?:\s+if\s+([^}]+))?\}\}/);
    const ifContent = parts[0];

    const conditionValue = getNestedValue(data, condition.trim());
    if (conditionValue && conditionValue !== "" && conditionValue !== false) {
      return processConditionals(ifContent, data);
    }

    for (let i = 1; i < parts.length; i += 2) {
      const elseCondition = parts[i];
      const elseContent = parts[i + 1] || parts[i];

      if (!elseCondition) {
        return processConditionals(elseContent, data);
      }

      const elseConditionValue = getNestedValue(data, elseCondition.trim());
      if (elseConditionValue) {
        return processConditionals(elseContent, data);
      }
    }

    return "";
  });
}

/**
 * Render a template string with Handlebars-like syntax.
 */
export function renderTemplate(
  template: string,
  data: Record<string, unknown>
): string {
  // Process conditionals first
  let result = processConditionals(template, data);

  // Handle raw HTML interpolations: {{{path}}} — no escaping
  result = result.replace(
    /\{\{\{([a-zA-Z0-9_.]+)\}\}\}/g,
    (_match: string, path: string) => {
      const value = getNestedValue(data, path.trim());
      return value !== undefined && value !== null ? valueToString(value) : "";
    }
  );

  // Handle variable substitution: {{field}} — with HTML escaping
  result = result.replace(
    /\{\{([a-zA-Z0-9_.]+)\}\}/g,
    (_match: string, field: string) => {
      const value = getNestedValue(data, field.trim());
      if (value === undefined || value === null) return "";
      return escapeHtml(valueToString(value));
    }
  );

  return result;
}
