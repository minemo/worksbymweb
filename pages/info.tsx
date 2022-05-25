import { NextPage } from "next";
import { Center, Text, Button } from "@mantine/core";
import { ArrowBackUp } from "tabler-icons-react";
import Link from "next/link.js";

const Info: NextPage = () => {
	return (
		<div>
			<Center>
				<h1 style={{ fontFamily: "Lora" }}>
					<i>Who am I?</i>
				</h1>
			</Center>
			<Center>
				<Text size="lg" align="left">
					I&apos;m a forensic science student from Germany, who is passionate
					about programming and solving problems.
					<br />
					Another passion of mine is to find new ways to create and process
					interesting data, such as the creation of artificial intelligence{" "}
					<br />
					Or interactive/generative art with computer graphics.
					<br />
					<br />
					Some of my other interests include:
					<ul>
						<li>
							<i>Cyber Security</i>
						</li>
						<li>
							<i>Video Games</i>
						</li>
						<li>
							<i>Music</i>
						</li>
						<li>
							<i>Art</i>
						</li>
					</ul>
					<br />
					Currently I&apos;m finishing my Bachelors degree in forensic science.<br/>
					Additionally I create art and other resources for my friends and the content creator <a href="https://www.twitch.tv/didob007"><i style={{color: 'red'}}>Didob007</i></a><br/>
                    For some of my most recent projects you can find them on <a href="https://www.instagram.com/makingminemo/"><i style={{color: 'red'}}>my Instagram</i></a><br/>
                    <br />
                    <br />
                    <i>Thats all for now, I hope you enjoy my website!</i>
				</Text>
			</Center>
            <Center>
                <Link href={"/"}><Button variant="white"><ArrowBackUp color="black"/></Button></Link>
            </Center>
		</div>
	);
};

export default Info;
