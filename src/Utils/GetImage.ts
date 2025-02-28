export const GetPathImage = ({ mvp, animation }: { mvp: Mvp, animation: boolean }) => {

    const imageName = mvp.image.replace('gif', 'webp')
    const animatedPath = `images/mvps/webp/animated/${imageName}`
    const fixedPath = `images/mvps/webp/fixe/${imageName}`
    const path = animation ? animatedPath : fixedPath

    return path
}
