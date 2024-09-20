export const makeClones = (list: Mvp[], single: Mvp): [Mvp[], Mvp] => {
    const newSingle = {...single}
    const newList = [...list]

    return [newList, newSingle]
}