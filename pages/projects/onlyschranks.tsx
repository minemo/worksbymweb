import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
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
	Image,
	SimpleGrid,
} from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";

class PostData {
	constructor(
		public title: string,
		public notes: string,
		public image: string,
		public tags: string[]
	) {}
}

export const getStaticProps: GetStaticProps = async () => {
	const backendData = path.join(process.cwd(), "backdata");
	const files = await fs.readdir(backendData);
	const fileContents = await fs.readFile(
		path.join(backendData, files.filter((f) => f.startsWith("osposts"))[0]),
		"utf8"
	);
	const posts = JSON.parse(fileContents).posts as PostData[];
	return {
		props: { posts: await Promise.all(posts) }, // will be passed to the page component as props
	};
};

type PostProps = { title?: string; description?: string; imglink?: string };

const Post = ({ title, description, imglink }: PostProps) => {
	return (
		<div>
			<Paper shadow="xs" p="md">
				<Title order={4}>
					{title ? title : "Sexy Schränke in deiner Umgebung"}
				</Title>
				<Divider my="sm" />
				{imglink ? (
					<SimpleGrid
						cols={2}
						breakpoints={[
							{ maxWidth: 980, cols: 2, spacing: "xs" },
							{ maxWidth: 600, cols: 1, spacing: "xs" },
						]}
					>
						<Image
							src={imglink}
							alt={description ? description : "Sexy Schränke"}
							style={{
								width: "30%",
								height: "10%",
								maxWidth: "50%",
								maxHeight: "25%",
							}}
							radius="md"
						/>
						<p>
							{description
								? description
								: "Jetzt Schränke in deiner Umgebung finden"}
						</p>
					</SimpleGrid>
				) : (
					<Text>
						{description
							? description
							: "Jetzt Schränke in deiner Umgebung finden"}
					</Text>
				)}
			</Paper>
		</div>
	);
};

const Onlyschranks: NextPage = ({
	posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<>
			<Head>
				<title>OnlySchranks</title>
			</Head>
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
						<Link
								passHref
								href="/projects/onlyschranks"
							>
							<Button>Start</Button>
							</Link>
							<Button>Benachrichtigungen</Button>
							<Button>Nachichten</Button>
							<Button>Abonnements</Button>
							<Link
								passHref
								href="https://www.instagram.com/schrank.der.kinky.dinge/"
							>
								<Button component="a" color="red">
									Exklusive leaks!!!
								</Button>
							</Link>
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
								<Link passHref href="/projects">
									<Title order={1}>
										<Text
											color={
												theme.colorScheme === "dark"
													? theme.colors.dark[0]
													: theme.colors.gray[8]
											}
											inherit
											component="span"
										>
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
					spacing="xs"
					sx={(theme) => ({
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
						height: "auto",
					})}
				>
					{posts.map((post: PostData) => {
						const { title, notes, image } = post;
						return (
							<Post
								key={posts.indexOf(post)}
								title={title}
								description={notes}
								imglink={image}
							/>
						);
					})}
				</Stack>
			</AppShell>
		</>
	);
};

export default Onlyschranks;
