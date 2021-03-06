import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import style from '../styles/Home.module.css'
import { Container, Group, Button, Popover, Text, Title } from "@mantine/core";
import { useState } from "react";
import path from "path";
import { promises as fs } from 'fs'

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

type ProjectButtonProps = {buttonText?:string,popupText?:string,color?:string,popupColor?:string,href?:string};

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

const ProjectButton = ({ buttonText, popupText, color, popupColor, href }: ProjectButtonProps) => {
	const [opened, setOpened] = useState(false);

	return (
		<div>
			<Popover
				opened={opened}
				onClose={() => setOpened(false)}
				position="top"
				placement="center"
				withArrow
				trapFocus={false}
				closeOnEscape={false}
				transition="scale-y"
				shadow="xl"
				radius="lg"
				styles={{ body: { pointerEvents: "none" } }}
				target={
					<Link passHref href={href?href:"/"}>
						<Button
							fullWidth
							size="xl"
							color={color ? color : "primary"}
							onMouseOver={() => setOpened((o) => true)}
							onMouseLeave={() => setOpened((o) => false)}
							style={{fontFamily: 'Lora'}}
						>
							<i>{buttonText ? buttonText : "Button"}</i>
						</Button>
					</Link>
				}
			>
				<Text
					component="span"
					align="center"
					weight={700}
					variant={popupColor ? undefined : "gradient"}
					style={{ fontFamily: "Lora" }}
					color={popupColor ? popupColor : undefined}
					gradient={popupColor ? undefined : { from: "#9B59B6", to: "#E74C3C", deg: 45 }}
				>
					<i>{popupText ? popupText : "Popup"}</i>
				</Text>
			</Popover>
		</div>
	);
};

const Home: NextPage = ({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className='container'>
			<Head>
				<title>Creative Coding by M</title>
				<meta name="description" content="Look at the Title 5Head" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={style.main} >
				<Container styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}>
				<Title order={1} align='center' sx={(theme) => ({
					transition: 'all 0.5s ease-out',
					color:
						theme.colorScheme === "dark"
							? theme.colors.gray[0]
							: theme.colors.blue[8],
					paddingBottom: '15vh',
					fontFamily: 'Lora',
					'&:hover': {
						color: theme.colors.red[8],
						
					}
			})}><i>works by M</i></Title>
					<Group position="center" spacing="xl">
						<ProjectButton
							color="green"
							buttonText="Projects"
							popupText={data.length ? `Currently ${data.length} projects` : "No projects"}
							href="/projects"
						></ProjectButton>
						<Link passHref href="/info">
							<Button size="xl" style={{fontFamily: 'Lora'}}><i>Info</i></Button>
						</Link>
						<Link passHref href="/links">
							<Button size="xl" style={{fontFamily: 'Lora'}}><i>Links</i></Button>
						</Link>
					</Group>
				</Container>
			</main>
		</div>
	);
};

export default Home;
