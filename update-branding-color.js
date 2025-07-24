#!/usr/bin/env node

/**
 * This script replaces all instances of the hardcoded branding color (#E67364)
 * with the new CSS variables in the codebase.
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Run: node update-branding-color.js
 */

import fs from 'fs';
import { exec } from 'child_process';

// Color mapping
const colorReplacements = [
  // Main brand color
  { from: 'text-\\[#E67364\\]', to: 'text-brand' },
  { from: 'bg-\\[#E67364\\]', to: 'bg-brand' },
  { from: 'border-\\[#E67364\\]', to: 'border-brand' },
  { from: 'focus:ring-\\[#E67364\\]', to: 'focus:ring-brand' },
  { from: 'focus-within:ring-\\[#E67364\\]', to: 'focus-within:ring-brand' },
  { from: 'focus-within:border-\\[#E67364\\]', to: 'focus-within:border-brand' },
  { from: 'hover:text-\\[#E67364\\]', to: 'hover:text-brand' },
  { from: 'hover:bg-\\[#E67364\\]', to: 'hover:bg-brand' },
  
  // Hover state
  { from: 'hover:bg-\\[#E67364\\]/90', to: 'hover:bg-brand-hover' },
  { from: 'hover:text-\\[#E67364\\]/90', to: 'hover:text-brand-hover' },
  { from: 'hover:bg-\\[#d45c4d\\]', to: 'hover:bg-brand-hover' },
  
  // Light variants
  { from: 'bg-\\[#FEE4E2\\]', to: 'bg-brand-light' },
  { from: 'bg-\\[#FDF5F4\\]', to: 'bg-brand-lighter' },
  
  // Inline styles
  { from: 'color: \'#E67364\'', to: 'color: \'hsl(var(--brand))\'' },
  { from: 'color: "#E67364"', to: 'color: "hsl(var(--brand))"' },
];

// Find all JS and JSX files in the src directory
exec('find ./src -type f -name "*.js*"', (error, stdout) => {
  if (error) {
    console.error(`Error finding files: ${error}`);
    return;
  }
  
  const files = stdout.trim().split('\n');
  
  // Process each file
  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let hasChanges = false;
      
      // Apply all replacements
      colorReplacements.forEach(({ from, to }) => {
        const regex = new RegExp(from, 'g');
        const newContent = content.replace(regex, to);
        
        if (newContent !== content) {
          content = newContent;
          hasChanges = true;
        }
      });
      
      // Save the file if changes were made
      if (hasChanges) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
      }
    } catch (err) {
      console.error(`Error processing ${file}: ${err}`);
    }
  });
  
  console.log('Branding color update complete!');
}); 