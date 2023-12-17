module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		assumptions: {
			setPublicClassFields: false,
			privateFieldsAsSymbols: true
		},
		plugins: [
			[
				'babel-plugin-root-import',
				{
					paths: [
						{
							rootPathSuffix: './app/constants/',
							rootPathPrefix: '@constants/'
						},
						{
							rootPathSuffix: './app/screens/',
							rootPathPrefix: '@screens/'
						},
						{
							rootPathSuffix: './app/hooks/',
							rootPathPrefix: '@hooks/'
						},
						{
							rootPathSuffix: './app/navigation/',
							rootPathPrefix: '@navigation/'
						},
						{
							rootPathSuffix: './app/ui/',
							rootPathPrefix: '@ui/'
						},
						{
							rootPathSuffix: './app/assets/',
							rootPathPrefix: '@assets/'
						},
						{
							rootPathSuffix: './app/providers/',
							rootPathPrefix: '@providers/'
						},
						{
							rootPathSuffix: './app/types/',
							rootPathPrefix: '@AppTypes/'
						},
						{
							rootPathSuffix: './app/api/',
							rootPathPrefix: '@api/'
						},
						{
							rootPathSuffix: './app/services/',
							rootPathPrefix: '@services/'
						},
						{
							rootPathSuffix: './app/utils/',
							rootPathPrefix: '@utils/'
						},
						{
							rootPathSuffix: './app/store/',
							rootPathPrefix: '@store/'
						}
					]
				}
			]
		]
	}
}
