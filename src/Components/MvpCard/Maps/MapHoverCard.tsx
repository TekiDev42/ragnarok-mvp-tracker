import {Flex, HoverCard, rgba, Text} from "@mantine/core";
import {IconGrave, IconMapPin2} from "@tabler/icons-react";
import style from "@components/MvpCard/Maps/MapHoverCard.module.css";
import {CSSProperties, PropsWithChildren} from "react";
import {sizeImage} from "@constants/defaults.ts";
import { DateTime } from "luxon";

export const MapHoverCard = ({mvpmap}: PropsWithChildren & {mvpmap: MvpMap}) => {
    const ratio = {
        x: sizeImage / mvpmap.size.width,
        y: sizeImage / mvpmap.size.height
    }

    const graveIconSize = 16

    return (
        <HoverCard withArrow={true} arrowSize={12} position={"right"} width={300} shadow="md">
            <HoverCard.Target>
                <Flex align={"center"} gap={5}>
                    <IconMapPin2 size={18}/>
                    <Text>{mvpmap.name.trim()}</Text>
                </Flex>
            </HoverCard.Target>
            <HoverCard.Dropdown bd={"none"} bg={rgba("0, 0, 0", 0.85)}>
                <Flex justify={"center"} align={"center"}>
                    <div className={style.map}>
                        { mvpmap.tombPos.x > 0 && mvpmap.tombPos.y > 0 &&
                            <IconGrave color={"transparent"}
                                fill={"#ffd43b"}
                                style={{
                                    position: "absolute",
                                    left: `${mvpmap.tombPos.x * ratio.x - (graveIconSize / 2)}px`,
                                    bottom: `${mvpmap.tombPos.y * ratio.y}px`,
                                    width: `${graveIconSize}px`,
                                    height: `${graveIconSize}px`
                                }}
                            />
                        }
                        <figure>
                            <img loading={"lazy"}
                                 style={{"--image-size": `${sizeImage}px`} as CSSProperties & {"--image-size": string}}
                                 src={`images/maps/${mvpmap.name}.gif`}
                                 alt={mvpmap.name}
                            />
                        </figure>

                        <div className="text-sm text-white py-1">Respawn time: {DateTime.fromSeconds(mvpmap.respawnTimer * 60).toFormat("hh'h'mm")}</div>
                    </div>
                </Flex>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}