#!/usr/bin/env node

/**
 * Font Cleanup Script (Root Public Folder)
 * Removes unused Poppins font files from public/ root
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Fonts to KEEP (actually used in the app)
const KEEP_FONTS = [
  'Poppins-Regular.ttf',
  'Poppins-Medium.ttf',
  'Poppins-SemiBold.ttf',
  'Poppins-Bold.ttf',
  'Caveat-VariableFont_wght.ttf',
  'Piazzolla-VariableFont_opsz,wght.ttf',
];

async function cleanupFonts() {
  console.log('🧹 Cleaning up unused font files...\n');
  
  const publicDir = path.join(rootDir, 'public');
  
  try {
    const files = await fs.readdir(publicDir);
    
    let removed = 0;
    let kept = 0;
    let savedSize = 0;
    
    for (const file of files) {
      if (file.endsWith('.ttf') && !KEEP_FONTS.includes(file)) {
        const filePath = path.join(publicDir, file);
        const stats = await fs.stat(filePath);
        savedSize += stats.size;
        await fs.unlink(filePath);
        console.log(`✗ Removed: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
        removed++;
      } else if (KEEP_FONTS.includes(file)) {
        const filePath = path.join(publicDir, file);
        const stats = await fs.stat(filePath);
        console.log(`✓ Kept: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
        kept++;
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   Kept: ${kept} fonts`);
    console.log(`   Removed: ${removed} fonts`);
    console.log(`   Saved: ${(savedSize / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('Error cleaning fonts:', error.message);
  }
}

cleanupFonts();
