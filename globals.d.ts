declare module "*.css";

// TypeScript doesn't know how to handle non-code files like CSS. Solution: Add a CSS module declaration so TypeScript understands CSS imports. 
// Explanation:
//  This tells TypeScript that any import ending in .css is a valid module. It won't check the contents, but it will stop the error.