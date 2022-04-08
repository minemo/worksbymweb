import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme);

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{colorScheme}}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default MyApp;
