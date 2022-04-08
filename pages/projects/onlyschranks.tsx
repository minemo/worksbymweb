import { NextPage } from "next";
import {
	AppShell,
	Navbar,
	Header,
	Stack,
	Button,
	Title,
	Text,
	Divider,
	Paper,
	useMantineTheme,
	MediaQuery,
	Burger,
} from "@mantine/core";
import { useState } from "react";
import Link from "next/link";

type PostProps = { title?: string; description?: string };

const Post = ({ title, description }: PostProps) => {
	return (
		<div>
			<Paper shadow="xs" p="md">
				<Title order={4}>
					{title ? title : "Sexy Schränke in deiner Umgebung"}
				</Title>
				<Divider my="sm" />
				<Text>
					{description
						? description
						: "Jetzt Schränke in deiner Umgebung finden"}
				</Text>
			</Paper>
		</div>
	);
};

const Projects: NextPage = () => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			fixed
			styles={{
				main: {
					background:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbar={
				<Navbar
					p="md"
					hiddenBreakpoint="sm"
					hidden={!opened}
					width={{ sm: 200, lg: 300 }}
				>
					<Stack spacing="xl">
						<Button>Start</Button>
						<Button>Benachrichtigungen</Button>
						<Button>Nachichten</Button>
						<Button>Abonnements</Button>
					</Stack>
				</Navbar>
			}
			header={
				<Header height={60} p="xs">
					<div
						style={{ display: "flex", alignItems: "center", height: "100%" }}
					>
						<MediaQuery largerThan="sm" styles={{ display: "none" }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>
						<MediaQuery largerThan="sm" styles={{ paddingLeft: "3vh" }}>
							<Link passHref href='/projects'>
							<Title order={1}>
								<Text color={theme.white} inherit component="span">
									Only
								</Text>
								<Text color={theme.primaryColor} inherit component="span">
									Schranks
								</Text>
							</Title>
							</Link>
						</MediaQuery>
					</div>
				</Header>
			}
		>
			<Stack
				justify="flex-start"
				spacing="xs"
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
					height: 300,
				})}
			>
				<Post />
			</Stack>
		</AppShell>
	);
};

export default Projects;
