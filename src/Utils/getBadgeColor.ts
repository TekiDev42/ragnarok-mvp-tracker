export const getBadgeColor = (race: string) => {
    switch (race.toLowerCase()) {
        case 'angel':
            return 'cyan.4'
        case 'brute':
            return 'orange.4'
        case 'demon':
            return 'red.4'
        case 'demi-human':
            return 'yellow.4'
        case 'dragon':
            return 'grape.4'
        case 'fish':
            return 'blue.4'
        case 'formless':
            return 'gray.4'
        case 'insect':
            return 'green.4'
        case 'plant':
            return 'lime.4'
        case 'poison':
            return 'violet.4'
        case 'undead':
            return 'indigo.4'
        case 'neutral':
            return 'gray.4'
        case 'water':
            return 'blue.4'
        case 'earth':
            return 'yellow.4'
        case 'fire':
            return 'red.4'
        case 'wind':
            return 'lime.4'
        case 'holy':
            return 'cyan.4'
        case 'shadow':
            return 'gray.9'
        case 'ghost':
            return 'indigo.4'
        case 'dark':
            return 'gray.8'
        case 'small':
            return 'teal.4'
        case 'medium':
            return 'teal.6'
        case 'large':
            return 'teal.8'
        default:
            return 'teal.4'
    }
}