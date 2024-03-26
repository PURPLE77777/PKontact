const FormsComponents = () => {
	return (
		<>
			{/* {isPending ? (
				<AuthLoader isLoad={isPending} />
			) : !authResult ? (
				<FormsFieldsCarousel
					control={control}
					errors={errors}
					placeHolders={placeHolders}
					fieldNames={fieldNames}
					carouselRef={carouselRef}
					errorTextShow={false}
				/>
			) : null}

			{error && (
				<ErrorTextWrapper>
					<ErrorTextSubmit>{error.message}</ErrorTextSubmit>
				</ErrorTextWrapper>
			)}

			{!(authResult || isPending) && (
				<SubmitButtonWrapper>
					<SubmitButton
						disabled={isSubmitDisabled.current}
						onPress={() =>
							isPasswordField ? handleSubmit(onSubmit)() : nextCarouselItem()
						}
						activeOpacity={0.7}
					>
						<SubmitText>{isPasswordField ? 'Submit' : 'Next'}</SubmitText>
					</SubmitButton>
				</SubmitButtonWrapper>
			)}

			{authResult && <AuthWelcomeText>WELCOME!</AuthWelcomeText>} */}
		</>
	)
}

export default FormsComponents
