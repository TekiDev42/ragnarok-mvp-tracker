export const GetPathImage = ({ mvp, animation }: { mvp: Mvp, animation: boolean }) => {

    // const imageName = mvp.image.replace('gif', 'webp')
    const animatedPath = `images/mvps/webp/animated/${mvp.image}`
    const fixedPath = `images/mvps/webp/fixe/${mvp.image}`
    const path = animation ? animatedPath : fixedPath

    return path
}
