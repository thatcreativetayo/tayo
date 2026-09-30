#!/usr/bin/env node

/**
 * Image Optimization Script
 * Aggressively optimizes all portfolio images while preserving visual quality
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
  designs: {
    maxWidth: 800,
    maxHeight: 1200,
    quality: 80,
    format: 'webp',
  },
  gallery: {
    maxWidth: 1200,
    maxHeight: 1600,
    quality: 82,
    format: 'webp',
  },
  me: {
    maxWidth: 600,
    maxHeight: 800,
    quality: 85,
    format: 'webp',
  },
  general: {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 85,
    format: 'webp',
  },
};

const runCommand = (cmd, args) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed with code ${code}`));
    });
  });
};

async function checkSharp() {
  try {
    await import('sharp');
    return true;
  } catch {
    console.log('Installing sharp for image optimization...');
    await runCommand('pnpm', ['add', '-D', 'sharp']);
    return true;
  }
}

async function optimizeImage(inputPath, outputPath, config) {
  const sharp = (await import('sharp')).default;
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  let pipeline = image;
  
  // Resize if needed
  if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
    pipeline = pipeline.resize(config.maxWidth, config.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  
  // Convert to WebP
  if (config.format === 'webp') {
    pipeline = pipeline.webp({ quality: config.quality, effort: 6 });
  } else if (config.format === 'avif') {
    pipeline = pipeline.avif({ quality: config.quality, effort: 6 });
  }
  
  await pipeline.toFile(outputPath);
  
  const inputStats = await fs.stat(inputPath);
  const outputStats = await fs.stat(outputPath);
  const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
  
  console.log(`✓ ${path.basename(inputPath)}: ${(inputStats.size / 1024 / 1024).toFixed(2)}MB → ${(outputStats.size / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);
}

async function processDirectory(dirPath, config) {
  const fullPath = path.join(rootDir, 'public', dirPath);
  
  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile() && /\.(png|jpg|jpeg)$/i.test(entry.name)) {
        const inputPath = path.join(fullPath, entry.name);
        const outputName = entry.name.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const outputPath = path.join(fullPath, outputName);
        
        try {
          await optimizeImage(inputPath, outputPath, config);
          
          // Remove original if optimization succeeded
          if (inputPath !== outputPath) {
            await fs.unlink(inputPath);
          }
        } catch (error) {
          console.error(`✗ Failed to optimize ${entry.name}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error(`✗ Failed to process directory ${dirPath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting aggressive image optimization...\n');
  
  await checkSharp();
  
  console.log('\n📁 Processing designs/ folder...');
  await processDirectory('designs', CONFIG.designs);
  
  console.log('\n📁 Processing gallery/ folder...');
  await processDirectory('gallery', CONFIG.gallery);
  
  console.log('\n📁 Processing me/ folder...');
  await processDirectory('me', CONFIG.me);
  
  console.log('\n📁 Processing root public/ images...');
  const rootFiles = ['blog.png', 'contact.png', 'cursor.png', 'figma.png', 'fc.png', 'aot.png', 'tayo.jpg'];
  for (const file of rootFiles) {
    const inputPath = path.join(rootDir, 'public', file);
    try {
      await fs.access(inputPath);
      const outputName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPath = path.join(rootDir, 'public', outputName);
      await optimizeImage(inputPath, outputPath, CONFIG.general);
      if (inputPath !== outputPath) {
        await fs.unlink(inputPath);
      }
    } catch {
      // File doesn't exist, skip
    }
  }
  
  console.log('\n✅ Image optimization complete!');
}

main().catch(console.error);
