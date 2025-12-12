#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-run

/**
 * Deno build script to generate Tailwind CSS for email templates (TypeScript)
 * Run with: deno run --allow-read --allow-write --allow-env --allow-run build-css.ts
 * Or use: deno task build:css
 */

const isProd: boolean = Deno.env.get("NODE_ENV") === "production";
const minifyFlag = isProd ? "--minify" : "";

console.log("🎨 Building Tailwind CSS for email templates...\n");

try {
  // Run tailwindcss via npm (requires Node.js and npm to be installed)
  const args: string[] = [
    "tailwindcss",
    "-i",
    "./styles/input.css",
    "-o",
    "./styles/output.css",
  ];
  if (minifyFlag) args.push(minifyFlag);

  const command = new Deno.Command("npx", {
    args,
    stdout: "inherit",
    stderr: "inherit",
  });

  const process = command.spawn();
  const status = await process.status;

  if (!status.success) {
    console.error("❌ Tailwind CSS build failed");
    Deno.exit(status.code ?? 1);
  }

  // Read the generated CSS
  const cssContent: string = await Deno.readTextFile("./styles/output.css");

  // Create a TypeScript file that exports the CSS as a constant
  const tsContent = `// Auto-generated CSS from Tailwind build process\n// Do not edit manually - run: deno task build:css\n\nexport const TAILWIND_CSS = ${JSON.stringify(cssContent)};\n`;

  await Deno.writeTextFile("./src/styles.ts", tsContent);

  console.log("✅ Tailwind CSS built successfully");
  console.log("✅ CSS exported to src/styles.ts");
  console.log(`📊 CSS file size: ${cssContent.length} bytes`);
} catch (error) {
  console.error("❌ Build failed:", (error as Error).message ?? error);
  Deno.exit(1);
}
