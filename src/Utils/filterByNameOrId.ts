export const filterMvpsByNameOrId = (mvps: Mvp[], value: string) => {
    return mvps.filter(mvp => {
        return mvp.Name.toLowerCase().includes(value.toLowerCase()) ||
            mvp.AegisName.toLowerCase().includes(value.toLowerCase()) ||
            mvp.Id === parseInt(value)
    })
}