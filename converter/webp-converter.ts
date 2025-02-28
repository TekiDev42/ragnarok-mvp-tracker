import sharp from "sharp";
import fs from "fs";

const inputFixePath = "public/images/mvps/fixe";
const inputAnimatedPath = "public/images/mvps";

const outputFixePath = "public/images/mvps/webp/fixe";
const outputAnimatedPath = "public/images/mvps/webp/animated";


if (!fs.existsSync(outputFixePath)) {
    fs.mkdirSync(outputFixePath, { recursive: true });
}

if (!fs.existsSync(outputAnimatedPath)) {
    fs.mkdirSync(outputAnimatedPath, { recursive: true });
}

const convertToWebp = async (inputPath: string, outputPath: string, ext: string) => {
    await sharp(inputPath, { animated: ext === '.gif' })
        .toFormat('webp')
        .toFile(outputPath)
        .catch((err) => {
            console.error(`Error converting ${inputPath} to ${outputPath}:`, err);
        })
}

const convertAllImages = async () => {
    const files = fs.readdirSync(inputFixePath);

    for (const file of files) {
        console.log(`Converting ${file} to ${outputFixePath}/${file.replace('.png', '.webp')}`)
        if (file.endsWith('.png')) {
            await convertToWebp(`${inputFixePath}/${file}`, `${outputFixePath}/${file.replace('.png', '.webp')}`, '.png')
        }
    }

    const animatedFiles = fs.readdirSync(inputAnimatedPath)
    for (const file of animatedFiles) {
        console.log(`Converting ${file} to ${outputAnimatedPath}/${file.replace('.gif', '.webp')}`)
        if (file.endsWith('.gif')) {
            await convertToWebp(`${inputAnimatedPath}/${file}`, `${outputAnimatedPath}/${file.replace('.gif', '.webp')}`, '.gif')
        }
    }
}

convertAllImages()