import { ActionIcon, Container, Group, rem } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconHome } from '@tabler/icons-react';
import classes from './Footer.module.scss';

export default function Footer() {
	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<p className={classes.quaestio}>Quaestio</p>
				<Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
					<ActionIcon
						size="lg"
						color="dark.5"
						variant="subtle"
						onClick={() => window.open('https://ryanktt.github.io/portfolio', '_blank')}
					>
						<IconHome style={{ width: rem(18), height: rem(18) }} stroke={1.7} />
					</ActionIcon>
					<ActionIcon
						size="lg"
						color="dark.5"
						variant="subtle"
						onClick={() => window.open('https://github.com/ryanktt', '_blank')}
					>
						<IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.7} />
					</ActionIcon>
					<ActionIcon
						size="lg"
						color="dark.5"
						variant="subtle"
						onClick={() =>
							window.open('https://www.linkedin.com/in/ryan-kayro-6338ab209/', '_blank')
						}
					>
						<IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.7} />
					</ActionIcon>
				</Group>
			</Container>
		</div>
	);
}
