import sharp from "sharp";
import fs from "fs";

const convertToWebp = async (inputPath: string, outputPath: string, animated: boolean) => {
    await sharp(inputPath, { animated })
        .toFormat('webp')
        .toFile(outputPath)
        .catch((err) => {
            console.error(`Error converting ${inputPath} to ${outputPath}:`, err.message);
        })
}

const convertAllImages = async () => {

    const files = fs.readdirSync("input");
    for (const file of files) {
        const ext = file.split('.').pop();
        console.log(`Converting ${file} to /output/${file.replace(`.${ext}`, '.webp')}`)
        await convertToWebp(`input/${file}`, `output/${file.replace(`.${ext}`, '.webp')}`, false)
    }

    /*const animatedFiles = fs.readdirSync("converter/input")
    for (const file of animatedFiles) {
        console.log(`Converting ${file} to ${outputAnimatedPath}/${file.replace('.gif', '.webp')}`)
        await convertToWebp(`converter/input/${file}`, `converter/output/animated/${file.replace('.gif', '.webp')}`, true)
    }*/

    /*const mapsFiles = fs.readdirSync(inputMapsPath)
    for (const file of mapsFiles) {
        console.log(`Converting ${file} to ${outputMapsPath}/${file.replace('.gif', '.webp')}`)
        await convertToWebp(`${inputMapsPath}/${file}`, `${outputMapsPath}/${file.replace('.gif', '.webp')}`, false)
    }*/
}

convertAllImages()