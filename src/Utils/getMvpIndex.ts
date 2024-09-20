export const getMvpIndex = (mvps: Mvp[], target: Mvp): number => {
    return mvps.findIndex(mvp => mvp.Id === target.Id)
}