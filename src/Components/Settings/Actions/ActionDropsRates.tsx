import {Slider, Stack, Text} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "@store/Hooks";
import {useCallback, useEffect, useState} from "react";
import {setRates, setCardRates} from "@store/Slice/User/UserSlice.ts";

export const ActionDropsRates = () => {
    const dispatch = useAppDispatch()
    const cardRates = useAppSelector(state => state.userSlice.cardRates)
    const rates = useAppSelector(state => state.userSlice.rates)

    const [cardRatesState, setCardRatesState] = useState(cardRates)
    const [ratesState, setRatesState] = useState(rates)

    const cardRatesHandleChange = useCallback((value: number) => {
        if(value < 0) value = 1

        dispatch(setCardRates(value))
    },[dispatch])

    const ratesHandleChange = useCallback((value: number) => {
        if(value < 0) value = 1

        dispatch(setRates(value))
    },[dispatch])

    const marks = Array.from({length: 10}).map((_, i) => {
        return {
            value: (i + 1) * 10,
            label: (i + 1) * 10
        }
    })

    useEffect(() => {
        setCardRatesState(cardRates)
        setRatesState(rates)
    }, [cardRates, rates])

    return (<>
        <Stack align="stretch" justify="flex-start" gap="xs">
            <Text size="md" mt="0" fw={500}>Card rates</Text>
            <Slider onChangeEnd={cardRatesHandleChange}
                    onChange={(e) => setCardRatesState(e)}
                    value={cardRatesState}
                    label={(val) => {
                        return `${val}x`
                    }}
                    size={"lg"}
                    min={1}
                    max={100}
                    step={1}
                    marks={marks}
            />
            <Text fs={"italic"} size="xs" c={"#495057"} style={{paddingTop: 15}}>
                Card rates (1: Official)
            </Text>
        </Stack>
        <Stack align="stretch" justify="flex-start" gap="xs">
            <Text size="md" mt="0" fw={500}>Rates</Text>
            <Slider onChangeEnd={ratesHandleChange}
                    onChange={(e) => setRatesState(e)}
                    value={ratesState}
                    label={(val) => {
                        return `${val}x`
                    }}
                    size={"lg"}
                    min={1}
                    max={100}
                    step={1}
                    marks={marks}
            />
            <Text fs={"italic"} size="xs" c={"#495057"} style={{paddingTop: 15}}>
                Rates (1: Official)
            </Text>
        </Stack>
    </>)
}