import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function convertDir(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (let entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await convertDir(fullPath);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
            const parsed = path.parse(fullPath);
            const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);
            console.log(`Converting ${fullPath} to ${outputPath}...`);
            await sharp(fullPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Done converting ${entry.name}`);
        }
    }
}

async function main() {
    console.log('Starting conversion...');
    try {
        await convertDir('./public');
        console.log('Conversion complete!');
    } catch (err) {
        console.error('Error during conversion:', err);
    }
}

main();
