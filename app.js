const neo4j = require("neo4j-driver");
const uri = "bolt://localhost:11003/ctf";
const user = "neo4j";
const password = ".";
const { categories, googleCTF, teams } = require("./data.js");
// include pretty and colorful console logging
const chalk = require("chalk");

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session({
	database: "ctf",
});

function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

const addCategory = async ({ name, description }) => {
	return new Promise(async (resolve) => {
		const result = await session.run(
			"CREATE (c:Category {name: $name, description: $description}) RETURN c",
			{ name, description }
		);
		const categoryId = parseInt(result.records[0].get(0).elementId);
		categories.find((c) => c.name === name).id = categoryId;
		return resolve(result);
	});
};

const addChallenge = async ({
	name,
	description,
	category,
	points,
	flag,
	solved_by,
	ctfName,
}) => {
	return new Promise(async (resolve) => {
		const result = await session.run(
			"CREATE (c:Challenge {name: $name, description: $description, points: $points, flag: $flag, ctfName: $ctfName}) RETURN c",
			{ name, description, points, flag, ctfName }
		);
		const challengeId = parseInt(result.records[0].get(0).elementId);
		const categoryNode = categories.find((c) => c.name === category);
		await session.run(
			"MATCH (c:Category), (ch:Challenge) WHERE ID(c) = $categoryId AND ID(ch) = $challengeId CREATE (ch)-[:IS_IN_CATEGORY]->(c)",
			{ categoryId: categoryNode.id, challengeId }
		);
		for (const memberName of solved_by) {
			await session.run(
				"MATCH (m:Member), (ch:Challenge) WHERE m.name = $memberName AND ID(ch) = $challengeId CREATE (m)-[:SOLVED {time: datetime($date)}]->(ch)",
				{
					memberName,
					challengeId,
					date: randomDate(
						new Date(2022, 6, 20),
						new Date(2022, 6, 24)
					).toISOString(),
				}
			);
		}

		return resolve(result);
	});
};

const addTeam = async ({ name, members }) => {
	return new Promise(async (resolve) => {
		const result = await session.run(
			"CREATE (t:Team {name: $name}) RETURN t",
			{ name }
		);
		const teamId = parseInt(result.records[0].get(0).elementId);
		teams.find((t) => t.name === name).id = teamId;
		for (const member of members) {
			// Create members
			const memberResult = await session.run(
				"CREATE (m:Member {name: $name, email: $email}) RETURN m",
				{ name: member.name, email: member.email }
			);
			const memberId = parseInt(memberResult.records[0].get(0).elementId);
			// Create member-team relationship - IS_MEMBER_OF
			await session.run(
				"MATCH (t:Team), (m:Member) WHERE ID(t) = $teamId AND ID(m) = $memberId CREATE (m)-[:IS_MEMBER_OF {since: date($since)}]->(t)",
				{ teamId, memberId, since: member.since }
			);
		}
		return resolve(result);
	});
};

const clearTeams = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (t:Team) DETACH DELETE t");
		return resolve(result);
	});
};

const clearMembers = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (m:Member) DETACH DELETE m");
		return resolve(result);
	});
};

const clearCategories = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (c:Category) DETACH DELETE c");
		return resolve(result);
	});
};

const clearChallenges = async () => {
	return new Promise(async (resolve) => {
		const result = await session.run("MATCH (c:Challenge) DETACH DELETE c");
		return resolve(result);
	});
};

const addCtf = async (ctf) => {
	return new Promise(async (resolve) => {
		for (const category in ctf.challenges) {
			for (const challenge of ctf.challenges[category]) {
				await addChallenge({ ...challenge, ctfName: ctf.name });
			}
		}
		return resolve();
	});
};

const init = async () => {
	return new Promise(async (resolve) => {
		console.log(chalk.green("Clearing the database..."));
		await clearCategories();
		await clearChallenges();
		await clearTeams();
		await clearMembers();
		console.log(chalk.green("Database cleared!"));
		console.log(chalk.green("Adding categories..."));
		for (const category of categories) {
			await addCategory(category);
		}
		console.log(chalk.green("Categories added!"));
		console.log(chalk.green("Adding teams..."));
		for (const team of teams) {
			await addTeam(team);
		}
		console.log(chalk.green("Teams added!"));
		console.log(chalk.green("Adding CTFs..."));
		await addCtf(googleCTF);
		console.log(chalk.green("CTFs added!"));
		return resolve();
	});
};

const main = async () => {
	console.log(chalk.green("Creating the database..."));
	await init();
	console.log(chalk.green("Main init is done!"));
	await session.close();
	await driver.close();
};

main();
