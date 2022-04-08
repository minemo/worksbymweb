import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import {
	Grid,
	Accordion,
	Container,
	Badge,
	Avatar,
	Title,
	Text,
	Button,
	useMantineTheme,
} from "@mantine/core";
import { promises as fs } from "fs";
import path from "path";

const colors = [
	"red",
	"pink",
	"grape",
	"violet",
	"indigo",
	"blue",
	"cyan",
	"teal",
	"green",
	"lime",
	"yellow",
	"orange",
];

class PJ {
	constructor(
		public name: string,
		public description: string,
		public link: string,
		public image: string,
		public color: string,
		public tags: string[]
	) {}
}

export const getStaticProps: GetStaticProps = async () => {
	const backendData = path.join(process.cwd(), "backdata");
	const files = await fs.readdir(backendData);
	const fileContents = await fs.readFile(
		path.join(backendData, files.filter((f) => f.startsWith('projs'))[0]),
		"utf8"
	);
	const projects = JSON.parse(fileContents).projects as PJ[];
	return {
		props: { data: await Promise.all(projects) }, // will be passed to the page component as props
	};
};

const Projects: NextPage = ({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const theme = useMantineTheme();

	//* Add Projects here
	let projects: PJ[] = data;

	return (
		<div style={{ paddingLeft: "2vh", paddingRight: "2vh" }}>
			<Link passHref href="/">
				<Title style={{ padding: "1vh" }} order={1}>
					<Text color={theme.white} inherit component="span">
						Projects
					</Text>
				</Title>
			</Link>
			<Grid grow gutter={5}>
				{projects.map((p) => (
					<Grid.Col span={4} key={p.name + "_" + projects.indexOf(p)}>
						<Container
							style={{
								backgroundColor:
									theme.colorScheme === "dark"
										? theme.colors.dark[6]
										: theme.colors.gray[1],
								borderRadius: "25px",
								paddingLeft: "0",
								paddingRight: "0",
								paddingBottom: "25px",
							}}
						>
							<Grid
								sx={(theme) => ({
									backgroundColor: "#" + p.color,
									opacity: 1,
									margin: "0",
									borderRadius: "10px 10px 0 0",
									transition: "all 0.25s ease",
									"&:hover": {
										transition: "all 0.5s ease",
										borderRadius: "20px 20px 0 0",
									},
								})}
							>
								<Grid.Col lg={1}>
									<div style={{ paddingLeft: "1vh" }}>
										<Avatar src={p.image} alt={p.description}></Avatar>
									</div>
								</Grid.Col>
								<Grid.Col lg={p.name.length / 2 - 1}>
									<Title order={2} align="center">
										<Text color={theme.white} inherit component="span">
											{p.name}
										</Text>
									</Title>
								</Grid.Col>
								<Grid.Col lg={1}>
									<Link passHref href={p.link}>
										<Button component="a" color="green">Open</Button>
									</Link>
								</Grid.Col>
							</Grid>
							<Accordion multiple>
								<Accordion.Item label="Description">
									<p>{p.description}</p>
								</Accordion.Item>
								<Accordion.Item label="Tags">
									{p.tags.map((t) => {
										return (
											<Badge
												variant="filled"
												color={
													colors[Math.floor(Math.random() * colors.length - 1)]
												}
												size="lg"
												key={p.name + "_" + t}
											>
												{t}
											</Badge>
										);
									})}
								</Accordion.Item>
							</Accordion>
						</Container>
					</Grid.Col>
				))}
			</Grid>
		</div>
	);
};

export default Projects;
