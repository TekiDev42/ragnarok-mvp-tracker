import {Flex, HoverCard, rgba, Text} from "@mantine/core";
import {IconMapPin2} from "@tabler/icons-react";
import style from "@components/MvpCard/Maps/MapHoverCard.module.css";
import {CSSProperties, PropsWithChildren} from "react";
import {sizeImage} from "@constants/defaults.ts";
import { DateTime } from "luxon";
import { GraveIcon } from "@/Components/Icons/Icons";

export const MapHoverCard = ({mvpmap, isInstance}: PropsWithChildren & {mvpmap: MvpMap, isInstance: boolean}) => {
    const ratio = {
        x: sizeImage / mvpmap.size.width,
        y: sizeImage / mvpmap.size.height
    }

    const graveIconSize = 16

    const diff = DateTime.now().plus({minutes: mvpmap.respawnTimer}).diff(DateTime.now(), ['hours', 'minutes', 'seconds'])

    return (
        <>
        {isInstance 
            && <Flex align={"center"} gap={5}>
                <IconMapPin2 size={18}/>
                <Text>
                    {mvpmap.name.trim()} <span className="text-xs text-gray-200">(Instance)</span>
                </Text>
            </Flex>
        }

        {!isInstance && <HoverCard withArrow={true} keepMounted arrowSize={12} position={"right"} width={300} shadow="md">
            <HoverCard.Target>
                <Flex align={"center"} gap={5}>
                    <IconMapPin2 size={18}/>
                    <Text>{mvpmap.name.trim()}</Text>
                </Flex>
            </HoverCard.Target>
            <HoverCard.Dropdown bd={"none"} bg={rgba("0, 0, 0", 0.85)}>
                <Flex justify={"center"} align={"center"}>
                    <div className={style.map}>
                        <div className="text-sm text-white py-1">{mvpmap.displayName}</div>
                        <figure style={{position: "relative"}}>
                            <img loading={"lazy"}
                                 style={{"--image-size": `${sizeImage}px`} as CSSProperties & {"--image-size": string}}
                                 src={`images/maps/${mvpmap.name}.webp`}
                                 alt={mvpmap.name}
                            />

                            { mvpmap.tombPos.x > 0 && mvpmap.tombPos.y > 0 &&
                                <GraveIcon style={{
                                    position: "absolute",
                                    left: `${mvpmap.tombPos.x * ratio.x - (graveIconSize / 2)}px`,
                                    bottom: `${mvpmap.tombPos.y * ratio.y}px`,
                                    width: `${graveIconSize}px`,
                                    height: `${graveIconSize}px`
                                }}/>
                            }
                        </figure>

                        <div className="text-sm text-white py-1">Respawn time: {diff.toMillis() > 0 ? diff.toFormat("hh'h'mm") : "Unknown"}</div>
                    </div>
                </Flex>
            </HoverCard.Dropdown>
        </HoverCard>}
        </>
    )
}