import { useEffect, useState } from "react"
import { Portal, Popover } from '@mantine/core';
import { UpdateInfo, ProgressInfo } from "electron-updater";
import { Button, Progress, Text } from "@mantine/core";
import { bytesToMB } from "@utils/bytesToMB";
import parse from 'html-react-parser';


export const AutoUpdater = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false)
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null)
    const [updateDownloaded, setUpdateDownloaded] = useState(false)
    const [updateProgress, setUpdateProgress] = useState<ProgressInfo | null>(null)
    const [isDownloading, setIsDownloading] = useState(false)


    useEffect(() => {
        if (window?.autoUpdaterApi) {
            window.autoUpdaterApi.checkForUpdates()

            window.autoUpdaterApi.updateAvailable((info) => {
                setUpdateAvailable(true)
                setUpdateInfo(info)
            })

            window.autoUpdaterApi.updateDownloaded(() => {
                setUpdateDownloaded(true)
                setIsDownloading(false)
            })

            window.autoUpdaterApi.downloadProgress((progress) => {
                    setUpdateProgress(progress)
                })
        }
    }, [])


    let releaseNotes = ''

    if (typeof updateInfo?.releaseNotes === 'string') {
        releaseNotes = updateInfo?.releaseNotes
    } else {
        releaseNotes = updateInfo?.releaseNotes?.map((note) => note.note).join('\n') ?? ''
    }

    return (
        updateAvailable && <Portal>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center min-w-80 gap-2 p-4 rounded-md bg-white z-50">

                    {!isDownloading && !updateDownloaded &&
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Update available</h1>
                            <Text>New version : {updateInfo?.version}</Text>

                            <Popover width={360} shadow="md" offset={0} position="top" withArrow>
                                <Popover.Target>
                                    <Text className="hover:text-blue-500 ro-cursor">Click here to see release notes</Text>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    {parse(releaseNotes)}
                                </Popover.Dropdown>
                            </Popover>

                            <Button variant="outline" size="sm" onClick={() => {
                                setIsDownloading(true)
                                window.autoUpdaterApi.downloadUpdate()
                            }}>
                                Download now
                            </Button>
                        </div>
                    }


                    {isDownloading &&
                        <div className="flex flex-col items-center gap-1 w-full">
                            <div className="text-sm">Download speed : {bytesToMB(updateProgress?.bytesPerSecond ?? 0, 1)}/s</div>
                            <div className="w-full relative">
                                <div className="text-sm absolute top-1/2 -translate-y-1/2 left-2 text-white z-10">{Math.round(updateProgress?.percent ?? 0)} %</div>
                                <Progress className="w-full" color={"grape"} size="20px" transitionDuration={100} value={updateProgress?.percent ?? 0} animated />
                            </div>
                        </div>
                    }

                    {updateDownloaded &&
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-lg font-bold">Update downloaded</h1>
                            <Button variant="outline" size="sm" onClick={() => window.autoUpdaterApi.quitAndInstall()}>Install now</Button>
                        </div>
                    }
            </div>
        </Portal>
    )
}
