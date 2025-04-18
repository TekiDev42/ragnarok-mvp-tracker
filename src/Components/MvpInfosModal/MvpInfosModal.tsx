import { Modal } from "@mantine/core"
import { setMvpInfosModal } from "@/Store/Slice/Modal/MvpInfosModalSlice";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { MvpStats } from "../MvpStats/MvpStats";
import { MvpDrops } from "../MvpDrops/MvpDrops";
import { useCallback, useState, useEffect } from "react";

export const MvpInfosModal = () => {
    const dispatch = useAppDispatch();
    const mvp = useAppSelector(state => state.mvpInfosModalSlice.mvp);
    const [open, setOpen] = useState(false);

    const handleClose = useCallback(() => {
        setOpen(false)
        dispatch(setMvpInfosModal(null))
    }, [dispatch])

    useEffect(() => {
        if (mvp) {
            setOpen(true)
        }
    }, [mvp])

    return (
        <Modal size={"xl"} opened={open} onClose={handleClose} closeOnClickOutside={true} closeOnEscape={true} centered withCloseButton={true} radius="md">
            <div className="flex flex-col gap-0">
                {mvp && <MvpStats mvp={mvp} />}
                {mvp && <MvpDrops mvp={mvp} />}
            </div>
        </Modal>
    )
}
