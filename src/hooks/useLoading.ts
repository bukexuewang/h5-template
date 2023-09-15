import { Ref } from 'vue'

export const useLoading = <T extends (...args: any[]) => Promise<any>>(
	requestApi: T
): [T, Ref<boolean>] => {
	const loading = ref(false)
	const fn = async (...args: Parameters<T>) => {
		if (unref(loading)) return
		loading.value = true
		let res: ReturnType<T> | null = null
		let err: any = null
		try {
			res = await requestApi(...args)
		} catch (error) {
			err = error as ReturnType<T>
		}
		loading.value = false
		if (err) return Promise.reject(err)
		return res!
	}
	return [fn as T, loading]
}
