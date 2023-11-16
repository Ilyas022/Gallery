import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import rootActions from "../rootActions"
import { AppDispatch } from "../index"

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
