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
	useMantineTheme ,
} from "@mantine/core";

type PostProps = {title?:string,description?:string};

const Post = ({title, description}: PostProps) => {
	return (
		<div>
			<Paper shadow="xs" p="md">
				<Title order={4}>{title?title: "Sexy Schränke in deiner Umgebung"}</Title>
				<Divider my="sm" />
				<Text>
					{description?description: "Jetzt Schränke in deiner Umgebung finden"}
				</Text>
			</Paper>
		</div>
	);
};

const Projects: NextPage = () => {
	const theme = useMantineTheme();
	return (
		<AppShell
			padding="md"
			navbar={
				<Navbar width={{ base: 300 }} height={500} p="xs">
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
					<Title style={{ paddingLeft: "20px" }} order={1}>
					<Text color={theme.white} inherit component="span">
						Only
						</Text>
						<Text color={theme.primaryColor} inherit component="span">
							Schranks
						</Text>
					</Title>
				</Header>
			}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
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
                <Post/>
            </Stack>
		</AppShell>
	);
};

export default Projects;
