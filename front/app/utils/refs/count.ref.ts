import { useRef } from "react"

type CountValueType = {
	[index: string]: number
}

export const useCountRef = (name: string) => {
	const ref = useRef<CountValueType>({ [name]: 0 })

	ref.current[name] += 1
	console.log(`${name} renders: ${ref.current[name]}`)
}