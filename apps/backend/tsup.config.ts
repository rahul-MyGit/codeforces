import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  target: "es2022",
  outDir: "dist",
  clean: true,
  // prisma error with this one exists 
  noExternal: [/.*/],
  /*
   INFO: if i use this then the prisma error disappears
   noExternal: ["@repo/common", "@repo/email", "@repo/database"],
    */

});
