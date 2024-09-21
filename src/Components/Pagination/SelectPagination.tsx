import {Pagination, Select} from "@mantine/core";
import {setActivePage, setPerPage} from "@store/Slice/User/UserSlice.ts";
import {useAppDispatch, useAppSelector} from "@store/Hooks.ts";

export const SelectPagination = () => {
    const dispatch = useAppDispatch()
    const activePage = useAppSelector(state => state.userSlice.activePage)
    const perPage = useAppSelector(state => state.userSlice.perPage)
    const mvps = useAppSelector(state => state.Slice.filtered)

    return (
        <>
            <Select
                radius={'lg'}
                size={'xs'}
                placeholder="Per page"
                data={['12', '24', '48', 'All']}
                value={perPage > 48 ? "All" : perPage.toString()}
                onChange={(e) => dispatch(setPerPage(e ?? "12"))}
            />
            <Pagination total={(Math.ceil(mvps.length / perPage))} value={activePage} onChange={(value) => dispatch(setActivePage(value))} size="sm" radius="xl"/>
        </>
    )
}