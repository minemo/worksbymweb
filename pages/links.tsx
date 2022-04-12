import { NextPage } from "next";
import Link from "next/link";
import { Center, Container, SimpleGrid, Avatar } from "@mantine/core";
import style from "../styles/Home.module.css";
import {
	BrandInstagram,
	BrandGithub,
	BrandTwitch,
	ArrowBack,
} from "tabler-icons-react";

const Links: NextPage = () => {
	return (
		<div className={style.main}>
			<Container
				styles={(theme) => ({
					main: {
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				})}
			>
				<Center style={{ paddingBottom: "2vh" }}>
					<SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth: 755, cols: 1}]}>
						<Link passHref href="https://www.instagram.com/makingminemo/">
							<Avatar radius="xl" size="xl" src={null} color="red">
								<BrandInstagram size={64} />
							</Avatar>
						</Link>
						<Link passHref href="https://github.com/minemo">
							<Avatar radius="xl" size="xl" src={null}>
								<BrandGithub size={64} />
							</Avatar>
						</Link>
						<Link passHref href="https://www.twitch.tv/minemotv">
							<Avatar radius="xl" size="xl" src={null} color="6441a4">
								<BrandTwitch size={64} />
							</Avatar>
						</Link>
					</SimpleGrid>
				</Center>
				<Center>
					<Link passHref href="/">
						<Avatar radius="xl" size="lg" src={null}>
							<ArrowBack size={32} />
						</Avatar>
					</Link>
				</Center>
			</Container>
		</div>
	);
};

export default Links;
