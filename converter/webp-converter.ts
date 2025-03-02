import sharp from "sharp";
import fs from "fs";

const inputFixePath = "converter/fixe";
const inputAnimatedPath = "converter/animated";

const outputFixePath = "converter/output/fixe";
const outputAnimatedPath = "converter/output/animated";

const inputMapsPath = "converter/maps";
const outputMapsPath = "converter/output/maps";


if (!fs.existsSync(outputFixePath)) {
    fs.mkdirSync(outputFixePath, { recursive: true });
}

if (!fs.existsSync(outputAnimatedPath)) {
    fs.mkdirSync(outputAnimatedPath, { recursive: true });
}

if (!fs.existsSync(outputMapsPath)) {
    fs.mkdirSync(outputMapsPath, { recursive: true });
}

const convertToWebp = async (inputPath: string, outputPath: string, animated: boolean) => {
    await sharp(inputPath, { animated })
        .toFormat('webp')
        .toFile(outputPath)
        .catch((err) => {
            console.error(`Error converting ${inputPath} to ${outputPath}:`, err.message);
        })
}

const convertAllImages = async () => {

    const files = fs.readdirSync(inputAnimatedPath);
    for (const file of files) {
        console.log(`Converting ${file} to ${outputFixePath}/${file.replace('.gif', '.webp')}`)
        await convertToWebp(`${inputAnimatedPath}/${file}`, `${outputFixePath}/${file.replace('.gif', '.webp')}`, false)
    }

    const animatedFiles = fs.readdirSync(inputAnimatedPath)
    for (const file of animatedFiles) {
        console.log(`Converting ${file} to ${outputAnimatedPath}/${file.replace('.gif', '.webp')}`)
        await convertToWebp(`${inputAnimatedPath}/${file}`, `${outputAnimatedPath}/${file.replace('.gif', '.webp')}`, true)
    }

    const mapsFiles = fs.readdirSync(inputMapsPath)
    for (const file of mapsFiles) {
        console.log(`Converting ${file} to ${outputMapsPath}/${file.replace('.gif', '.webp')}`)
        await convertToWebp(`${inputMapsPath}/${file}`, `${outputMapsPath}/${file.replace('.gif', '.webp')}`, false)
    }
}

convertAllImages()