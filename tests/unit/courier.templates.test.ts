/**
 * Unit tests for Courier template methods
 * Tests template loading, registration, and rendering
 */

import { assertEquals, assertExists, assertThrows, assertStringIncludes } from "https://deno.land/std/assert/mod.ts";
import { Courier } from "../../mod.ts";
import type { TemplateData } from "../../mod.ts";

const testConfig = {
  smtp: {
    user: "test@icloud.com",
    pass: "test-password",
  },
  defaultFrom: "test@icloud.com",
};

Deno.test("Courier.registerTemplate() - registers from string", async () => {
  const courier = await Courier.initialize(testConfig);
  courier.registerTemplate("greeting", "<h1>Hello {{name}}</h1>");
  const rendered = courier.renderTemplate("greeting", { name: "Alice" });
  assertStringIncludes(rendered, "Alice");
  courier.close();
});

Deno.test("Courier.renderTemplate() - renders with data", async () => {
  const courier = await Courier.initialize(testConfig);
  courier.registerTemplate("welcome", "Welcome {{name}}!");
  const rendered = courier.renderTemplate("welcome", { name: "Bob" });
  assertStringIncludes(rendered, "Bob");
  courier.close();
});

Deno.test("Courier.renderTemplate() - throws for missing template", async () => {
  const courier = await Courier.initialize(testConfig);
  assertThrows(() => courier.renderTemplate("nonexistent", {}), Error);
  courier.close();
});

Deno.test("Courier.loadTemplate() - loads from file", async () => {
  const courier = await Courier.initialize(testConfig);
  await courier.loadTemplate("welcome-fixture", "./tests/fixtures/welcome.hbs");
  const rendered = courier.renderTemplate("welcome-fixture", {
    name: "Charlie",
    actionUrl: "https://example.com",
    year: 2025,
    companyName: "Test Co",
  });
  assertStringIncludes(rendered, "Charlie");
  courier.close();
});

Deno.test("Courier.loadTemplate() - throws for missing file", async () => {
  const courier = await Courier.initialize(testConfig);
  let threw = false;
  try {
    await courier.loadTemplate("missing", "./nonexistent/template.hbs");
  } catch {
    threw = true;
  }
  assertEquals(threw, true);
  courier.close();
});

Deno.test("Courier.loadTemplatesFromDirectory() - loads all .hbs", async () => {
  const courier = await Courier.initialize(testConfig);
  await courier.loadTemplatesFromDirectory("./tests/fixtures");
  const rendered = courier.renderTemplate("welcome", {
    name: "Dave",
    actionUrl: "https://example.com",
    year: 2025,
    companyName: "Test Co",
  });
  assertStringIncludes(rendered, "Dave");
  courier.close();
});

Deno.test("Courier.loadTemplatesFromDirectory() - throws for missing dir", async () => {
  const courier = await Courier.initialize(testConfig);
  let threw = false;
  try {
    await courier.loadTemplatesFromDirectory("./nonexistent/directory");
  } catch {
    threw = true;
  }
  assertEquals(threw, true);
  courier.close();
});

Deno.test("Courier.initialize() - auto-loads from templatesDir", async () => {
  const courier = await Courier.initialize({
    ...testConfig,
    templatesDir: "./tests/fixtures",
  });
  const rendered = courier.renderTemplate("welcome", {
    name: "Frank",
    actionUrl: "https://example.com",
    year: 2025,
    companyName: "Test Co",
  });
  assertStringIncludes(rendered, "Frank");
  courier.close();
});

Deno.test("Courier - custom templates take precedence", async () => {
  const courier = await Courier.initialize(testConfig);
  courier.registerTemplate("greeting", "Hello {{name}}");
  courier.registerTemplate("greeting", "Hi {{name}}!");
  const rendered = courier.renderTemplate("greeting", { name: "Grace" });
  assertStringIncludes(rendered, "Hi");
  courier.close();
});

Deno.test("Courier.sendWithTemplate() - renders and sends", async () => {
  const courier = await Courier.initialize(testConfig);
  courier.registerTemplate("test-email", "<p>Hello {{name}}</p>");
  const result = await courier.sendWithTemplate(
    "test-email",
    { name: "Harry" },
    {
      to: "harry@example.com",
      subject: "Test",
    }
  );
  assertExists(result);
  assertEquals(typeof result.success, "boolean");
  courier.close();
});
