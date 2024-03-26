import FormsComponents from './FormsComponents'

const FormsStates = () => {
	// const {
	// 	control,
	// 	handleSubmit,
	// 	getValues,
	// 	formState: { errors }
	// } = useForm<AuthFormType>({
	// 	criteriaMode: 'firstError',
	// 	resolver: zodResolver(AuthFormSchema),
	// 	mode: 'onChange',
	// 	defaultValues: {
	// 		username: 'TestUserName',
	// 		email: 'test@test.com',
	// 		password: 'testMyPassword'
	// 	}
	// })
	// useCountRef('AuthStackScreen')
	// const isNeedCheckSubmitBtnRef = useRef(true)
	// const [carouselIndex, setCarouselIndex] = useState(0)
	// const isSubmitDisabled = useIsSubmitDisableRef()
	// const carouselRef = useCarouselRef()
	// const { tokenStore } = useStore()

	// const { navigate } = useNavigation<RootNavigationProp>()

	// const {
	// 	mutate,
	// 	data: authResult,
	// 	isPending
	// } = useMutation({
	// 	mutationFn: async (authFormData: AuthFormType) => {
	// 		const { authService } = rootService
	// 		console.log('submit:', authFormData)
	// 		const data = await authService.signIn(authFormData)
	// 		isSubmitDisabled.current = false
	// 		isNeedCheckSubmitBtnRef.current = true
	// 		return data
	// 	}
	// })

	// useEffect(() => {
	// 	if (authResult) {
	// 		setTimeout(() => {
	// 			// TODO: set coockie instead of "navigate"
	// 			// navigate('MainSections', {
	// 			// 	screen: 'Home'
	// 			// })
	// 			tokenStore.setAccessToken('test token')
	// 		}, 2000)
	// 	}
	// }, [authResult])

	// const fieldNames: SignInOrAuthFormKeyArrays = [
	// 	'username',
	// 	'email',
	// 	'password'
	// ]

	// const onSubmit = (data: AuthFormType) => {
	// 	isSubmitDisabled.current = true
	// 	isNeedCheckSubmitBtnRef.current = false
	// 	mutate(data)
	// }

	// const nextCarouselItem = () => {
	// 	carouselRef.current?.next()
	// 	isSubmitDisabled.current = true
	// 	setCarouselIndex(carouselIndex + 1)
	// }

	// const placeHolders: Record<keyof AuthFormType, string> = {
	// 	username: 'Enter username',
	// 	email: 'Enter email',
	// 	password: 'Enter password'
	// }

	// if (isNeedCheckSubmitBtnRef.current) {
	// 	checkSubmitBtn(
	// 		fieldNames[carouselIndex],
	// 		getValues,
	// 		errors,
	// 		isSubmitDisabled
	// 	)
	// }

	// const error = errors[fieldNames[carouselIndex]],
	// 	isPasswordField = carouselIndex === fieldNames.length - 1

	return <FormsComponents />
}

export default FormsStates
